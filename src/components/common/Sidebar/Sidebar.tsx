'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { auth } from '@/services/auth'
import { cn } from '@/lib/utils'
import LogoutConfirmModal from './_components/LogoutConfirmModal'
import HomeIcon from '@/assets/icons/icon-home.svg'
import EditIcon from '@/assets/icons/icon-edit.svg'
import UsersIcon from '@/assets/icons/icon-users.svg'
import ClipboardIcon from '@/assets/icons/icon-clipboard.svg'
import LogoIcon from '@/assets/logo/logo-symbol.svg'
import LogoutIcon from '@/assets/icons/icon-logout.svg'

const NAV_ITEMS = [
  { href: '/home', label: '홈', icon: HomeIcon },
  { href: '/lesson', label: '수업 입력', icon: EditIcon },
  { href: '/management', label: '학생·반 관리', icon: UsersIcon },
  { href: '/template', label: '수업 템플릿', icon: ClipboardIcon },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  return (
    <aside className="w-[240px] h-screen bg-gray-900 flex flex-col py-[2px] fixed top-0 left-0 z-[100]">
      <div className="flex items-center justify-between py-14 px-9">
        <LogoIcon width={32} height={32} />
      </div>
      <nav className="flex flex-col flex-1 gap-2 px-6">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-4 h-12 px-4 rounded-lg cursor-pointer no-underline',
                'text-base font-semibold tracking-[-0.03em] leading-[1.4]',
                'text-gray-600 transition-colors duration-200 hover:text-gray-300',
                isActive && 'text-white',
              )}
            >
              <Icon width={20} height={20} />
              {label}
            </Link>
          )
        })}

        <button
          className="mt-auto mb-10 flex items-center gap-4 px-4 text-gray-600 cursor-pointer border-0 bg-transparent text-base font-semibold tracking-[-0.03em] leading-[1.4] transition-all duration-200 hover:text-gray-300"
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <LogoutIcon width={20} height={20} />
          로그아웃
        </button>
      </nav>

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={async () => {
          await auth.logout()
        }}
      />
    </aside>
  )
}
