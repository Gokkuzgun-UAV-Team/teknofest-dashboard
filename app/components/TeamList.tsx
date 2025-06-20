import { useTeams } from "../hooks/useTeams"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Plane } from "lucide-react"

export default function TeamList() {
  const teams = useTeams()

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-100 text-green-800 border border-green-200">Aktif</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">Uyarı</Badge>
      case "offline":
        return <Badge className="bg-red-100 text-red-800 border border-red-200">Çevrimdışı</Badge>
      default:
        return <Badge className="bg-gray-600 text-white hover:bg-gray-700">Bilinmiyor</Badge>
    }
  }

  const getKamikazeStatus = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-orange-100 text-orange-800 border border-orange-200">Kamikaze Aktif</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 border border-blue-200">Kamikaze Tamamlandı</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="bg-white border-gray-200 shadow-sm h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-blue-400" />
          Bağlı Takımlar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="p-4 rounded-lg bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(team.status)}`} />
                    <span className="font-semibold">#{team.id}</span>
                  </div>
                  {getStatusBadge(team.status)}
                </div>
                <h3 className="font-bold text-lg mb-2">{team.name}</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Konum:</span>
                    <span>
                      {team.position.lat.toFixed(4)}, {team.position.lng.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Yükseklik:</span>
                    <span>{team.position.alt}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hız:</span>
                    <span>{team.speed} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Batarya:</span>
                    <span className={team.battery < 30 ? "text-red-400" : "text-green-400"}>{team.battery}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kilitlenmeler:</span>
                    <span className="text-yellow-400">{team.lockTargets}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">{getKamikazeStatus(team.kamikazeStatus)}</div>
                <p className="text-xs text-gray-500 mt-2">Son güncelleme: {team.lastUpdate}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
