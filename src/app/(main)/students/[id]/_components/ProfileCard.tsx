'use client'

import type { StudentDetail } from '@/types/student'
import UsersIcon from '@/assets/icons/icon-users.svg'
import BookOpenIcon from '@/assets/icons/icon-book-open.svg'
import FlagIcon from '@/assets/icons/icon-flag.svg'

interface Props {
  detail: StudentDetail | null
  isLoading: boolean
}

const labelClass = 'text-sm font-semibold text-gray-500 tracking-[-0.03em] leading-[1.4] w-[120px] shrink-0'
const valueClass = 'text-sm font-medium text-gray-900 tracking-[-0.03em] leading-[1.4]'

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-300 shrink-0">{icon}</div>
      <span className={labelClass}>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  )
}

export default function ProfileCard({ detail, isLoading }: Props) {
  if (isLoading || !detail) {
    return (
      <div className="bg-white rounded-[20px] p-6 flex items-center justify-center h-[316px]">
        <span className="text-sm text-gray-300 tracking-[-0.03em]">불러오는 중...</span>
      </div>
    )
  }

  const academyNames = [...new Set(detail.classes.map((c) => c.academy_name).filter(Boolean))].join(', ') || '-'
  const classNames = detail.classes.map((c) => c.name).join(', ') || '-'
  const initial = detail.name.charAt(0)

  return (
    <div className="bg-white rounded-[20px] p-6 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center text-xl font-semibold shrink-0">
          {initial}
        </div>
        <span className="text-2xl font-semibold text-gray-900 tracking-[-0.03em] leading-[1.4]">
          {detail.name}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <InfoRow icon={<FlagIcon width={20} height={20} />} label="학원명" value={academyNames} />
        <InfoRow icon={<UsersIcon width={20} height={20} />} label="소속 반" value={classNames} />
        <InfoRow icon={<BookOpenIcon width={20} height={20} />} label="학교명" value={detail.school_name || '-'} />
        <InfoRow icon={<UsersIcon width={20} height={20} />} label="학생 전화번호" value={detail.phone || '-'} />
        <InfoRow icon={<UsersIcon width={20} height={20} />} label="학부모 전화번호" value={detail.parent_phone || '-'} />
      </div>
    </div>
  )
}
