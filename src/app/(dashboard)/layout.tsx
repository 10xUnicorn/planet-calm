'use client'

import { useState, useCallback } from 'react'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import LeonaChat from '@/components/LeonaChat'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5eef8' }}>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Topbar onToggleSidebar={toggleSidebar} />
      <main className="dashboard-main" style={{ paddingTop: 62, minHeight: '100vh', flex: 1 }}>
        <div style={{ padding: 28 }}>
          {children}
        </div>
      </main>
      <LeonaChat />
    </div>
  )
}
