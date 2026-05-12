'use client'

import { useState } from 'react'
import Modal from '@/components/common/Modal'
import Text from '@/components/common/Text'
import {
  titleStyle,
  subtitleStyle,
  timeSectionStyle,
  timeChipGroupStyle,
  timeChipRecipe,
  customInputWrapperStyle,
  customInputStyle,
  infoBoxStyle,
  buttonGroupStyle,
  cancelButtonStyle,
  confirmButtonStyle,
} from './AttendanceStartModal.css'
import TimerIcon from '@/assets/icons/icon-timer.svg'

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
              className={timeChipRecipe({ selected: !isCustom && selectedMinutes === min })}
              onClick={() => {
                setIsCustom(false)
                setSelectedMinutes(min)
              }}
            >
              {min}분
            </button>
          ))}
          <button
            className={timeChipRecipe({ selected: isCustom })}
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
