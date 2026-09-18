import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const session = await getSession()
  if ((session as any)?.user?.playerId) return true

  const pin = request.headers.get("x-admin-pin") || ""
  const expected = process.env.ADMIN_PIN || ""
  if (expected && pin === expected) return true

  return false
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

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