"use client"

import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useMatches } from "@/lib/useMatches"
import PlayerSearch from "@/components/PlayerSearch"

export default function PlayersClient() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const tournament = searchParams.get("tournament") || undefined
  const { matches, tournaments } = useMatches(tournament)

  return (
    <PlayerSearch
      matches={matches}
      tournaments={tournaments}
      tournament={tournament}
      autoSelect={session?.user?.playerUsername || undefined}
    />
  )
}
