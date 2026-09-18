require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") })
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

const TEAM_NAME = "Dead Poets Society"

// ─── helpers ────────────────────────────────────────────────────────

function pct(n, d) { return d === 0 ? "0.00" : ((n / d) * 100).toFixed(2) }

function avg(n, d) { return d === 0 ? "0.00" : (n / d).toFixed(2) }

function calcPlayerStats(name, matches) {
  let runs = 0, balls = 0, fours = 0, sixes = 0, dismissals = 0
  let wkts = 0, overs = 0, runsGiven = 0, bowlEntries = 0
  let mvp = 0, innsBat = 0, innsBowl = 0, threeWkts = 0, fiveWkts = 0
  const matchIds = new Set()

  for (const m of matches) {
    if (m.deletedAt) continue
    let played = false
    for (const inn of m.innings) {
      if (inn.battingTeam === TEAM_NAME) {
        const b = inn.batsmen.find(b => b.name.toLowerCase() === name.toLowerCase())
        if (b && b.dismissal !== "dnb") {
          runs += b.runs; balls += b.balls; fours += b.fours; sixes += b.sixes
          if (b.dismissal !== "not out" && b.dismissal !== "dnb" && b.dismissal !== "") dismissals++
          innsBat++; played = true
          if (b.runs >= 50) { /* 50s tracked */ }
        }
        if (b && b.dismissal === "dnb") { innsBat++ }
      }
      if (inn.bowlingTeam === TEAM_NAME) {
        const bw = inn.bowlers.find(b => b.name.toLowerCase() === name.toLowerCase())
        if (bw && bw.overs > 0) {
          wkts += bw.wkts; runsGiven += bw.runs; overs += bw.overs; bowlEntries++
          innsBowl++; played = true
          if (bw.wkts >= 5) fiveWkts++
          else if (bw.wkts >= 3) threeWkts++
        }
        if (bw && bw.overs === 0 && bw.runs === 0 && bw.wkts === 0) { innsBowl++ }
      }
    }
    if (played) matchIds.add(m.id)
    if (m.potm && m.potm.toLowerCase() === name.toLowerCase()) mvp++
  }

  const matchesPlayed = matchIds.size
  const batAvg = dismissals > 0 ? avg(runs, dismissals) : runs > 0 ? `${runs}` : "0.00"
  const sr = balls > 0 ? avg(runs * 100, balls) : "0.00"
  const economy = runsGiven > 0 && overs > 0 ? avg(runsGiven, overs) : "0.00"
  const bowlAvg = wkts > 0 ? avg(runsGiven, wkts) : "0.00"
  const srNum = parseFloat(sr) || 0
  const impact = Math.round(runs * srNum / 100 + wkts * 25 + mvp * 30)

  return { matches: matchesPlayed, innsBat, innsBowl, runs, balls, fours, sixes, dismissals, batAvg, sr, wkts, overs, runsGiven, economy, bowlAvg, threeWkts, fiveWkts, mvp, impact }
}

function getRoleColor(role) {
  if (role === "Bowler") return 0x2FBF9F
  if (role === "All-Rounder") return 0x8E86C7
  return 0xE8B84B
}

// ─── commands ───────────────────────────────────────────────────────

async function cmdStats(name) {
  const player = await prisma.player.findUnique({ where: { username: name.toLowerCase() } })
  if (!player) return { content: `Player **${name}** not found in the roster.` }

  const matches = await prisma.match.findMany({
    where: { deletedAt: null },
    include: { innings: { include: { batsmen: true, bowlers: true } } },
    orderBy: { id: "asc" },
  })

  const s = calcPlayerStats(player.username, matches)
  const roleColor = getRoleColor(player.role)

  const embed = new EmbedBuilder()
    .setColor(roleColor)
    .setTitle(player.username)
    .setDescription(`**${player.role}** — ${s.matches} matches`)
    .addFields(
      { name: "🏏 Batting", value: `Runs: **${s.runs}** | Balls: **${s.balls}** | Avg: **${s.batAvg}** | SR: **${s.sr}**`, inline: false },
      { name: "⚾ Bowling", value: `Wkts: **${s.wkts}** | Overs: **${s.overs.toFixed(1)}** | Econ: **${s.economy}** | Avg: **${s.bowlAvg}**`, inline: false },
      { name: "🏆 Impact", value: `**${s.impact}** (${s.mvp} POTM, ${s.threeWkts}×3w, ${s.fiveWkts}×5w)`, inline: false },
    )
    .setFooter({ text: "Dead Poets Society · Cricket Stats" })

  return { embeds: [embed] }
}

async function cmdLeaderboard(category) {
  const matches = await prisma.match.findMany({
    where: { deletedAt: null },
    include: { innings: { include: { batsmen: true, bowlers: true } } },
    orderBy: { id: "asc" },
  })

  const players = await prisma.player.findMany({ where: { isRosterPlayer: true } })
  const statsMap = {}
  for (const p of players) {
    statsMap[p.username] = calcPlayerStats(p.username, matches)
  }

  let sorted, label, color, valueKey
  if (category === "wkts" || category === "wickets" || category === "bowling") {
    color = 0x2FBF9F
    label = "Most Wickets"
    valueKey = "wkts"
    sorted = players.sort((a, b) => statsMap[b.username].wkts - statsMap[a.username].wkts).slice(0, 10)
  } else if (category === "impact") {
    color = 0x8E86C7
    label = "Highest Impact"
    valueKey = "impact"
    sorted = players.sort((a, b) => statsMap[b.username].impact - statsMap[a.username].impact).slice(0, 10)
  } else {
    color = 0xE8B84B
    label = "Most Runs"
    valueKey = "runs"
    sorted = players.sort((a, b) => statsMap[b.username].runs - statsMap[a.username].runs).slice(0, 10)
  }

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(`🏆 ${label}`)
    .setDescription(sorted.map((p, i) => {
      const val = statsMap[p.username][valueKey]
      return `\`${String(i + 1).padStart(2, " ")}\` **${p.username}** — ${val}`
    }).join("\n"))
    .setFooter({ text: "Dead Poets Society · Cricket Stats" })

  return { embeds: [embed] }
}

async function cmdSquad() {
  const players = await prisma.player.findMany({
    where: { isRosterPlayer: true },
    orderBy: { username: "asc" },
  })

  const batters = players.filter(p => p.role === "Batter")
  const bowlers = players.filter(p => p.role === "Bowler")
  const ars = players.filter(p => p.role === "All-Rounder")

  const embed = new EmbedBuilder()
    .setColor(0xE8B84B)
    .setTitle("Dead Poets Society — Squad")
    .addFields(
      { name: `🟡 Batters (${batters.length})`, value: batters.map(p => `**${p.username}**`).join("\n") || "None", inline: true },
      { name: `🟢 Bowlers (${bowlers.length})`, value: bowlers.map(p => `**${p.username}**`).join("\n") || "None", inline: true },
      { name: `🟣 All-Rounders (${ars.length})`, value: ars.map(p => `**${p.username}**`).join("\n") || "None", inline: true },
    )
    .setFooter({ text: "Dead Poets Society · Cricket Stats" })

  return { embeds: [embed] }
}

async function cmdHelp() {
  const embed = new EmbedBuilder()
    .setColor(0xE8B84B)
    .setTitle("Bot Commands")
    .setDescription([
      "`!stats <player>` — Show player stats",
      "`!lb runs|wkts|impact` — Show leaderboard",
      "`!squad` — Show full squad",
      "`!help` — Show this message",
    ].join("\n"))
    .setFooter({ text: "Dead Poets Society · Cricket Stats" })

  return { embeds: [embed] }
}

// ─── main ───────────────────────────────────────────────────────────

client.on("messageCreate", async msg => {
  if (msg.author.bot || !msg.content.startsWith("!")) return

  const [cmd, ...args] = msg.content.slice(1).split(/\s+/)

  try {
    let reply
    switch (cmd.toLowerCase()) {
      case "stats":
        if (!args.length) { reply = { content: "Usage: `!stats <playername>`" }; break }
        reply = await cmdStats(args.join(" "))
        break
      case "lb":
      case "leaderboard":
        reply = await cmdLeaderboard(args[0] || "runs")
        break
      case "squad":
        reply = await cmdSquad()
        break
      default:
        reply = await cmdHelp()
    }
    msg.reply(reply)
  } catch (err) {
    console.error(err)
    msg.reply({ content: "An error occurred." })
  }
})

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
})

const token = process.env.DISCORD_BOT_TOKEN
if (!token) {
  console.error("DISCORD_BOT_TOKEN not set in .env")
  process.exit(1)
}

client.login(token)
