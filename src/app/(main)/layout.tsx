import Sidebar from '@/components/common/Sidebar'
import { ToastContainer } from '@/components/common/Toast'
import UserInitializer from '@/components/common/UserInitializer'
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
    </div>
  )
}