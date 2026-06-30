import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5eef8' }}>
      <Sidebar />
      <Topbar />
      <main style={{ marginLeft: 240, paddingTop: 62, minHeight: '100vh', flex: 1 }}>
        <div style={{ padding: 28 }}>
          {children}
        </div>
      </main>
    </div>
  )
}
