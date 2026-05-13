'use client'

import { differenceInDays, parseISO } from 'date-fns'
import type { IncompleteItem } from '@/types/student'
import CheckIcon from '@/assets/icons/icon-check.svg'
import WarningIcon from '@/assets/icons/icon-warning.svg'

interface Props {
  items: IncompleteItem[]
  isLoading: boolean
  onComplete: (id: number) => void
}

function ElapsedBadge({ lessonDate }: { lessonDate: string }) {
  const days = differenceInDays(new Date(), parseISO(lessonDate))
  if (days <= 0) return null
  return (
    <span className="text-xs font-medium text-error-500 bg-error-50 rounded-[6px] px-2 py-1 shrink-0 tracking-[-0.03em]">
      {days}일 지남
    </span>
  )
}

export default function IncompleteItemsPanel({ items, isLoading, onComplete }: Props) {
  return (
    <div className="bg-white rounded-[20px] p-7 flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-900 tracking-[-0.03em] leading-[1.4]">
          미완료 항목
        </span>
        <span className="text-xl font-semibold text-primary-500 tracking-[-0.03em] leading-[1.4]">
          {items.length}
        </span>
      </div>

      {isLoading ? (
        <span className="text-sm text-gray-300 tracking-[-0.03em]">불러오는 중...</span>
      ) : items.length === 0 ? (
        <span className="text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.4]">
          미완료 항목이 없어요.
        </span>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div
              key={item.lesson_student_data_id}
              className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3"
            >
              <WarningIcon width={20} height={20} className="text-warning-500 shrink-0" />
              <span className="flex-1 text-base font-semibold text-gray-700 tracking-[-0.03em] leading-[1.4] min-w-0 truncate">
                {item.item_name}
              </span>
              <ElapsedBadge lessonDate={item.lesson_date} />
              <button
                className="group flex items-center gap-1 text-xs font-medium text-gray-500 bg-white border-none rounded py-1 px-2 cursor-pointer tracking-[-0.03em] leading-[1.4] shrink-0 hover:bg-success-50 hover:text-success-500"
                onClick={() => onComplete(item.lesson_student_data_id)}
              >
                <CheckIcon width={16} height={16} className="text-gray-100 group-hover:text-success-500" />
                완료 처리
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
