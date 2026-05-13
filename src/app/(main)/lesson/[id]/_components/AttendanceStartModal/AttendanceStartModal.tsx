'use client'

import { useState } from 'react'
import Modal from '@/components/common/Modal'
import Text from '@/components/common/Text'
import { cva } from 'class-variance-authority'
import TimerIcon from '@/assets/icons/icon-timer.svg'

const titleStyle = 'mt-5 mb-3'
const subtitleStyle = 'mb-[60px]'
const timeSectionStyle = 'flex flex-col gap-3 mb-7'
const timeChipGroupStyle = 'flex items-center gap-2'
const customInputWrapperStyle = 'flex items-center gap-2'
const customInputStyle = 'w-20 h-8 rounded-lg border border-primary-500 bg-white px-[10px] text-sm font-semibold tracking-[-0.03em] text-gray-900 outline-none text-center placeholder:text-gray-300'
const infoBoxStyle = 'rounded-xl bg-primary-50 p-5 mb-[40px]'
const buttonGroupStyle = 'flex gap-3'
const cancelButtonStyle = 'flex-1 h-[54px] rounded-xl border-none cursor-pointer bg-gray-50 text-gray-700 text-base font-semibold tracking-[-0.03em] leading-[140%]'
const confirmButtonStyle = 'flex-1 h-[54px] rounded-xl border-none cursor-pointer bg-primary-500 text-white text-base font-semibold tracking-[-0.03em] leading-[140%]'

const timeChipVariants = cva(
  'w-16 h-8 rounded-lg border-none cursor-pointer text-sm font-semibold tracking-[-0.03em] leading-[140%] transition-[background-color,color] duration-150',
  {
    variants: {
      selected: {
        true: 'bg-primary-50 text-primary-500',
        false: 'bg-gray-50 text-gray-700',
      },
    },
    defaultVariants: { selected: false },
  }
)

const PRESET_DURATIONS = [5, 10, 15, 20] as const

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (durationMinutes: number) => Promise<void>
  className: string
  studentCount: number
}

export default function AttendanceStartModal({
  isOpen,
  onClose,
  onConfirm,
  className,
  studentCount,
}: Props) {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(15)
  const [isCustom, setIsCustom] = useState(false)
  const [customValue, setCustomValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    const minutes = isCustom ? Number(customValue) : selectedMinutes
    if (!minutes || minutes < 1) return
    setIsSubmitting(true)
    try {
      await onConfirm(minutes)
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayMinutes = isCustom ? (customValue ? Number(customValue) : null) : selectedMinutes

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* 타이머 아이콘 */}
      <div>
        <TimerIcon width={60} height={60} />
      </div>

      <div className={titleStyle}>
        <Text variant="headingLg" as="h2">
          출결을 시작할게요
        </Text>
      </div>

      <div className={subtitleStyle}>
        <Text variant="bodyMd" color="gray500">
          {className} {studentCount}명에게 알림톡이 발송되고 출결이 시작돼요.
        </Text>
      </div>

      {/* 제한 시간 */}
      <div className={timeSectionStyle}>
        <Text variant="headingSm">제한 시간</Text>
        <div className={timeChipGroupStyle}>
          {PRESET_DURATIONS.map((min) => (
            <button
              key={min}
              className={timeChipVariants({ selected: !isCustom && selectedMinutes === min })}
              onClick={() => {
                setIsCustom(false)
                setSelectedMinutes(min)
              }}
            >
              {min}분
            </button>
          ))}
          <button
            className={timeChipVariants({ selected: isCustom })}
            onClick={() => setIsCustom(true)}
            style={{ width: 'auto', padding: '0 12px' }}
          >
            직접 입력
          </button>
          {isCustom && (
            <div className={customInputWrapperStyle}>
              <input
                className={customInputStyle}
                type="number"
                min={1}
                max={120}
                placeholder="분"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                autoFocus
              />
              <Text variant="bodyMd" color="gray700">
                분
              </Text>
            </div>
          )}
        </div>
      </div>

      {/* 안내 박스 */}
      <div className={infoBoxStyle}>
        <Text variant="bodyMd" color="gray700">
          {'  - 시간 초과 시 미확인 학생은 자동으로 결석 처리돼요.'}
          <br />
          {'  - 출결 후 수업 입력 화면에서 직접 수정할 수 있어요.'}
        </Text>
      </div>

      {/* 버튼 */}
      <div className={buttonGroupStyle}>
        <button className={cancelButtonStyle} onClick={onClose}>
          취소
        </button>
        <button
          className={confirmButtonStyle}
          onClick={handleConfirm}
          disabled={isSubmitting || (isCustom && !customValue)}
        >
          출결 시작{displayMinutes ? ` · ${displayMinutes}분` : ''}
        </button>
      </div>
    </Modal>
  )
}
