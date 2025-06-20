"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Plane, Target, Clock, Users, MapPin, Shield, QrCode, AlertTriangle } from "lucide-react"

interface Team {
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

interface DefenseSystem {
  id: number
  position: { lat: number; lng: number }
  radius: number
  active: boolean
}

interface Event {
  id: number
  teamId: number
  type: "telemetry" | "lock" | "kamikaze" | "login"
  message: string
  timestamp: string
}

export default function TeknoFestDashboard() {
  const [serverTime, setServerTime] = useState(new Date())
  const [teams, setTeams] = useState<Team[]>([]);
    // {
    //   id: 1001,
    //   name: "Kartal Takımı",
    //   status: "online",
    //   position: { lat: 40.7128, lng: 29.0128, alt: 150 },
    //   speed: 45,
    //   battery: 87,
    //   lastUpdate: "2 saniye önce",
    //   lockTargets: 2,
    //   kamikazeStatus: "none",
    // },
    // {
    //   id: 1002,
    //   name: "Şahin Takımı",
    //   status: "online",
    //   position: { lat: 40.72, lng: 29.02, alt: 180 },
    //   speed: 52,
    //   battery: 92,
    //   lastUpdate: "1 saniye önce",
    //   lockTargets: 1,
    //   kamikazeStatus: "active",
    // },
    // {
    //   id: 1003,
    //   name: "Atmaca Takımı",
    //   status: "warning",
    //   position: { lat: 40.705, lng: 29.005, alt: 120 },
    //   speed: 38,
    //   battery: 23,
    //   lastUpdate: "15 saniye önce",
    //   lockTargets: 0,
    //   kamikazeStatus: "completed",
    // },
    // {
    //   id: 1004,
    //   name: "Doğan Takımı",
    //   status: "offline",
    //   position: { lat: 40.718, lng: 29.018, alt: 0 },
    //   speed: 0,
    //   battery: 0,
    //   lastUpdate: "2 dakika önce",
    //   lockTargets: 0,
    //   kamikazeStatus: "none",
    // },
  // ])

  const [defenseSystems, setDefenseSystems] = useState<DefenseSystem[]>([
    { id: 1, position: { lat: 40.715, lng: 29.015 }, radius: 500, active: true },
    { id: 2, position: { lat: 40.71, lng: 29.01 }, radius: 300, active: false },
  ])

  const [qrPosition] = useState({ lat: 40.716, lng: 29.016 })

  const [events, setEvents] = useState<Event[]>([
    { id: 1, teamId: 1001, type: "lock", message: "Takım 1002'ye başarılı kilitlenme", timestamp: "14:32:15" },
    { id: 2, teamId: 1002, type: "kamikaze", message: "Kamikaze görevi başlatıldı", timestamp: "14:31:45" },
    { id: 3, teamId: 1003, type: "telemetry", message: "Düşük batarya uyarısı", timestamp: "14:31:20" },
    { id: 4, teamId: 1001, type: "telemetry", message: "Telemetri güncellendi", timestamp: "14:31:10" },
  ])

  useEffect(() => {
    
    const timer = setInterval(() => {
      setServerTime(new Date())
    }, 1000)
    return () => clearInterval(timer)


  }, [])

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

  const getEventIcon = (type: string) => {
    switch (type) {
      case "telemetry":
        return <AlertTriangle className="w-4 h-4" />
      case "lock":
        return <Target className="w-4 h-4" />
      case "kamikaze":
        return <AlertTriangle className="w-4 h-4" />
      case "login":
        return <Users className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-gray-50 text-gray-900 p-6 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-500">TEKNOFEST 2024</h1>
            <p className="text-gray-600">Savaşan İHA Yarışması - Sunucu Yönetim Paneli</p>
          </div>
          <div className="flex items-center gap-4">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-600">Sunucu Saati</p>
                    <p className="font-mono text-lg">{serverTime.toLocaleTimeString("tr-TR")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-600">Aktif Takımlar</p>
                    <p className="font-mono text-lg">
                      {teams.filter((t) => t.status === "online").length}/{teams.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sol Panel - Takım Listesi */}
        <div className="col-span-4">
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
        </div>

        {/* Orta Panel - Harita ve Koordinatlar */}
        <div className="col-span-5">
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

                {/* Takım Konumları */}
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

                {/* Hava Savunma Sistemleri */}
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

                {/* QR Kod Konumu */}
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

          {/* Koordinat Bilgileri */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-400" />
                  Hava Savunma Sistemleri
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {defenseSystems.map((system) => (
                    <div key={system.id} className="flex items-center justify-between text-sm">
                      <span>HSS-{system.id}</span>
                      <Badge
                        className={
                          system.active
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-gray-100 text-gray-800 border border-gray-200"
                        }
                      >
                        {system.active ? "Aktif" : "Pasif"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-purple-400" />
                  QR Kod Konumu
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm space-y-1">
                  <div>Lat: {qrPosition.lat.toFixed(6)}</div>
                  <div>Lng: {qrPosition.lng.toFixed(6)}</div>
                  <Badge className="bg-purple-100 text-purple-800 border border-purple-200 mt-2">Aktif</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sağ Panel - Aktiviteler ve İstatistikler */}
        <div className="col-span-3">
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
        </div>
      </div>
    </div>
  )
}
