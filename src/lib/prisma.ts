import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createPrisma() {
  if (!process.env.DATABASE_URL) return null
  return new PrismaClient()
}

export const prisma = globalForPrisma.prisma ?? createPrisma() ?? ({} as PrismaClient)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
