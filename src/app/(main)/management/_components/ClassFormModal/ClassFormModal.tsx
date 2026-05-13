'use client'

import { useEffect, useState } from 'react'
import { cva } from 'class-variance-authority'
import Text from '@/components/common/Text'
import Input from '@/components/common/Input'
import useToggleArray from '@/hooks/useToggleArray'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'

const dayButtonVariants = cva(
  'w-10 h-10 rounded-lg cursor-pointer text-sm font-medium tracking-[-0.03em] leading-[1.4] transition-all duration-150',
  {
    variants: {
      selected: {
        true: 'bg-primary-100 border border-primary-500 text-primary-500',
        false: 'bg-white border border-gray-50 text-gray-700',
      },
    },
    defaultVariants: { selected: false },
  }
)

const DAYS = [
  { label: '월', value: 1 },
  { label: '화', value: 2 },
  { label: '수', value: 3 },
  { label: '목', value: 4 },
  { label: '금', value: 5 },
  { label: '토', value: 6 },
  { label: '일', value: 0 },
]

interface ClassFormData {
  academyName: string
  name: string
  dayOfWeek: number[]
}

interface ClassFormModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: ClassFormData) => void
  mode: 'add' | 'edit'
  defaultValues?: ClassFormData
}

export default function ClassFormModal({
  isOpen,
  onClose,
  onConfirm,
  mode,
  defaultValues,
}: ClassFormModalProps) {
  const [academyName, setAcademyName] = useState('')
  const [name, setName] = useState('')
  const { items: selectedDays, toggle: toggleDay, set: setSelectedDays, reset: resetDays } = useToggleArray<number>()

  useEffect(() => {
    if (isOpen && defaultValues) {
      setAcademyName(defaultValues.academyName)
      setName(defaultValues.name)
      setSelectedDays(defaultValues.dayOfWeek)
    }
  }, [isOpen, defaultValues])

  const handleClose = () => {
    setAcademyName('')
    setName('')
    resetDays()
    onClose()
  }

  const handleConfirm = () => {
    if (!academyName.trim() || !name.trim() || selectedDays.length === 0) return
    onConfirm({ academyName, name, dayOfWeek: selectedDays })
    handleClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="mb-9">
        <Text variant="headingLg" as="h2">
          {mode === 'add' ? '반 추가' : '반 정보 수정'}
        </Text>
      </div>
      <div className="flex flex-col gap-9 mb-12">
        <div className="flex flex-col gap-3">
          <Text variant="headingSm">
            학원명 <span className="text-error-500">*</span>
          </Text>
          <Input
            variant="gray"
            value={academyName}
            onChange={(e) => setAcademyName(e.target.value)}
            placeholder="예) OO학원"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Text variant="headingSm">
            반 이름 <span className="text-error-500">*</span>
          </Text>
          <Input
            variant="gray"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예) 미적분 A반"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Text variant="headingSm">
            수업 요일 <span className="text-error-500">*</span>
          </Text>
          <div className="flex gap-2">
            {DAYS.map((day) => (
              <button
                key={day.value}
                className={dayButtonVariants({ selected: selectedDays.includes(day.value) })}
                onClick={() => toggleDay(day.value)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="lg" fullWidth onClick={handleClose}>취소</Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!academyName.trim() || !name.trim() || selectedDays.length === 0}
          onClick={handleConfirm}
        >
          {mode === 'add' ? '추가' : '저장'}
        </Button>
      </div>
    </Modal>
  )
}
