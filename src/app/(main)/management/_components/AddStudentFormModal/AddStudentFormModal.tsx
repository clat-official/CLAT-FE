'use client'

import { useState } from 'react'
import Text from '@/components/common/Text'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import useToggleArray from '@/hooks/useToggleArray'
import { MOCK_CLASS_NAMES } from '@/mocks/management'
import {
  fieldGroupStyle,
  fieldStyle,
  labelStyle,
  classChipGroupStyle,
  classChipRecipe,
  actionsStyle,
} from './AddStudentFormModal.css'

interface AddStudentFormModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: {
    name: string
    studentPhone: string
    parentPhone: string
    classes: string[]
  }) => void
}

export default function AddStudentFormModal({
  isOpen,
  onClose,
  onConfirm,
}: AddStudentFormModalProps) {
  const [name, setName] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const { items: selectedClasses, toggle: toggleClass, reset: resetClasses } = useToggleArray<string>()

  const handleClose = () => {
    setName('')
    setStudentPhone('')
    setParentPhone('')
    resetClasses()
    onClose()
  }

  const handleConfirm = () => {
    if (!name.trim()) return
    onConfirm({ name, studentPhone, parentPhone, classes: selectedClasses })
    handleClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div style={{ marginBottom: '24px' }}>
        <Text variant="headingLg" as="h2">
          학생 등록
        </Text>
      </div>
      <div className={fieldGroupStyle}>
        <div className={fieldStyle}>
          <span className={labelStyle}>
            학생명 <span style={{ color: '#EF4453' }}>*</span>
          </span>
          <Input variant="gray" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>학생 전화번호</span>
          <Input
            variant="gray"
            value={studentPhone}
            onChange={(e) => setStudentPhone(e.target.value)}
          />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>학부모 전화번호</span>
          <Input
            variant="gray"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
          />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>소속 반</span>
          <div className={classChipGroupStyle}>
            {MOCK_CLASS_NAMES.map((cls) => (
              <button
                key={cls}
                className={classChipRecipe({ selected: selectedClasses.includes(cls) })}
                onClick={() => toggleClass(cls)}
              >
                {cls}
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
          disabled={!name.trim()}
          onClick={handleConfirm}
        >
          등록하기
        </Button>
      </div>
    </Modal>
  )
}
