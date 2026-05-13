import Sidebar from '@/components/common/Sidebar'
import { ToastContainer } from '@/components/common/Toast'
import UserInitializer from '@/components/common/UserInitializer'
import AttendanceGlobalUI from './_components/AttendanceGlobalUI'
import { layoutWrapperStyle, mainContentStyle } from './layout.css'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={layoutWrapperStyle}>
      <UserInitializer />
      <Sidebar />
      <main className={mainContentStyle}>
        {children}
      </main>
      <ToastContainer />
      <AttendanceGlobalUI />
    </div>
  )
}