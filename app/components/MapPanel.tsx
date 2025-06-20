import { useTeams } from "../hooks/useTeams"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Shield, QrCode } from "lucide-react"
import { useEffect, useState } from "react"
import { DefenseSystem } from "../types/types"

export default function MapPanel() {
  const teams = useTeams()

  const [defenseSystems, setDefenseSystems] = useState<DefenseSystem[]>([
    { id: 1, position: { lat: 40.715, lng: 29.015 }, radius: 500, active: true },
    { id: 2, position: { lat: 40.71, lng: 29.01 }, radius: 300, active: false },
  ])

  const [qrPosition] = useState({ lat: 40.716, lng: 29.016 })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="bg-white border-gray-200 shadow-sm mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-400" />
          Yarışma Alanı Haritası
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 rounded-lg p-4 h-80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-50" />

          {teams.map((team) => (
            <div
              key={team.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(team.position.lng - 29.0) * 2000 + 50}%`,
                top: `${(40.72 - team.position.lat) * 2000 + 50}%`,
              }}
            >
              <div
                className={`w-4 h-4 rounded-full ${getStatusColor(team.status)} border-2 border-white shadow-lg`}
              />
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black px-1 rounded">
                #{team.id}
              </span>
            </div>
          ))}

          {defenseSystems.map((system) => (
            <div
              key={system.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(system.position.lng - 29.0) * 2000 + 50}%`,
                top: `${(40.72 - system.position.lat) * 2000 + 50}%`,
              }}
            >
              <div
                className={`w-6 h-6 rounded-full ${system.active ? "bg-red-500" : "bg-gray-500"} border-2 border-white flex items-center justify-center`}
              >
                <Shield className="w-3 h-3" />
              </div>
            </div>
          ))}

          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(qrPosition.lng - 29.0) * 2000 + 50}%`,
              top: `${(40.72 - qrPosition.lat) * 2000 + 50}%`,
            }}
          >
            <div className="w-5 h-5 bg-purple-500 border-2 border-white flex items-center justify-center">
              <QrCode className="w-3 h-3" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
