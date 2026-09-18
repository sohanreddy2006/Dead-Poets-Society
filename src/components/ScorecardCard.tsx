import type { MatchData } from "@/lib/stats"

export default function ScorecardCard({ match }: { match: MatchData }) {
  return (
    <div className="scorecard" style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
      <div className="sc-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "26px 32px", borderBottom: "1px dashed var(--border)" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "var(--acc1)", letterSpacing: 1 }}>
          {match.matchNumber ? `Match ${match.matchNumber} — ` : ""}{match.opponent}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1 }}>
          {match.venue}
        </div>
      </div>

      {match.innings.map((inn, i) => (
        <div key={i} className="innings" style={{ padding: "26px 32px", borderTop: i > 0 ? "1px dashed var(--border)" : "none" }}>
          <div className="innings-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
            <div className="team-tag" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 1, color: "var(--ink)", display: "flex", alignItems: "center", gap: 10 }}>
              {inn.battingTeam}
            </div>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: "var(--acc1)" }}>{inn.total || "—"}</span>
              {inn.overs && <span style={{ color: "var(--muted)", fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace", marginLeft: 6 }}>({inn.overs} ov)</span>}
            </div>
          </div>

          <div className="cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <div>
              <div className="col-title" style={{ fontSize: 10.5, letterSpacing: 1.5, color: "var(--muted-2)", textTransform: "uppercase", marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>Batting</div>
              {inn.batsmen.map((b, bi) => {
                const isPOTM = b.name === match.potm
                const dnb = b.dismissal === "dnb"
                return (
                  <div key={bi} className={`p-row${isPOTM ? " mvp" : ""}${dnb ? " dnb" : ""}`} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 14, borderBottom: "1px solid var(--border)" }}>
                    <span className="pname" style={{ color: dnb ? "var(--muted-2)" : "var(--ink)", fontStyle: dnb ? "italic" : "normal", position: "relative" }}>
                      {b.name}
                      {isPOTM && <span style={{ color: "var(--acc1)", marginLeft: 7, fontSize: 12 }}>★</span>}
                    </span>
                    <span className="pval" style={{ color: dnb ? "var(--muted-2)" : "var(--acc1)", fontFamily: "'JetBrains Mono', monospace", fontVariantNumeric: "tabular-nums", fontStyle: dnb ? "italic" : "normal" }}>
                      {dnb ? "DNB" : `${b.runs} (${b.balls})`}
                    </span>
                  </div>
                )
              })}
            </div>
            <div>
              <div className="col-title" style={{ fontSize: 10.5, letterSpacing: 1.5, color: "var(--muted-2)", textTransform: "uppercase", marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>Bowling</div>
              {inn.bowlers.map((b, bi) => {
                const isPOTM = b.name === match.potm
                const dnb = b.overs === 0 && b.runs === 0 && b.wkts === 0
                return (
                  <div key={bi} className={`p-row${isPOTM ? " mvp" : ""}${dnb ? " dnb" : ""}`} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 14, borderBottom: "1px solid var(--border)" }}>
                    <span className="pname" style={{ color: dnb ? "var(--muted-2)" : "var(--ink)", fontStyle: dnb ? "italic" : "normal", position: "relative" }}>
                      {b.name}
                      {isPOTM && <span style={{ color: "var(--acc1)", marginLeft: 7, fontSize: 12 }}>★</span>}
                    </span>
                    <span className="pval" style={{ color: dnb ? "var(--muted-2)" : "var(--acc2)", fontFamily: "'JetBrains Mono', monospace", fontVariantNumeric: "tabular-nums", fontStyle: dnb ? "italic" : "normal" }}>
                      {dnb ? "DNB" : `${b.wkts}-${b.runs} (${b.overs})`}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}

      <div className="result-banner" style={{ padding: "28px 32px", textAlign: "center", background: "linear-gradient(180deg, color-mix(in srgb, var(--acc1) 12%, transparent), color-mix(in srgb, var(--acc1) 2%, transparent))", borderTop: "1px solid var(--acc1-dim)" }}>
        <div className="result-text" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 1, color: "var(--acc1)", textShadow: "0 0 20px color-mix(in srgb, var(--acc1) 35%, transparent)" }}>
          {match.result}
        </div>
        <div className="mvp-line" style={{ marginTop: 10, fontSize: 13.5, color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace" }}>
          Player of the match — <span style={{ color: "var(--ink)", fontWeight: 600 }}>{match.potm}</span>
        </div>
      </div>
    </div>
  )
}
