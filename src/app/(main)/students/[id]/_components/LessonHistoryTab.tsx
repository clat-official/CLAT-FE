'use client'

import { useLessonHistory } from '@/hooks/useStudentDashboard'
import { cn } from '@/lib/utils'

interface Props {
  studentId: number
}

function AttendanceBadge({ value }: { value: string | null }) {
  if (!value) return null
  const styles: Record<string, string> = {
    출석: 'bg-success-50 text-success-500',
    지각: 'bg-warning-50 text-warning-500',
    결석: 'bg-error-50 text-error-500',
  }
  return (
    <span
      className={cn(
        'text-xs font-medium tracking-[-0.03em] px-2 py-1 rounded-[6px] shrink-0',
        styles[value] ?? 'bg-gray-50 text-gray-500'
      )}
    >
      {value}
    </span>
  )
}

export default function LessonHistoryTab({ studentId }: Props) {
  const { data, isLoading } = useLessonHistory(studentId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-sm text-gray-300 tracking-[-0.03em]">불러오는 중...</span>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-sm text-gray-300 tracking-[-0.03em]">수업 이력이 없어요.</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((record) => (
        <div
          key={record.lesson_id}
          className="flex flex-col gap-2 bg-gray-50 rounded-xl px-4 py-3"
        >
          {/* Row 1: date + class + attendance */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900 tracking-[-0.03em] leading-[1.4]">
              {record.lesson_date}
            </span>
            <span className="text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.4] flex-1">
              {record.class_name}
            </span>
            <AttendanceBadge value={record.attendance} />
          </div>

          {/* Row 2: items */}
          {record.items.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {record.items.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-gray-600 tracking-[-0.03em] leading-[1.4]"
                >
                  <span className="text-gray-400">{item.item_name}: </span>
                  {item.value ?? '-'}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
