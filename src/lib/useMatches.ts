import useSWR from 'swr'
import type { MatchData } from './stats'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function useMatches(tournament?: string) {
  const { data: all, isLoading } = useSWR('/api/data/export', fetcher)

  const allMatches: MatchData[] = all?.matches ?? []
  const tournaments = [...new Set(allMatches.map(m => m.tournament).filter(Boolean))].sort() as string[]
  const matches = tournament
    ? allMatches.filter(m => m.tournament === tournament)
    : allMatches

  return { matches, matchesAll: allMatches, tournaments, isLoading }
}
