'use client'

import { useEffect, useState } from 'react'
import Text from '@/components/common/Text'
import Dropdown from '@/components/common/Dropdown'
import CloseIcon from '@/assets/icons/icon-close.svg'
import { lessonService } from '@/services/lesson'
import {
  backdrop, drawer, drawerClosing, header, content,
  dropdownTrigger, messagePreview, closeButtonStyle,
} from './MessagePreview.css'

interface PreviewStudent {
  student_id: number
  student_name: string
  phone: string
  parent_phone: string
  message: string
}

interface MessagePreviewProps {
  isOpen: boolean
  onClose: () => void
  lessonId: number
}

export default function MessagePreview({ isOpen, onClose, lessonId }: MessagePreviewProps) {
  const [students, setStudents] = useState<PreviewStudent[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState<string>('')
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    lessonService.previewLesson(lessonId).then((res) => {
      setStudents(res.data)
      if (res.data.length > 0) {
        setSelectedStudentId(String(res.data[0].student_id))
      }
    })
  }, [isOpen, lessonId])

  if (!isOpen && !isClosing) return null

  const selectedStudent = students.find((s) => String(s.student_id) === selectedStudentId)

  const handleClose = () => setIsClosing(true)

  const handleAnimationEnd = () => {
    if (isClosing) {
      setIsClosing(false)
      onClose()
    }
  }

  return (
    <div className={backdrop} onClick={handleClose}>
      <div
        className={`${drawer}${isClosing ? ` ${drawerClosing}` : ''}`}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={header}>
          <Text variant="headingMd">문자 미리보기</Text>
          <button onClick={handleClose} className={closeButtonStyle}>
            <CloseIcon width={24} height={24} />
          </button>
        </div>

        <div className={content}>
          <Dropdown
            options={students.map((s) => ({ label: s.student_name, value: String(s.student_id) }))}
            value={selectedStudentId}
            onChange={setSelectedStudentId}
            triggerClassName={dropdownTrigger}
            noBorder
          />
          <div className={messagePreview}>
            {selectedStudent?.message ?? ''}
          </div>
        </div>
      </div>
    </div>
  )
}