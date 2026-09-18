import ManageData from "@/components/ManageData"
import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export default async function ManagePage() {
  const session = await getSession()
  let playerUsername: string | null = null

  if (session?.user?.playerId) {
    const player = await prisma.player.findUnique({
      where: { id: session.user.playerId },
      select: { username: true },
    })
    playerUsername = player?.username ?? null
  }

  return (
    <div className="card">
      <div className="card-title">Manage Data</div>
      <p style={{ color: "#94a3b8", marginBottom: 10, fontSize: 13 }}>
        Export, import, or clear all data.
      </p>
      {playerUsername && (
        <p style={{ color: "#2FBF9F", marginBottom: 10, fontSize: 12, fontWeight: 600 }}>
          Signed in as {playerUsername}
        </p>
      )}
      <ManageData />
    </div>
  )
}
