'use client'

import { ReactNode } from 'react'
import TrashIcon from '@/assets/icons/icon-trash.svg'
import type { Student } from '@/types/student'
import { cn } from '@/lib/utils'

interface MiddleColumn {
  header: string
  render: (student: Student) => ReactNode
}

interface StudentTableProps {
  students: Student[]
  middleColumns: MiddleColumn[]
  onDelete: (id: number) => void
  onRowClick?: (id: number) => void
}

const FIXED_COLUMN_COUNT = 5

function getCellPaddingRight(totalColumns: number): number {
  if (totalColumns <= 5) return 44
  if (totalColumns <= 6) return 28
  return 16
}

function getProgressClass(rate: number, totalIncomplete: number): string {
  if (rate === 0 && totalIncomplete === 0) return 'bg-gray-500'
  if (rate >= 0.7) return 'bg-success-500'
  if (rate >= 0.4) return 'bg-warning-500'
  return 'bg-error-500'
}

function getRemainingTextClass(rate: number, totalIncomplete: number): string {
  if (rate === 0 && totalIncomplete === 0) return 'text-gray-500'
  if (rate >= 0.7) return 'text-success-500'
  if (rate >= 0.4) return 'text-warning-500'
  return 'text-error-500'
}

const thStyle = 'h-10 pl-4 pr-[var(--cell-padding-right,48px)] bg-gray-50 text-gray-900 text-sm font-semibold tracking-[-0.03em] leading-[1.4] text-left border-b border-r border-gray-100 last:border-r-0'
const tdStyle = 'h-10 pl-4 pr-[var(--cell-padding-right,48px)] text-gray-700 text-sm font-medium tracking-[-0.03em] leading-[1.4] border-b border-r border-gray-100 [tr:last-child_&]:border-b-0 last:border-r-0'

export default function StudentTable({
  students,
  middleColumns,
  onDelete,
  onRowClick,
}: StudentTableProps) {
  const totalColumns = FIXED_COLUMN_COUNT + middleColumns.length
  const cellPaddingRight = getCellPaddingRight(totalColumns)

  return (
    <table
      className="w-full border-collapse border border-gray-100 overflow-hidden"
      style={{ '--cell-padding-right': `${cellPaddingRight}px` } as React.CSSProperties}
    >
      <colgroup>
        <col style={{ width: '120px' }} />
        <col style={{ width: '180px' }} />
        <col style={{ width: '180px' }} />
        {middleColumns.map((_, i) => (
          <col key={i} />
        ))}
        <col style={{ width: '120px' }} />
        <col style={{ width: '460px' }} />
      </colgroup>
      <thead>
        <tr>
          <th className={thStyle}>학생</th>
          <th className={thStyle}>학생 전화</th>
          <th className={thStyle}>학부모 전화</th>
          {middleColumns.map((col) => (
            <th key={col.header} className={thStyle}>
              {col.header}
            </th>
          ))}
          <th className={thStyle}>학교</th>
          <th className={thStyle}>완료율</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => {
          const progressClass = getProgressClass(student.completion_rate, student.total_incomplete_items)
          const remainingClass = getRemainingTextClass(student.completion_rate, student.total_incomplete_items)
          return (
            <tr
              key={student.id}
              className={cn('hover:bg-gray-50', onRowClick && 'cursor-pointer')}
              onClick={() => onRowClick?.(student.id)}
            >
              <td className={tdStyle}>{student.name}</td>
              <td className={tdStyle}>{student.phone}</td>
              <td className={tdStyle}>{student.parent_phone}</td>
              {middleColumns.map((col) => (
                <td key={col.header} className={tdStyle}>
                  {col.render(student)}
                </td>
              ))}
              <td className={tdStyle}>{student.school_name ?? '-'}</td>
              <td className={cn(tdStyle, 'p-0')}>
                <div className="h-full pl-5 pr-6 flex items-center gap-3">
                  <div className="w-40 h-3 bg-gray-50 rounded-full overflow-hidden shrink-0">
                    <div
                      className={cn('h-full rounded-full transition-[width] duration-300', progressClass)}
                      style={{ width: `${student.completion_rate * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 tracking-[-0.03em] leading-[1.4] shrink-0">
                    {student.completion_rate * 100}%
                  </span>
                  <span className={cn('text-sm font-semibold tracking-[-0.03em] shrink-0', remainingClass)}>
                    {student.completion_rate === 1
                      ? '모두 완료'
                      : student.total_incomplete_items == null
                        ? '-'
                        : student.total_incomplete_items === 0
                          ? null
                          : `${student.total_incomplete_items}개 남음`}
                  </span>
                  <button
                    className="bg-transparent border-none cursor-pointer p-0 flex items-center text-gray-100 ml-auto hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(student.id)
                    }}
                  >
                    <TrashIcon width={20} height={20} />
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
