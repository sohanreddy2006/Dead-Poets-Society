"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import type { MatchData } from "@/lib/stats"
import { TEAM_ROSTER, getPlayerEntriesFromMatches, calcPlayerStats, oversToBalls } from "@/lib/stats"
import TournamentFilter from "@/components/TournamentFilter"
import { useMatches } from "@/lib/useMatches"

const CATEGORIES = [
  { key: "bat", label: "BAT", color: "#E8B84B", bg: "rgba(232,184,75,0.14)", border: "#8A6E2E" },
  { key: "bwl", label: "BWL", color: "#2FBF9F", bg: "rgba(47,191,159,0.14)", border: "#1E7A65" },
  { key: "oth", label: "OTH", color: "#8E86C7", bg: "rgba(142,134,199,0.16)", border: "#4F4A82" },
]

function hasFiveBatInnings(entries: ReturnType<typeof getPlayerEntriesFromMatches>) {
  return entries.filter(e => e.type === "bat" && e.bat?.dismissal !== "dnb").length >= 5
}

function hasThirtyBalls(entries: ReturnType<typeof getPlayerEntriesFromMatches>) {
  const balls = entries.reduce((t, e) => e.type === "bowl" && e.bowl ? t + oversToBalls(e.bowl.overs) : t, 0)
  return balls >= 30
}

const FILL_COLORS = { bat: "var(--acc1)", bwl: "var(--acc2)", oth: "var(--ar)" }

function LeaderboardBoard({
  title,
  data,
  accent,
}: {
  title: string
  data: { name: string; val: number }[]
  accent: "bat" | "bwl" | "oth"
}) {
  const maxVal = data.length > 0 ? Math.max(...data.map(x => x.val)) : 1
  const fillColor = FILL_COLORS[accent]

  return (
    <div className={`lb-board ${accent}`}>
      <div className="lb-title">{title}</div>
      {data.length === 0 && <div style={{ color: "var(--muted-2)", fontSize: 12, padding: "8px 0" }}>No entries</div>}
      {data.slice(0, 6).map((x, i) => {
        const pct = maxVal > 0 ? (x.val / maxVal) * 100 : 0
        return (
          <div key={x.name} className="lb-row">
            <div className={`lb-rank${i === 0 ? " g" : ""}`}>{i + 1}</div>
            <div className="lb-name">{x.name}</div>
            <div className="lb-track"><div className="lb-fill" style={{ width: `${pct}%`, background: fillColor, height: "100%", borderRadius: 3 }}></div></div>
            <div className="lb-val">{x.val % 1 === 0 ? x.val : x.val.toFixed(2)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default function LeaderboardsClient() {
  const searchParams = useSearchParams()
  const tournament = searchParams.get("tournament") || undefined
  const { matches, tournaments } = useMatches(tournament)
  const [activeCats, setActiveCats] = useState<Set<string>>(new Set(["bat", "bwl", "oth"]))

  const stats = useMemo(() =>
    TEAM_ROSTER
      .map(name => {
        const entries = getPlayerEntriesFromMatches(matches, name)
        return { name, entries, s: calcPlayerStats(name, entries, matches, tournament) }
      })
      .filter(x => x.s.matches > 0),
    [matches, tournament]
  )

  const toggleCat = (key: string) => {
    setActiveCats(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        if (next.size === 1) return prev
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const boards: { title: string; data: { name: string; val: number }[]; accent: "bat" | "bwl" | "oth"; cat: string }[] = useMemo(() => {
    const byRuns = [...stats].filter(x => x.s.runs > 0).sort((a, b) => b.s.runs - a.s.runs).map(x => ({ name: x.name, val: x.s.runs }))
    const byWkts = [...stats].filter(x => x.s.wkts > 0).sort((a, b) => b.s.wkts - a.s.wkts).map(x => ({ name: x.name, val: x.s.wkts }))
    const byFifties = [...stats].filter(x => x.s.fifties > 0).sort((a, b) => b.s.fifties - a.s.fifties).map(x => ({ name: x.name, val: x.s.fifties }))
    const byBatAvg = [...stats].filter(x => hasFiveBatInnings(x.entries) && x.s.batAvg !== "0" && x.s.batAvg !== "-")
      .sort((a, b) => { const av = a.s.batAvg === "-" ? -1 : parseFloat(a.s.batAvg); const bv = b.s.batAvg === "-" ? -1 : parseFloat(b.s.batAvg); return bv - av })
      .map(x => ({ name: x.name, val: parseFloat(x.s.batAvg) || 0 }))
    const byBowlAvg = [...stats].filter(x => x.s.wkts >= 5 && x.s.bowlAvg !== "-" && x.s.bowlAvg !== "0" && !isNaN(parseFloat(x.s.bowlAvg)))
      .sort((a, b) => parseFloat(a.s.bowlAvg) - parseFloat(b.s.bowlAvg))
      .map(x => ({ name: x.name, val: parseFloat(x.s.bowlAvg) || 0 }))
    const byEcon = [...stats].filter(x => hasThirtyBalls(x.entries) && x.s.econ !== "0" && parseFloat(x.s.econ) > 0)
      .sort((a, b) => parseFloat(a.s.econ) - parseFloat(b.s.econ))
      .map(x => ({ name: x.name, val: parseFloat(x.s.econ) || 0 }))
    const byBowlSR = [...stats].filter(x => x.s.wkts >= 5 && x.s.bowlSr !== "-" && !isNaN(parseFloat(x.s.bowlSr)))
      .sort((a, b) => parseFloat(a.s.bowlSr) - parseFloat(b.s.bowlSr))
      .map(x => ({ name: x.name, val: parseFloat(x.s.bowlSr) || 0 }))
    const bySR = [...stats].filter(x => x.s.balls >= 30 && x.s.sr !== "0" && parseFloat(x.s.sr) > 0)
      .sort((a, b) => parseFloat(b.s.sr) - parseFloat(a.s.sr))
      .map(x => ({ name: x.name, val: parseFloat(x.s.sr) || 0 }))
    const byMVP = [...stats].filter(x => x.s.mvp > 0).sort((a, b) => b.s.mvp - a.s.mvp).map(x => ({ name: x.name, val: x.s.mvp }))
    const byImpact = [...stats].filter(x => x.s.impact > 0).sort((a, b) => b.s.impact - a.s.impact).map(x => ({ name: x.name, val: x.s.impact }))
    const by3W = [...stats].filter(x => x.s.threeWkts > 0).sort((a, b) => b.s.threeWkts - a.s.threeWkts).map(x => ({ name: x.name, val: x.s.threeWkts }))
    const by5W = [...stats].filter(x => x.s.fiveWkts > 0).sort((a, b) => b.s.fiveWkts - a.s.fiveWkts).map(x => ({ name: x.name, val: x.s.fiveWkts }))

    return [
      { title: "Most Runs", data: byRuns, accent: "bat" as const, cat: "bat" },
      { title: "Best Batting Avg", data: byBatAvg, accent: "bat" as const, cat: "bat" },
      { title: "Best Strike Rate", data: bySR, accent: "bat" as const, cat: "bat" },
      { title: "Most Wickets", data: byWkts, accent: "bwl" as const, cat: "bwl" },
      { title: "Best Bowling Avg", data: byBowlAvg, accent: "bwl" as const, cat: "bwl" },
      { title: "Best Economy", data: byEcon, accent: "bwl" as const, cat: "bwl" },
      { title: "Best Bowling SR", data: byBowlSR, accent: "bwl" as const, cat: "bwl" },
      { title: "Most 3-fers", data: by3W, accent: "bwl" as const, cat: "bwl" },
      { title: "Most 5-fers", data: by5W, accent: "bwl" as const, cat: "bwl" },
      { title: "Most 50s", data: byFifties, accent: "bat" as const, cat: "bat" },
      { title: "Highest Impact", data: byImpact, accent: "oth" as const, cat: "oth" },
      { title: "Most POTM", data: byMVP, accent: "oth" as const, cat: "oth" },
    ]
  }, [stats])

  const visibleBoards = boards.filter(b => activeCats.has(b.cat))

  return (
    <>
      <TournamentFilter tournaments={tournaments} />
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1.5, color: "var(--muted-2)", textTransform: "uppercase", margin: "26px 0 8px" }}>
        Top 6 rankings — batting, bowling & others
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {CATEGORIES.map(c => {
          const on = activeCats.has(c.key)
          return (
            <button
              key={c.key}
              onClick={() => toggleCat(c.key)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 20,
                fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
                textTransform: "uppercase", cursor: "pointer",
                border: on ? `1px solid ${c.border}` : "1px solid var(--border)",
                background: on ? c.bg : "transparent",
                color: on ? c.color : "var(--muted-2)",
                transition: "all 0.15s",
              }}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      <div className="lb-grid">
        {visibleBoards.map(b => (
          <LeaderboardBoard key={b.title} title={b.title} data={b.data} accent={b.accent} />
        ))}
      </div>

      <div className="note" style={{ marginTop: 20, fontSize: 12, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", background: "var(--card)", border: "1px solid var(--border)", borderLeft: "2px solid var(--ar)", borderRadius: 6, padding: "10px 14px" }}>
        Rate qualifications: Bat Avg / SR min 30 balls; Bowling min 30 balls / 5 wkts for Bowl Avg / Bowl SR.
      </div>
    </>
  )
}
