import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      playerId?: number | null
      playerUsername?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    playerId?: number | null
    playerUsername?: string | null
  }
}
