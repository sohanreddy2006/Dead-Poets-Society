"use client"

import { useEffect, useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import type { MatchData } from "@/lib/stats"
import { TEAM_ROSTER, ROLES, getPlayerEntriesFromMatches, calcPlayerStats } from "@/lib/stats"
import TournamentFilter from "@/components/TournamentFilter"
import { useMatches } from "@/lib/useMatches"

const ROLE_MAP: Record<string, { short: string; cls: string; color: string; bg: string; border: string }> = {
  Batter: { short: "BAT", cls: "bat", color: "#E8B84B", bg: "rgba(232,184,75,0.14)", border: "#8A6E2E" },
  Bowler: { short: "BWL", cls: "bwl", color: "#2FBF9F", bg: "rgba(47,191,159,0.14)", border: "#1E7A65" },
  "All-Rounder": { short: "AR", cls: "ar", color: "#8E86C7", bg: "rgba(142,134,199,0.16)", border: "#4F4A82" },
}

const ROLE_KEYS = Object.keys(ROLE_MAP) as (keyof typeof ROLE_MAP)[]

export default function SquadClient() {
  const searchParams = useSearchParams()
  const tournament = searchParams.get("tournament") || undefined
  const { matches, tournaments } = useMatches(tournament)
  const [dbRoles, setDbRoles] = useState<Record<string, string>>({})
  const [activeRoles, setActiveRoles] = useState<Set<string>>(new Set(ROLE_KEYS))

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

  const allStats = useMemo(() =>
    TEAM_ROSTER.map(name => ({
      name,
      role: dbRoles[name] || ROLES[name] || "",
      s: calcPlayerStats(name, getPlayerEntriesFromMatches(matches, name), matches, tournament),
    })),
    [matches, tournament, dbRoles]
  )

  const stats = useMemo(() =>
    activeRoles.size === ROLE_KEYS.length
      ? allStats
      : allStats.filter(x => activeRoles.has(x.role)),
    [allStats, activeRoles]
  )

  const topRuns = Math.max(...stats.map(x => x.s.runs), 0)

  const toggleRole = (key: string) => {
    setActiveRoles(prev => {
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

  const label = tournament ? ` (${tournament})` : " (All Tournaments)"

  return (
    <>
      <TournamentFilter tournaments={tournaments} />
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1.5, color: "var(--muted-2)", textTransform: "uppercase", margin: "26px 0 8px" }}>
        Dead Poets Society — squad ({stats.length} players){label}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {ROLE_KEYS.map(key => {
          const rm = ROLE_MAP[key]
          const on = activeRoles.has(key)
          return (
            <button
              key={key}
              onClick={() => toggleRole(key)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 20,
                fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
                textTransform: "uppercase", cursor: "pointer",
                border: on ? `1px solid ${rm.border}` : `1px solid var(--border)`,
                background: on ? rm.bg : "transparent",
                color: on ? rm.color : "var(--muted-2)",
                transition: "all 0.15s",
              }}
            >
              {rm.short}
            </button>
          )
        })}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="squad-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Runs <span style={{ opacity: 0.4 }}>↕</span></th>
              <th>Bat avg</th>
              <th>SR</th>
              <th>Wkts</th>
              <th>Econ</th>
              <th>Bowl avg</th>
              <th>3-fers</th>
              <th>5-fers</th>
              <th>POTM</th>
              <th>Matches</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(({ name, s }) => {
              const role = dbRoles[name] || ROLES[name] || ""
              const rm = ROLE_MAP[role]
              const isTopRuns = s.runs > 0 && s.runs >= topRuns

              return (
                <tr key={name}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {name}
                      {rm && (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          padding: "2px 9px", borderRadius: 14,
                          fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                          textTransform: "uppercase",
                          background: rm.bg, color: rm.color, border: `1px solid ${rm.border}`,
                        }}>
                          {rm.short}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={isTopRuns ? "top" : ""}>{s.runs || <span className="dash">—</span>}</td>
                  <td>{s.batAvg}</td>
                  <td>{s.sr}</td>
                  <td className="bwl">{s.wkts || <span className="dash">—</span>}</td>
                  <td className="bwl">{s.wkts > 0 ? s.econ : <span className="dash">—</span>}</td>
                  <td className="bwl">{s.wkts >= 5 ? s.bowlAvg : <span className="dash">—</span>}</td>
                  <td>{s.threeWkts || <span className="dash">—</span>}</td>
                  <td>{s.fiveWkts || <span className="dash">—</span>}</td>
                  <td>{s.mvp || <span className="dash">—</span>}</td>
                  <td style={{ color: "var(--muted-2)" }}>{s.matches}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
