import { useRouter } from 'next/navigation'
import Text from '@/components/common/Text'
import Chip from '@/components/common/Chip'
import CalendarIcon from '@/assets/icons/icon-calendar.svg'
import UsersIcon from '@/assets/icons/icon-users.svg'

interface ClassCardProps {
  id: number
  academyName: string
  name: string
  schedule: string
  studentCount: number
  isEnded?: boolean
  startDate?: string
  endDate?: string
}

export default function ClassCard({
  id,
  academyName,
  name,
  schedule,
  studentCount,
  isEnded,
  startDate,
  endDate,
}: ClassCardProps) {
  const router = useRouter()

  return (
    <div
      className="bg-white border border-gray-75 rounded-2xl p-6 min-h-[160px] cursor-pointer flex flex-col transition-colors duration-200 hover:bg-primary-50"
      onClick={() => router.push(`/management/${id}`)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <Chip variant="default" label={academyName} />
          {isEnded && <Chip variant="ended" label="종료" />}
        </div>
        {isEnded && startDate && endDate && (
          <span className="text-sm font-medium text-gray-300 tracking-[-0.03em] leading-[1.4]">
            {startDate} – {endDate}
          </span>
        )}
      </div>
      <Text variant="headingLg" as="h3">{name}</Text>
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.4]">
          <CalendarIcon width={16} height={16} />
          {schedule}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.4]">
          <UsersIcon width={16} height={16} />
          {studentCount}명
        </div>
      </div>
    </div>
  )
}
