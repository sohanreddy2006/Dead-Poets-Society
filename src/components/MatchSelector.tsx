"use client"

import { useMemo, useState } from "react"
import type { MatchData } from "@/lib/stats"

export default function MatchSelector({ matches, selectedId, onSelect }: {
  matches: MatchData[]
  selectedId: number | null
  onSelect: (id: number) => void
}) {
  const [query, setQuery] = useState("")
  const [resultFilter, setResultFilter] = useState("all")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return matches.filter(m => {
      const text = `${m.matchNumber || ""} ${m.date} ${m.opponent} ${m.tournament} ${m.result}`.toLowerCase()
      const resultOk = resultFilter === "all"
        || (resultFilter === "wins" && m.result.startsWith("Dead Poets Society won"))
        || (resultFilter === "losses" && !m.result.startsWith("Dead Poets Society won"))
      return resultOk && (!q || text.includes(q))
    })
  }, [matches, query, resultFilter])

  return (
    <div className="side-card" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 18 }}>
      <div className="search" style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg)", border: "1px solid var(--border)", padding: "10px 14px", borderRadius: 8, marginBottom: 14 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16, color: "var(--muted-2)", flexShrink: 0 }}>
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <input
          placeholder="Search opponent, date, tournament..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ background: "none", border: "none", color: "var(--ink)", outline: "none", flex: 1, fontSize: 13 }}
        />
      </div>
      <div className="match-list" style={{ maxHeight: 640, overflowY: "auto" }}>
        {filtered.length === 0 && <div style={{ color: "var(--muted-2)", fontSize: 12, padding: 12 }}>No matches found</div>}
        {filtered.map((m, i) => {
          const num = m.matchNumber ?? matches.findIndex(mm => mm.id === m.id) + 1
          return (
            <div
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={`match-row${selectedId === m.id ? " active" : ""}`}
              style={{
                padding: "14px 12px", borderBottom: i === filtered.length - 1 ? "none" : "1px solid var(--border)",
                cursor: "pointer", borderRadius: 8,
                background: selectedId === m.id ? "color-mix(in srgb, var(--acc1) 10%, transparent)" : "transparent",
                borderLeft: selectedId === m.id ? "3px solid var(--acc1)" : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <div className="m-title" style={{ fontWeight: 700, color: "var(--ink)", fontSize: 14.5 }}>Match {num} — {m.opponent}</div>
              <div className="m-sub" style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginTop: 4 }}>{m.date} · {m.result}</div>
              <div className="m-tag" style={{ display: "inline-block", marginTop: 6, fontSize: 10, color: "var(--muted-2)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5, textTransform: "uppercase", background: "var(--bg)", padding: "2px 8px", borderRadius: 10, border: "1px solid var(--border)" }}>
                {m.tournament}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
