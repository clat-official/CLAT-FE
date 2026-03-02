import { useState } from 'react'
import Text from '@/components/common/Text'
import Dropdown from '@/components/common/Dropdown'
import CloseIcon from '@/assets/icons/icon-close.svg'
import { generateStudentMessage } from '@/lib/generateStudentMessage'
import type { LessonStudent } from '@/types/lessonStudent'
import {
  backdrop, drawer, drawerClosing, header, content,
  dropdownTrigger, messagePreview, closeButtonStyle,
} from './MessagePreview.css'

interface MessagePreviewProps {
  isOpen: boolean
  onClose: () => void
  commonValues: Record<number, string>
  students: LessonStudent[]
}

export default function MessagePreview({
  isOpen, onClose, commonValues, students
}: MessagePreviewProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(String(students[0]?.id))
  const [isClosing, setIsClosing] = useState(false)

  if (!isOpen && !isClosing) return null

  const selectedStudent = students.find(s => String(s.id) === selectedStudentId)

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
            <CloseIcon width={24} height={24}  />
          </button>
        </div>

        <div className={content}>
          <Dropdown
            options={students.map(s => ({ label: s.name, value: String(s.id) }))}
            value={selectedStudentId}
            onChange={setSelectedStudentId}
            triggerClassName={dropdownTrigger}
          />

          <div className={messagePreview}>
            {selectedStudent ? generateStudentMessage(selectedStudent, commonValues) : ''}
          </div>
        </div>
      </div>
    </div>
  )
}