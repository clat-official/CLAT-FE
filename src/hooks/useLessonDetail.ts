import { useState } from 'react'
import type { LessonStudent } from '@/types/lessonStudent'
import type { MessageContext } from '@/lib/generateStudentMessage'
import { exportLessonExcel } from '@/lib/exportExcel'
import { MOCK_COMMON_ITEMS, MOCK_LESSON_STUDENTS } from '@/mocks/lesson'
import useDisclosure from './useDisclosure'

// API 연동 전까지 페이지 수준에서 주입되는 수업 컨텍스트
export const DEFAULT_LESSON_CONTEXT: MessageContext = {
  academyName: '엘리에듀학원',
  teacherName: '윤준용',
  className: '미적분 A반',
  lessonDate: '2월 20일(금)',
}

export default function useLessonDetail() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(1)
  const [commonValues, setCommonValues] = useState<Record<number, string>>({})
  const [students, setStudents] = useState<LessonStudent[]>(MOCK_LESSON_STUDENTS)
  const messagePreview = useDisclosure()

  const inputCount = students.filter(
    (s) =>
      s.attendance !== null &&
      s.homework !== null &&
      s.answerNote !== null &&
      s.score !== '',
  ).length

  const handleExcelDownload = () => {
    exportLessonExcel({
      title: `${DEFAULT_LESSON_CONTEXT.lessonDate} ${DEFAULT_LESSON_CONTEXT.className} 수업 결과`,
      commonItems: MOCK_COMMON_ITEMS,
      commonValues,
      students,
      context: DEFAULT_LESSON_CONTEXT,
    })
  }

  return {
    selectedTemplateId,
    setSelectedTemplateId,
    commonValues,
    setCommonValues,
    students,
    setStudents,
    messagePreview,
    inputCount,
    handleExcelDownload,
  }
}
