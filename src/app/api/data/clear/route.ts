import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function DELETE(request: Request) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized
  await prisma.$transaction(async tx => {
    await tx.bowlingEntry.deleteMany()
    await tx.battingEntry.deleteMany()
    await tx.inning.deleteMany()
    await tx.match.deleteMany()
  })
  return NextResponse.json({ success: true })
}