import { NextAuthOptions, getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  providers: [
    CredentialsProvider({
      name: "Team Password",
      credentials: {
        username: { label: "Player Username", type: "text" },
        password: { label: "Team Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        if (credentials.password !== process.env.TEAM_PASSWORD) return null

        const player = await prisma.player.findUnique({
          where: { username: credentials.username },
        })
        if (!player) return null

        let user = await prisma.user.findFirst({
          where: { playerId: player.id },
        })
        if (!user) {
          user = await prisma.user.create({
            data: { name: player.username, playerId: player.id },
          })
        }

        return {
          id: user.id,
          name: player.username,
          email: user.email || null,
          image: user.image,
          playerId: user.playerId,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
        token.playerId = dbUser?.playerId ?? null
        token.playerUsername = dbUser?.name || null
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).playerId = token.playerId
        ;(session.user as any).playerUsername = token.playerUsername
      }
      return session
    },
  },
}

export function getSession() {
  return getServerSession(authOptions)
}

const DEFAULT_ADMIN_PIN = ""

const DEFAULT_ADMIN_USERNAMES = ""

function isAdmin(username: string | null | undefined): boolean {
  const admins = (process.env.ADMIN_USERNAMES || DEFAULT_ADMIN_USERNAMES).split(",").map(s => s.trim())
  return admins.includes(username || "")
}

export async function requireAdmin(request: Request) {
  const session = await getSession()
  if (session?.user?.playerId && isAdmin(session.user.playerUsername)) return null

  const expected = process.env.ADMIN_PIN || DEFAULT_ADMIN_PIN
  const received = request.headers.get("x-admin-pin") || ""
  if (received !== expected) {
    return NextResponse.json({ error: "Access denied" }, { status: 401 })
  }
  return null
}
