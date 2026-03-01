'use client'

import { useState } from 'react'
import Text from '@/components/common/Text'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import CheckIcon from '@/assets/icons/icon-check.svg'
import { colors } from '@/styles/tokens/colors'
import {
  titleStyle,
  searchWrapperStyle,
  studentListStyle,
  studentRowStyle,
  studentRowSelectedStyle,
  studentNameStyle,
  studentPhoneStyle,
  actionsStyle,
  emptyStyle,
} from './AddStudentModal.css'

const MOCK_STUDENTS = [
  { id: 1, name: '홍길동', phone: '010-1234-5678' },
  { id: 2, name: '김철수', phone: '010-2345-6789' },
  { id: 3, name: '이영희', phone: '010-3456-7890' },
  { id: 4, name: '박민준', phone: '010-4567-8901' },
  { id: 5, name: '최지은', phone: '010-5678-9012' },
]

interface AddStudentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (studentIds: number[]) => void
}

export default function AddStudentModal({ isOpen, onClose, onConfirm }: AddStudentModalProps) {
  const [search, setSearch] = useState('')
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const filtered = MOCK_STUDENTS.filter((s) =>
    s.name.includes(search) || s.phone.includes(search)
  )

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleClose = () => {
    setSearch('')
    setSelectedIds([])
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className={titleStyle}>
        <Text variant="headingLg">학생 추가</Text>
      </div>
      <div className={searchWrapperStyle}>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="학생 이름 또는 전화번호 검색"
        />
      </div>
      <div className={studentListStyle}>
        {filtered.length === 0 ? (
          <div className={emptyStyle}>검색 결과가 없어요</div>
        ) : (
          filtered.map((student) => {
            const isSelected = selectedIds.includes(student.id)
            return (
              <div
                key={student.id}
                className={`${studentRowStyle}${isSelected ? ` ${studentRowSelectedStyle}` : ''}`}
                onClick={() => toggleSelect(student.id)}
              >
                <CheckIcon
                  width={16}
                  height={16}
                  style={{ color: isSelected ? colors.primary500 : colors.gray200 }}
                />
                <span className={studentNameStyle}>{student.name}</span>
                <span className={studentPhoneStyle}>{student.phone}</span>
              </div>
            )
          })
        )}
      </div>
      <div className={actionsStyle}>
        <Button variant="ghost" size="lg" fullWidth onClick={handleClose}>취소</Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={selectedIds.length === 0}
          onClick={() => {
            onConfirm(selectedIds)
            handleClose()
          }}
        >
          추가 {selectedIds.length > 0 && `(${selectedIds.length})`}
        </Button>
      </div>
    </Modal>
  )
}