"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import type { MatchData } from "@/lib/stats"
import { TEAM_ROSTER, getPlayerEntriesFromMatches, calcPlayerStats } from "@/lib/stats"
import { useMatches } from "@/lib/useMatches"

const CHIP_COLORS = ["#E8B84B", "#2FBF9F", "#8E86C7"]
const CHIP_BG = [
  "rgba(232,184,75,0.20)",
  "rgba(47,191,159,0.20)",
  "rgba(142,134,199,0.22)",
]
const CHIP_BORDER = ["#8A6E2E", "#1E7A65", "#4F4A82"]

const STAT_ROWS: { key: string; label: string; higherBetter: boolean }[] = [
  { key: "runs", label: "Runs", higherBetter: true },
  { key: "batAvg", label: "Bat Avg", higherBetter: true },
  { key: "sr", label: "SR", higherBetter: true },
  { key: "wkts", label: "Wkts", higherBetter: true },
  { key: "econ", label: "Econ", higherBetter: false },
  { key: "bowlAvg", label: "Bowl Avg", higherBetter: false },
  { key: "bowlSr", label: "Bowl SR", higherBetter: false },
  { key: "threeWkts", label: "3-fers", higherBetter: true },
  { key: "fiveWkts", label: "5-fers", higherBetter: true },
  { key: "mvp", label: "POTM", higherBetter: true },
  { key: "impact", label: "Impact", higherBetter: true },
]

// Radar chart axes — pentagon with top vertex
const AXES = [
  { key: "runs", label: "Runs", cx: 150, cy: 40 },
  { key: "sr", label: "SR", cx: 254.6, cy: 116.0 },
  { key: "wkts", label: "Wkts", cx: 214.7, cy: 239.0 },
  { key: "impact", label: "Impact", cx: 85.3, cy: 239.0 },
  { key: "econ", label: "Econ", cx: 45.4, cy: 116.0 },
]
const CENTER = { x: 150, y: 150 }

interface Chip {
  name: string
  tournament?: string
  key: string
}

function chipKey(name: string, tournament?: string) {
  return tournament ? `${name}@${tournament}` : name
}

function parseChip(s: string): Chip {
  const at = s.lastIndexOf("@")
  if (at > 0) return { name: s.slice(0, at), tournament: s.slice(at + 1), key: s }
  return { name: s, key: s }
}

function getStatValue(s: Record<string, string | number>, key: string): number {
  const v = s[key]
  if (typeof v === "string") return parseFloat(v) || 0
  return v as number
}

export default function CompareClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const globalTournament = searchParams.get("tournament") || undefined
  const initialChips: Chip[] = (searchParams.get("players")?.split(",").filter(Boolean) || []).map(parseChip)

  const { matches, matchesAll, tournaments } = useMatches(globalTournament)
  const [chips, setChips] = useState<Chip[]>(initialChips)
  const [query, setQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowResults(false)
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const syncUrl = useCallback((c: Chip[]) => {
    const params = new URLSearchParams()
    if (globalTournament) params.set("tournament", globalTournament)
    if (c.length > 0) params.set("players", c.map(x => x.key).join(","))
    router.replace(`/compare?${params.toString()}`, { scroll: false })
  }, [globalTournament, router])

  const addChip = (name: string, t?: string) => {
    const k = chipKey(name, t)
    if (!chips.some(c => c.key === k)) {
      const next = [...chips, { name, tournament: t, key: k }]
      setChips(next)
      syncUrl(next)
    }
    setQuery("")
    setShowResults(false)
  }

  const removeChip = (key: string) => {
    const next = chips.filter(c => c.key !== key)
    setChips(next)
    syncUrl(next)
  }

  const allNames = [...TEAM_ROSTER].sort()
  const filtered = query ? allNames.filter(n => n.toLowerCase().includes(query.toLowerCase())) : []

  const stats = chips.map(c => ({
    label: c.tournament ? `${c.name} (${c.tournament})` : `${c.name} (combined)`,
    key: c.key,
    s: calcPlayerStats(c.name, getPlayerEntriesFromMatches(c.tournament ? matchesAll.filter(m => m.tournament === c.tournament) : matches, c.name), c.tournament ? matchesAll.filter(m => m.tournament === c.tournament) : matches, c.tournament || globalTournament),
  }))

  // Radar chart polygon data
  const radarData = stats.map(({ s }) => {
    return AXES.map(a => {
      const raw = getStatValue(s, a.key)
      return raw
    })
  })

  // Normalize each axis across players
  const axisMax = AXES.map(a => {
    const vals = stats.map(s => getStatValue(s.s, a.key))
    const max = Math.max(...vals, 1)
    return { ...a, max }
  })

  // Build polygon points for each player
  const radarPolys = stats.map((_, pi) => {
    return AXES.map((a, ai) => {
      const raw = getStatValue(stats[pi].s, a.key)
      const max = axisMax[ai].max
      // For econ, lower is better — invert
      let ratio = a.key === "econ" ? (max - raw) / max : raw / max
      ratio = Math.max(0, Math.min(1, ratio))
      const dx = a.cx - CENTER.x
      const dy = a.cy - CENTER.y
      return {
        x: CENTER.x + dx * ratio,
        y: CENTER.y + dy * ratio,
      }
    })
  })

  const polyPoints = radarPolys.map(pts => pts.map(p => `${p.x},${p.y}`).join(" "))

  function highlight(text: string, query: string) {
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ color: "var(--gold)", fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 40px" }}>
      <div style={{ display: "flex", gap: 16, marginTop: 24, alignItems: "center" }}>
        <select
          className="select"
          style={{ width: 180, background: "var(--card)", border: "1px solid var(--border)", color: "var(--ink)", padding: "10px 14px", borderRadius: 8, fontSize: 14, outline: "none" }}
          value={globalTournament || ""}
          onChange={e => {
            const v = e.target.value
            const params = new URLSearchParams(window.location.search)
            if (v) params.set("tournament", v); else params.delete("tournament")
            router.push(`/compare?${params.toString()}`, { scroll: false })
          }}
        >
          <option value="">All Tournaments</option>
          {tournaments.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1.5, color: "var(--muted-2)", textTransform: "uppercase", margin: "26px 0 8px" }}>Compare players</div>

      <div ref={ref} className="search" style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--card)", border: "1px solid var(--border)", padding: "10px 14px", borderRadius: 8, position: "relative" }}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--muted-2)", flexShrink: 0 }}>
          <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
        </svg>
        <input
          placeholder="Search for a player..."
          value={query}
          onChange={e => { setQuery(e.target.value); setShowResults(true) }}
          onFocus={() => { if (query) setShowResults(true) }}
          onKeyDown={e => {
            if (e.key === "Enter" && query.trim()) {
              const match = allNames.find(n => n.toLowerCase().includes(query.toLowerCase()))
              if (match) {
                if (globalTournament) addChip(match, globalTournament)
                else addChip(match, tournaments[0] || "")
              }
            }
          }}
          style={{ background: "none", border: "none", color: "var(--ink)", outline: "none", flex: 1, fontSize: 14 }}
        />
        {showResults && filtered.length > 0 && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8,
            marginTop: 4, maxHeight: 300, overflowY: "auto", zIndex: 100,
          }}>
            {filtered.map(n => {
              const usedTournaments = chips.filter(c => c.name === n).map(c => c.tournament).filter(Boolean)
              const avail = tournaments.filter(t => !usedTournaments.includes(t))
              return (
                <div key={n} style={{ padding: "8px 14px", borderBottom: "1px solid var(--border)" }}>
                  <div
                    onClick={() => {
                      if (globalTournament) { addChip(n, globalTournament) }
                      else if (avail.length === 1) { addChip(n, avail[0]) }
                      else if (avail.length === 0 && !chips.some(c => c.name === n && !c.tournament)) { addChip(n) }
                    }}
                    style={{ fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: avail.length > 1 && !globalTournament ? 4 : 0 }}
                  >
                    {highlight(n, query)}
                  </div>
                  {!globalTournament && (
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", paddingLeft: 4, marginTop: 4 }}>
                      {!chips.some(c => c.name === n && !c.tournament) && (
                        <span onClick={() => addChip(n)}
                          style={{ fontSize: 11, color: "var(--ink)", cursor: "pointer", padding: "1px 6px", borderRadius: 8, background: "var(--bg)", border: "1px solid var(--border)" }}>
                          All tournaments
                        </span>
                      )}
                      {avail.map(t => (
                        <span key={t} onClick={() => addChip(n, t)}
                          style={{ fontSize: 11, color: "var(--muted)", cursor: "pointer", padding: "1px 6px", borderRadius: 8, background: "var(--bg)", border: "1px solid var(--border)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {chips.length > 0 && (
        <div className="chips" style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {chips.map((c, i) => {
            const ci = i % CHIP_COLORS.length
            return (
              <div key={c.key} className="chip" style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: CHIP_BG[ci], color: CHIP_COLORS[ci], border: `1px solid ${CHIP_BORDER[ci]}` }}>
                {c.tournament ? `${c.name} (${c.tournament})` : `${c.name} (combined)`}
                <span className="x" onClick={() => removeChip(c.key)} style={{ opacity: 0.6, cursor: "pointer" }}>✕</span>
              </div>
            )
          })}
        </div>
      )}

      {stats.length >= 2 && (
        <>
          <div className="radar-wrap" style={{ display: "flex", justifyContent: "center", margin: "24px 0 8px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
            <svg viewBox="0 0 300 260" width="360" height="312">
              <g stroke="#2A3A32" strokeWidth="1.5" fill="none">
                <polygon points="150,40 254.6,116.0 214.7,239.0 85.3,239.0 45.4,116.0" stroke="#3A4A42"/>
                <polygon points="150,95 202.3,113 197.35,169.5 102.65,169.5 97.7,113" stroke="#2A3A32"/>
              </g>
              <g stroke="#2A3A32" strokeWidth="1">
                {AXES.map(a => <line key={a.key} x1={CENTER.x} y1={CENTER.y} x2={a.cx} y2={a.cy}/>)}
              </g>
              {radarPolys.map((pts, i) => {
                const ci = i % CHIP_COLORS.length
                const points = pts.map(p => `${p.x},${p.y}`).join(" ")
                return (
                  <g key={i}>
                    <polygon points={points} fill={CHIP_BG[ci]} stroke={CHIP_COLORS[ci]} strokeWidth="3" strokeLinejoin="round"/>
                  </g>
                )
              })}
              {radarPolys.map((pts, i) => {
                const ci = i % CHIP_COLORS.length
                return pts.map((p, pi) => (
                  <circle key={`${i}-${pi}`} cx={p.x} cy={p.y} r="4" fill={CHIP_COLORS[ci]} stroke="var(--card)" strokeWidth="2"/>
                ))
              })}
              <g fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" fill="var(--muted)" textAnchor="middle">
                {AXES.map(a => (
                  <text key={a.key} x={a.cx} y={a.cy + (a.key === "runs" ? -12 : a.key === "wkts" || a.key === "impact" ? 18 : 5)}>
                    {a.label}
                  </text>
                ))}
              </g>
            </svg>
          </div>
          <div className="legend" style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 4, marginBottom: 16, fontSize: 12 }}>
            {stats.map((s, i) => {
              const ci = i % CHIP_COLORS.length
              return (
                <div key={s.key} className="legend-item" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: CHIP_COLORS[ci], boxShadow: `0 0 6px ${CHIP_COLORS[ci]}` }}></div>
                  <span style={{ color: CHIP_COLORS[ci], fontWeight: 600 }}>{s.label}</span>
                </div>
              )
            })}
          </div>

          <table>
            <thead>
              <tr>
                <th style={{ textAlign: "left", fontSize: 10.5, letterSpacing: 0.8, color: "var(--muted-2)", textTransform: "uppercase", padding: 10, fontFamily: "'JetBrains Mono', monospace", borderBottom: "1px dashed var(--border)" }}>Stat</th>
                {stats.map((s, i) => {
                  const ci = i % CHIP_COLORS.length
                  return (
                    <th key={s.key} style={{ textAlign: "right", fontSize: 10.5, letterSpacing: 0.8, textTransform: "uppercase", padding: 10, fontFamily: "'JetBrains Mono', monospace", borderBottom: "1px dashed var(--border)", color: CHIP_COLORS[ci], fontWeight: 700 }}>{s.label}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {STAT_ROWS.map(({ key, label, higherBetter }) => {
                const values = stats.map(s => getStatValue(s.s, key))
                const bestVal = higherBetter ? Math.max(...values) : Math.min(...values)
                const isDecimal = key === "batAvg" || key === "sr" || key === "econ" || key === "bowlAvg" || key === "bowlSr"

                return (
                  <tr key={key}>
                    <td style={{ padding: 10, textAlign: "left", fontWeight: 600, color: "var(--ink)", borderBottom: "1px solid var(--border)" }}>{label}</td>
                    {stats.map(({ key: k, s }) => {
                      const raw = s[key as keyof typeof s]
                      const display = isDecimal ? raw : String(raw)
                      const val = getStatValue(s, key)
                      const isBest = val === bestVal
                      return (
                        <td key={k}
                          style={{
                            padding: 10, textAlign: "right", borderBottom: "1px solid var(--border)",
                            fontFamily: "'JetBrains Mono', monospace", fontVariantNumeric: "tabular-nums",
                            color: isBest ? "#E8B84B" : "var(--muted)",
                            fontWeight: isBest ? 700 : 400,
                            background: isBest ? "rgba(232,184,75,0.08)" : "transparent",
                            borderRadius: isBest ? 6 : 0,
                          }}
                        >{display}</td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}

      {stats.length < 2 && (
        <div className="card" style={{ marginTop: 24 }}>
          <div className="card-title">Compare</div>
          <div className="no-data"><h3>Add at least 2 players to compare</h3></div>
        </div>
      )}
    </div>
  )
}
