'use client'

import { useState, useEffect } from 'react'
import Text from '@/components/common/Text'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import CheckIcon from '@/assets/icons/icon-check.svg'
import useToggleArray from '@/hooks/useToggleArray'
import { studentService } from '@/services/student'
import type { Student } from '@/types/student'
import { listItemRowStyle, listItemRowSelectedStyle } from '@/components/common/styles/listItem'
import { cn } from '@/lib/utils'

interface AddStudentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (studentIds: number[]) => void
  currentStudentIds?: number[]
}

export default function AddStudentModal({
  isOpen,
  onClose,
  onConfirm,
  currentStudentIds = []
}: AddStudentModalProps) {
  const [search, setSearch] = useState('')
  const [candidates, setCandidates] = useState<Student[]>([])
  const { items: selectedIds, toggle: toggleSelect, reset: resetIds } = useToggleArray<number>()

  useEffect(() => {
    if (!isOpen) return
    studentService.getStudents().then((res) => setCandidates(res.data))
  }, [isOpen])

  const filtered = candidates
    .filter((s) => !currentStudentIds.includes(s.id))
    .filter((s) => s.name.includes(search) || s.phone.includes(search))

  const handleClose = () => {
    setSearch('')
    resetIds()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="mb-5">
        <Text variant="headingLg">학생 추가</Text>
      </div>
      <div className="mb-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="학생 이름 또는 전화번호 검색"
        />
      </div>
      <div className="flex flex-col gap-2 mb-10 max-h-[320px] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-sm font-medium text-gray-300 tracking-[-0.03em]">
            검색 결과가 없어요
          </div>
        ) : (
          filtered.map((student) => {
            const isSelected = selectedIds.includes(student.id)
            return (
              <div
                key={student.id}
                className={cn(listItemRowStyle, isSelected && listItemRowSelectedStyle)}
                onClick={() => toggleSelect(student.id)}
              >
                <CheckIcon
                  width={16}
                  height={16}
                  className={isSelected ? 'text-primary-500' : 'text-gray-200'}
                />
                <span className="text-sm font-semibold text-gray-900 tracking-[-0.03em] leading-[1.4]">
                  {student.name}
                </span>
                <span className="text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.4]">
                  {student.phone}
                </span>
              </div>
            )
          })
        )}
      </div>
      <div className="flex gap-2 mt-6">
        <Button variant="ghost" size="lg" fullWidth onClick={handleClose}>
          취소
        </Button>
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
