import { useState } from 'react'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import Dropdown from '@/components/common/Dropdown'
import CloseIcon from '@/assets/icons/icon-close.svg'
import {
  backdrop, drawer, drawerClosing, header, content,
  dropdownTrigger, messagePreview, footer
} from './MessagePreview.css'
import { colors } from '@/styles/tokens/colors'

interface MessagePreviewProps {
  isOpen: boolean
  onClose: () => void
  commonValues: Record<number, string>
  students: any[]
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

  // 문자 메시지 생성 로직
  const generateMessage = () => {
    if (!selectedStudent) return ''

    return `안녕하세요, 엘리에듀학원 윤준용 강사입니다.
미적분 A반 2월 20일(금) 수업 결과입니다.

• 오늘 학습 내용: ${commonValues[1] || '-'}
• 다음 시간 범위: ${commonValues[2] || '-'}
• 클리닉 안내: ${commonValues[3] || '-'}

• 출결: ${selectedStudent.attendance || '미입력'}
• 시험 점수: ${selectedStudent.score || '0'}점

감사합니다.`
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
          <button onClick={handleClose} style={{ cursor: 'pointer', background: 'none', border: 'none', color: colors.gray500 }}>
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
            {generateMessage()}
          </div>
        </div>
      </div>
    </div>
  )
}