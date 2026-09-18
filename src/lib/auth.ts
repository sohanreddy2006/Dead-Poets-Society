import { NextAuthOptions, getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import DiscordProvider from "next-auth/providers/discord"
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
    ...(process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET
      ? [DiscordProvider({
          clientId: process.env.DISCORD_CLIENT_ID,
          clientSecret: process.env.DISCORD_CLIENT_SECRET,
        })]
      : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "discord") {
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
        if (dbUser && !dbUser.playerId) {
          const discordUsername = (profile as any)?.username
          if (discordUsername) {
            const player = await prisma.player.findUnique({
              where: { username: discordUsername.toLowerCase() },
            })
            if (player) {
              await prisma.user.update({
                where: { id: user.id },
                data: { playerId: player.id, name: player.username },
              })
            } else {
              return "/auth/signin?error=PlayerNotFound"
            }
          } else {
            return "/auth/signin?error=PlayerNotFound"
          }
        }
      }
      return true
    },
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
