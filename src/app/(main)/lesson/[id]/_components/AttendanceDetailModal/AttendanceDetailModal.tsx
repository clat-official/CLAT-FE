'use client'

import { useState } from 'react'
import Modal from '@/components/common/Modal'
import Text from '@/components/common/Text'
import useRemainingTime from '@/hooks/useRemainingTime'
import TimerIcon from '@/assets/icons/icon-timer.svg'
import NumberIcon from '@/assets/icons/icon-number-2.svg'
import ClockIcon from '@/assets/icons/icon-clock-fill.svg'
import UsersIcon from '@/assets/icons/icon-users-fill.svg'
import { cva } from 'class-variance-authority'
import type { AttendanceSession, AttendanceStatus } from '@/types/attendance'

const titleStyle = 'mt-5 mb-3'
const metaRowStyle = 'flex items-center gap-3 mb-9'
const metaItemStyle = 'flex items-center gap-1'
const statCardGroupStyle = 'flex gap-2 mb-9'
const statCardStyle = 'flex-1 rounded-xl bg-gray-50 p-4 flex flex-col items-center gap-3'
const statBase = 'text-[28px] font-semibold tracking-[-0.03em] leading-[140%]'
const statNumberPrimaryStyle = `${statBase} text-primary-500`
const statNumberGrayStyle = `${statBase} text-gray-700`
const filterChipGroupStyle = 'flex gap-2 mb-4'
const studentListStyle = 'flex flex-col gap-4 max-h-[calc(4*25px+3*16px)] overflow-y-auto mb-8'
const studentRowGroupStyle = 'flex items-center gap-5'
const studentItemStyle = 'flex-1 flex justify-between items-center'
const studentRightStyle = 'flex items-center gap-2'
const endButtonStyle = 'w-full h-[54px] rounded-xl border-none cursor-pointer bg-primary-500 text-white text-base font-semibold tracking-[-0.03em] leading-[140%]'

const filterChipVariants = cva(
  'flex items-center gap-2 py-1 px-3 rounded-[999px] border-none cursor-pointer text-sm font-semibold tracking-[-0.03em] leading-[140%] transition-colors duration-150',
  {
    variants: {
      active: {
        true: 'bg-primary-500 text-white',
        false: 'bg-gray-50 text-gray-700',
      },
    },
    defaultVariants: { active: false },
  }
)

const statusBadgeVariants = cva(
  'py-1 px-2 rounded-lg text-xs font-semibold tracking-[-0.03em] leading-[140%]',
  {
    variants: {
      status: {
        PRESENT: 'bg-success-50 text-success-500',
        ABSENT: 'bg-error-50 text-error-500',
        NONE: 'bg-gray-50 text-gray-500',
      },
    },
  }
)

type FilterType = '전체' | 'PRESENT' | 'ABSENT'

const FILTER_LABELS: Record<FilterType, string> = {
  전체: '전체',
  PRESENT: '출석',
  ABSENT: '결석',
}

const STATUS_LABEL: Record<AttendanceStatus, '출석' | '결석'> = {
  PRESENT: '출석',
  ABSENT: '결석',
}

function getStatusLabel(status: AttendanceStatus | null): '출석' | '결석' | '미응답' {
  if (!status) return '미응답'
  return STATUS_LABEL[status]
}


interface Props {
  isOpen: boolean
  onClose: () => void
  onEnd: () => Promise<void>
  session: AttendanceSession
  className: string
  isEnding: boolean
}

export default function AttendanceDetailModal({
  isOpen,
  onClose,
  onEnd,
  session,
  className,
  isEnding,
}: Props) {
  const [filter, setFilter] = useState<FilterType>('전체')
  const remaining = useRemainingTime(session.expires_at)

  const filtered = session.students.filter((s) => {
    if (filter === '전체') return true
    return s.status === filter
  })

  const formatTime = (iso: string | null) => {
    if (!iso) return '-'
    return new Date(iso).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const presentCount = session.students.filter((s) => s.status === 'PRESENT').length
  const absentCount = session.students.filter((s) => s.status === 'ABSENT').length

  const filterCount: Record<FilterType, number> = {
    전체: session.total_count,
    PRESENT: presentCount,
    ABSENT: absentCount,
  }

  // 학생 쌍으로 2열 배치
  const pairs: [(typeof session.students)[0], (typeof session.students)[0] | null][] = []
  for (let i = 0; i < filtered.length; i += 2) {
    pairs.push([filtered[i], filtered[i + 1] ?? null])
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <TimerIcon width={60} height={60} />
      </div>
      <div className={titleStyle}>
        <Text variant="headingLg" as="h2">
          {className} 출결 현황
        </Text>
      </div>

      {/* 코드 / 남은시간 / 학생수 */}
      <div className={metaRowStyle}>
        <div className={metaItemStyle}>
          <NumberIcon width={20} height={20} />
          <Text variant="bodyMd" color="gray700">
            {session.code}
          </Text>
        </div>

        <div className={metaItemStyle}>
          <ClockIcon width={20} height={20} />
          <Text variant="bodyMd" color="gray700">
            {remaining}
          </Text>
        </div>

        <div className={metaItemStyle}>
          <UsersIcon width={20} height={20} />
          <Text variant="bodyMd" color="gray700">
            {session.total_count}명
          </Text>
        </div>
      </div>

      {/* 출석/결석 카드 */}
      <div className={statCardGroupStyle}>
        <div className={statCardStyle}>
          <Text variant="bodyMd" color="primary500">
            출석
          </Text>
          <span className={statNumberPrimaryStyle}>
            {presentCount}
          </span>
        </div>
        <div className={statCardStyle}>
          <Text variant="bodyMd" color="gray700">
            결석
          </Text>
          <span className={statNumberGrayStyle}>
            {absentCount}
          </span>
        </div>
      </div>

      {/* 필터 칩 */}
      <div className={filterChipGroupStyle}>
        {(['전체', 'PRESENT', 'ABSENT'] as FilterType[]).map((f) => (
          <button
            key={f}
            className={filterChipVariants({ active: filter === f })}
            onClick={() => setFilter(f)}
          >
            {FILTER_LABELS[f]} {filterCount[f]}
          </button>
        ))}
      </div>

      {/* 학생 목록 */}
      <div className={studentListStyle}>
        {pairs.map((pair, i) => (
          <div key={i} className={studentRowGroupStyle}>
            {pair.map((student, j) =>
              student ? (
                <div key={student.student_id} className={studentItemStyle}>
                  <Text variant="bodyLg">{student.student_name}</Text>
                  <div className={studentRightStyle}>
                    {student.checked_at && (
                      <Text variant="bodyMd" color="gray500">
                        {formatTime(student.checked_at)}
                      </Text>
                    )}
                    <span className={statusBadgeVariants({ status: student.status ?? 'NONE' })}>
                      {getStatusLabel(student.status)}
                    </span>
                  </div>
                </div>
              ) : (
                <div key={`empty-${j}`} className={studentItemStyle} />
              )
            )}
          </div>
        ))}
      </div>

      {/* 종료 버튼 */}
      <button className={endButtonStyle} onClick={onEnd} disabled={isEnding}>
        출결 종료하기
      </button>
    </Modal>
  )
}
