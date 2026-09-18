"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

const links = [
  { href: "/players", label: "Player Stats" },
  { href: "/matches", label: "Match Summary" },
  { href: "/squad", label: "Squad" },
  { href: "/leaderboards", label: "Leaderboards" },
  { href: "/summary", label: "Summary" },
  { href: "/compare", label: "Compare" },
  { href: "/manage", label: "Manage", right: true },
]

export default function NavBar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  if (pathname === "/auth/signin") return null

  return (
    <div className="nav">
      {links.map(l => {
        const active = pathname.startsWith(l.href)
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-tab${active ? " active" : ""}`}
            style={l.right ? { marginLeft: "auto" } : {}}
          >
            {l.label}
          </Link>
        )
      })}
      {session ? (
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="nav-tab"
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#8A9B92", fontFamily: "Inter, sans-serif",
            fontSize: 13, fontWeight: 600, padding: "8px 12px",
          }}
        >
          Sign Out
        </button>
      ) : (
        <Link href="/auth/signin" className="nav-tab" style={{ color: "#E8B84B" }}>
          Sign In
        </Link>
      )}
    </div>
  )
}
