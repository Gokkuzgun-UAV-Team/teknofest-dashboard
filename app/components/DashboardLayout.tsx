"use client"

import Header from "./Header"
import TeamList from "./TeamList"
import MapPanel from "./MapPanel"
import StatsPanel from "./StatsPanel"

export default function DashboardLayout() {
  return (
    <div className="bg-gray-50 text-gray-900 p-6 min-h-screen">
      {/* <Header /> */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4"><TeamList /></div>
        <div className="col-span-5"><MapPanel /></div>
        {/* <div className="col-span-3"><StatsPanel /></div> */}
      </div>
    </div>
  )
}
