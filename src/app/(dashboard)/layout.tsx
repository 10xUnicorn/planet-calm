import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#f5eef8' }}>
      <Sidebar />
      <Topbar />
      <main className="ml-[240px] pt-[62px] min-h-screen flex-1">
        <div className="p-7">
          {children}
        </div>
      </main>
    </div>
  )
}
