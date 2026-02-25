import Sidebar from '@/components/common/Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '240px', flex: 1, padding: '48px 48px' }}>
        {children}
      </main>
    </div>
  )
}