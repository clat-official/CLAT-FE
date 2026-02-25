import Sidebar from '@/components/common/Sidebar'
import { colors } from '@/styles/tokens/colors'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '240px', flex: 1, minHeight: '100vh', padding: '48px 48px', backgroundColor: colors.background }}>
        {children}
      </main>
    </div>
  )
}