import { NextResponse } from "next/server"
import { getMatches } from "@/lib/stats"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tournament = searchParams.get("tournament") || undefined
  const matches = await getMatches(tournament)
  return NextResponse.json(matches)
}
