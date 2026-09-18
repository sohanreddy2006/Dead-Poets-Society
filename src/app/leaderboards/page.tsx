import { Suspense } from "react"
import LeaderboardsClient from "./LeaderboardsClient"

export default function LeaderboardsPage() {
  return <Suspense><LeaderboardsClient /></Suspense>
}
