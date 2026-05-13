'use client'

import Modal from '@/components/common/Modal'
import Text from '@/components/common/Text'
import type { AttendanceSummary } from '@/types/attendance'

const checkIconStyle = 'w-[60px] h-[60px] rounded-full bg-primary-100 flex items-center justify-center mb-5'
const titleStyle = 'mb-[40px]'
const statCardGroupStyle = 'flex gap-2 mb-[40px]'
const statCardStyle = 'flex-1 rounded-xl bg-gray-50 py-4 flex flex-col items-center gap-3'
const statBase = 'text-[28px] font-semibold tracking-[-0.03em] leading-[140%]'
const statNumberPrimaryStyle = `${statBase} text-primary-500`
const statNumberGrayStyle = `${statBase} text-gray-700`
const confirmButtonStyle = 'w-full h-[54px] rounded-xl border-none cursor-pointer bg-primary-500 text-white text-base font-semibold tracking-[-0.03em] leading-[140%] flex items-center justify-center gap-2'
import CheckIcon from '@/assets/icons/icon-check-2.svg'

interface Props {
  isOpen: boolean
  onClose: () => void
  summary: AttendanceSummary
}

const STAT_ITEMS = [
  { key: 'present_count' as const, label: '출석' },
  { key: 'absent_count' as const, label: '결석' },
]

export default function AttendanceCompleteModal({ isOpen, onClose, summary }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* 체크 아이콘 */}
      <div className={checkIconStyle}>
        <CheckIcon width={60} height={60} />
      </div>

      <div className={titleStyle}>
        <Text variant="headingLg" as="h2">출결이 종료됐어요</Text>
      </div>

      {/* 통계 카드 */}
      <div className={statCardGroupStyle}>
        {STAT_ITEMS.map(({ key, label }) => (
          <div key={key} className={statCardStyle}>
            <Text variant="bodyMd" color={key === 'present_count' ? 'primary500' : 'gray700'}>
              {label}
            </Text>
            <span className={key === 'present_count' ? statNumberPrimaryStyle : statNumberGrayStyle}>
              {summary[key]}
            </span>
          </div>
        ))}
      </div>

      {/* 수업 입력하기 버튼 */}
      <button className={confirmButtonStyle} onClick={onClose}>
        수업 입력하기
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </Modal>
  )
}
