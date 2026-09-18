import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (!token || !token.playerId) return false

      if (req.nextUrl.pathname.startsWith("/manage")) {
        const admins = (process.env.ADMIN_USERNAMES || "").split(",").map(s => s.trim())
        return admins.includes(token.playerUsername || "")
      }

      return true
    },
  },
  pages: { signIn: "/auth/signin" },
})

export const config = {
  matcher: ["/((?!api|auth|_next|favicon.ico).*)"],
}
