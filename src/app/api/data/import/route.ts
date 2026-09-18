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

function isValidImportMatch(match: ImportMatch) {
  return Boolean(match.date && match.opponent && match.tournament && match.result && match.potm)
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const body = await request.json()
    if (!body.matches || !Array.isArray(body.matches)) {
      return NextResponse.json({ error: "Invalid format" }, { status: 400 })
    }

    const matches = body.matches as ImportMatch[]
    if (!matches.every(isValidImportMatch)) {
      return NextResponse.json({ error: "One or more matches are missing required fields" }, { status: 400 })
    }

    const roster = await prisma.player.findMany({ select: { id: true, username: true } })
    const playerByName = new Map(roster.map(p => [p.username.toLowerCase(), p.id]))

    await prisma.$transaction(async tx => {
      await tx.bowlingEntry.deleteMany()
      await tx.battingEntry.deleteMany()
      await tx.inning.deleteMany()
      await tx.match.deleteMany()

      for (const [index, m] of matches.entries()) {
        await tx.match.create({
          data: {
            matchNumber: m.matchNumber ?? index + 1,
            date: m.date!, venue: m.venue || "", opponent: m.opponent!,
            tournament: m.tournament!, result: m.result!, potm: m.potm!, deletedAt: null,
            innings: {
              create: (m.innings || []).map(inn => ({
                battingTeam: inn.battingTeam || "", bowlingTeam: inn.bowlingTeam || "",
                total: inn.total || "", overs: inn.overs || "", extras: inn.extras || 0,
                batsmen: {
                  create: (inn.batsmen || []).map(b => ({
                    name: b.name || "",
                    playerId: b.playerId ?? (b.name ? playerByName.get(b.name.toLowerCase()) : undefined),
                    runs: b.runs || 0, balls: b.balls || 0,
                    fours: b.fours || 0, sixes: b.sixes || 0,
                    dismissal: b.dismissal || "", sr: b.sr || "",
                    excludedFromStats: b.excludedFromStats || false,
                  })),
                },
                bowlers: {
                  create: (inn.bowlers || []).map(b => ({
                    name: b.name || "",
                    playerId: b.playerId ?? (b.name ? playerByName.get(b.name.toLowerCase()) : undefined),
                    overs: b.overs || 0, maidens: b.maidens || 0,
                    runs: b.runs || 0, wkts: b.wkts || 0, econ: b.econ || "",
                    excludedFromStats: b.excludedFromStats || false,
                  })),
                },
              })),
            },
          },
        })
      }
    })

    return NextResponse.json({ success: true, importedMatches: matches.length })
  } catch {
    return NextResponse.json({ error: "Import failed" }, { status: 500 })
  }
}