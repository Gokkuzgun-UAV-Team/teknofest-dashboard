import { useEffect, useState } from "react"
import { Team } from "../types/types"

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    console.log("Fetching teams data...")
    const fetchTeams = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/teams")
        const data = await res.json()
        console.log("Teams data fetched successfully:", data)
        
        setTeams(data)
      } catch (err) {
        console.error("Takım verileri alınamadı:", err)
      }
    }

    fetchTeams()
  }, [])

  return teams
}
