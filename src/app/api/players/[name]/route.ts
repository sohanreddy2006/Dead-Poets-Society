import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getMatches, getPlayerEntriesFromMatches, calcPlayerStats } from "@/lib/stats"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params
  const decodedName = decodeURIComponent(name)
  const tournament = request.nextUrl.searchParams.get("tournament") || undefined
  const player = await prisma.player.findUnique({ where: { username: decodedName } })
  const matches = await getMatches(tournament)
  const entries = getPlayerEntriesFromMatches(matches, decodedName, player?.id)
  const stats = calcPlayerStats(decodedName, entries, matches, tournament)
  return NextResponse.json({ player, stats })
}