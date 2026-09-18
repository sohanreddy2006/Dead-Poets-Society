"use client"

import { usePathname } from "next/navigation"
import NavBar from "@/components/NavBar"

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = pathname === "/auth/signin"

  if (isAuth) return <>{children}</>

  return (
    <div className="container" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px 70px" }}>
      <header className="site-header">
        <h1 className="site-title">Dead Poets Society</h1>
        <div className="site-tag">Tournament — Markhors</div>
      </header>
      <NavBar />
      {children}
    </div>
  )
}
