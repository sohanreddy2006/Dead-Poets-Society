"use client"

import { useRouter, useSearchParams } from "next/navigation"

export default function TournamentFilter({ tournaments }: { tournaments: string[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get("tournament") || ""

  return (
    <div style={{ display: "flex", gap: 16, marginTop: 24, alignItems: "center" }}>
      <select
        className="select"
        style={{
          width: 180, background: "var(--card)", border: "1px solid var(--border)",
          color: "var(--ink)", padding: "10px 14px", borderRadius: 8,
          fontSize: 14, outline: "none", cursor: "pointer",
        }}
        value={current}
        onChange={e => {
          const v = e.target.value
          router.push(v ? `?tournament=${encodeURIComponent(v)}` : "?")
        }}
      >
        <option value="">All Tournaments</option>
        {tournaments.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
    </div>
  )
}
