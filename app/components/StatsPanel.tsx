import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, QrCode, Users } from "lucide-react"
import { Event, Team, DefenseSystem } from "../types/types"
import { useTeams } from "@/hooks/useTeams"

export default function StatsPanel() {
  const teams = useTeams()
  //test
  const [defenseSystems, setDefenseSystems] = useState<DefenseSystem[]>([
    { id: 1, position: { lat: 40.715, lng: 29.015 }, radius: 500, active: true },
    { id: 2, position: { lat: 40.71, lng: 29.01 }, radius: 300, active: false },
  ])

  const [events, setEvents] = useState<Event[]>([
    { id: 1, teamId: 1001, type: "lock", message: "Takım 1002'ye başarılı kilitlenme", timestamp: "14:32:15" },
    { id: 2, teamId: 1002, type: "kamikaze", message: "Kamikaze görevi başlatıldı", timestamp: "14:31:45" },
    { id: 3, teamId: 1003, type: "telemetry", message: "Düşük batarya uyarısı", timestamp: "14:31:20" },
    { id: 4, teamId: 1001, type: "telemetry", message: "Telemetri güncellendi", timestamp: "14:31:10" },
  ])

  const getEventIcon = (type: string) => {
    switch (type) {
      case "telemetry":
        return <AlertTriangle className="w-4 h-4" />
      case "lock":
        return <QrCode className="w-4 h-4" />
      case "kamikaze":
        return <AlertTriangle className="w-4 h-4" />
      case "login":
        return <Users className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <>
      <Card className="bg-white border-gray-200 shadow-sm mb-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Son Aktiviteler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="text-blue-400 mt-0.5">{getEventIcon(event.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">#{event.teamId}</p>
                    <p className="text-xs text-gray-600 break-words">{event.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm">Yarışma İstatistikleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Toplam Kilitlenme</span>
              <span className="font-bold text-yellow-400">
                {teams.reduce((sum, team) => sum + team.lockTargets, 0)}
              </span>
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Aktif Kamikaze</span>
              <span className="font-bold text-orange-400">
                {teams.filter((t) => t.kamikazeStatus === "active").length}
              </span>
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ortalama Batarya</span>
              <span className="font-bold text-green-400">
                {Math.round(teams.reduce((sum, team) => sum + team.battery, 0) / teams.length)}%
              </span>
            </div>
            <Separator className="bg-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Aktif HSS</span>
              <span className="font-bold text-red-400">{defenseSystems.filter((s) => s.active).length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
