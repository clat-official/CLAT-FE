'use client'

import { useState } from 'react'
import Text from '@/components/common/Text'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import {
  fieldGroupStyle,
  fieldStyle,
  dayGroupStyle,
  dayButtonRecipe,
  actionsStyle,
} from './AddClassModal.css'

const DAYS = [
  { label: '월', value: 1 },
  { label: '화', value: 2 },
  { label: '수', value: 3 },
  { label: '목', value: 4 },
  { label: '금', value: 5 },
  { label: '토', value: 6 },
  { label: '일', value: 7 },
]

interface AddClassModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { academyName: string; name: string; dayOfWeek: number[] }) => void
}

export default function AddClassModal({ isOpen, onClose, onConfirm }: AddClassModalProps) {
  const [academyName, setAcademyName] = useState('')
  const [name, setName] = useState('')
  const [selectedDays, setSelectedDays] = useState<number[]>([])

  const toggleDay = (value: number) => {
    setSelectedDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    )
  }

  const handleClose = () => {
    setAcademyName('')
    setName('')
    setSelectedDays([])
    onClose()
  }

  const handleConfirm = () => {
    if (!academyName.trim() || !name.trim() || selectedDays.length === 0) return
    onConfirm({ academyName, name, dayOfWeek: selectedDays })
    handleClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div style={{ marginBottom: '24px' }}>
        <Text variant="headingMd" as="h2">
          반 추가
        </Text>
      </div>
      <div className={fieldGroupStyle}>
        <div className={fieldStyle}>
          <Text variant="titleSm">
            학원명 <span style={{ color: '#EF4453' }}>*</span>
          </Text>
          <Input
            value={academyName}
            onChange={(e) => setAcademyName(e.target.value)}
            placeholder="예) OO학원"
          />
        </div>
        <div className={fieldStyle}>
          <Text variant="titleSm">
            반 이름 <span style={{ color: '#EF4453' }}>*</span>
          </Text>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="예) 미적분 A반" />
        </div>
        <div className={fieldStyle}>
          <Text variant="titleSm">
            수업 요일 <span style={{ color: '#EF4453' }}>*</span>
          </Text>
          <div className={dayGroupStyle}>
            {DAYS.map((day) => (
              <button
                key={day.value}
                className={dayButtonRecipe({ selected: selectedDays.includes(day.value) })}
                onClick={() => toggleDay(day.value)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={actionsStyle}>
        <Button variant="ghost" size="lg" fullWidth onClick={handleClose}>
          취소
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!academyName.trim() || !name.trim() || selectedDays.length === 0}
          onClick={handleConfirm}
        >
          등록하기
        </Button>
      </div>
    </Modal>
  )
}
