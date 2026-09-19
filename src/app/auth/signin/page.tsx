"use client"

import { Suspense, useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

const ROSTER_SIZE = 25

function SignInForm() {
  const sp = useSearchParams()
  const error = sp.get("error")
  const cb = sp.get("callbackUrl") || "/players"

  const [preview, setPreview] = useState<{ topRuns: { name: string; runs: number }[]; matches: number; tournaments: number } | null>(null)

  useEffect(() => {
    fetch("/api/data/export")
      .then(r => r.json())
      .then(data => {
        const matches = data.matches ?? []
        const roster = new Set(["kdb177","arjsoh","mick_056","nick01311","xtzgamer24","xenomphanes","sujay","zenixyt77","og1lucky","emilylei981","light_6921","1blonde","shyam.ly","khushal0__0","nervous_pizza1078","vs_reddy12","isagi_17","milkshaikh0292","vishwamispro0556","rooniyck","18bat","chaosbyme","deep.","naatilevade","johtooooo"])
        const batTotals: Record<string, number> = {}
        const tournamentSet = new Set<string>()
        for (const m of matches) {
          if (m.tournament) tournamentSet.add(m.tournament)
          for (const inn of m.innings ?? []) {
            for (const b of inn.batsmen ?? []) {
              batTotals[b.name] = (batTotals[b.name] || 0) + b.runs
            }
            for (const b of inn.bowlers ?? []) {
            }
          }
        }
        const topRuns = Object.entries(batTotals)
          .filter(([name]) => roster.has(name))
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([name, runs]) => ({ name, runs }))
        setPreview({ topRuns, matches: matches.length, tournaments: tournamentSet.size })
      })
      .catch(() => {})
  }, [])

  const handleCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    await signIn("credentials", {
      username: fd.get("username") as string,
      password: fd.get("password") as string,
      callbackUrl: cb,
    })
  }

  return (
    <>
      <div className="auth-header">
        <h1 className="auth-team-name">Dead Poets Society</h1>
        <div className="auth-tournament-tag">Tournament — Markhors</div>
      </div>

      <div className="auth-hero">
        <div className="auth-pitch">
          <h2>Every innings.<br />Every wicket.<br /><span>Tracked.</span></h2>
          <div className="auth-pitch-sub">&ldquo;Carpe Diem&rdquo; — sign in and see where you stand.</div>

          <div className="auth-preview-card">
            <div className="auth-preview-title">Most runs — live leaderboard</div>
            {(preview?.topRuns ?? []).map((p, i) => (
              <div key={p.name} className="auth-preview-row">
                <div className="auth-pname"><div className={`auth-preview-medal${i > 0 ? " auth-medal-muted" : ""}`}>{i + 1}</div>{p.name}</div>
                <div className={`auth-preview-val${i > 0 ? " auth-val-muted" : ""}`}>{p.runs}</div>
              </div>
            ))}
            {!preview && <div style={{ color: "var(--muted-2)", fontSize: 12, padding: "8px 0" }}>Loading…</div>}
          </div>

          <div className="auth-stat-strip">
            <div className="auth-stat-item"><div className="auth-stat-num">{preview?.matches ?? "—"}</div><div className="auth-stat-lab">Matches</div></div>
            <div className="auth-stat-item"><div className="auth-stat-num">{ROSTER_SIZE}</div><div className="auth-stat-lab">Players</div></div>
            <div className="auth-stat-item"><div className="auth-stat-num">{preview?.tournaments ?? "—"}</div><div className="auth-stat-lab">Tournaments</div></div>
          </div>
        </div>

        <div className="auth-card">
          <h1 className="auth-welcome">Welcome,</h1>
          <div className="auth-subtext">sign in to continue</div>

          {error === "CredentialsSignin" && (
            <div className="auth-error">Invalid username or password</div>
          )}

          <form onSubmit={handleCredentials}>
            <div className="auth-field-wrap">
              <input name="username" placeholder="Discord username" />
            </div>
            <div className="auth-field-wrap">
              <input name="password" type="password" placeholder="Password" />
            </div>

            <button type="submit" className="auth-go-btn">
              Let&rsquo;s go
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="auth-footer">DEAD POETS SOCIETY · CRICKET SCORECARD TRACKER · v1.0.0</div>
    </>
  )
}

export default function SignInPage() {
  return (
    <div className="auth-page">
      <div className="auth-glow"></div>
      <svg className="auth-wagon auth-wagon-left" viewBox="0 0 900 420"><g stroke="#E8B84B" strokeWidth="1" fill="none">
        <circle cx="450" cy="420" r="380" opacity="0.4"/><circle cx="450" cy="420" r="260" opacity="0.4"/><circle cx="450" cy="420" r="140" opacity="0.4"/>
        <line x1="450" y1="420" x2="90" y2="120" opacity="0.45"/><line x1="450" y1="420" x2="250" y2="40" opacity="0.45"/><line x1="450" y1="420" x2="450" y2="10" opacity="0.45"/><line x1="450" y1="420" x2="650" y2="40" opacity="0.45"/><line x1="450" y1="420" x2="810" y2="120" opacity="0.45"/>
      </g></svg>
      <svg className="auth-wagon auth-wagon-right" viewBox="0 0 900 420"><g stroke="#2FBF9F" strokeWidth="1" fill="none">
        <circle cx="450" cy="420" r="380" opacity="0.4"/><circle cx="450" cy="420" r="260" opacity="0.4"/>
        <line x1="450" y1="420" x2="90" y2="120" opacity="0.45"/><line x1="450" y1="420" x2="450" y2="10" opacity="0.45"/><line x1="450" y1="420" x2="810" y2="120" opacity="0.45"/>
      </g></svg>

      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>

      <style>{`
        .auth-page {
          --bg:#0B1512; --card:#122019; --border:#213329;
          --acc1:#E8B84B; --acc2:#2FBF9F; --discord:#5865F2;
          --ink:#F2EFE6; --muted:#8A9B92; --muted-2:#5C6E65;
          min-height:100vh; background:var(--bg); color:var(--ink);
          font-family:'Inter',sans-serif; position:relative; overflow-x:hidden;
        }
        .auth-glow {
          position:absolute; top:-200px; left:50%; transform:translateX(-50%);
          width:1400px; height:700px;
          background:radial-gradient(ellipse, color-mix(in srgb, var(--acc1) 10%, transparent), transparent 65%);
          pointer-events:none;
        }
        .auth-wagon {
          position:absolute; pointer-events:none;
        }
        .auth-wagon-left {
          bottom:-120px; left:0; width:640px; height:400px; opacity:0.14;
        }
        .auth-wagon-right {
          top:60px; right:-80px; width:520px; height:340px; opacity:0.10; transform:scaleX(-1);
        }

        .auth-header {
          position:relative; z-index:1; padding:26px 48px 18px; border-bottom:1px solid var(--border);
        }
        .auth-team-name {
          font-family:'Bebas Neue',sans-serif; font-size:30px; letter-spacing:2px;
          color:var(--acc1); margin:0;
          text-shadow:0 0 24px color-mix(in srgb, var(--acc1) 30%, transparent);
        }
        .auth-tournament-tag {
          font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:1.5px;
          color:var(--muted); text-transform:uppercase; margin-top:6px;
        }

        .auth-hero {
          position:relative; z-index:1; max-width:1300px; margin:0 auto;
          padding:72px 48px 50px; display:grid;
          grid-template-columns:1fr 420px; gap:80px; align-items:center;
        }

        .auth-pitch h2 {
          font-family:'Bebas Neue',sans-serif; font-size:50px; letter-spacing:1px;
          line-height:1.05; margin:0;
        }
        .auth-pitch h2 span { color:var(--acc1); }
        .auth-pitch-sub {
          font-family:'EB Garamond',serif; font-style:italic; font-size:18px;
          color:var(--muted); margin-top:16px; max-width:420px;
        }

        .auth-preview-card {
          margin-top:38px; background:var(--card); border:1px solid var(--border);
          border-radius:13px; padding:22px 24px; max-width:420px;
        }
        .auth-preview-title {
          font-size:11px; letter-spacing:1.5px; color:var(--muted-2);
          text-transform:uppercase; font-family:'JetBrains Mono',monospace; margin-bottom:14px;
        }
        .auth-preview-row {
          display:flex; justify-content:space-between; align-items:center;
          padding:8px 0; border-bottom:1px solid var(--border); font-size:14.5px;
        }
        .auth-preview-row:last-child { border-bottom:none; }
        .auth-pname { font-weight:600; display:flex; align-items:center; gap:9px; }
        .auth-preview-medal {
          width:20px; height:20px; border-radius:50%; background:var(--acc1);
          color:#2A2107; font-family:'Bebas Neue',sans-serif; font-size:12px;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .auth-medal-muted { background:var(--border) !important; color:var(--muted) !important; }
        .auth-preview-val { font-family:'JetBrains Mono',monospace; color:var(--acc1); font-weight:700; }
        .auth-val-muted { color:var(--muted) !important; }

        .auth-stat-strip { display:flex; gap:28px; margin-top:28px; }
        .auth-stat-num { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:24px; color:var(--acc2); }
        .auth-stat-lab { font-size:11px; color:var(--muted); letter-spacing:.5px; text-transform:uppercase; margin-top:3px; }

        .auth-card {
          background:var(--card); border:3px solid var(--ink); border-radius:18px;
          padding:32px 30px; box-shadow:9px 9px 0 var(--acc1);
        }
        .auth-welcome {
          font-family:'Bebas Neue',sans-serif; font-size:30px; letter-spacing:1px; color:var(--ink); margin:0;
        }
        .auth-subtext { font-size:13px; color:var(--muted); font-weight:600; margin-top:6px; }
        .auth-error {
          background:#7f1d1d; color:#fca5a5; padding:8px 12px; border-radius:8px;
          font-size:12px; font-weight:600; margin-top:14px; border:1px solid #991b1b;
        }
        .auth-field-wrap { margin-top:22px; }
        .auth-field-wrap input {
          width:100%; background:var(--bg); border:3px solid var(--ink); border-radius:10px;
          padding:12px 14px; font-size:14px; color:var(--ink); outline:none;
          box-shadow:4px 4px 0 var(--acc2); font-weight:500; font-family:'Inter',sans-serif;
        }
        .auth-field-wrap input::placeholder { color:var(--muted); font-weight:600; }
        .auth-field-wrap + .auth-field-wrap { margin-top:18px; }

        .auth-go-btn {
          margin-top:24px; width:100%; background:var(--acc1); border:3px solid var(--ink);
          border-radius:10px; padding:13px; font-family:'Inter',sans-serif; font-weight:800;
          font-size:14px; color:#2A2107; box-shadow:5px 5px 0 var(--acc2);
          cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .auth-go-btn svg { width:16px; height:16px; }

        .auth-footer {
          position:relative; z-index:1; text-align:center; padding:22px;
          font-family:'JetBrains Mono',monospace; font-size:10.5px; color:var(--muted-2);
          letter-spacing:1px; border-top:1px solid var(--border);
          max-width:1200px; margin:0 auto;
        }

        @media (max-width:768px) {
          .auth-header { padding:26px 20px 18px; }
          .auth-hero { grid-template-columns:1fr; padding:40px 20px 40px; gap:40px; }
          .auth-pitch h2 { font-size:40px; }
          .auth-preview-card { width:100%; max-width:none; }
          .auth-card { width:100%; }
        }
      `}</style>
    </div>
  )
}
