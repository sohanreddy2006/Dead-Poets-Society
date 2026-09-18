"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import type { MatchData } from "@/lib/stats"
import TournamentFilter from "@/components/TournamentFilter"
import MatchSelector from "@/components/MatchSelector"
import ScorecardCard from "@/components/ScorecardCard"
import { useMatches } from "@/lib/useMatches"

export default function MatchesClient() {
  const searchParams = useSearchParams()
  const tournament = searchParams.get("tournament") || undefined
  const { matches, tournaments } = useMatches(tournament)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    if (matches.length > 0 && !selectedId) {
      setSelectedId(matches[matches.length - 1].id)
    }
  }, [matches])

  const selectedMatch = selectedId ? matches.find(m => m.id === selectedId) || null : null

  return (
    <>
      <TournamentFilter tournaments={tournaments} />
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1.5, color: "var(--muted-2)", textTransform: "uppercase", margin: "26px 0 8px" }}>
        Match Summary
      </div>

      {matches.length === 0 ? (
        <div className="card">
          <div className="card-title">All Matches</div>
          <div className="no-data"><h3>No matches recorded yet</h3></div>
        </div>
      ) : (
        <div className="layout" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24, marginTop: 0 }}>
          <MatchSelector matches={matches} selectedId={selectedId} onSelect={setSelectedId} />
          <div>
            {selectedMatch ? (
              <ScorecardCard match={selectedMatch} />
            ) : (
              <div className="scorecard" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: "40px 20px", textAlign: "center" }}>
                <div style={{ color: "var(--muted)", fontSize: 14 }}>Select a match from the list</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
