"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import type { MatchData } from "@/lib/stats"
import { TEAM_NAME, TEAM_ROSTER, ROLES, getPlayerEntriesFromMatches, calcPlayerStats } from "@/lib/stats"
import { TEAM_OF_TOURNAMENT } from "@/lib/team-of-tournament"
import TournamentFilter from "@/components/TournamentFilter"
import { useMatches } from "@/lib/useMatches"

interface BatInn {
  name: string; runs: number; balls: number; sr: string; opponent: string
}
interface BowlInn {
  name: string; wkts: number; runs: number; overs: number; opponent: string
}

const ROLE_CHIP: Record<string, { cls: string }> = {
  Batter: { cls: "bat" },
  Bowler: { cls: "bwl" },
  "All-Rounder": { cls: "ar" },
}

function Board({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) {
  return (
    <div className={`board ${accent}`}>
      <div className="board-title">{title}</div>
      {children}
    </div>
  )
}

function TopRow({ name, value, first, accent }: { name: string; value: string; first?: boolean; accent?: string }) {
  const accentColor = accent === "bwl" ? "var(--acc2)" : "var(--acc1)"
  return (
    <div className="top-row" style={first ? { background: "color-mix(in srgb, var(--acc1) 6%, transparent)", borderRadius: 6, margin: "0 -20px", padding: "7px 20px" } : {}}>
      <div className="tname" style={first ? { fontWeight: 700, color: accentColor } : {}}>{name}</div>
      <div className="tval" style={first ? { color: accentColor, fontWeight: 600 } : {}}>{value}</div>
    </div>
  )
}

export default function SummaryClient() {
  const searchParams = useSearchParams()
  const tournament = searchParams.get("tournament") || undefined
  const { matches, tournaments, isLoading } = useMatches(tournament)
  const [dbRoles, setDbRoles] = useState<Record<string, string>>({})
  const [filter, setFilter] = useState<"all" | "bat" | "bwl">("all")

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

  if (!tournament) {
    return (
      <>
        <TournamentFilter tournaments={tournaments} />
        <div className="card">
          <div className="card-title">Tournament Summary</div>
          <div className="no-data"><h3>Select a tournament from the filter above</h3></div>
        </div>
      </>
    )
  }

  let won = 0, lost = 0
  const battingInns: BatInn[] = []
  const bowlingInns: BowlInn[] = []
  const runTotals: Record<string, number> = {}
  const runInns: Record<string, number> = {}
  const wktTotals: Record<string, number> = {}
  const fiftyCnt: Record<string, number> = {}
  const threeFerCnt: Record<string, number> = {}
  const fiveFerCnt: Record<string, number> = {}
  const threeAndFive: Record<string, { t: number; f: number }> = {}

  for (const m of matches) {
    if (m.result.startsWith(TEAM_NAME)) won++
    else lost++

    for (const inn of m.innings) {
      if (inn.battingTeam === TEAM_NAME) {
        for (const b of inn.batsmen) {
          if (b.dismissal === "dnb") continue
          battingInns.push({ name: b.name, runs: b.runs, balls: b.balls, sr: b.sr, opponent: m.opponent })
          runTotals[b.name] = (runTotals[b.name] || 0) + b.runs
          runInns[b.name] = (runInns[b.name] || 0) + 1
          if (b.runs >= 50) fiftyCnt[b.name] = (fiftyCnt[b.name] || 0) + 1
        }
      }
      if (inn.bowlingTeam === TEAM_NAME) {
        for (const b of inn.bowlers) {
          if (b.wkts === 0) continue
          bowlingInns.push({ name: b.name, wkts: b.wkts, runs: b.runs, overs: b.overs, opponent: m.opponent })
          wktTotals[b.name] = (wktTotals[b.name] || 0) + b.wkts
          if (b.wkts >= 5) {
            fiveFerCnt[b.name] = (fiveFerCnt[b.name] || 0) + 1
          } else if (b.wkts >= 3) {
            threeFerCnt[b.name] = (threeFerCnt[b.name] || 0) + 1
          }
          if (!threeAndFive[b.name]) threeAndFive[b.name] = { t: 0, f: 0 }
          if (b.wkts >= 5) threeAndFive[b.name].f++
          else if (b.wkts >= 3) threeAndFive[b.name].t++
        }
      }
    }
  }

  if (tournament === "Saste Nukers") { won = 4; lost = 6 }

  const total = won + lost
  const winRate = total > 0 ? Math.round((won / total) * 100) : 0
  const wonPct = total > 0 ? (won / total) * 100 : 0

  const topScore = [...battingInns].sort((a, b) => b.runs - a.runs || parseFloat(b.sr) - parseFloat(a.sr)).slice(0, 3)
  const topBowl = [...bowlingInns].sort((a, b) => b.wkts - a.wkts || a.runs - b.runs).slice(0, 3)
  const topRuns = Object.entries(runTotals).map(([name, val]) => ({ name, val, inns: runInns[name] })).sort((a, b) => b.val - a.val).slice(0, 3)
  const topWkts = Object.entries(wktTotals).map(([name, val]) => ({ name, val })).sort((a, b) => b.val - a.val).slice(0, 3)
  const top50 = Object.entries(fiftyCnt).map(([name, val]) => ({ name, val })).sort((a, b) => b.val - a.val)
  const top3f = Object.entries(threeFerCnt).map(([name, val]) => ({ name, val })).sort((a, b) => b.val - a.val)
  const top5f = Object.entries(fiveFerCnt).map(([name, val]) => ({ name, val })).sort((a, b) => b.val - a.val)

  const xi = TEAM_OF_TOURNAMENT[tournament] || []

  const all5fNames = new Set(top5f.map(x => x.name))
  const combinedTF = Object.entries(threeAndFive)
    .map(([name, v]) => ({ name, t: v.t, f: v.f, total: v.t + v.f }))
    .sort((a, b) => b.total - a.total || b.f - a.f)
    .slice(0, 3)

  const filterBtns = [
    { key: "all" as const, label: "All", cls: "all" },
    { key: "bat" as const, label: "Batting", cls: "bat" },
    { key: "bwl" as const, label: "Bowling", cls: "bwl" },
  ]

  return (
    <>
      <TournamentFilter tournaments={tournaments} />
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1.5, color: "var(--muted-2)", textTransform: "uppercase", margin: "26px 0 16px" }}>
        Summary — {tournament}
      </div>

      {tournament === "Markhors" && (
        <div className="r16-banner" style={{
          display: "flex", alignItems: "center", gap: 12,
          background: "var(--card)", border: "1px solid color-mix(in srgb, var(--danger) 35%, var(--border))",
          borderLeft: `3px solid var(--danger)`, borderRadius: 10,
          padding: "14px 18px", marginBottom: 16,
        }}>
          <div style={{ fontSize: 18, lineHeight: 1 }}>🏆</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13.5 }}>Markhors — Knocked out in the Round of 16</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Finished top of the group stage but fell short in the first knockout round.</div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div className="filter-toggle" style={{ display: "inline-flex", gap: 4, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, padding: 3 }}>
          {filterBtns.map(b => (
            <button
              key={b.key}
              onClick={() => setFilter(b.key)}
              className={`filter-btn${filter === b.key ? ` active ${b.cls}` : ""}`}
              style={{
                padding: "8px 18px", fontSize: 12.5, fontWeight: 600, borderRadius: 6,
                border: "none", background: "none", fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                color: filter === b.key ? (b.key === "all" ? "#1C1930" : b.key === "bat" ? "#2A2107" : "#07211C") : "var(--muted)",
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* W/L donut */}
      <div className="wl-layout" style={{ display: "grid", gridTemplateColumns: "230px 1fr", gap: 24, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "22px 26px", alignItems: "center", marginBottom: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 150, height: 150, borderRadius: "50%", position: "relative", background: `conic-gradient(var(--acc2) 0% ${wonPct}%, var(--danger) ${wonPct}% 100%)` }}>
            <div style={{ position: "absolute", inset: 22, background: "var(--card)", borderRadius: "50%", zIndex: 1 }}></div>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, lineHeight: 1 }}>{total}</div>
              <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: 1.5, textTransform: "uppercase" }}>Played</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 18, fontSize: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}><div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--acc2)" }}></div>Won</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}><div style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--danger)" }}></div>Lost</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 24, color: "var(--acc2)" }}>{won}</div>
            <div style={{ fontSize: 9.5, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase", marginTop: 3 }}>Won</div>
          </div>
          <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 24, color: "var(--danger)" }}>{lost}</div>
            <div style={{ fontSize: 9.5, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase", marginTop: 3 }}>Lost</div>
          </div>
          <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 24, color: "var(--ink)" }}>{winRate}%</div>
            <div style={{ fontSize: 9.5, color: "var(--muted)", letterSpacing: 1, textTransform: "uppercase", marginTop: 3 }}>Win rate</div>
          </div>
        </div>
      </div>

      {/* Boards */}
      <div className="board-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {(filter === "all" || filter === "bat") && (
          <Board title="Highest scores" accent="bat">
            {topScore.map((x, i) => (
              <TopRow key={i} name={x.name} value={`${x.runs} (${x.balls}) vs ${x.opponent}`} first={i === 0} accent="bat" />
            ))}
            {topScore.length === 0 && <div style={{ color: "var(--muted-2)", fontSize: 12, padding: "8px 0" }}>No entries</div>}
          </Board>
        )}
        {(filter === "all" || filter === "bwl") && (
          <Board title="Best bowling figures" accent="bwl">
            {topBowl.map((x, i) => (
              <TopRow key={i} name={x.name} value={`${x.wkts}/${x.runs} (${x.overs}ov) vs ${x.opponent}`} first={i === 0} accent="bwl" />
            ))}
            {topBowl.length === 0 && <div style={{ color: "var(--muted-2)", fontSize: 12, padding: "8px 0" }}>No entries</div>}
          </Board>
        )}
        {(filter === "all" || filter === "bat") && (
          <Board title="Most runs" accent="bat">
            {topRuns.map((x, i) => (
              <TopRow key={x.name} name={x.name} value={`${x.val} (${x.inns} inns)`} first={i === 0} accent="bat" />
            ))}
            {topRuns.length === 0 && <div style={{ color: "var(--muted-2)", fontSize: 12, padding: "8px 0" }}>No entries</div>}
          </Board>
        )}
        {(filter === "all" || filter === "bwl") && (
          <Board title="Most wickets" accent="bwl">
            {topWkts.map((x, i) => (
              <TopRow key={x.name} name={x.name} value={`${x.val} wkts`} first={i === 0} accent="bwl" />
            ))}
            {topWkts.length === 0 && <div style={{ color: "var(--muted-2)", fontSize: 12, padding: "8px 0" }}>No entries</div>}
          </Board>
        )}
        {(filter === "all" || filter === "bat") && (
          <Board title="Most 50s" accent="bat">
            {top50.map((x, i) => (
              <TopRow key={x.name} name={x.name} value={String(x.val)} first={i === 0} accent="bat" />
            ))}
            {top50.length === 0 && <div style={{ color: "var(--muted-2)", fontSize: 12, padding: "8px 0" }}>No entries</div>}
          </Board>
        )}
        {(filter === "all" || filter === "bwl") && (
          <Board title="Most 3-fers / 5-fers" accent="bwl">
            {combinedTF.map((x, i) => {
              const parts: string[] = []
              if (x.t > 0) parts.push(`${x.t} three-fers`)
              if (x.f > 0) parts.push(`${x.f} five-fers`)
              return (
                <TopRow key={x.name} name={x.name} value={parts.join(", ")} first={i === 0} accent="bwl" />
              )
            })}
            {combinedTF.length === 0 && <div style={{ color: "var(--muted-2)", fontSize: 12, padding: "8px 0" }}>No entries</div>}
          </Board>
        )}
      </div>

      {/* Team of Tournament */}
      {xi.length > 0 && (
        <div className="tot-table" style={{ marginTop: 22, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 1, color: "var(--acc1)", borderBottom: "1px dashed var(--border)" }}>
            Team of the tournament <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>— click a row</span>
          </div>
          {xi.map((name, i) => {
            const role = dbRoles[name] || ROLES[name] || ""
            const rc = ROLE_CHIP[role]
            const s = calcPlayerStats(name, getPlayerEntriesFromMatches(matches, name), matches, tournament)
            const parts: string[] = []
            if (s.runs > 0) parts.push(`${s.runs} runs`)
            if (s.batAvg !== "0" && s.batAvg !== "-") parts.push(`avg ${s.batAvg}`)
            if (s.wkts > 0) parts.push(`${s.wkts} wkts`)
            if (s.threeWkts > 0) parts.push(`${s.threeWkts} three-fers`)
            if (s.fiveWkts > 0) parts.push(`${s.fiveWkts} five-fers`)
            if (s.mvp > 0) parts.push(`${s.mvp} POTM`)
            const detail = parts.length > 0 ? parts.join(" · ") : "—"
            return (
              <details key={name} className="tot-row" style={{ borderBottom: i === xi.length - 1 ? "none" : "1px solid var(--border)" }}>
                <summary style={{ listStyle: "none", display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", fontSize: 14, cursor: "pointer" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--muted-2)", width: 20, fontWeight: 700 }}>{i + 1}</div>
                  <div style={{ fontWeight: 600, flex: 1 }}>{name}</div>
                  {rc && (
                    <span className={`role-chip ${rc.cls}`} style={{
                      padding: "2px 9px", borderRadius: 14, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                      textTransform: "uppercase",
                      background: rc.cls === "bat" ? "rgba(232,184,75,0.14)" : rc.cls === "bwl" ? "rgba(47,191,159,0.14)" : "rgba(142,134,199,0.16)",
                      color: rc.cls === "bat" ? "var(--acc1)" : rc.cls === "bwl" ? "var(--acc2)" : "var(--ar)",
                      border: `1px solid ${rc.cls === "bat" ? "var(--acc1-dim)" : rc.cls === "bwl" ? "var(--acc2-dim)" : "#4F4A82"}`,
                    }}>{role}</span>
                  )}
                  <span style={{ color: "var(--muted-2)", fontSize: 11 }}>▶</span>
                </summary>
                <div style={{ padding: "0 20px 16px 54px", fontSize: 12.5, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>{detail}</div>
              </details>
            )
          })}
        </div>
      )}
    </>
  )
}
