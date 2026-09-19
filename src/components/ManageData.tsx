"use client"

import { useCallback, useRef, useState } from "react"
import { useSession, signIn } from "next-auth/react"

type ExportData = {
  matches?: Array<{ tournament?: string }>
}

type ParsedMatch = {
  date: string
  opponent: string
  tournament: string
  result: string
  potm: string
  venue?: string
  innings?: Array<{
    battingTeam?: string
    bowlingTeam?: string
    total?: string
    overs?: string
    extras?: number
    batsmen?: Array<{ name: string; runs: number; balls: number; dismissal: string; sr: string }>
    bowlers?: Array<{ name: string; overs: number; runs: number; wkts: number; econ: string }>
  }>
}

type PreviewMatch = ParsedMatch & {
  status: "new" | "skip" | "error"
  reason?: string
  batsmenCount: number
  bowlersCount: number
  inningsCount: number
}

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-")
}

function summarize(data: ExportData) {
  const matches = data.matches || []
  const tournaments = [...new Set(matches.map(m => m.tournament).filter(Boolean))].sort()
  return {
    matches: matches.length,
    tournaments: tournaments.length ? tournaments.join(", ") : "none",
  }
}

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

function getPinHeaders(): Record<string, string> {
  const stored = window.localStorage.getItem("dps-admin-pin")
  const pin = stored || prompt("Admin PIN") || ""
  if (pin) window.localStorage.setItem("dps-admin-pin", pin)
  return pin ? { "x-admin-pin": pin } : {}
}

async function authFetch(url: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  }
  Object.assign(headers, getPinHeaders())
  return fetch(url, { ...options, headers })
}

function validateMatch(m: any): string[] {
  const errors: string[] = []
  if (!m.date) errors.push("Missing date")
  if (!m.opponent) errors.push("Missing opponent")
  if (!m.tournament) errors.push("Missing tournament")
  if (!m.result) errors.push("Missing result")
  if (!m.potm) errors.push("Missing potm")
  return errors
}

function parseMatch(raw: any): ParsedMatch {
  return {
    date: raw.date || "",
    opponent: raw.opponent || "",
    tournament: raw.tournament || "",
    result: raw.result || "",
    potm: raw.potm || "",
    venue: raw.venue || "",
    innings: raw.innings || [],
  }
}

const btnBase = {
  padding: "7px 16px",
  border: "none",
  borderRadius: 7,
  cursor: "pointer" as const,
  fontSize: 12,
  fontWeight: 600 as const,
}

export default function ManageData() {
  const fileRef = useRef<HTMLInputElement>(null)
  const { data: session, status } = useSession()
  const [jsonText, setJsonText] = useState("")
  const [preview, setPreview] = useState<PreviewMatch[] | null>(null)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{ imported: number; skipped: number; errors: number } | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)

  const toast = useCallback((msg: string, err?: boolean) => {
    const el = document.createElement("div")
    el.textContent = msg
    Object.assign(el.style, {
      position: "fixed", top: "20px", right: "20px",
      background: err ? "#ef4444" : "#22c55e",
      color: err ? "#fff" : "#052e16",
      padding: "12px 20px", borderRadius: 10, fontWeight: 600,
      transform: "translateX(120%)", transition: "transform 0.3s ease", zIndex: 1000,
    })
    document.body.appendChild(el)
    requestAnimationFrame(() => el.style.transform = "translateX(0)")
    setTimeout(() => {
      el.style.transform = "translateX(120%)"
      setTimeout(() => el.remove(), 300)
    }, 2500)
  }, [])

  const fetchCurrentData = async () => {
    const res = await fetch("/api/data/export")
    if (!res.ok) throw new Error("Export failed")
    return await res.json() as ExportData
  }

  const handleExport = async () => {
    try {
      const data = await fetchCurrentData()
      downloadJson(data, `dead-poets-society-${timestamp()}.json`)
      toast("Exported!")
    } catch {
      toast("Export failed", true)
    }
  }

  const handleFullReplaceImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const data = JSON.parse(text) as ExportData
      if (!Array.isArray(data.matches)) {
        toast("Invalid file format", true)
        return
      }

      const current = await fetchCurrentData()
      const before = summarize(current)
      const after = summarize(data)
      const ok = confirm(
        `⚠️ FULL REPLACE IMPORT\n\nThis will DELETE all existing data and replace it with the file.\n\nCurrent: ${before.matches} matches (${before.tournaments})\nImport: ${after.matches} matches (${after.tournaments})\n\nA backup will download first. Continue?`
      )
      if (!ok) return

      downloadJson(current, `dead-poets-society-backup-before-import-${timestamp()}.json`)

      const res = await authFetch("/api/data/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown error" }))
        toast("Import failed: " + err.error, true)
        return
      }
      toast("Full replace imported! Reload to see changes.")
    } catch {
      toast("Error importing", true)
    } finally {
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  const handleParse = () => {
    setPreview(null)
    setResult(null)
    setParseError(null)

    if (!jsonText.trim()) {
      setParseError("Paste JSON first")
      return
    }

    try {
      let parsed = JSON.parse(jsonText)

      // Normalize: support single match or { matches: [...] }
      let matchList: any[]
      if (Array.isArray(parsed)) {
        matchList = parsed
      } else if (parsed.matches && Array.isArray(parsed.matches)) {
        matchList = parsed.matches
      } else if (parsed.date && parsed.opponent) {
        matchList = [parsed]
      } else {
        setParseError("No matches found. Expected a match object or { matches: [...] }")
        return
      }

      const previewMatches: PreviewMatch[] = matchList.map((m: any) => {
        const errors = validateMatch(m)
        const match = parseMatch(m)
        const batsmenCount = match.innings?.reduce((sum, inn) => sum + (inn.batsmen?.length || 0), 0) || 0
        const bowlersCount = match.innings?.reduce((sum, inn) => sum + (inn.bowlers?.length || 0), 0) || 0

        if (errors.length > 0) {
          return { ...match, status: "error" as const, reason: errors.join(", "), batsmenCount, bowlersCount, inningsCount: match.innings?.length || 0 }
        }

        return { ...match, status: "new" as const, batsmenCount, bowlersCount, inningsCount: match.innings?.length || 0 }
      })

      setPreview(previewMatches)
    } catch (e: any) {
      setParseError(`JSON parse error: ${e.message}`)
    }
  }

  const handleImportIncremental = async () => {
    if (!preview) return
    setImporting(true)
    setResult(null)

    try {
      const matchesToImport = preview.filter(m => m.status === "new")
      if (matchesToImport.length === 0) {
        toast("Nothing to import", true)
        return
      }

      const res = await authFetch("/api/data/import-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matches: matchesToImport }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Unknown" }))
        toast(`Import failed: ${err.error}`, true)
        return
      }

      const data = await res.json()
      setResult({
        imported: data.imported,
        skipped: data.skipped,
        errors: data.errors,
      })

      // Update preview statuses from server response
      if (data.details) {
        setPreview(prev => prev?.map(m => {
          const wasSkipped = data.details.skipped?.some((s: any) =>
            s.opponent === m.opponent && s.tournament === m.tournament && s.date === m.date
          )
          const hadError = data.details.errors?.some((e: any) =>
            e.opponent === m.opponent && e.tournament === m.tournament && e.date === m.date
          )
          if (wasSkipped) return { ...m, status: "skip" as const, reason: "Already exists" }
          if (hadError) {
            const err = data.details.errors.find((e: any) =>
              e.opponent === m.opponent && e.tournament === m.tournament && e.date === m.date
            )
            return { ...m, status: "error" as const, reason: err?.error || "Import failed" }
          }
          return m
        }) || null)
      }

      toast(`Imported ${data.imported} match(es)!${data.skipped > 0 ? ` Skipped ${data.skipped}.` : ""}`)
    } catch {
      toast("Import failed", true)
    } finally {
      setImporting(false)
    }
  }

  const handleClear = async () => {
    try {
      const current = await fetchCurrentData()
      const before = summarize(current)
      const ok = confirm(
        `Clear all data?\n\nThis will remove ${before.matches} active matches (${before.tournaments}).\nA backup will download before clearing.`
      )
      if (!ok) return

      downloadJson(current, `dead-poets-society-backup-before-clear-${timestamp()}.json`)
      const res = await authFetch("/api/data/clear", { method: "DELETE" })
      if (!res.ok) { toast("Clear failed; backup was saved", true); return }
      toast("Data cleared")
    } catch {
      toast("Clear failed", true)
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setJsonText(text)
      setPreview(null)
      setResult(null)
      setParseError(null)
    } catch {
      toast("Could not read clipboard", true)
    }
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <p style={{ color: "#fca5a5", fontSize: 13, marginBottom: 12 }}>
          You need to sign in to manage data.
        </p>
        <button
          onClick={() => signIn()}
          style={{
            padding: "7px 16px", border: "none", borderRadius: 7, cursor: "pointer",
            fontSize: 12, fontWeight: 600, background: "#E8B84B", color: "#2A2107",
          }}
        >
          Sign In
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Top action buttons */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={handleExport}
          style={{ ...btnBase, background: "#334155", color: "#e2e8f0" }}>
          Export JSON
        </button>
        <button onClick={() => fileRef.current?.click()}
          style={{ ...btnBase, background: "#854d0e", color: "#fef3c7" }}>
          ⚠️ Full Replace Import
        </button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleFullReplaceImport} />
        <button onClick={handleClear}
          style={{ ...btnBase, background: "#ef4444", color: "white" }}>
          Clear All
        </button>
      </div>

      {/* Incremental Import Section */}
      <div style={{
        border: "1px solid #334155",
        borderRadius: 10,
        padding: 16,
        background: "#0f172a",
      }}>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, color: "#e2e8f0", fontWeight: 600 }}>
          Import Matches
        </h3>
        <p style={{ margin: "0 0 12px", fontSize: 12, color: "#94a3b8" }}>
          Paste match JSON below. Existing matches (same tournament + opponent + date) are skipped automatically.
        </p>

        {/* Text area + buttons */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <textarea
            value={jsonText}
            onChange={e => { setJsonText(e.target.value); setPreview(null); setResult(null); setParseError(null) }}
            placeholder={'Paste JSON here...\n\nExpected format:\n{"matches": [{ "date": "...", "opponent": "...", "tournament": "...", ... }]}\nor a single match: { "date": "...", "opponent": "...", ... }'}
            style={{
              flex: 1,
              minHeight: 140,
              background: "#1e293b",
              color: "#e2e8f0",
              border: "1px solid #334155",
              borderRadius: 7,
              padding: "10px 12px",
              fontSize: 12,
              fontFamily: "monospace",
              resize: "vertical" as const,
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={handlePasteFromClipboard}
            style={{ ...btnBase, background: "#1e40af", color: "white" }}>
            Paste from Clipboard
          </button>
          <button onClick={handleParse}
            style={{ ...btnBase, background: "#2FBF9F", color: "#052e16" }}>
            Parse & Validate
          </button>
        </div>

        {/* Parse error */}
        {parseError && (
          <div style={{
            marginTop: 12,
            padding: "10px 14px",
            borderRadius: 7,
            background: "#450a0a",
            border: "1px solid #7f1d1d",
            color: "#fca5a5",
            fontSize: 12,
          }}>
            {parseError}
          </div>
        )}

        {/* Preview */}
        {preview && preview.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#94a3b8" }}>
              Preview ({preview.filter(m => m.status === "new").length} new, {preview.filter(m => m.status === "skip").length} skipped, {preview.filter(m => m.status === "error").length} errors)
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {preview.map((m, i) => (
                <div key={i} style={{
                  padding: "10px 14px",
                  borderRadius: 7,
                  background: m.status === "new" ? "#052e16" : m.status === "skip" ? "#422006" : "#450a0a",
                  border: `1px solid ${m.status === "new" ? "#166534" : m.status === "skip" ? "#854d0e" : "#7f1d1d"}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 13 }}>
                        DPS vs {m.opponent}
                      </span>
                      <span style={{ color: "#94a3b8", fontSize: 12, marginLeft: 8 }}>
                        {m.tournament} | {m.date}
                      </span>
                    </div>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: m.status === "new" ? "#166534" : m.status === "skip" ? "#854d0e" : "#7f1d1d",
                      color: m.status === "new" ? "#86efac" : m.status === "skip" ? "#fde047" : "#fca5a5",
                    }}>
                      {m.status === "new" ? "NEW" : m.status === "skip" ? "SKIP" : "ERROR"}
                    </span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: 11, color: "#94a3b8" }}>
                    {m.inningsCount} innings | {m.batsmenCount} batsmen | {m.bowlersCount} bowlers
                    {m.status === "new" && (
                      <> | <span style={{ color: "#86efac" }}>{m.result}</span></>
                    )}
                    {m.status === "error" && m.reason && (
                      <> | <span style={{ color: "#fca5a5" }}>{m.reason}</span></>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Import button */}
            {preview.some(m => m.status === "new") && !result && (
              <button
                onClick={handleImportIncremental}
                disabled={importing}
                style={{
                  ...btnBase,
                  marginTop: 12,
                  background: importing ? "#334155" : "#2FBF9F",
                  color: importing ? "#94a3b8" : "#052e16",
                  cursor: importing ? "not-allowed" : "pointer",
                }}
              >
                {importing ? "Importing..." : `Import ${preview.filter(m => m.status === "new").length} Match(es)`}
              </button>
            )}

            {/* Result */}
            {result && (
              <div style={{
                marginTop: 12,
                padding: "10px 14px",
                borderRadius: 7,
                background: result.errors > 0 ? "#422006" : "#052e16",
                border: `1px solid ${result.errors > 0 ? "#854d0e" : "#166534"}`,
                color: "#e2e8f0",
                fontSize: 12,
              }}>
                ✅ Imported: {result.imported} | ⏭️ Skipped: {result.skipped} | ❌ Errors: {result.errors}
                {result.imported > 0 && <span style={{ color: "#86efac" }}> — Reload to see changes.</span>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
