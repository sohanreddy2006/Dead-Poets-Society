import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

type ImportMatch = {
  id?: number
  matchNumber?: number | null
  date?: string
  venue?: string
  opponent?: string
  tournament?: string
  result?: string
  potm?: string
  innings?: Array<{
    battingTeam?: string
    bowlingTeam?: string
    total?: string
    overs?: string
    extras?: number
    batsmen?: Array<{
      name?: string
      playerId?: number | null
      runs?: number
      balls?: number
      fours?: number
      sixes?: number
      dismissal?: string
      sr?: string
      excludedFromStats?: boolean
    }>
    bowlers?: Array<{
      name?: string
      playerId?: number | null
      overs?: number
      maidens?: number
      runs?: number
      wkts?: number
      econ?: string
      excludedFromStats?: boolean
    }>
  }>
}

function isValidMatch(match: ImportMatch) {
  return Boolean(match.date && match.opponent && match.tournament && match.result && match.potm)
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    let body = await request.json()

    // Support single match or { matches: [...] }
    if (!Array.isArray(body)) {
      if (body.matches && Array.isArray(body.matches)) {
        body = body.matches
      } else if (body.date && body.opponent && body.tournament) {
        body = [body]
      } else {
        return NextResponse.json({ error: "Invalid format. Send a match object or { matches: [...] }" }, { status: 400 })
      }
    }

    const matches = body as ImportMatch[]

    if (!matches.every(isValidMatch)) {
      return NextResponse.json({ error: "One or more matches missing required fields (date, opponent, tournament, result, potm)" }, { status: 400 })
    }

    const roster = await prisma.player.findMany({ select: { id: true, username: true } })
    const playerByName = new Map(roster.map(p => [p.username.toLowerCase(), p.id]))

    const imported: Array<{ opponent: string; tournament: string; date: string }> = []
    const skipped: Array<{ opponent: string; tournament: string; date: string; reason: string }> = []
    const errors: Array<{ opponent: string; tournament: string; date: string; error: string }> = []

    for (const m of matches) {
      const key = { opponent: m.opponent!, tournament: m.tournament!, date: m.date! }

      // Dedup check: tournament + opponent + date
      const existing = await prisma.match.findFirst({
        where: { tournament: m.tournament!, opponent: m.opponent!, date: m.date! },
      })

      if (existing) {
        skipped.push({ ...key, reason: "Already exists" })
        continue
      }

      try {
        await prisma.match.create({
          data: {
            date: m.date!,
            venue: m.venue || "",
            opponent: m.opponent!,
            tournament: m.tournament!,
            result: m.result!,
            potm: m.potm!,
            innings: {
              create: (m.innings || []).map(inn => ({
                battingTeam: inn.battingTeam || "",
                bowlingTeam: inn.bowlingTeam || "",
                total: inn.total || "",
                overs: inn.overs || "",
                extras: inn.extras || 0,
                batsmen: {
                  create: (inn.batsmen || []).map(b => ({
                    name: b.name || "",
                    playerId: b.playerId ?? (b.name ? playerByName.get(b.name.toLowerCase()) : undefined),
                    runs: b.runs || 0,
                    balls: b.balls || 0,
                    fours: b.fours || 0,
                    sixes: b.sixes || 0,
                    dismissal: b.dismissal || "",
                    sr: b.sr || "",
                    excludedFromStats: b.excludedFromStats || false,
                  })),
                },
                bowlers: {
                  create: (inn.bowlers || []).map(b => ({
                    name: b.name || "",
                    playerId: b.playerId ?? (b.name ? playerByName.get(b.name.toLowerCase()) : undefined),
                    overs: b.overs || 0,
                    maidens: b.maidens || 0,
                    runs: b.runs || 0,
                    wkts: b.wkts || 0,
                    econ: b.econ || "",
                    excludedFromStats: b.excludedFromStats || false,
                  })),
                },
              })),
            },
          },
        })
        imported.push(key)
      } catch (e: any) {
        errors.push({ ...key, error: e.message || "Unknown error" })
      }
    }

    return NextResponse.json({
      success: true,
      imported: imported.length,
      skipped: skipped.length,
      errors: errors.length,
      details: { imported, skipped, errors },
    })
  } catch {
    return NextResponse.json({ error: "Import failed" }, { status: 500 })
  }
}
