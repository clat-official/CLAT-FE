'use client'

import { useState, useEffect } from 'react'
import Text from '@/components/common/Text'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import useToggleArray from '@/hooks/useToggleArray'
import { classService, type Class } from '@/services/class'
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
    phone: string
    parent_phone: string
    school_name: string
    class_ids: number[]
  }) => void
}

export default function AddStudentFormModal({
  isOpen,
  onClose,
  onConfirm,
}: AddStudentFormModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [classes, setClasses] = useState<Class[]>([])
  const { items: selectedClassIds, toggle: toggleClass, reset: resetClasses } = useToggleArray<number>()

  useEffect(() => {
    if (!isOpen) return
    classService.getClasses({ status: 'active' })
      .then((res) => setClasses(res.data))
      .catch((err) => console.error('반 목록 조회 실패', err))
  }, [isOpen])

  const handleClose = () => {
    setName('')
    setPhone('')
    setParentPhone('')
    setSchoolName('')
    resetClasses()
    onClose()
  }

  const handleConfirm = () => {
    if (!name.trim()) return
    onConfirm({
      name,
      phone,
      parent_phone: parentPhone,
      school_name: schoolName,
      class_ids: selectedClassIds,
    })
    handleClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div style={{ marginBottom: '24px' }}>
        <Text variant="headingLg" as="h2">학생 등록</Text>
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
          <Input variant="gray" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>학부모 전화번호</span>
          <Input variant="gray" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>학교명</span>
          <Input variant="gray" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>소속 반</span>
          <div className={classChipGroupStyle}>
            {classes.map((cls) => (
              <button
                key={cls.id}
                className={classChipRecipe({ selected: selectedClassIds.includes(cls.id) })}
                onClick={() => toggleClass(cls.id)}
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={actionsStyle}>
        <Button variant="ghost" size="lg" fullWidth onClick={handleClose}>취소</Button>
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