"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import type { PlayerEntry, MatchData } from "@/lib/stats"
import { TEAM_ROSTER, TEAM_NAME, ROLES, calcPlayerStats } from "@/lib/stats"

function highlight(text: string, query: string) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: "var(--acc1)", fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

function getPlayerEntriesFromMatches(matches: MatchData[], name: string): PlayerEntry[] {
  const entries: PlayerEntry[] = []
  for (const m of matches) {
    for (const inn of m.innings) {
      if (inn.battingTeam === TEAM_NAME) {
        const bat = inn.batsmen.find(b => b.name.toLowerCase() === name.toLowerCase())
        if (bat) entries.push({
          type: "bat", matchId: m.id, date: m.date, opponent: m.opponent,
          result: m.result, potm: m.potm,
          bat: { runs: bat.runs, balls: bat.balls, fours: bat.fours, sixes: bat.sixes, dismissal: bat.dismissal, sr: bat.sr },
        })
      }
      if (inn.bowlingTeam === TEAM_NAME) {
        const bowl = inn.bowlers.find(b => b.name.toLowerCase() === name.toLowerCase())
        if (bowl) entries.push({
          type: "bowl", matchId: m.id, date: m.date, opponent: m.opponent,
          result: m.result, potm: m.potm,
          bowl: { overs: bowl.overs, maidens: bowl.maidens, runs: bowl.runs, wkts: bowl.wkts, econ: bowl.econ },
        })
      }
    }
  }
  return entries
}

export default function PlayerSearch({
  matches,
  tournaments,
  tournament,
  autoSelect,
}: {
  matches: MatchData[]
  tournaments: string[]
  tournament?: string
  autoSelect?: string
}) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [dbRoles, setDbRoles] = useState<Record<string, string>>({})
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/players")
      .then(r => r.json())
      .then(data => {
        const map: Record<string, string> = {}
        for (const p of data.players || []) map[p.username] = p.role
        setDbRoles(map)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (autoSelect) {
      setSelectedPlayer(autoSelect)
      setQuery("")
    }
  }, [autoSelect])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowResults(false)
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  const allNames = [...TEAM_ROSTER].sort()
  const filtered = query ? allNames.filter(n => n.toLowerCase().includes(query.toLowerCase())) : []

  function renderPlayer(name: string) {
    setSelectedPlayer(name)
    setShowResults(false)
  }

  const stats = selectedPlayer
    ? calcPlayerStats(selectedPlayer, getPlayerEntriesFromMatches(matches, selectedPlayer), matches, tournament)
    : null
  const entries = selectedPlayer ? getPlayerEntriesFromMatches(matches, selectedPlayer) : []

  const byMatch: Record<number, { bat?: PlayerEntry; bowl?: PlayerEntry }> = {}
  for (const e of entries) {
    if (!byMatch[e.matchId]) byMatch[e.matchId] = {}
    byMatch[e.matchId][e.type] = e
  }
  const matchKeys = Object.keys(byMatch).map(Number).sort((a, b) => a - b)

  // Impact breakdown for donut
  let batScore = 0, bowlScore = 0, mvpScore = 0
  if (stats) {
    const srNum = parseFloat(stats.sr) || 0
    batScore = stats.runs * srNum / 100
    bowlScore = stats.wkts * 25
    mvpScore = stats.mvp * 30
  }
  const totalScore = batScore + bowlScore + mvpScore || 1
  const batPct = (batScore / totalScore * 100).toFixed(0)
  const bowlPct = (bowlScore / totalScore * 100).toFixed(0)
  const mvpPct = (mvpScore / totalScore * 100).toFixed(0)
  const donutGradient = `conic-gradient(var(--acc1) 0% ${batPct}%, var(--acc2) ${batPct}% ${+batPct + +bowlPct}%, var(--ar) ${+batPct + +bowlPct}% 100%)`

  // Form strip — last 6 batting entries sorted by date
  const batEntries = entries.filter(e => e.type === "bat" && e.bat?.dismissal !== "dnb").sort((a, b) => a.matchId - b.matchId)
  const last6 = batEntries.slice(-6)
  const maxRuns = Math.max(...last6.map(e => e.bat?.runs || 0), 1)

  // Match table rows
  const matchRows = matchKeys.map(midx => {
    const m = matches.find(mm => mm.id === midx)
    if (!m) return null
    const bat = byMatch[midx]?.bat
    const bowl = byMatch[midx]?.bowl
    const batDisplay = bat
      ? (bat.bat?.dismissal === "dnb" ? "DNB" : `${bat.bat?.runs} (${bat.bat?.balls})`)
      : "—"
    const bowlDisplay = bowl && bowl.bowl
      ? (bowl.bowl.overs === 0 && bowl.bowl.runs === 0 && bowl.bowl.wkts === 0 ? "DNB" : `${bowl.bowl.wkts}-${bowl.bowl.runs} (${bowl.bowl.overs})`)
      : "—"
    const runs = bat?.bat?.runs || 0
    const trendPct = maxRuns > 0 ? (runs / maxRuns * 100) : 0
    return { midx, m, batDisplay, bowlDisplay, runs, trendPct }
  }).filter(Boolean)

  return (
    <>
      <div className="toolbar" style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <select
          className="select"
          style={{ width: 180, background: "var(--card)", border: "1px solid var(--border)", color: "var(--ink)", padding: "10px 14px", borderRadius: 8, fontSize: 14, outline: "none" }}
          value={tournament || ""}
          onChange={e => {
            const v = e.target.value
            const params = new URLSearchParams(window.location.search)
            if (v) params.set("tournament", v); else params.delete("tournament")
            router.push(`/players?${params.toString()}`, { scroll: false })
          }}
        >
          <option value="">All Tournaments</option>
          {tournaments.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <div ref={ref} className="search" style={{ flex: 1, maxWidth: 340, display: "flex", alignItems: "center", gap: 10, background: "var(--card)", border: "1px solid var(--border)", padding: "10px 14px", borderRadius: 8, position: "relative" }}>
          <input
            placeholder="Search player..."
            value={query}
            onChange={e => { setQuery(e.target.value); setShowResults(true) }}
            onFocus={() => { if (query) setShowResults(true) }}
            onKeyDown={e => {
              if (e.key === "Enter" && query.trim()) {
                const match = allNames.find(n => n.toLowerCase().includes(query.toLowerCase()))
                if (match) renderPlayer(match)
              }
            }}
            style={{ background: "none", border: "none", color: "var(--ink)", outline: "none", flex: 1, fontSize: 14 }}
          />
          {showResults && filtered.length > 0 && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8,
              marginTop: 4, maxHeight: 240, overflowY: "auto", zIndex: 100,
            }}>
              {filtered.map(n => (
                <div key={n} onClick={() => renderPlayer(n)}
                  style={{ padding: "8px 14px", cursor: "pointer", borderBottom: "1px solid var(--border)", fontWeight: 600, fontSize: 13 }}
                >{highlight(n, query)}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedPlayer && stats ? (
        <div className="profile-grid" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20, marginTop: 24 }}>
          {/* SIDEBAR */}
          <div className="side-card" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
            <div className="player-name" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 1 }}>{selectedPlayer}</div>
            {(() => {
              const r = dbRoles[selectedPlayer] || ROLES[selectedPlayer] || ""
              const roleStyle = r === "Bowler"
                ? { color: "#2FBF9F", bg: "rgba(47,191,159,0.14)", border: "#1E7A65" }
                : r === "All-Rounder"
                ? { color: "#8E86C7", bg: "rgba(142,134,199,0.16)", border: "#4F4A82" }
                : { color: "#E8B84B", bg: "rgba(232,184,75,0.14)", border: "#8A6E2E" }
              return (
                <div className="role-pill" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, marginTop: 6,
                  background: roleStyle.bg, color: roleStyle.color, border: `1px solid ${roleStyle.border}`,
                }}>
                  {dbRoles[selectedPlayer] || ROLES[selectedPlayer] || "Player"}
                </div>
              )
            })()}
            <div className="match-count" style={{ color: "var(--muted)", fontSize: 12, marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              {stats.matches} match{stats.matches !== 1 ? "es" : ""} — {stats.innsBat} inns bat, {stats.innsBowl} inns bowl
            </div>

            <div className="donut-wrap" style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 22 }}>
              <div className="donut" style={{ width: 110, height: 110, borderRadius: "50%", position: "relative", flexShrink: 0, background: donutGradient }}>
                <div style={{ position: "absolute", inset: 15, background: "var(--card)", borderRadius: "50%", zIndex: 1 }}></div>
                <div className="donut-center" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                  <div className="donut-num" style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 20 }}>{stats.impact}</div>
                  <div className="donut-label" style={{ fontSize: 8.5, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase" }}>Impact</div>
                </div>
              </div>
              <div className="legend" style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 11.5 }}>
                <div className="legend-row" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div className="legend-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--acc1)", flexShrink: 0 }}></div>Batting
                  <span className="legend-pct" style={{ fontFamily: "'JetBrains Mono', monospace", marginLeft: "auto", color: "var(--muted)", paddingLeft: 14 }}>{batPct}%</span>
                </div>
                <div className="legend-row" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div className="legend-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--acc2)", flexShrink: 0 }}></div>Bowling
                  <span className="legend-pct" style={{ fontFamily: "'JetBrains Mono', monospace", marginLeft: "auto", color: "var(--muted)", paddingLeft: 14 }}>{bowlPct}%</span>
                </div>
                <div className="legend-row" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div className="legend-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ar)", flexShrink: 0 }}></div>POTM
                  <span className="legend-pct" style={{ fontFamily: "'JetBrains Mono', monospace", marginLeft: "auto", color: "var(--muted)", paddingLeft: 14 }}>{mvpPct}%</span>
                </div>
              </div>
            </div>

            <div className="form-strip" style={{ marginTop: 24 }}>
              <div className="form-title" style={{ fontSize: 10, letterSpacing: 1.5, color: "var(--muted-2)", textTransform: "uppercase", marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>Runs — last {last6.length}</div>
              <div className="form-bars" style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 64 }}>
                {last6.length === 0 && <div style={{ color: "var(--muted-2)", fontSize: 11 }}>No batting data</div>}
                {last6.map((e, i) => {
                  const r = e.bat?.runs || 0
                  const ht = maxRuns > 0 ? (r / maxRuns * 58) : 0
                  const isBest = r === maxRuns && r > 0
                  return (
                    <div key={i} className="form-bar-col" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
                      <div className={`form-val-mini${r === 0 ? " zero" : ""}`} style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: r === 0 ? "var(--muted-2)" : isBest ? "var(--acc2)" : "var(--acc1)", marginBottom: 3 }}>{r}</div>
                      <div className={`form-bar${isBest ? " best" : ""}${r === 0 ? " zero" : ""}`} style={{ width: "100%", borderRadius: "3px 3px 0 0", background: r === 0 ? "var(--muted-2)" : isBest ? "var(--acc2)" : "var(--acc1)", height: r === 0 ? 3 : Math.max(ht, 4) }}></div>
                      <div className="form-date" style={{ fontSize: 8, color: "var(--muted-2)", marginTop: 5, fontFamily: "'JetBrains Mono', monospace", textAlign: "center" }}>{e.date.slice(5)}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* MAIN COLUMN */}
          <div>
            <div className="sg">
              <div className="sc bat"><div className="v">{stats.runs}</div><div className="l">Runs</div></div>
              <div className="sc bat"><div className="v">{stats.balls}</div><div className="l">Balls</div></div>
              <div className="sc bat"><div className="v">{stats.batAvg}</div><div className="l">Bat avg</div></div>
              <div className="sc bat"><div className="v">{stats.sr}</div><div className="l">SR</div></div>
              <div className="sc bwl"><div className="v">{stats.wkts}</div><div className="l">Wickets</div></div>
              <div className="sc bwl"><div className="v">{stats.overs.toFixed(1)}</div><div className="l">Overs</div></div>
              <div className="sc bwl"><div className="v">{stats.econ}</div><div className="l">Economy</div></div>
              <div className="sc bwl"><div className="v">{stats.bowlAvg}</div><div className="l">Bowl avg</div></div>
              <div className="sc mvp"><div className="v">{stats.threeWkts}</div><div className="l">3-fers</div></div>
              <div className="sc mvp"><div className="v">{stats.fiveWkts}</div><div className="l">5-fers</div></div>
              <div className="sc mvp"><div className="v">{stats.mvp}</div><div className="l">POTM</div></div>
              <div className="sc mvp"><div className="v">{stats.impact}</div><div className="l">Impact</div></div>
            </div>
          </div>

          {/* HEATMAP — full width */}
          <div style={{ gridColumn: "1 / -1" }}>
            <div className="section-tag" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: 1.5, color: "var(--acc1)", textTransform: "uppercase", margin: "30px 0 10px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 14, height: 1, background: "var(--acc1)" }}></span>Season activity
            </div>
            <div className="heat-card" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "28px 32px" }}>
              <div className="heat-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div className="heat-month" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, color: "var(--acc1)" }}>JULY 2026</div>
                <div className="heat-legend" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                  Less<div style={{ width: 16, height: 16, borderRadius: 4, background: "var(--border)" }}></div>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: "color-mix(in srgb, var(--acc1) 25%, var(--border))" }}></div>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: "color-mix(in srgb, var(--acc1) 45%, var(--border))" }}></div>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: "color-mix(in srgb, var(--acc1) 70%, var(--border))" }}></div>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: "var(--acc1)", boxShadow: "0 0 8px color-mix(in srgb, var(--acc1) 55%, transparent)" }}></div>More
                </div>
              </div>
              <div className="heat-body" style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                <CalendarHeatmap matches={matches} matchKeys={matchKeys} byMatch={byMatch} maxRuns={maxRuns} />
                <div className="heat-side" style={{ flex: 1, minWidth: 220 }}>
                  {matchKeys.slice(-6).reverse().map(midx => {
                    const m = matches.find(mm => mm.id === midx)
                    const bat = byMatch[midx]?.bat
                    const bowl = byMatch[midx]?.bowl
                    if (!m) return null
                    const batRuns = bat?.bat?.runs
                    const bowlFig = bowl?.bowl ? `${bowl.bowl.wkts}-${bowl.bowl.runs}` : null
                    const runs = bat?.bat?.runs ?? 0
                    const intensity = maxRuns > 0 ? (runs / maxRuns) : 0
                    const bg = intensity === 0 ? "color-mix(in srgb, var(--acc1) 25%, var(--border))"
                      : intensity >= 0.8 ? "var(--acc1)"
                      : intensity >= 0.5 ? "color-mix(in srgb, var(--acc1) 70%, var(--border))"
                      : "color-mix(in srgb, var(--acc1) 45%, var(--border))"
                    return (
                      <div key={midx} className="heat-key-item" style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "var(--muted)", padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ width: 12, height: 12, borderRadius: 4, background: bg, flexShrink: 0 }}></div>
                        <b style={{ color: "var(--ink)" }}>{m.date}</b> — {m.opponent}, {batRuns != null ? `${batRuns}${bowlFig ? ` & ${bowlFig}` : ""}` : bowlFig || "—"}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* MATCH TABLE — full width */}
          <div style={{ gridColumn: "1 / -1" }}>
            <div className="section-tag" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: 1.5, color: "var(--acc1)", textTransform: "uppercase", margin: "30px 0 10px", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 14, height: 1, background: "var(--acc1)" }}></span>Match by match
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "28px 32px" }}>
              <table>
                <thead>
                  <tr><th>Date</th><th>Opponent</th><th>Batting</th><th>Bowling</th><th>Trend (runs)</th></tr>
                </thead>
                <tbody>
                  {matchRows.map(r => r && (
                    <tr key={r.midx}>
                      <td className="mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{r.m.date}</td>
                      <td>{r.m.opponent}</td>
                      <td className="mono" style={{ color: "var(--acc1)" }}>{r.batDisplay}</td>
                      <td className="mono" style={{ color: "var(--acc2)" }}>{r.bowlDisplay}</td>
                      <td>
                        <div className="trend-track" style={{ width: 120, height: 9, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                          <div className={`trend-fill${r.trendPct === 0 ? " zero" : ""}${r.trendPct >= 80 ? " best" : ""}`} style={{ height: "100%", borderRadius: 3, background: r.trendPct >= 80 ? "var(--acc2)" : r.trendPct === 0 ? "var(--muted-2)" : "var(--acc1)", width: r.trendPct === 0 ? 2 : Math.max(r.trendPct, 4) }}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-title">Player Profile</div>
          <div className="no-data"><h3>Search for a player to view their stats</h3></div>
        </div>
      )}
    </>
  )
}

function CalendarHeatmap({ matches, matchKeys, byMatch, maxRuns }: {
  matches: MatchData[]
  matchKeys: number[]
  byMatch: Record<number, { bat?: PlayerEntry; bowl?: PlayerEntry }>
  maxRuns: number
}) {
  // July 2026: July 1, 2026 is Wednesday
  // Build cells: 5 weeks x 7 days
  const cells: { day: number; matchId?: number; intensity: number }[] = []
  const firstDay = new Date(2026, 6, 1).getDay() // 0=Sun, 3=Wed
  for (let d = 1; d <= 31; d++) {
    const dateStr = `2026-07-${d < 10 ? "0" : ""}${d}`
    const m = matches.find(mm => {
      if (!byMatch[mm.id]) return false
      return mm.date === dateStr
    })
    const runs = m && byMatch[m.id]?.bat?.bat?.runs || 0
    const intensity = maxRuns > 0 ? runs / maxRuns : 0
    cells.push({ day: d, matchId: m?.id, intensity })
  }

  const wd = ["S", "M", "T", "W", "T", "F", "S"]

  return (
    <div className="heat-cal" style={{ display: "grid", gridTemplateColumns: "repeat(7, 44px)", gridAutoRows: 44, gap: 8 }}>
      {wd.map((d, i) => <div key={`wd-${i}`} className="heat-wd" style={{ fontSize: 10, color: "var(--muted-2)", textAlign: "center", letterSpacing: 1, fontFamily: "'JetBrains Mono', monospace", alignSelf: "center" }}>{d}</div>)}
      {Array.from({ length: firstDay }).map((_, i) => <div key={`blank-${i}`} style={{ background: "transparent" }}></div>)}
      {cells.map(c => {
        let bg = "var(--border)"
        if (c.intensity > 0 && c.intensity <= 0.25) bg = "color-mix(in srgb, var(--acc1) 25%, var(--border))"
        else if (c.intensity > 0.25 && c.intensity <= 0.5) bg = "color-mix(in srgb, var(--acc1) 45%, var(--border))"
        else if (c.intensity > 0.5 && c.intensity < 1) bg = "color-mix(in srgb, var(--acc1) 70%, var(--border))"
        else if (c.intensity >= 1) bg = "var(--acc1)"
        return (
          <div key={c.day} className="heat-cell" style={{ width: 44, height: 44, borderRadius: 8, background: bg, position: "relative" }}>
            <div className="heat-day" style={{ position: "absolute", bottom: 4, right: 5, fontSize: 9, color: c.intensity > 0 ? "rgba(0,0,0,.45)" : "var(--muted-2)", fontFamily: "'JetBrains Mono', monospace" }}>{c.day}</div>
          </div>
        )
      })}
    </div>
  )
}
