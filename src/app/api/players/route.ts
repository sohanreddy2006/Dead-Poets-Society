import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const players = await prisma.player.findMany({
    where: { isRosterPlayer: true },
    orderBy: { username: "asc" },
  })
  return NextResponse.json({ players })
}