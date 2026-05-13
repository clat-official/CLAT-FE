import Sidebar from '@/components/common/Sidebar'
import { ToastContainer } from '@/components/common/Toast'
import UserInitializer from '@/components/common/UserInitializer'
import AttendanceGlobalUI from './_components/AttendanceGlobalUI'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <UserInitializer />
      <Sidebar />
      <main className="ml-[240px] flex-1 min-w-0 min-h-screen p-12 bg-background">
        {children}
      </main>
      <ToastContainer />
      <AttendanceGlobalUI />
    </div>
  )
}
