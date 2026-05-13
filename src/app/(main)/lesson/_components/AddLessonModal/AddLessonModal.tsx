'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import Chip from '@/components/common/Chip'
import { classService, type Class } from '@/services/class'

const headerStyle = 'flex items-center gap-5 mb-7'
const classListStyle = 'flex flex-col gap-3 mb-[40px] max-h-[320px] overflow-y-auto'
const classItemStyle = 'flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-gray-50'
const classItemSelectedStyle = 'bg-primary-50 hover:bg-primary-100'
const classNameStyle = 'text-[18px] font-semibold text-gray-900 tracking-[-0.03em] leading-[140%]'
const classMetaStyle = 'flex gap-1'
const radioStyle = 'shrink-0 w-4 h-4 rounded-full border-2 border-gray-200 transition-[border-color] duration-150'
const radioSelectedStyle = 'border-primary-500 [background-image:radial-gradient(circle,var(--color-primary-500)_40%,transparent_40%)]'
const actionsStyle = 'flex gap-2'

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']
const formatSchedule = (schedules: { day_of_week: number }[]) =>
  schedules.map((s) => DAY_NAMES[s.day_of_week]).join('·')

interface AddLessonModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (classId: number) => void
  selectedDate: Date
}

export default function AddLessonModal({
  isOpen,
  onClose,
  onConfirm,
  selectedDate,
}: AddLessonModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [classes, setClasses] = useState<Class[]>([])

  useEffect(() => {
    if (!isOpen) return
    classService.getClasses({ status: 'active' })
      .then((res) => setClasses(res.data))
      .catch((err) => console.error('반 목록 조회 실패', err))
  }, [isOpen])

  const handleClose = () => {
    setSelectedId(null)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className={headerStyle}>
        <Text variant="headingLg">다른 수업 추가</Text>
        <Text variant="bodyLg" color="gray500">
          {format(selectedDate, 'M월 d일(E)', { locale: ko })}
        </Text>
      </div>
      <div className={classListStyle}>
        {classes.map((cls) => {
          const isSelected = selectedId === cls.id
          return (
            <div
              key={cls.id}
              className={`${classItemStyle}${isSelected ? ` ${classItemSelectedStyle}` : ''}`}
              onClick={() => setSelectedId(cls.id)}
            >
              <div className={`${radioStyle}${isSelected ? ` ${radioSelectedStyle}` : ''}`} />
              <span className={classNameStyle}>{cls.name}</span>
              <div className={classMetaStyle}>
                <Chip label={cls.academy_name} />
                <Chip label={formatSchedule(cls.schedules)} />
              </div>
            </div>
          )
        })}
      </div>

      <div className={actionsStyle}>
        <Button variant="ghost" size="lg" fullWidth onClick={handleClose}>
          취소
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={selectedId === null}
          onClick={() => {
            if (selectedId !== null) {
              onConfirm(selectedId)
              handleClose()
            }
          }}
        >
          확인
        </Button>
      </div>
    </Modal>
  )
}