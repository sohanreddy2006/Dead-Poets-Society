import { prisma } from './prisma'

export const TEAM_NAME = 'Dead Poets Society'
export const TEAM_ROSTER = [
  'kdb177', 'arjsoh', 'mick_056', 'nick01311', 'xtzgamer24',
  'xenomphanes', 'sujay', 'zenixyt77', 'og1lucky', 'emilylei981',
  'light_6921', '1blonde', 'shyam.ly', 'khushal0__0', 'nervous_pizza1078',
  'vs_reddy12', 'isagi_17', 'milkshaikh0292',
  'vishwamispro0556', 'rooniyck',
  '18bat', 'chaosbyme',
  'deep.', 'naatilevade',
  'johtooooo', 'deep___-___',
] as const
export const ROLES: Record<string, string> = {
  kdb177: 'All-Rounder',
  arjsoh: 'Batter',
  mick_056: 'All-Rounder',
  nick01311: 'Batter',
  xtzgamer24: 'All-Rounder',
  xenomphanes: 'All-Rounder',
  sujay: 'Bowler',
  zenixyt77: 'Batter',
  og1lucky: 'Batter',
  emilylei981: 'Batter',
  light_6921: 'Batter',
  '1blonde': 'Batter',
  'shyam.ly': 'Batter',
  khushal0__0: 'Bowler',
  nervous_pizza1078: 'Batter',
  vs_reddy12: 'All-Rounder',
  isagi_17: 'Bowler',
  milkshaikh0292: 'All-Rounder',
  vishwamispro0556: 'Batter',
  rooniyck: 'All-Rounder',
  '18bat': 'All-Rounder',
  chaosbyme: 'All-Rounder',
  'deep.': 'All-Rounder',
  naatilevade: 'All-Rounder',
  johtooooo: 'All-Rounder',
  'deep___-___': 'All-Rounder',
}

export interface PlayerEntry {
  type: 'bat' | 'bowl'
  matchId: number
  matchNumber?: number | null
  date: string
  opponent: string
  result: string
  potm: string
  bat?: { playerId?: number | null; runs: number; balls: number; fours: number; sixes: number; dismissal: string; sr: string; excludedFromStats?: boolean }
  bowl?: { playerId?: number | null; overs: number; maidens: number; runs: number; wkts: number; econ: string; excludedFromStats?: boolean }
}

export interface PlayerStats {
  runs: number; balls: number; fours: number; sixes: number
  wkts: number; overs: number; ballsBowled: number; runsConc: number; maidens: number
  threeWkts: number; fiveWkts: number; fifties: number
  batAvg: string; sr: string; econ: string; bowlAvg: string; bowlSr: string
  mvp: number; matches: number; innsBat: number; innsBowl: number; impact: number
}

export function oversToBalls(overs: number): number {
  const text = overs.toFixed(1)
  const [whole, balls] = text.split('.').map(Number)
  if (balls >= 6) throw new Error(`Invalid cricket overs value: ${overs}`)
  return whole * 6 + balls
}

export function ballsToOvers(balls: number): number {
  return Number(`${Math.floor(balls / 6)}.${balls % 6}`)
}

export function ballsToOversDisplay(balls: number): string {
  return `${Math.floor(balls / 6)}.${balls % 6}`
}

export interface MatchData {
  id: number
  matchNumber?: number | null
  date: string
  venue: string
  opponent: string
  tournament: string
  result: string
  potm: string
  innings: Array<{
    id: number
    battingTeam: string
    bowlingTeam: string
    total: string
    overs: string
    extras: number
    batsmen: Array<{
      name: string; playerId?: number | null; runs: number; balls: number; fours: number; sixes: number
      dismissal: string; sr: string; excludedFromStats?: boolean
    }>
    bowlers: Array<{
      name: string; playerId?: number | null; overs: number; maidens: number; runs: number; wkts: number; econ: string; excludedFromStats?: boolean
    }>
  }>
}

export async function getMatches(tournament?: string): Promise<MatchData[]> {
  const where = tournament ? { tournament, deletedAt: null } : { deletedAt: null }
  const matches = await prisma.match.findMany({
    where,
    include: {
      innings: {
        include: { batsmen: true, bowlers: true },
      },
    },
    orderBy: [{ matchNumber: 'asc' }, { id: 'asc' }],
  })
  return matches.map(m => ({
    id: m.id,
    matchNumber: m.matchNumber,
    date: m.date,
    venue: m.venue,
    opponent: m.opponent,
    tournament: m.tournament,
    result: m.result,
    potm: m.potm,
    innings: m.innings.map(i => ({
      id: i.id,
      battingTeam: i.battingTeam,
      bowlingTeam: i.bowlingTeam,
      total: i.total,
      overs: i.overs,
      extras: i.extras,
      batsmen: i.batsmen.map(b => ({
        name: b.name, playerId: b.playerId, runs: b.runs, balls: b.balls, fours: b.fours,
        sixes: b.sixes, dismissal: b.dismissal, sr: b.sr, excludedFromStats: b.excludedFromStats,
      })),
      bowlers: i.bowlers.map(b => ({
        name: b.name, playerId: b.playerId, overs: b.overs, maidens: b.maidens, runs: b.runs,
        wkts: b.wkts, econ: b.econ, excludedFromStats: b.excludedFromStats,
      })),
    })),
  }))
}

export async function getTournaments(): Promise<string[]> {
  const result = await prisma.match.findMany({
    where: { deletedAt: null },
    select: { tournament: true },
    distinct: ['tournament'],
    orderBy: { tournament: 'asc' },
  })
  return result.map(r => r.tournament).filter(Boolean)
}

export async function getPlayerEntries(name: string, tournament?: string): Promise<PlayerEntry[]> {
  const matches = await getMatches(tournament)
  return getPlayerEntriesFromMatches(matches, name)
}

export function getPlayerEntriesFromMatches(matches: MatchData[], name: string, playerId?: number | null): PlayerEntry[] {
  const entries: PlayerEntry[] = []
  for (const m of matches) {
    for (const inn of m.innings) {
      if (inn.battingTeam === TEAM_NAME) {
        const bat = inn.batsmen.find(b => playerId ? b.playerId === playerId : b.name.toLowerCase() === name.toLowerCase())
        if (bat && !bat.excludedFromStats) {
          entries.push({
            type: 'bat', matchId: m.id, date: m.date, opponent: m.opponent,
            result: m.result, potm: m.potm,
            bat: { playerId: bat.playerId, runs: bat.runs, balls: bat.balls, fours: bat.fours, sixes: bat.sixes, dismissal: bat.dismissal, sr: bat.sr, excludedFromStats: bat.excludedFromStats },
          })
        }
      }
      if (inn.bowlingTeam === TEAM_NAME) {
        const bowl = inn.bowlers.find(b => playerId ? b.playerId === playerId : b.name.toLowerCase() === name.toLowerCase())
        if (bowl && !bowl.excludedFromStats) {
          entries.push({
            type: 'bowl', matchId: m.id, date: m.date, opponent: m.opponent,
            result: m.result, potm: m.potm,
            bowl: { playerId: bowl.playerId, overs: bowl.overs, maidens: bowl.maidens, runs: bowl.runs, wkts: bowl.wkts, econ: bowl.econ, excludedFromStats: bowl.excludedFromStats },
          })
        }
      }
    }
  }
  return entries
}

export function calcPlayerStats(name: string, entries: PlayerEntry[], matchesAll: MatchData[], tournament?: string): PlayerStats {
  let runs = 0, balls = 0, fours = 0, sixes = 0
  let wkts = 0, ballsBowled = 0, runsConc = 0, maidens = 0, dism = 0, innsBat = 0, innsBowl = 0
  let threeWkts = 0, fiveWkts = 0, fifties = 0
  let mvp = 0
  const matchIds = new Set<number>()

  for (const e of entries) {
    matchIds.add(e.matchId)
    if (e.type === 'bat' && e.bat) {
      innsBat++
      if (e.bat.dismissal !== 'dnb') {
        runs += e.bat.runs; balls += e.bat.balls; fours += e.bat.fours; sixes += e.bat.sixes
        if (e.bat.dismissal !== 'not out') dism++
        if (e.bat.runs >= 50) fifties++
      }
    } else if (e.type === 'bowl' && e.bowl) {
      innsBowl++; wkts += e.bowl.wkts; ballsBowled += oversToBalls(e.bowl.overs); runsConc += e.bowl.runs; maidens += e.bowl.maidens
      if (e.bowl.wkts >= 5) fiveWkts++
      else if (e.bowl.wkts >= 3) threeWkts++
    }
  }

  const filteredMatches = tournament
    ? matchesAll.filter(m => m.tournament === tournament)
    : matchesAll
  for (const m of filteredMatches) {
    if (m.potm && m.potm.toLowerCase().trim() === name.toLowerCase().trim()) mvp++
  }

  const srVal = balls > 0 ? (runs / balls * 100) : 0
  const decimalOvers = ballsBowled / 6
  const impact = Math.round((runs * srVal / 100) + (wkts * 25) + (mvp * 30))

  return {
    runs, balls, fours, sixes, wkts, overs: ballsToOvers(ballsBowled), ballsBowled, runsConc, maidens,
    threeWkts, fiveWkts, fifties,
    batAvg: dism > 0 ? (runs / dism).toFixed(2) : runs > 0 ? '-' : '0',
    sr: srVal.toFixed(2),
    econ: decimalOvers > 0 ? (runsConc / decimalOvers).toFixed(2) : '0',
    bowlAvg: wkts > 0 ? (runsConc / wkts).toFixed(2) : '-',
    bowlSr: wkts > 0 ? (ballsBowled / wkts).toFixed(2) : '-',
    mvp, matches: matchIds.size, innsBat, innsBowl, impact,
  }
}


export async function getRosterPlayers() {
  return prisma.player.findMany({
    where: { isRosterPlayer: true },
    orderBy: { username: 'asc' },
  })
}
