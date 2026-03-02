'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import Chip from '@/components/common/Chip'
import PlusCircleIcon from '@/assets/icons/icon-plus-circle.svg'
import {
  headerStyle,
  classListStyle,
  classItemStyle,
  classItemSelectedStyle,
  classNameStyle,
  classMetaStyle,
  radioStyle,
  radioSelectedStyle,
  actionsStyle,
} from './AddLessonModal.css'
import { MOCK_LESSON_CLASSES } from '@/mocks/lesson'

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
        {MOCK_LESSON_CLASSES.map((cls) => {
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
                <Chip label={cls.academyName} />
                <Chip label={cls.schedule} />
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
