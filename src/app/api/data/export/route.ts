import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const tournament = request.nextUrl.searchParams.get("tournament")
  const includeDeleted = request.nextUrl.searchParams.get("includeDeleted") === "true"
  const matches = await prisma.match.findMany({
    where: {
      ...(tournament ? { tournament } : {}),
      ...(includeDeleted ? {} : { deletedAt: null }),
    },
    include: {
      innings: {
        include: { batsmen: true, bowlers: true },
      },
    },
    orderBy: { id: "asc" },
  })
  return NextResponse.json({ matches })
}