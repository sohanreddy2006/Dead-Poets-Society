import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const playerData = [
    { username: 'kdb177', displayName: 'kdb177', role: 'All-Rounder', isRosterPlayer: true },
    { username: 'arjsoh', displayName: 'arjsoh', role: 'Batter', isRosterPlayer: true },
    { username: 'mick_056', displayName: 'mick_056', role: 'All-Rounder', isRosterPlayer: true },
    { username: 'nick01311', displayName: 'nick01311', role: 'Batter', isRosterPlayer: true },
    { username: 'xtzgamer24', displayName: 'xtzgamer24', role: 'All-Rounder', isRosterPlayer: true },
    { username: 'xenomphanes', displayName: 'xenomphanes', role: 'All-Rounder', isRosterPlayer: true },
    { username: 'sujay', displayName: 'sujay', role: 'Bowler', isRosterPlayer: true },
    { username: 'zenixyt77', displayName: 'zenixyt77', role: 'Batter', isRosterPlayer: true },
    { username: 'og1lucky', displayName: 'og1lucky', role: 'Batter', isRosterPlayer: true },
    { username: 'emilylei981', displayName: 'emilylei981', role: 'All-Rounder', isRosterPlayer: true },
    { username: 'light_6921', displayName: 'light_6921', role: 'Batter', isRosterPlayer: true },
    { username: '1blonde', displayName: '1blonde', role: 'Batter', isRosterPlayer: true },
    { username: 'shyam.ly', displayName: 'shyam.ly', role: 'Batter', isRosterPlayer: true },
    { username: 'khushal0__0', displayName: 'khushal0__0', role: 'Bowler', isRosterPlayer: true },
    { username: 'nervous_pizza1078', displayName: 'nervous_pizza1078', role: 'Batter', isRosterPlayer: true },
    { username: 'vs_reddy12', displayName: 'vs_reddy12', role: 'All-Rounder', isRosterPlayer: true },
    { username: 'isagi_17', displayName: 'isagi_17', role: 'Bowler', isRosterPlayer: true },
    { username: 'milkshaikh0292', displayName: 'milkshaikh0292', role: 'All-Rounder', isRosterPlayer: true },
  ]
  for (const p of playerData) {
    await prisma.player.upsert({
      where: { username: p.username },
      update: p,
      create: p,
    })
  }
  console.log('Seeded 18 roster players.')
  const match1 = await prisma.match.findFirst({ where: { opponent: 'Brexit Ballers CC' } })
  if (!match1) {
    await prisma.match.create({
    data: {
      date: '2026-07-12', venue: '', opponent: 'Brexit Ballers CC', tournament: 'Markhors',
      result: 'Dead Poets Society won the game by 1 wicket.',
      potm: 'kdb177',
      innings: {
        create: [
          {
            battingTeam: 'Brexit Ballers CC',
            bowlingTeam: 'Dead Poets Society',
            total: '254/11', overs: '14.2', extras: 42,
            batsmen: {
              create: [
                { name: 'devdoot_26', runs: 42, balls: 12, fours: 0, sixes: 0, dismissal: 'bowled', sr: '350.00' },
                { name: 'akashjaiswal4', runs: 42, balls: 12, fours: 0, sixes: 0, dismissal: 'caught', sr: '350.00' },
                { name: 'cryingb4by', runs: 34, balls: 11, fours: 0, sixes: 0, dismissal: 'bowled', sr: '309.09' },
                { name: 'conquerorisback*', runs: 29, balls: 8, fours: 0, sixes: 0, dismissal: 'caught', sr: '362.50' },
                { name: 'nota.poet', runs: 19, balls: 6, fours: 0, sixes: 0, dismissal: 'bowled', sr: '316.67' },
                { name: '.ninja.', runs: 13, balls: 9, fours: 0, sixes: 0, dismissal: 'lbw', sr: '144.44' },
                { name: 'kakashi_28.', runs: 12, balls: 4, fours: 0, sixes: 0, dismissal: 'caught', sr: '300.00' },
                { name: 'ujjxyz', runs: 10, balls: 4, fours: 0, sixes: 0, dismissal: 'bowled', sr: '250.00' },
                { name: 'dollcleen', runs: 8, balls: 3, fours: 0, sixes: 0, dismissal: 'run out', sr: '266.67' },
                { name: 'stevenstrangeee', runs: 3, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '150.00' },
                { name: 'yoyibs', runs: 0, balls: 0, fours: 0, sixes: 0, dismissal: 'dnb', sr: '' },
              ],
            },
            bowlers: {
              create: [
                { name: 'emilylei981', overs: 4.0, maidens: 0, runs: 68, wkts: 4, econ: '17.00' },
                { name: 'sujay', overs: 3.3, maidens: 0, runs: 67, wkts: 3, econ: '19.14' },
                { name: 'mick_056', overs: 3.0, maidens: 0, runs: 54, wkts: 2, econ: '18.00' },
                { name: 'arjsoh', overs: 0.2, maidens: 0, runs: 1, wkts: 1, econ: '3.00' },
                { name: 'kdb177', overs: 2.0, maidens: 0, runs: 33, wkts: 1, econ: '16.50' },
                { name: 'nick01311', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'nervous_pizza1078', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'light_6921', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'og1lucky', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'zenixyt77', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'xenomphanes', overs: 1.3, maidens: 0, runs: 31, wkts: 0, econ: '20.67' },
              ],
            },
          },
          {
            battingTeam: 'Dead Poets Society',
            bowlingTeam: 'Brexit Ballers CC',
            total: '259/10', overs: '14.5', extras: 0,
            batsmen: {
              create: [
                { name: 'kdb177', runs: 68, balls: 19, fours: 0, sixes: 0, dismissal: 'not out', sr: '357.89' },
                { name: 'og1lucky', runs: 55, balls: 18, fours: 0, sixes: 0, dismissal: 'caught', sr: '305.56' },
                { name: 'mick_056', runs: 35, balls: 12, fours: 0, sixes: 0, dismissal: 'bowled', sr: '291.67' },
                { name: 'emilylei981', runs: 26, balls: 11, fours: 0, sixes: 0, dismissal: 'caught', sr: '236.36' },
                { name: 'xenomphanes', runs: 23, balls: 10, fours: 0, sixes: 0, dismissal: 'bowled', sr: '230.00' },
                { name: 'zenixyt77', runs: 22, balls: 5, fours: 0, sixes: 0, dismissal: 'caught', sr: '440.00' },
                { name: 'light_6921', runs: 11, balls: 3, fours: 0, sixes: 0, dismissal: 'bowled', sr: '366.67' },
                { name: 'sujay', runs: 8, balls: 3, fours: 0, sixes: 0, dismissal: 'bowled', sr: '266.67' },
                { name: 'nick01311', runs: 8, balls: 5, fours: 0, sixes: 0, dismissal: 'run out', sr: '160.00' },
                { name: 'nervous_pizza1078', runs: 3, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '150.00' },
                { name: 'arjsoh', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
              ],
            },
            bowlers: {
              create: [
                { name: 'stevenstrangeee', overs: 3.0, maidens: 0, runs: 45, wkts: 3, econ: '15.00' },
                { name: '.ninja.', overs: 2.0, maidens: 0, runs: 43, wkts: 2, econ: '21.50' },
                { name: 'akashjaiswal4', overs: 1.0, maidens: 0, runs: 18, wkts: 1, econ: '18.00' },
                { name: 'nota.poet', overs: 1.0, maidens: 0, runs: 20, wkts: 1, econ: '20.00' },
                { name: 'ujjxyz', overs: 2.0, maidens: 0, runs: 23, wkts: 1, econ: '11.50' },
                { name: 'conquerorisback*', overs: 2.0, maidens: 0, runs: 32, wkts: 1, econ: '16.00' },
                { name: 'cryingb4by', overs: 1.5, maidens: 0, runs: 38, wkts: 1, econ: '20.73' },
                { name: 'dollcleen', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'kakashi_28.', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'devdoot_26', overs: 1.0, maidens: 0, runs: 19, wkts: 0, econ: '19.00' },
                { name: 'yoyibs', overs: 1.0, maidens: 0, runs: 21, wkts: 0, econ: '21.00' },
              ],
            },
          },
        ],
      },
    },
  })
  }

  const match2 = await prisma.match.findFirst({ where: { opponent: 'The Assassins' } })
  if (!match2) {
    await prisma.match.create({
    data: {
      date: '2026-07-13', venue: '', opponent: 'The Assassins', tournament: 'Markhors',
      result: 'Dead Poets Society won the game by 49 runs.',
      potm: 'sujay',
      innings: {
        create: [
          {
            battingTeam: 'Dead Poets Society',
            bowlingTeam: 'The Assassins',
            total: '176/11', overs: '11.1', extras: 0,
            batsmen: {
              create: [
                { name: 'nervous_pizza1078', runs: 46, balls: 14, fours: 0, sixes: 0, dismissal: 'caught', sr: '328.57' },
                { name: 'light_6921', runs: 42, balls: 9, fours: 0, sixes: 0, dismissal: 'bowled', sr: '466.67' },
                { name: 'kdb177', runs: 31, balls: 12, fours: 0, sixes: 0, dismissal: 'caught', sr: '258.33' },
                { name: 'xenomphanes', runs: 17, balls: 10, fours: 0, sixes: 0, dismissal: 'bowled', sr: '170.00' },
                { name: 'sujay', runs: 11, balls: 3, fours: 0, sixes: 0, dismissal: 'bowled', sr: '366.67' },
                { name: 'mick_056', runs: 11, balls: 5, fours: 0, sixes: 0, dismissal: 'run out', sr: '220.00' },
                { name: 'emilylei981', runs: 8, balls: 4, fours: 0, sixes: 0, dismissal: 'caught', sr: '200.00' },
                { name: 'shyam.ly', runs: 7, balls: 5, fours: 0, sixes: 0, dismissal: 'bowled', sr: '140.00' },
                { name: 'arjsoh', runs: 2, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '100.00' },
                { name: 'nick01311', runs: 1, balls: 2, fours: 0, sixes: 0, dismissal: 'lbw', sr: '50.00' },
                { name: 'og1lucky', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
              ],
            },
            bowlers: {
              create: [
                { name: 'murtaza_sntl', overs: 3.0, maidens: 0, runs: 33, wkts: 5, econ: '11.00' },
                { name: 'tedisnothim', overs: 4.0, maidens: 0, runs: 50, wkts: 4, econ: '12.50' },
                { name: 'marinefishes', overs: 2.0, maidens: 0, runs: 42, wkts: 1, econ: '21.00' },
                { name: '0______________', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'tanujgamer10', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'venom__x7', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: '.ahmeddx.', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'dripgod5170', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'sahej2710', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'toluene__', overs: 1.0, maidens: 0, runs: 19, wkts: 0, econ: '19.00' },
                { name: 'hoiyah08', overs: 1.0, maidens: 0, runs: 32, wkts: 0, econ: '32.00' },
              ],
            },
          },
          {
            battingTeam: 'The Assassins',
            bowlingTeam: 'Dead Poets Society',
            total: '127/11', overs: '8.5', extras: 0,
            batsmen: {
              create: [
                { name: 'hoiyah08', runs: 34, balls: 11, fours: 0, sixes: 0, dismissal: 'caught', sr: '309.09' },
                { name: '.ahmeddx.', runs: 18, balls: 7, fours: 0, sixes: 0, dismissal: 'bowled', sr: '257.14' },
                { name: 'dripgod5170', runs: 17, balls: 5, fours: 0, sixes: 0, dismissal: 'caught', sr: '340.00' },
                { name: 'murtaza_sntl', runs: 17, balls: 7, fours: 0, sixes: 0, dismissal: 'bowled', sr: '242.86' },
                { name: 'tedisnothim*', runs: 14, balls: 5, fours: 0, sixes: 0, dismissal: 'bowled', sr: '280.00' },
                { name: 'venom__x7', runs: 10, balls: 6, fours: 0, sixes: 0, dismissal: 'caught', sr: '166.67' },
                { name: 'marinefishes', runs: 7, balls: 4, fours: 0, sixes: 0, dismissal: 'bowled', sr: '175.00' },
                { name: '0______________', runs: 5, balls: 3, fours: 0, sixes: 0, dismissal: 'lbw', sr: '166.67' },
                { name: 'tanujgamer10', runs: 4, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '200.00' },
                { name: 'toluene__', runs: 1, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '50.00' },
                { name: 'sahej2710', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
              ],
            },
            bowlers: {
              create: [
                { name: 'sujay', overs: 4.0, maidens: 0, runs: 53, wkts: 6, econ: '13.25' },
                { name: 'kdb177', overs: 3.0, maidens: 0, runs: 40, wkts: 4, econ: '13.33' },
                { name: 'emilylei981', overs: 0.5, maidens: 0, runs: 15, wkts: 1, econ: '18.00' },
                { name: 'arjsoh', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'light_6921', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'og1lucky', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'nervous_pizza1078', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'shyam.ly', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'nick01311', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'xenomphanes', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                { name: 'mick_056', overs: 1.0, maidens: 0, runs: 19, wkts: 0, econ: '19.00' },
              ],
            },
          },
        ],
      },
    },
  })
  }

  const match3 = await prisma.match.findFirst({ where: { opponent: '6FC' } })
  if (!match3) {
    await prisma.match.create({
      data: {
        date: '2026-07-14', venue: '', opponent: '6FC', tournament: 'Markhors',
        result: '6FC won the game by 49 runs.',
        potm: 'saadmalik_56',
        innings: {
          create: [
            {
              battingTeam: '6FC',
              bowlingTeam: 'Dead Poets Society',
              total: '213/11', overs: '12.0', extras: 0,
              batsmen: {
                create: [
                  { name: 'saadmalik_56', runs: 64, balls: 15, fours: 0, sixes: 0, dismissal: 'caught', sr: '426.67' },
                  { name: 'wrestlingsorcerer', runs: 57, balls: 20, fours: 0, sixes: 0, dismissal: 'bowled', sr: '285.00' },
                  { name: 'icantbowl', runs: 34, balls: 8, fours: 0, sixes: 0, dismissal: 'caught', sr: '425.00' },
                  { name: 'horseman0004', runs: 17, balls: 6, fours: 0, sixes: 0, dismissal: 'bowled', sr: '283.33' },
                  { name: 'jazilfr', runs: 8, balls: 3, fours: 0, sixes: 0, dismissal: 'caught', sr: '266.67' },
                  { name: 'rotating', runs: 5, balls: 3, fours: 0, sixes: 0, dismissal: 'run out', sr: '166.67' },
                  { name: 'achintyasingh', runs: 5, balls: 4, fours: 0, sixes: 0, dismissal: 'bowled', sr: '125.00' },
                  { name: 'shmanas', runs: 4, balls: 3, fours: 0, sixes: 0, dismissal: 'caught', sr: '133.33' },
                  { name: 'skhan5285', runs: 3, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '150.00' },
                  { name: 'awesomeampharos', runs: 0, balls: 0, fours: 0, sixes: 0, dismissal: 'dnb', sr: '' },
                  { name: 'ateeb.2007th', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
                ],
              },
              bowlers: {
                create: [
                  { name: 'mick_056', overs: 3.0, maidens: 0, runs: 47, wkts: 6, econ: '15.67' },
                  { name: 'khushal0__0', overs: 3.0, maidens: 0, runs: 42, wkts: 2, econ: '14.00' },
                  { name: 'sujay', overs: 3.0, maidens: 0, runs: 67, wkts: 2, econ: '22.33' },
                  { name: 'kdb177', overs: 3.0, maidens: 0, runs: 57, wkts: 1, econ: '19.00' },
                  { name: 'light_6921', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'zenixyt77', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'shyam.ly', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'emilylei981', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'nervous_pizza1078', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'xenomphanes', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'arjsoh', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                ],
              },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: '6FC',
              total: '164/11', overs: '11.0', extras: 0,
              batsmen: {
                create: [
                  { name: 'arjsoh', runs: 57, balls: 19, fours: 0, sixes: 0, dismissal: 'bowled', sr: '300.00' },
                  { name: 'emilylei981', runs: 21, balls: 8, fours: 0, sixes: 0, dismissal: 'caught', sr: '262.50' },
                  { name: 'light_6921', runs: 19, balls: 5, fours: 0, sixes: 0, dismissal: 'bowled', sr: '380.00' },
                  { name: 'xenomphanes', runs: 18, balls: 9, fours: 0, sixes: 0, dismissal: 'caught', sr: '200.00' },
                  { name: 'shyam.ly', runs: 11, balls: 5, fours: 0, sixes: 0, dismissal: 'bowled', sr: '220.00' },
                  { name: 'mick_056', runs: 10, balls: 5, fours: 0, sixes: 0, dismissal: 'run out', sr: '200.00' },
                  { name: 'zenixyt77', runs: 8, balls: 5, fours: 0, sixes: 0, dismissal: 'bowled', sr: '160.00' },
                  { name: 'nervous_pizza1078', runs: 7, balls: 3, fours: 0, sixes: 0, dismissal: 'caught', sr: '233.33' },
                  { name: 'khushal0__0', runs: 7, balls: 4, fours: 0, sixes: 0, dismissal: 'bowled', sr: '175.00' },
                  { name: 'kdb177', runs: 6, balls: 2, fours: 0, sixes: 0, dismissal: 'caught', sr: '300.00' },
                  { name: 'sujay', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
                ],
              },
              bowlers: {
                create: [
                  { name: 'ateeb.2007th', overs: 4.0, maidens: 0, runs: 48, wkts: 6, econ: '12.00' },
                  { name: 'saadmalik_56', overs: 2.0, maidens: 0, runs: 27, wkts: 2, econ: '13.50' },
                  { name: 'wrestlingsorcerer', overs: 3.0, maidens: 0, runs: 51, wkts: 2, econ: '17.00' },
                  { name: 'icantbowl', overs: 1.0, maidens: 0, runs: 15, wkts: 1, econ: '15.00' },
                  { name: 'rotating', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'shmanas', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'achintyasingh', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'skhan5285', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'horseman0004', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'awesomeampharos', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'jazilfr', overs: 1.0, maidens: 0, runs: 23, wkts: 0, econ: '23.00' },
                ],
              },
            },
          ],
        },
      },
    })
    console.log('Seeded match 3 (vs 6FC).')
  }

  const match4 = await prisma.match.findFirst({ where: { opponent: 'Simoria Rising Stars' } })
  if (!match4) {
    await prisma.match.create({
      data: {
        date: '2026-07-15', venue: '', opponent: 'Simoria Rising Stars', tournament: 'Markhors',
        result: 'Dead Poets Society won the game by 5 wickets.',
        potm: 'sujay',
        innings: {
          create: [
            {
              battingTeam: 'Simoria Rising Stars',
              bowlingTeam: 'Dead Poets Society',
              total: '149/11', overs: '8.3', extras: 0,
              batsmen: {
                create: [
                  { name: '.muzannnn.', runs: 60, balls: 16, fours: 0, sixes: 0, dismissal: 'caught', sr: '375.00' },
                  { name: 'loid1108', runs: 33, balls: 8, fours: 0, sixes: 0, dismissal: 'bowled', sr: '412.50' },
                  { name: 'cold_palmer.1', runs: 26, balls: 7, fours: 0, sixes: 0, dismissal: 'caught', sr: '371.43' },
                  { name: 'thor1363.', runs: 11, balls: 5, fours: 0, sixes: 0, dismissal: 'bowled', sr: '220.00' },
                  { name: 'prashant1q_49323', runs: 10, balls: 5, fours: 0, sixes: 0, dismissal: 'caught', sr: '200.00' },
                  { name: '5wn1', runs: 4, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '200.00' },
                  { name: 'deltashift_4', runs: 3, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '150.00' },
                  { name: 'jenil71430', runs: 2, balls: 3, fours: 0, sixes: 0, dismissal: 'caught', sr: '66.67' },
                  { name: 'turvash__35291', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
                  { name: 'd_jain', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
                  { name: 'jim036589', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
                ],
              },
              bowlers: {
                create: [
                  { name: 'sujay', overs: 3.3, maidens: 0, runs: 56, wkts: 5, econ: '16.00' },
                  { name: 'emilylei981', overs: 1.0, maidens: 0, runs: 7, wkts: 3, econ: '7.00' },
                  { name: 'mick_056', overs: 2.0, maidens: 0, runs: 41, wkts: 2, econ: '20.50' },
                  { name: 'og1lucky', overs: 1.0, maidens: 0, runs: 20, wkts: 1, econ: '20.00' },
                  { name: 'light_6921', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'xenomphanes', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'arjsoh', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'nick01311', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'nervous_pizza1078', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'zenixyt77', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'kdb177', overs: 1.0, maidens: 0, runs: 25, wkts: 0, econ: '25.00' },
                ],
              },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Simoria Rising Stars',
              total: '151/6', overs: '9.2', extras: 0,
              batsmen: {
                create: [
                  { name: 'sujay', runs: 61, balls: 17, fours: 0, sixes: 0, dismissal: 'caught', sr: '358.82' },
                  { name: 'arjsoh', runs: 54, balls: 22, fours: 0, sixes: 0, dismissal: 'caught', sr: '245.45' },
                  { name: 'og1lucky', runs: 20, balls: 6, fours: 0, sixes: 0, dismissal: 'caught', sr: '333.33' },
                  { name: 'zenixyt77', runs: 13, balls: 6, fours: 0, sixes: 0, dismissal: 'bowled', sr: '216.67' },
                  { name: 'nick01311', runs: 2, balls: 1, fours: 0, sixes: 0, dismissal: 'not out', sr: '200.00' },
                  { name: 'kdb177', runs: 1, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '50.00' },
                  { name: 'emilylei981', runs: 0, balls: 0, fours: 0, sixes: 0, dismissal: 'dnb', sr: '' },
                  { name: 'xenomphanes', runs: 0, balls: 0, fours: 0, sixes: 0, dismissal: 'dnb', sr: '' },
                  { name: 'nervous_pizza1078', runs: 0, balls: 0, fours: 0, sixes: 0, dismissal: 'dnb', sr: '' },
                  { name: 'light_6921', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
                  { name: 'mick_056', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
                ],
              },
              bowlers: {
                create: [
                  { name: 'cold_palmer.1', overs: 4.0, maidens: 0, runs: 52, wkts: 5, econ: '13.00' },
                  { name: 'thor1363.', overs: 1.2, maidens: 0, runs: 22, wkts: 1, econ: '16.50' },
                  { name: 'turvash__35291', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: '5wn1', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'prashant1q_49323', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'jenil71430', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'jim036589', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'deltashift_4', overs: 1.0, maidens: 0, runs: 16, wkts: 0, econ: '16.00' },
                  { name: 'd_jain', overs: 1.0, maidens: 0, runs: 19, wkts: 0, econ: '19.00' },
                  { name: '.muzannnn.', overs: 1.0, maidens: 0, runs: 20, wkts: 0, econ: '20.00' },
                  { name: 'loid1108', overs: 1.0, maidens: 0, runs: 22, wkts: 0, econ: '22.00' },
                ],
              },
            },
          ],
        },
      },
    })
    console.log('Seeded match 4 (vs Simoria Rising Stars).')
  }

  const match5 = await prisma.match.findFirst({ where: { opponent: 'Red Dragons Rising Stars' } })
  if (!match5) {
    await prisma.match.create({
      data: {
        date: '2026-07-16', venue: '', opponent: 'Red Dragons Rising Stars', tournament: 'Markhors',
        result: 'Dead Poets Society won the game by 2 runs.',
        potm: 'xtzgamer24',
        innings: {
          create: [
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Red Dragons Rising Stars',
              total: '239/11', overs: '15.1', extras: 1,
              batsmen: {
                create: [
                  { name: 'arjsoh', runs: 53, balls: 19, fours: 0, sixes: 0, dismissal: 'bowled', sr: '278.95' },
                  { name: 'nervous_pizza1078', runs: 48, balls: 13, fours: 0, sixes: 0, dismissal: 'bowled', sr: '369.23' },
                  { name: 'shyam.ly', runs: 27, balls: 9, fours: 0, sixes: 0, dismissal: 'bowled', sr: '300.00' },
                  { name: '1blonde', runs: 26, balls: 10, fours: 0, sixes: 0, dismissal: 'bowled', sr: '260.00' },
                  { name: 'xenomphanes', runs: 26, balls: 12, fours: 0, sixes: 0, dismissal: 'bowled', sr: '216.67' },
                  { name: 'mick_056', runs: 18, balls: 7, fours: 0, sixes: 0, dismissal: 'bowled', sr: '257.14' },
                  { name: 'light_6921', runs: 17, balls: 6, fours: 0, sixes: 0, dismissal: 'bowled', sr: '283.33' },
                  { name: 'xtzgamer24', runs: 17, balls: 10, fours: 0, sixes: 0, dismissal: 'bowled', sr: '170.00' },
                  { name: 'kdb177', runs: 6, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '300.00' },
                  { name: 'zenixyt77', runs: 0, balls: 0, fours: 0, sixes: 0, dismissal: 'dnb', sr: '' },
                  { name: 'sujay', runs: 0, balls: 1, fours: 0, sixes: 0, dismissal: 'bowled', sr: '0.00' },
                ],
              },
              bowlers: {
                create: [
                  { name: 'yuvraj.x_0807', overs: 3.0, maidens: 0, runs: 40, wkts: 3, econ: '13.33' },
                  { name: 'edge2524', overs: 2.0, maidens: 0, runs: 24, wkts: 2, econ: '12.00' },
                  { name: 'ishannnnnn_28', overs: 1.2, maidens: 0, runs: 28, wkts: 2, econ: '21.00' },
                  { name: '.shrek69', overs: 1.1, maidens: 0, runs: 19, wkts: 1, econ: '16.29' },
                  { name: 'musa_naeem', overs: 2.0, maidens: 0, runs: 27, wkts: 1, econ: '13.50' },
                  { name: 'aleenaissleepy', overs: 2.0, maidens: 0, runs: 30, wkts: 1, econ: '15.00' },
                  { name: 'barfi.69', overs: 2.0, maidens: 0, runs: 43, wkts: 1, econ: '21.50' },
                  { name: 'millie.amy', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'dogemcidiot', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'anik6770', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'arskhan04', overs: 1.0, maidens: 0, runs: 17, wkts: 0, econ: '17.00' },
                ],
              },
            },
            {
              battingTeam: 'Red Dragons Rising Stars',
              bowlingTeam: 'Dead Poets Society',
              total: '237/11', overs: '14.4', extras: 0,
              batsmen: {
                create: [
                  { name: 'dogemcidiot', runs: 72, balls: 26, fours: 0, sixes: 0, dismissal: 'bowled', sr: '276.92' },
                  { name: 'aleenaissleepy', runs: 70, balls: 21, fours: 0, sixes: 0, dismissal: 'bowled', sr: '333.33' },
                  { name: 'musa_naeem', runs: 39, balls: 13, fours: 0, sixes: 0, dismissal: 'bowled', sr: '300.00' },
                  { name: 'anik6770', runs: 10, balls: 6, fours: 0, sixes: 0, dismissal: 'bowled', sr: '166.67' },
                  { name: 'edge2524', runs: 9, balls: 5, fours: 0, sixes: 0, dismissal: 'bowled', sr: '180.00' },
                  { name: '.shrek69', runs: 8, balls: 4, fours: 0, sixes: 0, dismissal: 'bowled', sr: '200.00' },
                  { name: 'yuvraj.x_0807', runs: 7, balls: 3, fours: 0, sixes: 0, dismissal: 'bowled', sr: '233.33' },
                  { name: 'millie.amy', runs: 6, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '300.00' },
                  { name: 'arskhan04', runs: 6, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '300.00' },
                  { name: 'ishannnnnn_28', runs: 5, balls: 2, fours: 0, sixes: 0, dismissal: 'bowled', sr: '250.00' },
                  { name: 'barfi.69', runs: 5, balls: 4, fours: 0, sixes: 0, dismissal: 'bowled', sr: '125.00' },
                ],
              },
              bowlers: {
                create: [
                  { name: 'xtzgamer24', overs: 4.0, maidens: 0, runs: 67, wkts: 5, econ: '16.75' },
                  { name: 'kdb177', overs: 2.0, maidens: 0, runs: 30, wkts: 2, econ: '15.00' },
                  { name: 'sujay', overs: 2.4, maidens: 0, runs: 41, wkts: 2, econ: '15.38' },
                  { name: 'xenomphanes', overs: 3.0, maidens: 0, runs: 47, wkts: 2, econ: '15.67' },
                  { name: '1blonde', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'arjsoh', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'light_6921', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'nervous_pizza1078', overs: 0, maidens: 0, runs: 0, wkts: 0, econ: '' },
                  { name: 'mick_056', overs: 1.0, maidens: 0, runs: 12, wkts: 0, econ: '12.00' },
                  { name: 'zenixyt77', overs: 1.0, maidens: 0, runs: 14, wkts: 0, econ: '14.00' },
                  { name: 'shyam.ly', overs: 1.0, maidens: 0, runs: 26, wkts: 0, econ: '26.00' },
                ],
              },
            },
          ],
        },
      },
    })
    console.log('Seeded match 5 (vs Red Dragons Rising Stars).')
  }

  const match6 = await prisma.match.findFirst({ where: { opponent: 'Wildfire Wolves', tournament: 'Markhors' } })
  if (!match6) {
    const inn1Batsmen = [
      { name: 'og1lucky', runs: 89, balls: 25, dismissal: 'caught', sr: '356.00' },
      { name: 'nervous_pizza1078', runs: 18, balls: 5, dismissal: 'caught', sr: '360.00' },
      { name: 'shyam.ly', runs: 16, balls: 5, dismissal: 'caught', sr: '320.00' },
      { name: 'xenomphanes', runs: 10, balls: 8, dismissal: 'caught', sr: '125.00' },
      { name: 'sujay', runs: 9, balls: 3, dismissal: 'caught', sr: '300.00' },
      { name: 'arjsoh', runs: 8, balls: 6, dismissal: 'caught', sr: '133.33' },
      { name: 'light_6921', runs: 6, balls: 2, dismissal: 'caught', sr: '300.00' },
      { name: 'kdb177', runs: 6, balls: 4, dismissal: 'caught', sr: '150.00' },
      { name: '1blonde', runs: 4, balls: 2, dismissal: 'caught', sr: '200.00' },
      { name: 'mick_056', runs: 1, balls: 2, dismissal: 'caught', sr: '50.00' },
      { name: 'emilylei981', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
    ]
    const inn1Bowlers = [
      { name: 'tanish__9363', overs: 2.0, runs: 25, wkts: 3, econ: '12.50' },
      { name: 'apm18_07', overs: 2.2, runs: 42, wkts: 3, econ: '18.00' },
      { name: 'subhayaan_48561', overs: 2.4, runs: 42, wkts: 3, econ: '15.75' },
      { name: 'zappyxdark71_280', overs: 1.2, runs: 12, wkts: 1, econ: '9.00' },
      { name: 'mr_player1', overs: 1.0, runs: 14, wkts: 1, econ: '14.00' },
      { name: 'yash.45', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'srvirus1', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'helloo_234', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'coolguy2005zdf', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'hitch0327', overs: 1.0, runs: 24, wkts: 0, econ: '24.00' },
      { name: 'obitoedits15', overs: 1.0, runs: 26, wkts: 0, econ: '26.00' },
    ]
    const inn2Batsmen = [
      { name: 'yash.45', runs: 39, balls: 12, dismissal: 'bowled', sr: '325.00' },
      { name: 'subhayaan_48561', runs: 33, balls: 9, dismissal: 'bowled', sr: '366.67' },
      { name: 'tanish__9363', runs: 28, balls: 6, dismissal: 'bowled', sr: '466.67' },
      { name: 'hitch0327', runs: 26, balls: 6, dismissal: 'bowled', sr: '433.33' },
      { name: 'helloo_234', runs: 19, balls: 6, dismissal: 'bowled', sr: '316.67' },
      { name: 'apm18_07', runs: 11, balls: 5, dismissal: 'bowled', sr: '220.00' },
      { name: 'srvirus1', runs: 5, balls: 2, dismissal: 'bowled', sr: '250.00' },
      { name: 'coolguy2005zdf', runs: 3, balls: 2, dismissal: 'bowled', sr: '150.00' },
      { name: 'zappyxdark71_280', runs: 2, balls: 2, dismissal: 'bowled', sr: '100.00' },
      { name: 'mr_player1', runs: 2, balls: 2, dismissal: 'bowled', sr: '100.00' },
      { name: 'obitoedits15', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'xenomphanes', overs: 2.0, runs: 35, wkts: 4, econ: '17.50' },
      { name: 'sujay', overs: 2.5, runs: 46, wkts: 4, econ: '16.24' },
      { name: 'emilylei981', overs: 2.0, runs: 45, wkts: 2, econ: '22.50' },
      { name: 'og1lucky', overs: 1.0, runs: 23, wkts: 1, econ: '23.00' },
      { name: 'kdb177', overs: 1.0, runs: 19, wkts: 0, econ: '19.00' },
      { name: 'mick_056', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'light_6921', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-07-17',
        venue: '',
        opponent: 'Wildfire Wolves',
        tournament: 'Markhors',
        result: 'Dead Poets Society won the game by 17 runs.',
        potm: 'og1lucky',
        innings: {
          create: [
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Wildfire Wolves',
              total: '185/11', overs: '11.2', extras: 0,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Wildfire Wolves',
              bowlingTeam: 'Dead Poets Society',
              total: '168/11', overs: '8.5', extras: 0,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded match 6 (vs Wildfire Wolves).')
  }

  const match7 = await prisma.match.findFirst({ where: { opponent: 'Head and Shoulder Mafia', tournament: 'Markhors' } })
  if (!match7) {
    const inn1Batsmen = [
      { name: 'divinefire5126', runs: 24, balls: 10, dismissal: 'bowled', sr: '240.00' },
      { name: '7thmosby', runs: 14, balls: 7, dismissal: 'bowled', sr: '200.00' },
      { name: 'pjrockers1', runs: 11, balls: 3, dismissal: 'bowled', sr: '366.67' },
      { name: 'kingsmith.', runs: 11, balls: 5, dismissal: 'bowled', sr: '220.00' },
      { name: 'yash.45', runs: 10, balls: 3, dismissal: 'bowled', sr: '333.33' },
      { name: 'lava.shy', runs: 10, balls: 6, dismissal: 'bowled', sr: '166.67' },
      { name: 'shadowknight007', runs: 8, balls: 4, dismissal: 'bowled', sr: '200.00' },
      { name: 'criclover.05', runs: 7, balls: 4, dismissal: 'bowled', sr: '175.00' },
      { name: 'siddhant7r', runs: 5, balls: 2, dismissal: 'bowled', sr: '250.00' },
      { name: 'velgard_tempest', runs: 1, balls: 2, dismissal: 'bowled', sr: '50.00' },
      { name: '_harsh_599', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'sujay', overs: 3.0, runs: 48, wkts: 5, econ: '16.00' },
      { name: 'emilylei981', overs: 1.5, runs: 19, wkts: 4, econ: '10.36' },
      { name: 'xenomphanes', overs: 1.0, runs: 12, wkts: 1, econ: '12.00' },
      { name: 'mick_056', overs: 2.0, runs: 22, wkts: 1, econ: '11.00' },
      { name: 'kdb177', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'khushal0__0', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'light_6921', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'nervous_pizza1078', runs: 37, balls: 10, dismissal: 'caught', sr: '370.00' },
      { name: 'sujay', runs: 24, balls: 8, dismissal: 'caught', sr: '300.00' },
      { name: 'light_6921', runs: 15, balls: 4, dismissal: 'caught', sr: '375.00' },
      { name: 'khushal0__0', runs: 8, balls: 5, dismissal: 'caught', sr: '160.00' },
      { name: 'mick_056', runs: 7, balls: 3, dismissal: 'caught', sr: '233.33' },
      { name: 'emilylei981', runs: 4, balls: 2, dismissal: 'caught', sr: '200.00' },
      { name: 'og1lucky', runs: 1, balls: 2, dismissal: 'caught', sr: '50.00' },
      { name: 'kdb177', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: 'xenomphanes', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: '1blonde', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: 'arjsoh', runs: 0, balls: 2, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'kingsmith.', overs: 2.3, runs: 30, wkts: 6, econ: '12.00' },
      { name: 'shadowknight007', overs: 2.0, runs: 30, wkts: 3, econ: '15.00' },
      { name: 'criclover.05', overs: 1.0, runs: 17, wkts: 1, econ: '17.00' },
      { name: '7thmosby', overs: 1.0, runs: 19, wkts: 1, econ: '19.00' },
      { name: 'yash.45', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'divinefire5126', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'siddhant7r', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'lava.shy', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '_harsh_599', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'pjrockers1', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'velgard_tempest', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-07-18',
        venue: '',
        opponent: 'Head and Shoulder Mafia',
        tournament: 'Markhors',
        result: 'Head and Shoulder Mafia won the game by 5 runs.',
        potm: 'kingsmith.',
        innings: {
          create: [
            {
              battingTeam: 'Head and Shoulder Mafia',
              bowlingTeam: 'Dead Poets Society',
              total: '101/11', overs: '7.5', extras: 0,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Head and Shoulder Mafia',
              total: '96/11', overs: '6.3', extras: 0,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded match 7 (vs Head and Shoulder Mafia).')
  }

  const match8 = await prisma.match.findFirst({ where: { opponent: 'Zephyr Legion', tournament: 'Markhors' } })
  if (!match8) {
    const inn1Batsmen = [
      { name: 'beaming.robot', runs: 80, balls: 23, dismissal: 'bowled', sr: '347.83' },
      { name: 'megatron372', runs: 55, balls: 17, dismissal: 'bowled', sr: '323.53' },
      { name: 'victor.von.doom.', runs: 32, balls: 12, dismissal: 'bowled', sr: '266.67' },
      { name: 'x.luffy.__', runs: 12, balls: 4, dismissal: 'bowled', sr: '300.00' },
      { name: 'morningstarlucifer', runs: 11, balls: 3, dismissal: 'bowled', sr: '366.67' },
      { name: 'phantom_menace11', runs: 10, balls: 5, dismissal: 'bowled', sr: '200.00' },
      { name: 'deadlyqueen123', runs: 8, balls: 3, dismissal: 'bowled', sr: '266.67' },
      { name: 'godzilla.0', runs: 3, balls: 3, dismissal: 'bowled', sr: '100.00' },
      { name: 'neeravmishra', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'enigma.9.9', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'tralaleroo.tralalaa', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'xtzgamer24', overs: 4.0, runs: 65, wkts: 5, econ: '16.25' },
      { name: 'kdb177', overs: 3.0, runs: 47, wkts: 3, econ: '15.67' },
      { name: 'sujay', overs: 3.0, runs: 55, wkts: 2, econ: '18.33' },
      { name: 'light_6921', overs: 0.1, runs: 0, wkts: 1, econ: '0.00' },
      { name: 'xenomphanes', overs: 1.0, runs: 23, wkts: 0, econ: '23.00' },
      { name: 'nick01311', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'zenix69x', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'light_6921', runs: 42, balls: 12, dismissal: 'caught', sr: '350.00' },
      { name: 'sujay', runs: 37, balls: 9, dismissal: 'caught', sr: '411.11' },
      { name: 'nick01311', runs: 26, balls: 10, dismissal: 'caught', sr: '260.00' },
      { name: 'arjsoh', runs: 17, balls: 9, dismissal: 'caught', sr: '188.89' },
      { name: 'og1lucky', runs: 15, balls: 5, dismissal: 'caught', sr: '300.00' },
      { name: 'kdb177', runs: 11, balls: 5, dismissal: 'caught', sr: '220.00' },
      { name: 'xtzgamer24', runs: 7, balls: 4, dismissal: 'caught', sr: '175.00' },
      { name: 'xenomphanes', runs: 7, balls: 5, dismissal: 'caught', sr: '140.00' },
      { name: 'nervous_pizza1078', runs: 4, balls: 3, dismissal: 'caught', sr: '133.33' },
      { name: 'zenix69x', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: 'shyam.ly', runs: 0, balls: 2, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'megatron372', overs: 3.5, runs: 46, wkts: 7, econ: '12.00' },
      { name: 'phantom_menace11', overs: 2.0, runs: 28, wkts: 2, econ: '14.00' },
      { name: 'beaming.robot', overs: 2.0, runs: 36, wkts: 1, econ: '18.00' },
      { name: 'morningstarlucifer', overs: 2.0, runs: 38, wkts: 1, econ: '19.00' },
      { name: 'enigma.9.9', overs: 1.0, runs: 18, wkts: 0, econ: '18.00' },
      { name: 'godzilla.0', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'neeravmishra', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'deadlyqueen123', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'victor.von.doom.', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'x.luffy.__', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'tralaleroo.tralalaa', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-07-19',
        venue: '',
        opponent: 'Zephyr Legion',
        tournament: 'Markhors',
        result: 'Zephyr Legion won the game by 43 runs.',
        potm: 'megatron372',
        innings: {
          create: [
            {
              battingTeam: 'Zephyr Legion',
              bowlingTeam: 'Dead Poets Society',
              total: '211/11', overs: '12.1', extras: 21,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Zephyr Legion',
              total: '168/11', overs: '10.5', extras: 2,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded match 8 (vs Zephyr Legion).')
  }

  const match9 = await prisma.match.findFirst({ where: { opponent: 'TEAM B', tournament: 'Markhors' } })
  if (!match9) {
    const inn1Batsmen = [
      { name: 'susi24.', runs: 65, balls: 20, dismissal: 'bowled', sr: '325.00' },
      { name: '_eyeque', runs: 14, balls: 4, dismissal: 'bowled', sr: '350.00' },
      { name: 'windy291208', runs: 12, balls: 4, dismissal: 'bowled', sr: '300.00' },
      { name: 'adibisgoated', runs: 11, balls: 4, dismissal: 'bowled', sr: '275.00' },
      { name: 'the_duos10', runs: 5, balls: 2, dismissal: 'bowled', sr: '250.00' },
      { name: 'krazymatrix_', runs: 5, balls: 2, dismissal: 'bowled', sr: '250.00' },
      { name: 'milan3495', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'nexus389', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'itz_hnh_', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'hriship17', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'aryayboy', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'mick_056', overs: 2.0, runs: 17, wkts: 6, econ: '8.50' },
      { name: 'sujay', overs: 0.5, runs: 6, wkts: 3, econ: '7.20' },
      { name: 'kdb177', overs: 2.0, runs: 43, wkts: 2, econ: '21.50' },
      { name: 'khushal0__0', overs: 1.0, runs: 25, wkts: 0, econ: '25.00' },
      { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'xenomphanes', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nick01311', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: '1blonde', runs: 34, balls: 13, dismissal: 'caught', sr: '261.54' },
      { name: 'og1lucky', runs: 16, balls: 4, dismissal: 'caught', sr: '400.00' },
      { name: 'xenomphanes', runs: 16, balls: 7, dismissal: 'caught', sr: '228.57' },
      { name: 'khushal0__0', runs: 10, balls: 3, dismissal: 'caught', sr: '333.33' },
      { name: 'nick01311', runs: 9, balls: 4, dismissal: 'caught', sr: '225.00' },
      { name: 'mick_056', runs: 9, balls: 4, dismissal: 'caught', sr: '225.00' },
      { name: 'shyam.ly', runs: 8, balls: 3, dismissal: 'caught', sr: '266.67' },
      { name: 'emilylei981', runs: 5, balls: 1, dismissal: 'caught', sr: '500.00' },
      { name: 'kdb177', runs: 4, balls: 2, dismissal: 'caught', sr: '200.00' },
      { name: 'sujay', runs: 4, balls: 2, dismissal: 'caught', sr: '200.00' },
      { name: 'arjsoh', runs: 0, balls: 2, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'nexus389', overs: 2.0, runs: 25, wkts: 3, econ: '12.50' },
      { name: 'the_duos10', overs: 2.3, runs: 39, wkts: 2, econ: '15.60' },
      { name: 'milan3495', overs: 1.0, runs: 13, wkts: 1, econ: '13.00' },
      { name: 'itz_hnh_', overs: 1.0, runs: 19, wkts: 1, econ: '19.00' },
      { name: 'susi24.', overs: 1.0, runs: 19, wkts: 0, econ: '19.00' },
      { name: '_eyeque', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'adibisgoated', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'hriship17', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'krazymatrix_', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'aryayboy', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'windy291208', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-07-20',
        venue: '',
        opponent: 'TEAM B',
        tournament: 'Markhors',
        result: 'Dead Poets Society won the game by 4 wickets.',
        potm: 'mick_056',
        innings: {
          create: [
            {
              battingTeam: 'TEAM B',
              bowlingTeam: 'Dead Poets Society',
              total: '112/11', overs: '6.5', extras: 21,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'TEAM B',
              total: '115/7', overs: '7.3', extras: 0,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded match 9 (vs TEAM B).')
  }

  const match10 = await prisma.match.findFirst({ where: { opponent: 'Royal kings', tournament: 'Markhors' } })
  if (!match10) {
    const inn1Batsmen = [
      { name: 'samjrao', runs: 42, balls: 13, dismissal: 'bowled', sr: '323.08' },
      { name: 'rhnffs', runs: 19, balls: 6, dismissal: 'bowled', sr: '316.67' },
      { name: 'galacticc09', runs: 18, balls: 6, dismissal: 'bowled', sr: '300.00' },
      { name: 'frostman.is.cold', runs: 17, balls: 5, dismissal: 'bowled', sr: '340.00' },
      { name: 'rehan7901', runs: 17, balls: 5, dismissal: 'bowled', sr: '340.00' },
      { name: 'neelakanthamahanta', runs: 17, balls: 6, dismissal: 'bowled', sr: '283.33' },
      { name: 'rishab07724', runs: 16, balls: 5, dismissal: 'bowled', sr: '320.00' },
      { name: 'Bot1', runs: 9, balls: 4, dismissal: 'bowled', sr: '225.00' },
      { name: 'Bot2', runs: 7, balls: 4, dismissal: 'bowled', sr: '175.00' },
      { name: 'loneblox', runs: 6, balls: 4, dismissal: 'bowled', sr: '150.00' },
      { name: 'mercking', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'sujay', overs: 3.0, runs: 44, wkts: 5, econ: '14.67' },
      { name: 'arjsoh', overs: 1.0, runs: 14, wkts: 2, econ: '14.00' },
      { name: 'xenomphanes', overs: 0.5, runs: 15, wkts: 2, econ: '18.00' },
      { name: 'kdb177', overs: 3.0, runs: 48, wkts: 2, econ: '16.00' },
      { name: 'mick_056', overs: 1.0, runs: 23, wkts: 0, econ: '23.00' },
      { name: 'nick01311', overs: 1.0, runs: 24, wkts: 0, econ: '24.00' },
      { name: 'light_6921', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'emilylei981', runs: 109, balls: 31, dismissal: 'caught', sr: '351.61' },
      { name: 'nick01311', runs: 30, balls: 10, dismissal: 'caught', sr: '300.00' },
      { name: 'arjsoh', runs: 13, balls: 7, dismissal: 'caught', sr: '185.71' },
      { name: 'nervous_pizza1078', runs: 12, balls: 4, dismissal: 'caught', sr: '300.00' },
      { name: '1blonde', runs: 2, balls: 2, dismissal: 'caught', sr: '100.00' },
      { name: 'shyam.ly', runs: 2, balls: 3, dismissal: 'caught', sr: '66.67' },
      { name: 'mick_056', runs: 2, balls: 3, dismissal: 'caught', sr: '66.67' },
      { name: 'xenomphanes', runs: 1, balls: 2, dismissal: 'caught', sr: '50.00' },
      { name: 'light_6921', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: 'kdb177', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: 'sujay', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'neelakanthamahanta', overs: 2.5, runs: 47, wkts: 4, econ: '16.59' },
      { name: 'rehan7901', overs: 4.0, runs: 51, wkts: 3, econ: '12.75' },
      { name: 'samjrao', overs: 3.0, runs: 53, wkts: 2, econ: '17.67' },
      { name: 'frostman.is.cold', overs: 1.0, runs: 20, wkts: 1, econ: '20.00' },
      { name: 'galacticc09', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'mercking', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'rishab07724', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'rhnffs', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'loneblox', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'Bot1', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'Bot2', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-07-21',
        venue: '',
        opponent: 'Royal kings',
        tournament: 'Markhors',
        result: 'Dead Poets Society won the game by 1 wicket.',
        potm: 'emilylei981',
        innings: {
          create: [
            {
              battingTeam: 'Royal kings',
              bowlingTeam: 'Dead Poets Society',
              total: '168/11', overs: '9.5', extras: 0,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Royal kings',
              total: '171/10', overs: '10.5', extras: 0,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded match 10 (vs Royal kings).')
  }

  const match11 = await prisma.match.findFirst({ where: { opponent: 'Markhors', tournament: 'Markhors' } })
  if (!match11) {
    const inn1Batsmen = [
      { name: 'fade3833', runs: 25, balls: 6, dismissal: 'bowled', sr: '416.67' },
      { name: 'arslaann', runs: 23, balls: 7, dismissal: 'bowled', sr: '328.57' },
      { name: 'mylifex_x', runs: 19, balls: 6, dismissal: 'bowled', sr: '316.67' },
      { name: 'not_sparda', runs: 13, balls: 6, dismissal: 'bowled', sr: '216.67' },
      { name: 'kayaniverse', runs: 11, balls: 4, dismissal: 'not out', sr: '275.00' },
      { name: 'gamingpiex_15394', runs: 11, balls: 8, dismissal: 'bowled', sr: '137.50' },
      { name: 'lazzzzzzz', runs: 7, balls: 3, dismissal: 'bowled', sr: '233.33' },
      { name: 'insxv', runs: 2, balls: 2, dismissal: 'bowled', sr: '100.00' },
      { name: 'vettel06', runs: 2, balls: 4, dismissal: 'not out', sr: '50.00' },
      { name: 'mrtz.xf', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'no._.one15', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'xenomphanes', overs: 3.0, runs: 39, wkts: 4, econ: '13.00' },
      { name: 'kdb177', overs: 2.0, runs: 18, wkts: 3, econ: '9.00' },
      { name: 'mick_056', overs: 1.5, runs: 36, wkts: 3, econ: '19.64' },
      { name: 'khushal0__0', overs: 1.0, runs: 13, wkts: 1, econ: '13.00' },
      { name: 'sujay', overs: 1.0, runs: 20, wkts: 0, econ: '20.00' },
      { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nick01311', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'zenix69x', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'nick01311', runs: 21, balls: 7, dismissal: 'caught', sr: '300.00' },
      { name: 'zenix69x', runs: 16, balls: 5, dismissal: 'caught', sr: '320.00' },
      { name: 'xenomphanes', runs: 12, balls: 6, dismissal: 'caught', sr: '200.00' },
      { name: 'og1lucky', runs: 8, balls: 4, dismissal: 'caught', sr: '200.00' },
      { name: 'arjsoh', runs: 6, balls: 2, dismissal: 'caught', sr: '300.00' },
      { name: 'nervous_pizza1078', runs: 6, balls: 4, dismissal: 'caught', sr: '150.00' },
      { name: 'khushal0__0', runs: 5, balls: 4, dismissal: 'caught', sr: '125.00' },
      { name: 'mick_056', runs: 3, balls: 2, dismissal: 'caught', sr: '150.00' },
      { name: 'kdb177', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: 'emilylei981', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: 'sujay', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'kayaniverse', overs: 3.0, runs: 33, wkts: 7, econ: '11.00' },
      { name: 'no._.one15', overs: 2.1, runs: 20, wkts: 4, econ: '9.23' },
      { name: 'fade3833', overs: 1.0, runs: 24, wkts: 0, econ: '24.00' },
      { name: 'insxv', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'lazzzzzzz', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arslaann', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'vettel06', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'mylifex_x', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'not_sparda', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'gamingpiex_15394', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'mrtz.xf', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-07-22',
        venue: '',
        opponent: 'Markhors',
        tournament: 'Markhors',
        result: 'Markhors won the game by 49 runs.',
        potm: 'kayaniverse',
        innings: {
          create: [
            {
              battingTeam: 'Markhors',
              bowlingTeam: 'Dead Poets Society',
              total: '126/11', overs: '8.5', extras: 0,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Markhors',
              total: '77/11', overs: '6.1', extras: 0,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded match 11 (vs Markhors).')
  }

  const matchCS1 = await prisma.match.findFirst({ where: { opponent: 'Destiny', tournament: 'Cricket Sultans' } })
  if (!matchCS1) {
    const inn1Batsmen = [
      { name: 'aryantri17', runs: 81, balls: 21, dismissal: 'bowled', sr: '385.71' },
      { name: 'its_clashboi', runs: 24, balls: 11, dismissal: 'bowled', sr: '218.18' },
      { name: 'hriddha', runs: 22, balls: 7, dismissal: 'bowled', sr: '314.29' },
      { name: 'abhisek29', runs: 15, balls: 5, dismissal: 'bowled', sr: '300.00' },
      { name: 'greenlightlovestad c', runs: 12, balls: 4, dismissal: 'bowled', sr: '300.00' },
      { name: 'v3n.29', runs: 8, balls: 4, dismissal: 'not out', sr: '200.00' },
      { name: 'shashank_07', runs: 8, balls: 5, dismissal: 'bowled', sr: '160.00' },
      { name: 'bludlover_317', runs: 6, balls: 3, dismissal: 'bowled', sr: '200.00' },
      { name: 'its.jayhiranandani_', runs: 4, balls: 3, dismissal: 'bowled', sr: '133.33' },
      { name: 'nezukooo111', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'rexx.fr_4', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'khushal0__0', overs: 4.0, runs: 56, wkts: 4, econ: '14.00' },
      { name: 'xenomphanes', overs: 2.0, runs: 40, wkts: 2, econ: '20.00' },
      { name: 'emilylei981', overs: 1.0, runs: 13, wkts: 1, econ: '13.00' },
      { name: 'sujay', overs: 1.4, runs: 39, wkts: 1, econ: '23.40' },
      { name: 'rooniyck', overs: 2.0, runs: 45, wkts: 1, econ: '22.50' },
      { name: 'kdb177', overs: 3.0, runs: 49, wkts: 1, econ: '16.33' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nick01311', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'vishwamispro0556', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'rooniyck', runs: 56, balls: 18, dismissal: 'caught', sr: '311.11' },
      { name: 'og1lucky', runs: 52, balls: 15, dismissal: 'caught', sr: '346.67' },
      { name: 'nick01311', runs: 49, balls: 16, dismissal: 'caught', sr: '306.25' },
      { name: 'sujay', runs: 31, balls: 13, dismissal: 'caught', sr: '238.46' },
      { name: 'vishwamispro0556', runs: 20, balls: 6, dismissal: 'caught', sr: '333.33' },
      { name: 'kdb177', runs: 16, balls: 8, dismissal: 'caught', sr: '200.00' },
      { name: '1blonde', runs: 8, balls: 3, dismissal: 'caught', sr: '266.67' },
      { name: 'emilylei981', runs: 6, balls: 2, dismissal: 'caught', sr: '300.00' },
      { name: 'xenomphanes', runs: 6, balls: 3, dismissal: 'caught', sr: '200.00' },
      { name: 'khushal0__0', runs: 4, balls: 2, dismissal: 'caught', sr: '200.00' },
      { name: 'arjsoh', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'hriddha', overs: 1.3, runs: 13, wkts: 4, econ: '8.67' },
      { name: 'rexx.fr_4', overs: 3.0, runs: 58, wkts: 3, econ: '19.33' },
      { name: 'its.jayhiranandani_', overs: 1.0, runs: 15, wkts: 2, econ: '15.00' },
      { name: 'bludlover_317', overs: 1.0, runs: 17, wkts: 1, econ: '17.00' },
      { name: 'v3n.29', overs: 2.0, runs: 40, wkts: 1, econ: '20.00' },
      { name: 'its_clashboi', overs: 1.0, runs: 17, wkts: 0, econ: '17.00' },
      { name: 'nezukooo111', overs: 1.0, runs: 18, wkts: 0, econ: '18.00' },
      { name: 'shashank_07', overs: 1.0, runs: 19, wkts: 0, econ: '19.00' },
      { name: 'greenlightlovestad c', overs: 1.0, runs: 20, wkts: 0, econ: '20.00' },
      { name: 'abhisek29', overs: 2.0, runs: 31, wkts: 0, econ: '15.50' },
      { name: 'aryantri17', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-09-02',
        venue: '',
        opponent: 'Destiny',
        tournament: 'Cricket Sultans',
        result: 'Destiny won the game by 49 runs.',
        potm: 'aryantri17',
        innings: {
          create: [
            {
              battingTeam: 'Destiny',
              bowlingTeam: 'Dead Poets Society',
              total: '303/11', overs: '16.4', extras: 123,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Destiny',
              total: '254/11', overs: '14.3', extras: 6,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded Cricket Sultans match 1 (vs Destiny).')
  }

  const matchCS2 = await prisma.match.findFirst({ where: { opponent: 'Dynamic Spartans', tournament: 'Cricket Sultans' } })
  if (!matchCS2) {
    const inn1Batsmen = [
      { name: 'aaryan_ali', runs: 54, balls: 22, dismissal: 'bowled', sr: '245.45' },
      { name: '.zunaid.', runs: 40, balls: 10, dismissal: 'bowled', sr: '400.00' },
      { name: 'axismeow.', runs: 32, balls: 10, dismissal: 'bowled', sr: '320.00' },
      { name: 'loid1108', runs: 24, balls: 8, dismissal: 'bowled', sr: '300.00' },
      { name: 'hoodibone', runs: 13, balls: 5, dismissal: 'bowled', sr: '260.00' },
      { name: 'potato206', runs: 6, balls: 3, dismissal: 'bowled', sr: '200.00' },
      { name: 'clodsamosa', runs: 1, balls: 2, dismissal: 'bowled', sr: '50.00' },
      { name: 'mafia.real', runs: 1, balls: 2, dismissal: 'bowled', sr: '50.00' },
      { name: 'google.18.18', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'nomore.pika', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'hitman45.264', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'kdb177', overs: 4.0, runs: 65, wkts: 5, econ: '16.25' },
      { name: 'xenomphanes', overs: 2.2, runs: 45, wkts: 3, econ: '19.29' },
      { name: 'emilylei981', overs: 1.4, runs: 16, wkts: 2, econ: '9.60' },
      { name: 'vishwamispro0556', overs: 1.0, runs: 18, wkts: 1, econ: '18.00' },
      { name: 'nick01311', overs: 1.0, runs: 11, wkts: 0, econ: '11.00' },
      { name: 'sujay', overs: 1.0, runs: 22, wkts: 0, econ: '22.00' },
      { name: 'khushal0__0', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'zenix69x', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'sujay', runs: 60, balls: 22, dismissal: 'caught', sr: '272.73' },
      { name: 'vishwamispro0556', runs: 28, balls: 8, dismissal: 'caught', sr: '350.00' },
      { name: 'arjsoh', runs: 20, balls: 9, dismissal: 'caught', sr: '222.22' },
      { name: 'kdb177', runs: 15, balls: 5, dismissal: 'caught', sr: '300.00' },
      { name: 'emilylei981', runs: 13, balls: 6, dismissal: 'caught', sr: '216.67' },
      { name: 'og1lucky', runs: 12, balls: 5, dismissal: 'caught', sr: '240.00' },
      { name: 'nick01311', runs: 11, balls: 4, dismissal: 'caught', sr: '275.00' },
      { name: 'zenix69x', runs: 9, balls: 4, dismissal: 'caught', sr: '225.00' },
      { name: '1blonde', runs: 7, balls: 4, dismissal: 'caught', sr: '175.00' },
      { name: 'xenomphanes', runs: 6, balls: 3, dismissal: 'caught', sr: '200.00' },
      { name: 'khushal0__0', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: '.zunaid.', overs: 1.5, runs: 23, wkts: 3, econ: '15.33' },
      { name: 'aaryan_ali', overs: 3.0, runs: 37, wkts: 3, econ: '12.33' },
      { name: 'google.18.18', overs: 2.0, runs: 22, wkts: 2, econ: '11.00' },
      { name: 'nomore.pika', overs: 2.0, runs: 30, wkts: 2, econ: '15.00' },
      { name: 'axismeow.', overs: 1.0, runs: 16, wkts: 1, econ: '16.00' },
      { name: 'mafia.real', overs: 1.0, runs: 26, wkts: 0, econ: '26.00' },
      { name: 'hoodibone', overs: 1.0, runs: 27, wkts: 0, econ: '27.00' },
      { name: 'clodsamosa', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'potato206', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'hitman45.264', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'loid1108', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-09-03',
        venue: '',
        opponent: 'Dynamic Spartans',
        tournament: 'Cricket Sultans',
        result: 'Dynamic Spartans won the game by 19 runs.',
        potm: 'aaryan_ali',
        innings: {
          create: [
            {
              battingTeam: 'Dynamic Spartans',
              bowlingTeam: 'Dead Poets Society',
              total: '206/11', overs: '12.0', extras: 35,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Dynamic Spartans',
              total: '187/11', overs: '11.5', extras: 6,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded Cricket Sultans match 2 (vs Dynamic Spartans).')
  }

  const matchCS3 = await prisma.match.findFirst({ where: { opponent: 'Slytherins', tournament: 'Cricket Sultans' } })
  if (!matchCS3) {
    const inn1Batsmen = [
      { name: 'jim036589', runs: 46, balls: 14, dismissal: 'bowled', sr: '328.57' },
      { name: 'fretty.45', runs: 39, balls: 14, dismissal: 'bowled', sr: '278.57' },
      { name: 'deltashift_4', runs: 33, balls: 13, dismissal: 'bowled', sr: '253.85' },
      { name: 'thor1363.', runs: 32, balls: 7, dismissal: 'bowled', sr: '457.14' },
      { name: 'krishna_kfo', runs: 25, balls: 8, dismissal: 'bowled', sr: '312.50' },
      { name: 'udx.y', runs: 20, balls: 7, dismissal: 'bowled', sr: '285.71' },
      { name: 'b i c h u__gang', runs: 10, balls: 4, dismissal: 'bowled', sr: '250.00' },
      { name: 'dexuslord', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'vivanxdhoni', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'chatore', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'vortexthrust', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'vishwamispro0556', overs: 3.0, runs: 44, wkts: 4, econ: '14.67' },
      { name: '18bat', overs: 3.0, runs: 52, wkts: 3, econ: '17.33' },
      { name: 'kdb177', overs: 3.0, runs: 59, wkts: 2, econ: '19.67' },
      { name: 'xenomphanes', overs: 1.5, runs: 31, wkts: 1, econ: '20.67' },
      { name: 'chaosbyme', overs: 1.0, runs: 19, wkts: 0, econ: '19.00' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'sujay', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'rooniyck', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'rooniyck', runs: 46, balls: 13, dismissal: 'caught', sr: '353.85' },
      { name: '18bat', runs: 26, balls: 13, dismissal: 'caught', sr: '200.00' },
      { name: 'sujay', runs: 20, balls: 7, dismissal: 'caught', sr: '285.71' },
      { name: 'chaosbyme', runs: 20, balls: 11, dismissal: 'caught', sr: '181.82' },
      { name: '1blonde', runs: 13, balls: 6, dismissal: 'caught', sr: '216.67' },
      { name: 'kdb177', runs: 12, balls: 4, dismissal: 'caught', sr: '300.00' },
      { name: 'arjsoh', runs: 11, balls: 5, dismissal: 'caught', sr: '220.00' },
      { name: 'xenomphanes', runs: 10, balls: 5, dismissal: 'caught', sr: '200.00' },
      { name: 'og1lucky', runs: 1, balls: 2, dismissal: 'caught', sr: '50.00' },
      { name: 'emilylei981', runs: 1, balls: 2, dismissal: 'caught', sr: '50.00' },
      { name: 'vishwamispro0556', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'b i c h u__gang', overs: 2.3, runs: 24, wkts: 4, econ: '9.60' },
      { name: 'jim036589', overs: 3.0, runs: 43, wkts: 4, econ: '14.33' },
      { name: 'udx.y', overs: 2.5, runs: 39, wkts: 3, econ: '15.60' },
      { name: 'vortexthrust', overs: 0.1, runs: 2, wkts: 0, econ: '12.00' },
      { name: 'dexuslord', overs: 1.0, runs: 15, wkts: 0, econ: '15.00' },
      { name: 'fretty.45', overs: 1.0, runs: 18, wkts: 0, econ: '18.00' },
      { name: 'chatore', overs: 1.0, runs: 19, wkts: 0, econ: '19.00' },
      { name: 'deltashift_4', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'vivanxdhoni', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'thor1363.', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'krishna_kfo', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-09-04',
        venue: '',
        opponent: 'Slytherins',
        tournament: 'Cricket Sultans',
        result: 'Slytherins won the game by 46 runs.',
        potm: 'jim036589',
        innings: {
          create: [
            {
              battingTeam: 'Slytherins',
              bowlingTeam: 'Dead Poets Society',
              total: '217/11', overs: '11.5', extras: 12,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Slytherins',
              total: '171/11', overs: '11.3', extras: 11,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded Cricket Sultans match 3 (vs Slytherins).')
  }

  const matchCS4 = await prisma.match.findFirst({ where: { opponent: 'Hyper Realm', tournament: 'Cricket Sultans' } })
  if (!matchCS4) {
    const inn1Batsmen = [
      { name: '1blonde', runs: 112, balls: 41, dismissal: 'caught', sr: '273.17' },
      { name: 'vishwamispro0556', runs: 51, balls: 15, dismissal: 'caught', sr: '340.00' },
      { name: 'chaosbyme', runs: 29, balls: 8, dismissal: 'caught', sr: '362.50' },
      { name: 'sujay', runs: 22, balls: 9, dismissal: 'caught', sr: '244.44' },
      { name: 'rooniyck', runs: 21, balls: 9, dismissal: 'caught', sr: '233.33' },
      { name: 'arjsoh', runs: 8, balls: 3, dismissal: 'caught', sr: '266.67' },
      { name: '18bat', runs: 8, balls: 3, dismissal: 'caught', sr: '266.67' },
      { name: 'emilylei981', runs: 5, balls: 3, dismissal: 'caught', sr: '166.67' },
      { name: 'og1lucky', runs: 3, balls: 2, dismissal: 'caught', sr: '150.00' },
      { name: 'kdb177', runs: 2, balls: 2, dismissal: 'caught', sr: '100.00' },
      { name: 'xenomphanes', runs: 1, balls: 2, dismissal: 'caught', sr: '50.00' },
    ]
    const inn1Bowlers = [
      { name: 'akhamee', overs: 2.1, runs: 30, wkts: 3, econ: '13.85' },
      { name: '.iper2.', overs: 2.1, runs: 35, wkts: 3, econ: '16.15' },
      { name: 'velizz07', overs: 3.0, runs: 51, wkts: 2, econ: '17.00' },
      { name: 'ravi014', overs: 4.0, runs: 70, wkts: 2, econ: '17.50' },
      { name: 'vithgreat', overs: 2.0, runs: 25, wkts: 1, econ: '12.50' },
      { name: 'stonesmci.', overs: 0.5, runs: 16, wkts: 0, econ: '32.00' },
      { name: 'ghostxa', overs: 1.0, runs: 16, wkts: 0, econ: '16.00' },
      { name: 'abhinav0014', overs: 1.0, runs: 19, wkts: 0, econ: '19.00' },
      { name: '._hulk.44', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'erling_haaland', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'master083964', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'master083964', runs: 66, balls: 18, dismissal: 'bowled', sr: '366.67' },
      { name: '._hulk.44', runs: 27, balls: 11, dismissal: 'bowled', sr: '245.45' },
      { name: 'ravi014', runs: 22, balls: 9, dismissal: 'bowled', sr: '244.44' },
      { name: 'abhinav0014', runs: 17, balls: 6, dismissal: 'bowled', sr: '283.33' },
      { name: 'erling_haaland', runs: 17, balls: 9, dismissal: 'bowled', sr: '188.89' },
      { name: 'velizz07', runs: 16, balls: 8, dismissal: 'bowled', sr: '200.00' },
      { name: 'stonesmci.', runs: 14, balls: 5, dismissal: 'bowled', sr: '280.00' },
      { name: 'akhamee', runs: 11, balls: 3, dismissal: 'bowled', sr: '366.67' },
      { name: '.iper2.', runs: 4, balls: 2, dismissal: 'bowled', sr: '200.00' },
      { name: 'vithgreat', runs: 1, balls: 2, dismissal: 'bowled', sr: '50.00' },
      { name: 'ghostxa', runs: 0, balls: 3, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'vishwamispro0556', overs: 3.0, runs: 40, wkts: 4, econ: '13.33' },
      { name: '18bat', overs: 2.0, runs: 28, wkts: 2, econ: '14.00' },
      { name: 'xenomphanes', overs: 2.4, runs: 31, wkts: 2, econ: '13.29' },
      { name: 'kdb177', overs: 3.0, runs: 55, wkts: 2, econ: '18.33' },
      { name: 'emilylei981', overs: 1.0, runs: 16, wkts: 1, econ: '16.00' },
      { name: '1blonde', overs: 1.0, runs: 25, wkts: 0, econ: '25.00' },
      { name: 'rooniyck', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'sujay', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'chaosbyme', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-09-05',
        venue: '',
        opponent: 'Hyper Realm',
        tournament: 'Cricket Sultans',
        result: 'Dead Poets Society won the game by 66 runs.',
        potm: 'vishwamispro0556',
        innings: {
          create: [
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Hyper Realm',
              total: '272/11', overs: '16.1', extras: 10,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Hyper Realm',
              bowlingTeam: 'Dead Poets Society',
              total: '206/11', overs: '12.4', extras: 11,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded Cricket Sultans match 4 (vs Hyper Realm).')
  }

  const matchCS5 = await prisma.match.findFirst({ where: { opponent: 'Nalle Berozgar', tournament: 'Cricket Sultans' } })
  if (!matchCS5) {
    const inn1Batsmen = [
      { name: 'kshivcharan', runs: 125, balls: 35, dismissal: 'bowled', sr: '357.14' },
      { name: 'beaming.robot', runs: 41, balls: 13, dismissal: 'bowled', sr: '315.38' },
      { name: 'edwardtheenderman', runs: 36, balls: 11, dismissal: 'bowled', sr: '327.27' },
      { name: 'navneet_15', runs: 31, balls: 8, dismissal: 'bowled', sr: '387.50' },
      { name: 'rish_1410', runs: 17, balls: 6, dismissal: 'bowled', sr: '283.33' },
      { name: 'dewald_brevis_17', runs: 14, balls: 4, dismissal: 'bowled', sr: '350.00' },
      { name: '.muzannnn.', runs: 11, balls: 3, dismissal: 'bowled', sr: '366.67' },
      { name: 'daksh_18745', runs: 11, balls: 5, dismissal: 'bowled', sr: '220.00' },
      { name: 'nomaanunfiltered', runs: 5, balls: 5, dismissal: 'bowled', sr: '100.00' },
      { name: 'crizztiano8', runs: 4, balls: 3, dismissal: 'bowled', sr: '133.33' },
      { name: 'unix_2009', runs: 3, balls: 3, dismissal: 'bowled', sr: '100.00' },
    ]
    const inn1Bowlers = [
      { name: 'isagi_17', overs: 3.0, runs: 52, wkts: 3, econ: '17.33' },
      { name: 'vishwamispro0556', overs: 4.0, runs: 81, wkts: 3, econ: '20.25' },
      { name: 'xenomphanes', overs: 2.0, runs: 27, wkts: 2, econ: '13.50' },
      { name: 'kdb177', overs: 3.0, runs: 48, wkts: 2, econ: '16.00' },
      { name: '18bat', overs: 2.0, runs: 42, wkts: 1, econ: '21.00' },
      { name: 'sujay', overs: 1.0, runs: 23, wkts: 0, econ: '23.00' },
      { name: 'emilylei981', overs: 1.0, runs: 25, wkts: 0, econ: '25.00' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nick01311', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'kdb177', runs: 48, balls: 15, dismissal: 'bowled', sr: '320.00' },
      { name: 'xenomphanes', runs: 24, balls: 11, dismissal: 'bowled', sr: '218.18' },
      { name: '18bat', runs: 16, balls: 6, dismissal: 'bowled', sr: '266.67' },
      { name: 'vishwamispro0556', runs: 10, balls: 4, dismissal: 'bowled', sr: '250.00' },
      { name: 'nick01311', runs: 10, balls: 4, dismissal: 'bowled', sr: '250.00' },
      { name: 'sujay', runs: 6, balls: 3, dismissal: 'bowled', sr: '200.00' },
      { name: 'isagi_17', runs: 5, balls: 3, dismissal: 'bowled', sr: '166.67' },
      { name: '1blonde', runs: 4, balls: 3, dismissal: 'bowled', sr: '133.33' },
      { name: 'emilylei981', runs: 1, balls: 2, dismissal: 'bowled', sr: '50.00' },
      { name: 'arjsoh', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'og1lucky', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'daksh_18745', overs: 1.5, runs: 12, wkts: 5, econ: '8.00' },
      { name: 'dewald_brevis_17', overs: 2.0, runs: 25, wkts: 3, econ: '12.50' },
      { name: 'edwardtheenderman', overs: 2.0, runs: 26, wkts: 2, econ: '13.00' },
      { name: 'rish_1410', overs: 1.0, runs: 20, wkts: 1, econ: '20.00' },
      { name: 'beaming.robot', overs: 1.0, runs: 18, wkts: 0, econ: '18.00' },
      { name: '.muzannnn.', overs: 1.0, runs: 23, wkts: 0, econ: '23.00' },
      { name: 'kshivcharan', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'navneet_15', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nomaanunfiltered', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'crizztiano8', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'unix_2009', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-09-06',
        venue: '',
        opponent: 'Nalle Berozgar',
        tournament: 'Cricket Sultans',
        result: 'Nalle Berozgar won the game by 169 runs.',
        potm: 'kshivcharan',
        innings: {
          create: [
            {
              battingTeam: 'Nalle Berozgar',
              bowlingTeam: 'Dead Poets Society',
              total: '308/11', overs: '16.0', extras: 10,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Nalle Berozgar',
              total: '139/11', overs: '8.5', extras: 15,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded Cricket Sultans match 5 (vs Nalle Berozgar).')
  }

  const matchCS6 = await prisma.match.findFirst({ where: { opponent: 'Apex Strikers', tournament: 'Cricket Sultans' } })
  if (!matchCS6) {
    const inn1Batsmen = [
      { name: 'munnatripathiisback', runs: 41, balls: 12, dismissal: 'bowled', sr: '341.67' },
      { name: 'vk_rcb', runs: 25, balls: 8, dismissal: 'bowled', sr: '312.50' },
      { name: 'kane.py', runs: 17, balls: 6, dismissal: 'bowled', sr: '283.33' },
      { name: '91msa91', runs: 16, balls: 7, dismissal: 'bowled', sr: '228.57' },
      { name: 'naatilevade', runs: 15, balls: 8, dismissal: 'bowled', sr: '187.50' },
      { name: 'futurestar18', runs: 13, balls: 4, dismissal: 'bowled', sr: '325.00' },
      { name: '.liberate.', runs: 10, balls: 5, dismissal: 'bowled', sr: '200.00' },
      { name: 'mazhar khan_44', runs: 5, balls: 2, dismissal: 'bowled', sr: '250.00' },
      { name: 'darthvader8018', runs: 1, balls: 2, dismissal: 'bowled', sr: '50.00' },
      { name: 'realarkoxd', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'helloo_234', runs: 0, balls: 2, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'sujay', overs: 3.0, runs: 52, wkts: 4, econ: '17.33' },
      { name: 'kdb177', overs: 1.3, runs: 16, wkts: 2, econ: '12.31' },
      { name: '18bat', overs: 2.0, runs: 31, wkts: 2, econ: '15.50' },
      { name: 'vishwamispro0556', overs: 1.0, runs: 9, wkts: 1, econ: '9.00' },
      { name: 'chaosbyme', overs: 1.0, runs: 15, wkts: 1, econ: '15.00' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'rooniyck', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'xenomphanes', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nick01311', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'rooniyck', runs: 59, balls: 16, dismissal: 'caught', sr: '368.75' },
      { name: 'og1lucky', runs: 41, balls: 12, dismissal: 'caught', sr: '341.67' },
      { name: '18bat', runs: 27, balls: 10, dismissal: 'not out', sr: '270.00' },
      { name: '1blonde', runs: 11, balls: 5, dismissal: 'caught', sr: '220.00' },
      { name: 'chaosbyme', runs: 10, balls: 3, dismissal: 'caught', sr: '333.33' },
      { name: 'arjsoh', runs: 5, balls: 3, dismissal: 'caught', sr: '166.67' },
      { name: 'kdb177', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'vishwamispro0556', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'xenomphanes', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'sujay', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'nick01311', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
    ]
    const inn2Bowlers = [
      { name: 'kane.py', overs: 1.0, runs: 20, wkts: 1, econ: '20.00' },
      { name: 'munnatripathiisback', overs: 1.0, runs: 24, wkts: 1, econ: '24.00' },
      { name: '.liberate.', overs: 1.1, runs: 27, wkts: 1, econ: '23.14' },
      { name: 'futurestar18', overs: 3.0, runs: 47, wkts: 1, econ: '15.67' },
      { name: 'naatilevade', overs: 1.0, runs: 16, wkts: 0, econ: '16.00' },
      { name: 'darthvader8018', overs: 1.0, runs: 19, wkts: 0, econ: '19.00' },
      { name: 'helloo_234', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '91msa91', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'vk_rcb', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'realarkoxd', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'mazhar khan_44', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-09-07',
        venue: '',
        opponent: 'Apex Strikers',
        tournament: 'Cricket Sultans',
        result: 'Dead Poets Society won the game by 7 wickets.',
        potm: 'rooniyck',
        innings: {
          create: [
            {
              battingTeam: 'Apex Strikers',
              bowlingTeam: 'Dead Poets Society',
              total: '153/11', overs: '9.3', extras: 10,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Apex Strikers',
              total: '159/4', overs: '8.1', extras: 6,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded Cricket Sultans match 6 (vs Apex Strikers).')
  }

  const matchCS7 = await prisma.match.findFirst({ where: { opponent: 'The Dream Team', tournament: 'Cricket Sultans' } })
  if (!matchCS7) {
    const inn1Batsmen = [
      { name: '..void.walker.', runs: 27, balls: 8, dismissal: 'bowled', sr: '337.50' },
      { name: 'mick_056', runs: 24, balls: 11, dismissal: 'bowled', sr: '218.18' },
      { name: 'notscrim321', runs: 20, balls: 6, dismissal: 'bowled', sr: '333.33' },
      { name: 'imgood8007', runs: 19, balls: 6, dismissal: 'bowled', sr: '316.67' },
      { name: 'vipsecure', runs: 18, balls: 10, dismissal: 'bowled', sr: '180.00' },
      { name: '_strange49', runs: 17, balls: 5, dismissal: 'bowled', sr: '340.00' },
      { name: 'silence.shhh', runs: 16, balls: 8, dismissal: 'bowled', sr: '200.00' },
      { name: 'orlando.7_', runs: 7, balls: 3, dismissal: 'bowled', sr: '233.33' },
      { name: 'conquerorisback', runs: 4, balls: 2, dismissal: 'bowled', sr: '200.00' },
      { name: 'steveharrington0809', runs: 3, balls: 2, dismissal: 'bowled', sr: '150.00' },
      { name: 'cold9818', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'sujay', overs: 2.2, runs: 38, wkts: 4, econ: '16.29' },
      { name: 'xenomphanes', overs: 2.0, runs: 21, wkts: 3, econ: '10.50' },
      { name: '18bat', overs: 2.0, runs: 33, wkts: 2, econ: '16.50' },
      { name: 'chaosbyme', overs: 1.0, runs: 19, wkts: 1, econ: '19.00' },
      { name: 'kdb177', overs: 2.0, runs: 30, wkts: 1, econ: '15.00' },
      { name: 'vishwamispro0556', overs: 1.0, runs: 14, wkts: 0, econ: '14.00' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'rooniyck', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'arjsoh', runs: 31, balls: 9, dismissal: 'caught', sr: '344.44' },
      { name: 'xenomphanes', runs: 30, balls: 12, dismissal: 'caught', sr: '250.00' },
      { name: 'kdb177', runs: 25, balls: 8, dismissal: 'caught', sr: '312.50' },
      { name: 'rooniyck', runs: 21, balls: 8, dismissal: 'caught', sr: '262.50' },
      { name: '1blonde', runs: 21, balls: 9, dismissal: 'caught', sr: '233.33' },
      { name: 'emilylei981', runs: 13, balls: 4, dismissal: 'not out', sr: '325.00' },
      { name: 'sujay', runs: 13, balls: 4, dismissal: 'caught', sr: '325.00' },
      { name: 'chaosbyme', runs: 8, balls: 3, dismissal: 'caught', sr: '266.67' },
      { name: 'vishwamispro0556', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: 'og1lucky', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
      { name: '18bat', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'vipsecure', overs: 2.0, runs: 25, wkts: 3, econ: '12.50' },
      { name: 'conquerorisback', overs: 3.0, runs: 45, wkts: 3, econ: '15.00' },
      { name: '_strange49', overs: 3.0, runs: 57, wkts: 3, econ: '19.00' },
      { name: 'steveharrington0809', overs: 1.0, runs: 15, wkts: 0, econ: '15.00' },
      { name: 'notscrim321', overs: 1.0, runs: 20, wkts: 0, econ: '20.00' },
      { name: '..void.walker.', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'imgood8007', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'mick_056', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'cold9818', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'orlando.7_', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'silence.shhh', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-09-08',
        venue: '',
        opponent: 'The Dream Team',
        tournament: 'Cricket Sultans',
        result: 'Dead Poets Society won the game by 2 wickets.',
        potm: 'xenomphanes',
        innings: {
          create: [
            {
              battingTeam: 'The Dream Team',
              bowlingTeam: 'Dead Poets Society',
              total: '165/11', overs: '10.2', extras: 10,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'The Dream Team',
              total: '168/9', overs: '10.0', extras: 6,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded Cricket Sultans match 7 (vs The Dream Team).')
  }

  const matchCS8 = await prisma.match.findFirst({ where: { opponent: 'Top Order XI', tournament: 'Cricket Sultans' } })
  if (!matchCS8) {
    const inn1Batsmen = [
      { name: 'blxziee', runs: 34, balls: 11, dismissal: 'bowled', sr: '309.09' },
      { name: 'adibisgoated', runs: 19, balls: 5, dismissal: 'bowled', sr: '380.00' },
      { name: 'the_duos10', runs: 16, balls: 5, dismissal: 'bowled', sr: '320.00' },
      { name: '.quantum_11_vortex', runs: 11, balls: 5, dismissal: 'bowled', sr: '220.00' },
      { name: '4iku.exe', runs: 10, balls: 4, dismissal: 'bowled', sr: '250.00' },
      { name: 'milan3495', runs: 8, balls: 3, dismissal: 'bowled', sr: '266.67' },
      { name: 'composureeee', runs: 4, balls: 4, dismissal: 'bowled', sr: '100.00' },
      { name: 'mfc1886_', runs: 2, balls: 2, dismissal: 'bowled', sr: '100.00' },
      { name: 'rixanmol', runs: 2, balls: 3, dismissal: 'bowled', sr: '66.67' },
      { name: 'windy291208', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'krazymatrix_', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'chaosbyme', overs: 3.0, runs: 41, wkts: 6, econ: '13.67' },
      { name: 'xenomphanes', overs: 3.0, runs: 42, wkts: 3, econ: '14.00' },
      { name: 'kdb177', overs: 0.2, runs: 2, wkts: 1, econ: '6.00' },
      { name: 'sujay', overs: 1.0, runs: 21, wkts: 1, econ: '21.00' },
      { name: 'khushal0__0', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'vishwamispro0556', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '18bat', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nick01311', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'rooniyck', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'sujay', runs: 31, balls: 7, dismissal: 'caught', sr: '442.86' },
      { name: 'rooniyck', runs: 26, balls: 8, dismissal: 'caught', sr: '325.00' },
      { name: 'vishwamispro0556', runs: 24, balls: 9, dismissal: 'caught', sr: '266.67' },
      { name: 'kdb177', runs: 14, balls: 4, dismissal: 'caught', sr: '350.00' },
      { name: '18bat', runs: 7, balls: 3, dismissal: 'caught', sr: '233.33' },
      { name: 'nick01311', runs: 4, balls: 1, dismissal: 'not out', sr: '400.00' },
      { name: 'xenomphanes', runs: 3, balls: 2, dismissal: 'caught', sr: '150.00' },
      { name: 'khushal0__0', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'arjsoh', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'chaosbyme', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'emilylei981', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
    ]
    const inn2Bowlers = [
      { name: 'milan3495', overs: 1.5, runs: 22, wkts: 4, econ: '14.00' },
      { name: 'adibisgoated', overs: 1.0, runs: 19, wkts: 1, econ: '19.00' },
      { name: 'krazymatrix_', overs: 1.0, runs: 20, wkts: 1, econ: '20.00' },
      { name: 'the_duos10', overs: 1.0, runs: 23, wkts: 0, econ: '23.00' },
      { name: 'rixanmol', overs: 1.0, runs: 25, wkts: 0, econ: '25.00' },
      { name: '.quantum_11_vortex', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'windy291208', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: '4iku.exe', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'composureeee', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'blxziee', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'mfc1886_', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-09-09',
        venue: '',
        opponent: 'Top Order XI',
        tournament: 'Cricket Sultans',
        result: 'Dead Poets Society won the game by 5 wickets.',
        potm: 'chaosbyme',
        innings: {
          create: [
            {
              battingTeam: 'Top Order XI',
              bowlingTeam: 'Dead Poets Society',
              total: '120/11', overs: '7.2', extras: 14,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'Top Order XI',
              total: '121/6', overs: '5.5', extras: 12,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded Cricket Sultans match 8 (vs Top Order XI).')
  }

  const sasteNukersMatches = [
    {
      opponent: 'Dynamic Spartans',
      date: '2026-06-20',
      result: 'Dead Poets Society won the game by 3 wickets.',
      potm: '.wirtzzz',
    },
    {
      opponent: 'Head and Shoulder\'s Mafia',
      date: '2026-06-21',
      result: 'HASM won the game by 5 wickets.',
      potm: 'jaspritbumrahgod',
    },
    {
      opponent: 'Sky Hawks',
      date: '2026-06-22',
      result: 'Dead Poets Society won the game by 2 wickets.',
      potm: 'tammy_6969',
    },
    {
      opponent: 'Pakistan Shaheens',
      date: '2026-06-23',
      result: 'Pakistan Shaheens won the game by 240 runs.',
      potm: 'bachi5a',
    },
    {
      opponent: 'Moonlight Wolves',
      date: '2026-06-24',
      result: 'Moonlight Wolves won the game by 101 runs.',
      potm: 'silvxr_7',
    },
    {
      opponent: 'Cemetery Wind',
      date: '2026-06-25',
      result: 'Dead Poets Society won the game by 2 wickets.',
      potm: 'isagi_17',
    },
    {
      opponent: 'Red Dragons',
      date: '2026-06-26',
      result: 'Dead Poets Society won the game by 3 wickets.',
      potm: 'sujay',
    },
    {
      opponent: 'Death Eaters',
      date: '2026-06-27',
      result: 'DEATH EATERS won the game by 33 runs.',
      potm: 'sujay',
    },
    {
      opponent: 'Chokers 49',
      date: '2026-06-28',
      result: 'Chokers 49 won the game by 7 runs.',
      potm: '540d',
    },
  ]

  for (const [si, meta] of sasteNukersMatches.entries()) {
    const existing = await prisma.match.findFirst({ where: { opponent: meta.opponent, tournament: 'Saste Nukers' } })
    if (existing) continue

    const battingEntries: Record<string, Array<{ name: string; runs: number; balls: number; dismissal: string; sr: string }>> = {}
    const bowlingEntries: Record<string, Array<{ name: string; overs: number; runs: number; wkts: number; econ: string }>> = {}

    // ---- Match data ----
    const matchData: Record<string, {
      team1: string; team2: string
      inn1: { total: string; overs: string; extras: number; batsmen: typeof battingEntries['']; bowlers: typeof bowlingEntries[''] }
      inn2: { total: string; overs: string; extras: number; batsmen: typeof battingEntries['']; bowlers: typeof bowlingEntries[''] }
    }> = {
      'Dynamic Spartans': {
        team1: 'Dynamic Spartans', team2: 'Dead Poets Society',
        inn1: {
          total: '158/11', overs: '10.5', extras: 0,
          batsmen: [
            { name: 'orlando.7_', runs: 57, balls: 23, dismissal: 'bowled', sr: '247.83' },
            { name: 'arnavfit', runs: 34, balls: 11, dismissal: 'bowled', sr: '309.09' },
            { name: '.wirtzzz', runs: 30, balls: 9, dismissal: 'bowled', sr: '333.33' },
            { name: '.zunaid.', runs: 18, balls: 7, dismissal: 'bowled', sr: '257.14' },
            { name: 'pencilios', runs: 5, balls: 2, dismissal: 'bowled', sr: '250.00' },
            { name: 'hitman45.264', runs: 5, balls: 2, dismissal: 'bowled', sr: '250.00' },
            { name: 'ankiiiittt', runs: 5, balls: 2, dismissal: 'bowled', sr: '250.00' },
            { name: 'spencerboi', runs: 2, balls: 3, dismissal: 'bowled', sr: '66.67' },
            { name: '.kirchenlied', runs: 2, balls: 3, dismissal: 'bowled', sr: '66.67' },
            { name: '_barath_2009', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: 'chikuu_6469', runs: 0, balls: 2, dismissal: 'bowled', sr: '0.00' },
          ],
          bowlers: [
            { name: 'sujay', overs: 2.5, runs: 36, wkts: 4, econ: '12.71' },
            { name: 'khushal0__0', overs: 2.0, runs: 26, wkts: 3, econ: '13.00' },
            { name: 'xenomphanes', overs: 1.0, runs: 16, wkts: 2, econ: '16.00' },
            { name: 'vs_reddy12', overs: 2.0, runs: 37, wkts: 1, econ: '18.50' },
            { name: 'isagi_17', overs: 3.0, runs: 43, wkts: 1, econ: '14.33' },
            { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'kdb177', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'zenixyt77', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
          ],
        },
        inn2: {
          total: '163/8', overs: '10.1', extras: 0,
          batsmen: [
            { name: 'nervous_pizza1078', runs: 54, balls: 16, dismissal: 'caught', sr: '337.50' },
            { name: 'kdb177', runs: 54, balls: 17, dismissal: 'caught', sr: '317.65' },
            { name: 'vs_reddy12', runs: 20, balls: 11, dismissal: 'caught', sr: '181.82' },
            { name: 'zenixyt77', runs: 9, balls: 4, dismissal: 'caught', sr: '225.00' },
            { name: '1blonde', runs: 7, balls: 3, dismissal: 'caught', sr: '233.33' },
            { name: 'xenomphanes', runs: 7, balls: 4, dismissal: 'caught', sr: '175.00' },
            { name: 'isagi_17', runs: 6, balls: 2, dismissal: 'caught', sr: '300.00' },
            { name: 'shyam.ly', runs: 6, balls: 3, dismissal: 'caught', sr: '200.00' },
            { name: 'arjsoh', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: 'khushal0__0', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: 'sujay', runs: 0, balls: 1, dismissal: 'not out', sr: '0.00' },
          ],
          bowlers: [
            { name: '.wirtzzz', overs: 3.0, runs: 42, wkts: 4, econ: '14.00' },
            { name: '.zunaid.', overs: 2.0, runs: 19, wkts: 2, econ: '9.50' },
            { name: 'orlando.7_', overs: 1.0, runs: 22, wkts: 1, econ: '22.00' },
            { name: 'hitman45.264', overs: 2.0, runs: 33, wkts: 1, econ: '16.50' },
            { name: 'pencilios', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '_barath_2009', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '.kirchenlied', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'ankiiiittt', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'arnavfit', overs: 0.1, runs: 5, wkts: 0, econ: '30.00' },
            { name: 'chikuu_6469', overs: 1.0, runs: 20, wkts: 0, econ: '20.00' },
            { name: 'spencerboi', overs: 1.0, runs: 22, wkts: 0, econ: '22.00' },
          ],
        },
      },
      'Head and Shoulder\'s Mafia': {
        team1: 'Dead Poets Society', team2: 'HASM',
        inn1: {
          total: '55/11', overs: '5.1', extras: 0,
          batsmen: [
            { name: 'zenixyt77', runs: 18, balls: 7, dismissal: 'caught', sr: '257.14' },
            { name: 'kdb177', runs: 12, balls: 5, dismissal: 'caught', sr: '240.00' },
            { name: 'sujay', runs: 6, balls: 2, dismissal: 'caught', sr: '300.00' },
            { name: 'vs_reddy12', runs: 6, balls: 3, dismissal: 'caught', sr: '200.00' },
            { name: 'isagi_17', runs: 5, balls: 3, dismissal: 'caught', sr: '166.67' },
            { name: 'xenomphanes', runs: 4, balls: 3, dismissal: 'caught', sr: '133.33' },
            { name: 'light_6921', runs: 2, balls: 2, dismissal: 'caught', sr: '100.00' },
            { name: 'shyam.ly', runs: 2, balls: 3, dismissal: 'caught', sr: '66.67' },
            { name: 'arjsoh', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
            { name: 'khushal0__0', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
            { name: '1blonde', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
          ],
          bowlers: [
            { name: 'jaspritbumrahgod', overs: 2.0, runs: 24, wkts: 5, econ: '12.00' },
            { name: 'kingsmith.', overs: 1.1, runs: 6, wkts: 2, econ: '5.14' },
            { name: 'humarellaggaye', overs: 1.0, runs: 12, wkts: 2, econ: '12.00' },
            { name: '7thmosby', overs: 1.0, runs: 13, wkts: 2, econ: '13.00' },
            { name: 'pjrockers1', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '.parkerx', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'akshat2377', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'yash.45', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'divinefire5126', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'phantom_menace11', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'siddhant7r', overs: 0, runs: 0, wkts: 0, econ: '' },
          ],
        },
        inn2: {
          total: '60/5', overs: '3.4', extras: 0,
          batsmen: [
            { name: 'akshat2377', runs: 18, balls: 6, dismissal: 'bowled', sr: '300.00' },
            { name: 'pjrockers1', runs: 13, balls: 4, dismissal: 'bowled', sr: '325.00' },
            { name: 'humarellaggaye', runs: 11, balls: 4, dismissal: 'bowled', sr: '275.00' },
            { name: 'yash.45', runs: 9, balls: 4, dismissal: 'bowled', sr: '225.00' },
            { name: 'phantom_menace11', runs: 6, balls: 1, dismissal: 'bowled', sr: '600.00' },
            { name: 'siddhant7r', runs: 3, balls: 2, dismissal: 'bowled', sr: '150.00' },
            { name: '.parkerx', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: 'jaspritbumrahgod', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: 'kingsmith.', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: 'divinefire5126', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: '7thmosby', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
          ],
          bowlers: [
            { name: 'sujay', overs: 2.0, runs: 33, wkts: 3, econ: '16.50' },
            { name: 'vs_reddy12', overs: 1.4, runs: 27, wkts: 2, econ: '16.20' },
            { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'isagi_17', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'xenomphanes', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'light_6921', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'khushal0__0', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'kdb177', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'zenixyt77', overs: 0, runs: 0, wkts: 0, econ: '' },
          ],
        },
      },
      'Sky Hawks': {
        team1: 'Sky Hawks', team2: 'Dead Poets Society',
        inn1: {
          total: '218/11', overs: '13.5', extras: 0,
          batsmen: [
            { name: 'tammy_6969', runs: 91, balls: 30, dismissal: 'bowled', sr: '303.33' },
            { name: 'livv32', runs: 46, balls: 16, dismissal: 'bowled', sr: '287.50' },
            { name: 'max_7_', runs: 23, balls: 10, dismissal: 'bowled', sr: '230.00' },
            { name: 'shu_lmao', runs: 21, balls: 6, dismissal: 'bowled', sr: '350.00' },
            { name: 'zyix.x', runs: 17, balls: 9, dismissal: 'bowled', sr: '188.89' },
            { name: '.hanan.', runs: 10, balls: 3, dismissal: 'bowled', sr: '333.33' },
            { name: 'arthur37483', runs: 9, balls: 4, dismissal: 'bowled', sr: '225.00' },
            { name: 'kitkatmada', runs: 1, balls: 2, dismissal: 'bowled', sr: '50.00' },
            { name: 'call_me.tj.', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: 'frizzy_17', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: 'loneblox', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
          ],
          bowlers: [
            { name: 'kdb177', overs: 1.5, runs: 23, wkts: 3, econ: '12.55' },
            { name: 'isagi_17', overs: 3.0, runs: 45, wkts: 3, econ: '15.00' },
            { name: 'vs_reddy12', overs: 4.0, runs: 65, wkts: 3, econ: '16.25' },
            { name: 'khushal0__0', overs: 1.0, runs: 18, wkts: 1, econ: '18.00' },
            { name: 'xenomphanes', overs: 2.0, runs: 28, wkts: 1, econ: '14.00' },
            { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'sujay', overs: 2.0, runs: 39, wkts: 0, econ: '19.50' },
          ],
        },
        inn2: {
          total: '223/9', overs: '12.5', extras: 0,
          batsmen: [
            { name: 'nervous_pizza1078', runs: 56, balls: 17, dismissal: 'caught', sr: '329.41' },
            { name: 'arjsoh', runs: 54, balls: 19, dismissal: 'caught', sr: '284.21' },
            { name: 'kdb177', runs: 33, balls: 9, dismissal: 'caught', sr: '366.67' },
            { name: 'og1lucky', runs: 25, balls: 7, dismissal: 'caught', sr: '357.14' },
            { name: 'shyam.ly', runs: 19, balls: 8, dismissal: 'caught', sr: '237.50' },
            { name: 'vs_reddy12', runs: 14, balls: 4, dismissal: 'caught', sr: '350.00' },
            { name: 'khushal0__0', runs: 8, balls: 4, dismissal: 'caught', sr: '200.00' },
            { name: 'sujay', runs: 6, balls: 2, dismissal: 'caught', sr: '300.00' },
            { name: 'isagi_17', runs: 5, balls: 3, dismissal: 'caught', sr: '166.67' },
            { name: 'xenomphanes', runs: 3, balls: 3, dismissal: 'not out', sr: '100.00' },
            { name: 'emilylei981', runs: 0, balls: 1, dismissal: 'not out', sr: '0.00' },
          ],
          bowlers: [
            { name: 'tammy_6969', overs: 2.0, runs: 30, wkts: 3, econ: '15.00' },
            { name: 'livv32', overs: 3.0, runs: 44, wkts: 2, econ: '14.67' },
            { name: 'zyix.x', overs: 2.5, runs: 53, wkts: 2, econ: '18.71' },
            { name: 'max_7_', overs: 1.0, runs: 19, wkts: 1, econ: '19.00' },
            { name: 'loneblox', overs: 2.0, runs: 32, wkts: 1, econ: '16.00' },
            { name: 'kitkatmada', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'call_me.tj.', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'frizzy_17', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'arthur37483', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'shu_lmao', overs: 1.0, runs: 21, wkts: 0, econ: '21.00' },
            { name: '.hanan.', overs: 1.0, runs: 24, wkts: 0, econ: '24.00' },
          ],
        },
      },
      'Pakistan Shaheens': {
        team1: 'Pakistan Shaheens', team2: 'Dead Poets Society',
        inn1: {
          total: '385/10', overs: '20.0', extras: 0,
          batsmen: [
            { name: 'bondukhan', runs: 136, balls: 37, dismissal: 'bowled', sr: '367.57' },
            { name: 'bachi5a', runs: 89, balls: 24, dismissal: 'bowled', sr: '370.83' },
            { name: 'impostor1201', runs: 62, balls: 20, dismissal: 'bowled', sr: '310.00' },
            { name: '_sulaimanali', runs: 32, balls: 14, dismissal: 'bowled', sr: '228.57' },
            { name: 'napoleon_france47.', runs: 23, balls: 6, dismissal: 'bowled', sr: '383.33' },
            { name: 'ali.200666', runs: 20, balls: 7, dismissal: 'bowled', sr: '285.71' },
            { name: 'tallybands_19', runs: 14, balls: 6, dismissal: 'bowled', sr: '233.33' },
            { name: 'okand7170', runs: 9, balls: 3, dismissal: 'bowled', sr: '300.00' },
            { name: 'doctorkat__58400', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: '.raiden.7', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: 'ay4n7408', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
          ],
          bowlers: [
            { name: 'khushal0__0', overs: 4.0, runs: 58, wkts: 5, econ: '14.50' },
            { name: 'vs_reddy12', overs: 4.0, runs: 79, wkts: 2, econ: '19.75' },
            { name: 'arjsoh', overs: 1.0, runs: 15, wkts: 1, econ: '15.00' },
            { name: 'sujay', overs: 3.0, runs: 58, wkts: 1, econ: '19.33' },
            { name: 'xenomphanes', overs: 3.0, runs: 64, wkts: 1, econ: '21.33' },
            { name: 'light_6921', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'emilylei981', overs: 1.0, runs: 21, wkts: 0, econ: '21.00' },
            { name: 'og1lucky', overs: 1.0, runs: 32, wkts: 0, econ: '32.00' },
            { name: 'kdb177', overs: 3.0, runs: 58, wkts: 0, econ: '19.33' },
          ],
        },
        inn2: {
          total: '145/11', overs: '9.3', extras: 0,
          batsmen: [
            { name: 'emilylei981', runs: 35, balls: 13, dismissal: 'caught', sr: '269.23' },
            { name: 'vs_reddy12', runs: 29, balls: 11, dismissal: 'caught', sr: '263.64' },
            { name: 'kdb177', runs: 21, balls: 5, dismissal: 'caught', sr: '420.00' },
            { name: 'light_6921', runs: 18, balls: 7, dismissal: 'caught', sr: '257.14' },
            { name: 'xenomphanes', runs: 12, balls: 6, dismissal: 'caught', sr: '200.00' },
            { name: 'arjsoh', runs: 11, balls: 5, dismissal: 'caught', sr: '220.00' },
            { name: 'nervous_pizza1078', runs: 7, balls: 3, dismissal: 'caught', sr: '233.33' },
            { name: 'sujay', runs: 6, balls: 2, dismissal: 'caught', sr: '300.00' },
            { name: 'shyam.ly', runs: 3, balls: 2, dismissal: 'caught', sr: '150.00' },
            { name: 'og1lucky', runs: 3, balls: 2, dismissal: 'caught', sr: '150.00' },
            { name: 'khushal0__0', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
          ],
          bowlers: [
            { name: 'ali.200666', overs: 3.3, runs: 52, wkts: 5, econ: '14.86' },
            { name: 'bachi5a', overs: 3.0, runs: 51, wkts: 4, econ: '17.00' },
            { name: '.raiden.7', overs: 2.0, runs: 26, wkts: 2, econ: '13.00' },
            { name: 'napoleon_france47.', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'doctorkat__58400', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'tallybands_19', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'impostor1201', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'okand7170', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'bondukhan', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'ay4n7408', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '_sulaimanali', overs: 1.0, runs: 16, wkts: 0, econ: '16.00' },
          ],
        },
      },
      'Moonlight Wolves': {
        team1: 'Moonlight Wolves', team2: 'Dead Poets Society',
        inn1: {
          total: '245/11', overs: '14.4', extras: 0,
          batsmen: [
            { name: 'silvxr_7', runs: 57, balls: 18, dismissal: 'bowled', sr: '316.67' },
            { name: 'belugahoyip', runs: 38, balls: 12, dismissal: 'bowled', sr: '316.67' },
            { name: 'akhamee', runs: 30, balls: 11, dismissal: 'bowled', sr: '272.73' },
            { name: 'mr.ekss', runs: 29, balls: 11, dismissal: 'bowled', sr: '263.64' },
            { name: 'raikaushal', runs: 23, balls: 10, dismissal: 'bowled', sr: '230.00' },
            { name: 'tanay1502', runs: 16, balls: 5, dismissal: 'bowled', sr: '320.00' },
            { name: 'sharath.13', runs: 16, balls: 6, dismissal: 'bowled', sr: '266.67' },
            { name: 'ritik6200', runs: 13, balls: 6, dismissal: 'bowled', sr: '216.67' },
            { name: 'swag_18.', runs: 12, balls: 5, dismissal: 'bowled', sr: '240.00' },
            { name: 'alone933', runs: 11, balls: 3, dismissal: 'bowled', sr: '366.67' },
            { name: 'lemon_0088', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
          ],
          bowlers: [
            { name: 'light_6921', overs: 3.0, runs: 50, wkts: 3, econ: '16.67' },
            { name: 'sujay', overs: 2.0, runs: 36, wkts: 2, econ: '18.00' },
            { name: 'khushal0__0', overs: 2.4, runs: 36, wkts: 2, econ: '13.50' },
            { name: 'vs_reddy12', overs: 3.0, runs: 50, wkts: 2, econ: '16.67' },
            { name: 'isagi_17', overs: 3.0, runs: 52, wkts: 2, econ: '17.33' },
            { name: 'kdb177', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'zenixyt77', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'xenomphanes', overs: 1.0, runs: 21, wkts: 0, econ: '21.00' },
          ],
        },
        inn2: {
          total: '144/11', overs: '9.4', extras: 0,
          batsmen: [
            { name: 'light_6921', runs: 45, balls: 13, dismissal: 'caught', sr: '346.15' },
            { name: 'kdb177', runs: 30, balls: 10, dismissal: 'caught', sr: '300.00' },
            { name: 'sujay', runs: 18, balls: 5, dismissal: 'caught', sr: '360.00' },
            { name: 'nervous_pizza1078', runs: 17, balls: 6, dismissal: 'caught', sr: '283.33' },
            { name: 'khushal0__0', runs: 12, balls: 7, dismissal: 'caught', sr: '171.43' },
            { name: 'arjsoh', runs: 10, balls: 4, dismissal: 'caught', sr: '250.00' },
            { name: 'isagi_17', runs: 7, balls: 3, dismissal: 'caught', sr: '233.33' },
            { name: 'shyam.ly', runs: 5, balls: 5, dismissal: 'caught', sr: '100.00' },
            { name: 'xenomphanes', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
            { name: 'zenixyt77', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
            { name: 'vs_reddy12', runs: 0, balls: 3, dismissal: 'caught', sr: '0.00' },
          ],
          bowlers: [
            { name: 'lemon_0088', overs: 4.0, runs: 52, wkts: 6, econ: '13.00' },
            { name: 'silvxr_7', overs: 1.4, runs: 22, wkts: 3, econ: '13.20' },
            { name: 'raikaushal', overs: 1.0, runs: 17, wkts: 1, econ: '17.00' },
            { name: 'sharath.13', overs: 2.0, runs: 31, wkts: 1, econ: '15.50' },
            { name: 'alone933', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'tanay1502', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'ritik6200', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'belugahoyip', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'akhamee', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'mr.ekss', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'swag_18.', overs: 1.0, runs: 22, wkts: 0, econ: '22.00' },
          ],
        },
      },
      'Cemetery Wind': {
        team1: 'Cemetery Wind', team2: 'Dead Poets Society',
        inn1: {
          total: '247/11', overs: '16.1', extras: 0,
          batsmen: [
            { name: 'napoleon_france47.', runs: 88, balls: 31, dismissal: 'bowled', sr: '283.87' },
            { name: 'ncgamerzzz', runs: 44, balls: 17, dismissal: 'bowled', sr: '258.82' },
            { name: 'lakshya_311', runs: 38, balls: 16, dismissal: 'bowled', sr: '237.50' },
            { name: 'legend006256', runs: 30, balls: 13, dismissal: 'bowled', sr: '230.77' },
            { name: 'mrx9880', runs: 22, balls: 6, dismissal: 'bowled', sr: '366.67' },
            { name: 'thegreatestmagicman', runs: 9, balls: 3, dismissal: 'bowled', sr: '300.00' },
            { name: 'kai_55_', runs: 9, balls: 4, dismissal: 'bowled', sr: '225.00' },
            { name: 'chordo6543', runs: 7, balls: 4, dismissal: 'bowled', sr: '175.00' },
            { name: 'aaryan_ali', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: 'hereto98', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: 'mehmood.kms', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
          ],
          bowlers: [
            { name: 'isagi_17', overs: 4.0, runs: 58, wkts: 3, econ: '14.50' },
            { name: 'xenomphanes', overs: 1.1, runs: 18, wkts: 2, econ: '15.43' },
            { name: 'zenixyt77', overs: 2.0, runs: 23, wkts: 2, econ: '11.50' },
            { name: 'kdb177', overs: 3.0, runs: 46, wkts: 2, econ: '15.33' },
            { name: 'vs_reddy12', overs: 2.0, runs: 36, wkts: 1, econ: '18.00' },
            { name: 'sujay', overs: 2.0, runs: 38, wkts: 1, econ: '19.00' },
            { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'shyam.ly', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'khushal0__0', overs: 1.0, runs: 14, wkts: 0, econ: '14.00' },
            { name: 'arjsoh', overs: 1.0, runs: 14, wkts: 0, econ: '14.00' },
          ],
        },
        inn2: {
          total: '251/9', overs: '14.5', extras: 0,
          batsmen: [
            { name: 'arjsoh', runs: 51, balls: 17, dismissal: 'caught', sr: '300.00' },
            { name: 'isagi_17', runs: 46, balls: 15, dismissal: 'caught', sr: '306.67' },
            { name: 'khushal0__0', runs: 36, balls: 12, dismissal: 'caught', sr: '300.00' },
            { name: 'vs_reddy12', runs: 27, balls: 9, dismissal: 'caught', sr: '300.00' },
            { name: 'sujay', runs: 20, balls: 8, dismissal: 'caught', sr: '250.00' },
            { name: '1blonde', runs: 18, balls: 4, dismissal: 'caught', sr: '450.00' },
            { name: 'xenomphanes', runs: 16, balls: 8, dismissal: 'caught', sr: '200.00' },
            { name: 'emilylei981', runs: 14, balls: 6, dismissal: 'caught', sr: '233.33' },
            { name: 'zenixyt77', runs: 14, balls: 6, dismissal: 'caught', sr: '233.33' },
            { name: 'shyam.ly', runs: 5, balls: 1, dismissal: 'not out', sr: '500.00' },
            { name: 'kdb177', runs: 4, balls: 3, dismissal: 'not out', sr: '133.33' },
          ],
          bowlers: [
            { name: 'lakshya_311', overs: 4.0, runs: 55, wkts: 4, econ: '13.75' },
            { name: 'chordo6543', overs: 0.5, runs: 9, wkts: 2, econ: '10.80' },
            { name: 'kai_55_', overs: 2.0, runs: 35, wkts: 1, econ: '17.50' },
            { name: 'aaryan_ali', overs: 3.0, runs: 53, wkts: 1, econ: '17.67' },
            { name: 'legend006256', overs: 3.0, runs: 55, wkts: 1, econ: '18.33' },
            { name: 'napoleon_france47.', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'ncgamerzzz', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'hereto98', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'thegreatestmagicman', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'mrx9880', overs: 1.0, runs: 22, wkts: 0, econ: '22.00' },
            { name: 'mehmood.kms', overs: 1.0, runs: 22, wkts: 0, econ: '22.00' },
          ],
        },
      },
      'Red Dragons': {
        team1: 'Red Dragons', team2: 'Dead Poets Society',
        inn1: {
          total: '146/11', overs: '10.0', extras: 0,
          batsmen: [
            { name: 'hamzaaalalala', runs: 34, balls: 13, dismissal: 'bowled', sr: '261.54' },
            { name: 'dogemcidiot', runs: 26, balls: 12, dismissal: 'bowled', sr: '216.67' },
            { name: 'not.urlight', runs: 16, balls: 8, dismissal: 'bowled', sr: '200.00' },
            { name: 'millie.amy', runs: 15, balls: 5, dismissal: 'bowled', sr: '300.00' },
            { name: 'sahilk10', runs: 11, balls: 3, dismissal: 'bowled', sr: '366.67' },
            { name: 'not.10k', runs: 9, balls: 3, dismissal: 'bowled', sr: '300.00' },
            { name: '8rayx', runs: 5, balls: 4, dismissal: 'bowled', sr: '125.00' },
            { name: 'david.7l', runs: 2, balls: 2, dismissal: 'bowled', sr: '100.00' },
            { name: 'i_rosie', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: 'fw__.k', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: '.shrek69', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
          ],
          bowlers: [
            { name: 'sujay', overs: 4.0, runs: 63, wkts: 6, econ: '15.75' },
            { name: 'isagi_17', overs: 3.0, runs: 41, wkts: 3, econ: '13.67' },
            { name: 'kdb177', overs: 2.0, runs: 19, wkts: 2, econ: '9.50' },
            { name: 'vs_reddy12', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'zenixyt77', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'xenomphanes', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'light_6921', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'milkshaikh0292', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'khushal0__0', overs: 1.0, runs: 20, wkts: 0, econ: '20.00' },
          ],
        },
        inn2: {
          total: '149/8', overs: '10.0', extras: 0,
          batsmen: [
            { name: 'zenixyt77', runs: 32, balls: 14, dismissal: 'caught', sr: '228.57' },
            { name: 'light_6921', runs: 30, balls: 10, dismissal: 'caught', sr: '300.00' },
            { name: 'nervous_pizza1078', runs: 25, balls: 7, dismissal: 'caught', sr: '357.14' },
            { name: 'vs_reddy12', runs: 23, balls: 7, dismissal: 'caught', sr: '328.57' },
            { name: 'khushal0__0', runs: 20, balls: 6, dismissal: 'caught', sr: '333.33' },
            { name: 'milkshaikh0292', runs: 7, balls: 5, dismissal: 'caught', sr: '140.00' },
            { name: 'xenomphanes', runs: 6, balls: 6, dismissal: 'caught', sr: '100.00' },
            { name: 'sujay', runs: 5, balls: 2, dismissal: 'caught', sr: '250.00' },
            { name: 'arjsoh', runs: 1, balls: 2, dismissal: 'not out', sr: '50.00' },
            { name: 'kdb177', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: 'isagi_17', runs: 0, balls: 1, dismissal: 'not out', sr: '0.00' },
          ],
          bowlers: [
            { name: 'i_rosie', overs: 4.0, runs: 49, wkts: 4, econ: '12.25' },
            { name: 'fw__.k', overs: 2.0, runs: 21, wkts: 3, econ: '10.50' },
            { name: 'not.10k', overs: 1.0, runs: 24, wkts: 1, econ: '24.00' },
            { name: 'millie.amy', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'not.urlight', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'dogemcidiot', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '.shrek69', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'david.7l', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '8rayx', overs: 1.0, runs: 11, wkts: 0, econ: '11.00' },
            { name: 'hamzaaalalala', overs: 1.0, runs: 19, wkts: 0, econ: '19.00' },
            { name: 'sahilk10', overs: 1.0, runs: 25, wkts: 0, econ: '25.00' },
          ],
        },
      },
      'Death Eaters': {
        team1: 'DEATH EATERS', team2: 'Dead Poets Society',
        inn1: {
          total: '172/11', overs: '11.2', extras: 0,
          batsmen: [
            { name: 'panautiyokaraja', runs: 53, balls: 17, dismissal: 'bowled', sr: '311.76' },
            { name: 'shadow027198', runs: 25, balls: 6, dismissal: 'bowled', sr: '416.67' },
            { name: 'arpitrai69', runs: 22, balls: 10, dismissal: 'bowled', sr: '220.00' },
            { name: 'goat_leomessi10', runs: 22, balls: 10, dismissal: 'bowled', sr: '220.00' },
            { name: 'krishna_kfo', runs: 19, balls: 7, dismissal: 'bowled', sr: '271.43' },
            { name: 'dewald_brevis_17', runs: 11, balls: 4, dismissal: 'bowled', sr: '275.00' },
            { name: 'fezu786', runs: 4, balls: 2, dismissal: 'bowled', sr: '200.00' },
            { name: 'bailao_mc', runs: 3, balls: 4, dismissal: 'bowled', sr: '75.00' },
            { name: 'theyourchilldude_072...', runs: 1, balls: 2, dismissal: 'bowled', sr: '50.00' },
            { name: 'barrysvn', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: 'mohammadsizan55', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
          ],
          bowlers: [
            { name: 'sujay', overs: 4.0, runs: 54, wkts: 7, econ: '13.50' },
            { name: 'kdb177', overs: 1.2, runs: 20, wkts: 2, econ: '15.00' },
            { name: 'vs_reddy12', overs: 2.0, runs: 30, wkts: 2, econ: '15.00' },
            { name: 'zenixyt77', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'nervous_pizza1078', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'xenomphanes', overs: 0.1, runs: 4, wkts: 0, econ: '24.00' },
            { name: 'light_6921', overs: 1.0, runs: 16, wkts: 0, econ: '16.00' },
            { name: 'isagi_17', overs: 2.0, runs: 32, wkts: 0, econ: '16.00' },
          ],
        },
        inn2: {
          total: '139/11', overs: '9.5', extras: 0,
          batsmen: [
            { name: 'xenomphanes', runs: 53, balls: 20, dismissal: 'caught', sr: '265.00' },
            { name: 'nervous_pizza1078', runs: 28, balls: 11, dismissal: 'caught', sr: '254.55' },
            { name: 'light_6921', runs: 18, balls: 6, dismissal: 'caught', sr: '300.00' },
            { name: 'kdb177', runs: 16, balls: 6, dismissal: 'caught', sr: '266.67' },
            { name: 'zenixyt77', runs: 9, balls: 4, dismissal: 'caught', sr: '225.00' },
            { name: 'og1lucky', runs: 8, balls: 3, dismissal: 'caught', sr: '266.67' },
            { name: 'arjsoh', runs: 3, balls: 2, dismissal: 'caught', sr: '150.00' },
            { name: 'isagi_17', runs: 3, balls: 3, dismissal: 'caught', sr: '100.00' },
            { name: 'vs_reddy12', runs: 1, balls: 2, dismissal: 'caught', sr: '50.00' },
            { name: 'sujay', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
            { name: 'emilylei981', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
          ],
          bowlers: [
            { name: 'bailao_mc', overs: 3.0, runs: 36, wkts: 4, econ: '12.00' },
            { name: 'fezu786', overs: 0.5, runs: 8, wkts: 3, econ: '9.60' },
            { name: 'goat_leomessi10', overs: 2.0, runs: 24, wkts: 2, econ: '12.00' },
            { name: 'shadow027198', overs: 2.0, runs: 33, wkts: 1, econ: '16.50' },
            { name: 'panautiyokaraja', overs: 2.0, runs: 38, wkts: 1, econ: '19.00' },
            { name: 'krishna_kfo', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'arpitrai69', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'mohammadsizan55', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'theyourchilldude_072...', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'dewald_brevis_17', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'barrysvn', overs: 0, runs: 0, wkts: 0, econ: '' },
          ],
        },
      },
      'Chokers 49': {
        team1: 'Chokers 49', team2: 'Dead Poets Society',
        inn1: {
          total: '141/11', overs: '9.5', extras: 0,
          batsmen: [
            { name: 'khushi._1', runs: 51, balls: 22, dismissal: 'bowled', sr: '231.82' },
            { name: 'velizz07', runs: 46, balls: 14, dismissal: 'bowled', sr: '328.57' },
            { name: 'krishna_51500', runs: 37, balls: 13, dismissal: 'bowled', sr: '284.62' },
            { name: 'mercking', runs: 5, balls: 2, dismissal: 'bowled', sr: '250.00' },
            { name: 'chaosbyme', runs: 2, balls: 2, dismissal: 'bowled', sr: '100.00' },
            { name: '.ninja.', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
            { name: '18bat', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: 'kapixz_2208', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: 'trend162', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: 'rebelhere', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
            { name: '540d', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
          ],
          bowlers: [
            { name: 'xenomphanes', overs: 2.5, runs: 34, wkts: 6, econ: '12.00' },
            { name: 'kdb177', overs: 3.0, runs: 41, wkts: 5, econ: '13.67' },
            { name: 'light_6921', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'zenixyt77', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: '1blonde', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'arjsoh', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'sujay', overs: 1.0, runs: 11, wkts: 0, econ: '11.00' },
            { name: 'vs_reddy12', overs: 1.0, runs: 17, wkts: 0, econ: '17.00' },
            { name: 'milkshaikh0292', overs: 1.0, runs: 18, wkts: 0, econ: '18.00' },
            { name: 'khushal0__0', overs: 1.0, runs: 20, wkts: 0, econ: '20.00' },
          ],
        },
        inn2: {
          total: '134/11', overs: '10.0', extras: 0,
          batsmen: [
            { name: 'kdb177', runs: 36, balls: 10, dismissal: 'caught', sr: '360.00' },
            { name: 'sujay', runs: 29, balls: 12, dismissal: 'caught', sr: '241.67' },
            { name: 'arjsoh', runs: 15, balls: 8, dismissal: 'caught', sr: '187.50' },
            { name: 'khushal0__0', runs: 15, balls: 9, dismissal: 'caught', sr: '166.67' },
            { name: '1blonde', runs: 14, balls: 6, dismissal: 'caught', sr: '233.33' },
            { name: 'zenixyt77', runs: 12, balls: 6, dismissal: 'caught', sr: '200.00' },
            { name: 'light_6921', runs: 8, balls: 3, dismissal: 'caught', sr: '266.67' },
            { name: 'xenomphanes', runs: 3, balls: 3, dismissal: 'caught', sr: '100.00' },
            { name: 'milkshaikh0292', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
            { name: 'vs_reddy12', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
            { name: 'og1lucky', runs: 0, balls: 1, dismissal: 'caught', sr: '0.00' },
          ],
          bowlers: [
            { name: '540d', overs: 4.0, runs: 31, wkts: 8, econ: '7.75' },
            { name: '.ninja.', overs: 1.4, runs: 32, wkts: 2, econ: '19.20' },
            { name: 'mercking', overs: 2.0, runs: 21, wkts: 1, econ: '10.50' },
            { name: 'velizz07', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'chaosbyme', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'trend162', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'rebelhere', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'krishna_51500', overs: 0, runs: 0, wkts: 0, econ: '' },
            { name: 'kapixz_2208', overs: 0.2, runs: 10, wkts: 0, econ: '30.00' },
            { name: '18bat', overs: 1.0, runs: 17, wkts: 0, econ: '17.00' },
            { name: 'khushi._1', overs: 1.0, runs: 21, wkts: 0, econ: '21.00' },
          ],
        },
      },
    }

    const md = matchData[meta.opponent]

    await prisma.match.create({
      data: {
        matchNumber: 1 + si,
        date: meta.date,
        venue: '',
        opponent: meta.opponent,
        tournament: 'Saste Nukers',
        result: meta.result,
        potm: meta.potm,
        innings: {
          create: [
            {
              battingTeam: md.team1,
              bowlingTeam: md.team2,
              total: md.inn1.total,
              overs: md.inn1.overs,
              extras: md.inn1.extras,
              batsmen: { create: md.inn1.batsmen },
              bowlers: { create: md.inn1.bowlers },
            },
            {
              battingTeam: md.team2,
              bowlingTeam: md.team1,
              total: md.inn2.total,
              overs: md.inn2.overs,
              extras: md.inn2.extras,
              batsmen: { create: md.inn2.batsmen },
              bowlers: { create: md.inn2.bowlers },
            },
          ],
        },
      },
    })

    console.log(`Seeded Saste Nukers match (vs ${meta.opponent}).`)
  }

  await prisma.match.updateMany({
    where: { tournament: 'Markhors' },
    data: { matchNumber: null },
  })
  const snNumbers: Record<string, number> = {
    'Dynamic Spartans': 1, "Head and Shoulder's Mafia": 2, 'Sky Hawks': 3,
    'Pakistan Shaheens': 4, 'Moonlight Wolves': 5, 'Cemetery Wind': 6,
    'Red Dragons': 7, 'Death Eaters': 8, 'Chokers 49': 9,
  }
  for (const [opponent, num] of Object.entries(snNumbers)) {
    await prisma.match.updateMany({
      where: { opponent, tournament: 'Saste Nukers' },
      data: { matchNumber: num },
    })
  }

  const bfPlaceholder = await prisma.match.findFirst({ where: { tournament: 'Blue Forge' } })
  if (!bfPlaceholder) {
    await prisma.match.create({
      data: {
        date: '2026-09-10',
        venue: '',
        opponent: 'TBD',
        tournament: 'Blue Forge',
        result: 'TBD',
        potm: 'TBD',
        innings: {
          create: [
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'TBD',
              total: '0/0', overs: '0.0', extras: 0,
              batsmen: { create: [{ name: 'kdb177', runs: 0, balls: 0, dismissal: 'dnb', sr: '' }] },
              bowlers: { create: [{ name: 'sujay', overs: 0, runs: 0, wkts: 0, econ: '' }] },
            },
            {
              battingTeam: 'TBD',
              bowlingTeam: 'Dead Poets Society',
              total: '0/0', overs: '0.0', extras: 0,
              batsmen: { create: [{ name: 'sujay', runs: 0, balls: 0, dismissal: 'dnb', sr: '' }] },
              bowlers: { create: [{ name: 'kdb177', overs: 0, runs: 0, wkts: 0, econ: '' }] },
            },
          ],
        },
      },
    })
    console.log('Seeded Blue Forge placeholder.')
  }

  const hcmlPlaceholder = await prisma.match.findFirst({ where: { tournament: 'HCML S2' } })
  if (!hcmlPlaceholder) {
    await prisma.match.create({
      data: {
        date: '2026-09-10',
        venue: '',
        opponent: 'TBD',
        tournament: 'HCML S2',
        result: 'TBD',
        potm: 'TBD',
        innings: {
          create: [
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'TBD',
              total: '0/0', overs: '0.0', extras: 0,
              batsmen: { create: [{ name: 'kdb177', runs: 0, balls: 0, dismissal: 'dnb', sr: '' }] },
              bowlers: { create: [{ name: 'sujay', overs: 0, runs: 0, wkts: 0, econ: '' }] },
            },
            {
              battingTeam: 'TBD',
              bowlingTeam: 'Dead Poets Society',
              total: '0/0', overs: '0.0', extras: 0,
              batsmen: { create: [{ name: 'sujay', runs: 0, balls: 0, dismissal: 'dnb', sr: '' }] },
              bowlers: { create: [{ name: 'kdb177', overs: 0, runs: 0, wkts: 0, econ: '' }] },
            },
          ],
        },
      },
    })
    console.log('Seeded HCML S2 placeholder.')
  }

  const matchBF1 = await prisma.match.findFirst({ where: { opponent: 'HCK14', tournament: 'Blue Forge' } })
  if (!matchBF1) {
    const inn1Batsmen = [
      { name: 'adityagamingeafc', runs: 44, balls: 13, dismissal: 'bowled', sr: '338.46' },
      { name: 'vegetadm', runs: 25, balls: 12, dismissal: 'bowled', sr: '208.33' },
      { name: 'arthmsdian', runs: 15, balls: 5, dismissal: 'bowled', sr: '300.00' },
      { name: 'navneet_15', runs: 13, balls: 4, dismissal: 'bowled', sr: '325.00' },
      { name: 'shayan___23', runs: 9, balls: 4, dismissal: 'bowled', sr: '225.00' },
      { name: 'bailao_mc', runs: 8, balls: 4, dismissal: 'bowled', sr: '200.00' },
      { name: 'dewald_brevis_17', runs: 6, balls: 2, dismissal: 'bowled', sr: '300.00' },
      { name: 'itzfuko', runs: 3, balls: 2, dismissal: 'bowled', sr: '150.00' },
      { name: 'unix_2009', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'ft.sam', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
      { name: 'nomaanunfiltered', runs: 0, balls: 1, dismissal: 'bowled', sr: '0.00' },
    ]
    const inn1Bowlers = [
      { name: 'chaosbyme', overs: 3.0, runs: 39, wkts: 5, econ: '13.00' },
      { name: 'sujay', overs: 3.0, runs: 42, wkts: 4, econ: '14.00' },
      { name: 'arjsoh', overs: 0.1, runs: 0, wkts: 1, econ: '0.00' },
      { name: '18bat', overs: 2.0, runs: 42, wkts: 1, econ: '21.00' },
      { name: 'kdb177', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'vishwamispro0556', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'xenomphanes', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'zenix69x', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'emilylei981', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nick01311', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'og1lucky', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]
    const inn2Batsmen = [
      { name: 'vishwamispro0556', runs: 43, balls: 12, dismissal: 'caught', sr: '358.33' },
      { name: 'nick01311', runs: 41, balls: 16, dismissal: 'not out', sr: '256.25' },
      { name: 'zenix69x', runs: 16, balls: 7, dismissal: 'caught', sr: '228.57' },
      { name: 'emilylei981', runs: 14, balls: 4, dismissal: 'caught', sr: '350.00' },
      { name: '18bat', runs: 7, balls: 3, dismissal: 'caught', sr: '233.33' },
      { name: 'arjsoh', runs: 6, balls: 3, dismissal: 'caught', sr: '200.00' },
      { name: 'kdb177', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'chaosbyme', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'xenomphanes', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'sujay', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
      { name: 'og1lucky', runs: 0, balls: 0, dismissal: 'dnb', sr: '' },
    ]
    const inn2Bowlers = [
      { name: 'bailao_mc', overs: 2.0, runs: 34, wkts: 2, econ: '17.00' },
      { name: 'ft.sam', overs: 1.0, runs: 23, wkts: 1, econ: '23.00' },
      { name: 'unix_2009', overs: 2.0, runs: 29, wkts: 1, econ: '14.50' },
      { name: 'dewald_brevis_17', overs: 1.0, runs: 13, wkts: 0, econ: '13.00' },
      { name: 'vegetadm', overs: 1.3, runs: 28, wkts: 0, econ: '18.67' },
      { name: 'arthmsdian', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'navneet_15', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'adityagamingeafc', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'shayan___23', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'nomaanunfiltered', overs: 0, runs: 0, wkts: 0, econ: '' },
      { name: 'itzfuko', overs: 0, runs: 0, wkts: 0, econ: '' },
    ]

    await prisma.match.create({
      data: {
        date: '2026-09-10',
        venue: '',
        opponent: 'HCK14',
        tournament: 'Blue Forge',
        result: 'Dead Poets Society won the game by 7 wickets.',
        potm: 'chaosbyme',
        innings: {
          create: [
            {
              battingTeam: 'HCK14',
              bowlingTeam: 'Dead Poets Society',
              total: '132/11', overs: '8.1', extras: 9,
              batsmen: { create: inn1Batsmen },
              bowlers: { create: inn1Bowlers },
            },
            {
              battingTeam: 'Dead Poets Society',
              bowlingTeam: 'HCK14',
              total: '135/4', overs: '7.3', extras: 8,
              batsmen: { create: inn2Batsmen },
              bowlers: { create: inn2Bowlers },
            },
          ],
        },
      },
    })
    console.log('Seeded Blue Forge match 1 (vs HCK14).')
  }

  console.log('Seeding complete.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
