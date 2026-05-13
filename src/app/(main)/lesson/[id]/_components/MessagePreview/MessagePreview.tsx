'use client'

import { useEffect, useState } from 'react'
import Text from '@/components/common/Text'
import Dropdown from '@/components/common/Dropdown'
import CloseIcon from '@/assets/icons/icon-close.svg'
import { lessonService, type LessonDetail } from '@/services/lesson'
import { useUserStore } from '@/stores/userStore'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
const backdrop = 'fixed inset-0 bg-black/40 flex justify-end z-[100]'
const drawer = 'w-[480px] h-full bg-gray-50 shadow-[-4px_0_16px_rgba(0,0,0,0.1)] flex flex-col animate-slide-in-right'
const drawerClosing = 'animate-slide-out-right'
const header = 'p-5 border-b border-gray-100 flex justify-between items-center'
const content = 'flex-1 p-6 overflow-y-auto flex flex-col gap-4'
const dropdownTrigger = 'border-none bg-white'
const messagePreview = 'bg-white p-6 rounded-xl whitespace-pre-wrap text-gray-700 text-sm font-medium tracking-[-0.03em] leading-[180%]'
const closeButtonStyle = 'bg-transparent border-none cursor-pointer text-gray-500 flex items-center'

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
  lesson: LessonDetail
}

export default function MessagePreview({ isOpen, onClose, lessonId, lesson }: MessagePreviewProps) {
  const [students, setStudents] = useState<PreviewStudent[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState<string>('')
  const [isClosing, setIsClosing] = useState(false)
  const user = useUserStore((s) => s.user)
  const teacherName = user?.name ? `${user.name} ` : ''

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

  const formatMessage = (message: string) => {
    return `안녕하세요, ${lesson.academy_name} ${teacherName}강사입니다.\n\n${lesson.class_name} ${format(new Date(lesson.lesson_date), 'M월 d일(E)', { locale: ko })} 수업 결과를 안내드립니다.\n\n${message}\n\n감사합니다.`
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
            {selectedStudent ? formatMessage(selectedStudent.message) : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
