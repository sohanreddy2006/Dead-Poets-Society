import { Suspense } from "react"
import PlayersClient from "./PlayersClient"

export default function PlayersPage() {
  return <Suspense><PlayersClient /></Suspense>
}
