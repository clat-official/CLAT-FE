'use client'

import { useAlimtalkHistory } from '@/hooks/useStudentDashboard'
import { cn } from '@/lib/utils'
import { format, parseISO, isValid } from 'date-fns'
import { ko } from 'date-fns/locale'
import type { AlimtalkRecord } from '@/types/student'

interface Props {
  studentId: number
}

const STATUS_MAP: Record<AlimtalkRecord['status'], { label: string; className: string }> = {
  sent: { label: '전송 완료', className: 'bg-success-50 text-success-500' },
  pending: { label: '전송 대기', className: 'bg-warning-50 text-warning-500' },
  failed: { label: '전송 실패', className: 'bg-error-50 text-error-500' },
}

function StatusBadge({ status }: { status: AlimtalkRecord['status'] }) {
  const { label, className } = STATUS_MAP[status]
  return (
    <span className={cn('text-xs font-medium tracking-[-0.03em] px-2 py-1 rounded-[6px] shrink-0', className)}>
      {label}
    </span>
  )
}

export default function AlimtalkTab({ studentId }: Props) {
  const { data, isLoading } = useAlimtalkHistory(studentId)

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
        <span className="text-sm text-gray-300 tracking-[-0.03em]">알림톡 내역이 없어요.</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {data.map((record) => (
        <div key={record.id} className="flex flex-col gap-2 bg-gray-50 rounded-xl px-4 py-3">
          {/* Row 1: sent date + status */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900 tracking-[-0.03em] leading-[1.4] flex-1">
              {(() => {
                const d = parseISO(record.sent_at)
                return isValid(d) ? format(d, 'M월 d일(E) HH:mm', { locale: ko }) : '-'
              })()}
            </span>
            <StatusBadge status={record.status} />
          </div>

          {/* Row 2: class + lesson date + preview */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 tracking-[-0.03em] leading-[1.4]">
              {record.class_name} · {record.lesson_date} 수업
            </span>
          </div>

          {record.preview && (
            <p className="text-xs font-medium text-gray-600 tracking-[-0.03em] leading-[1.6] line-clamp-2">
              {record.preview}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
