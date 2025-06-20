export interface Team {
  id: number
  name: string
  status: "online" | "offline" | "warning"
  position: { lat: number; lng: number; alt: number }
  speed: number
  battery: number
  lastUpdate: string
  lockTargets: number
  kamikazeStatus: "none" | "active" | "completed"
}

export interface DefenseSystem {
  id: number
  position: { lat: number; lng: number }
  radius: number
  active: boolean
}

export interface Event {
  id: number
  teamId: number
  type: "telemetry" | "lock" | "kamikaze" | "login"
  message: string
  timestamp: string
}
