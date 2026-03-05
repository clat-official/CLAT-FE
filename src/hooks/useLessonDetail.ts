import { useState, useEffect } from 'react'
import type { LessonStudent } from '@/types/lessonStudent'
import { lessonService, type LessonDetail } from '@/services/lesson'
import { templateService, type TemplateDetail } from '@/services/template'
import { exportLessonExcel } from '@/lib/exportExcel'
import useDisclosure from './useDisclosure'

export default function useLessonDetail(lessonId: number) {
  const [lesson, setLesson] = useState<LessonDetail | null>(null)
  const [template, setTemplate] = useState<TemplateDetail | null>(null)
  const [commonValues, setCommonValues] = useState<Record<number, string>>({})
  const [students, setStudents] = useState<LessonStudent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const messagePreview = useDisclosure()

  useEffect(() => {
    if (!lessonId) return
    setIsLoading(true)
    lessonService
      .getLesson(lessonId)
      .then(async (data) => {
        setLesson(data)
        // common_data 초기값 세팅
        const values: Record<number, string> = {}
        data.common_data.forEach((item) => {
          values[item.template_item_id] = item.value
        })
        setCommonValues(values)
        // 템플릿 상세 조회
        const tmpl = await templateService.getTemplate(data.template_id)
        setTemplate(tmpl)
      })
      .finally(() => setIsLoading(false))
  }, [lessonId])

  const inputCount = students.filter((s) =>
    s.attendance !== null &&
    s.homework !== null &&
    s.answerNote !== null &&
    s.score !== ''
  ).length

  const handleExcelDownload = () => {
    if (!lesson || !template) return
    exportLessonExcel({
      title: `${lesson.lesson_date} 수업 결과`,
      commonItems: template.items.filter((i) => i.is_common).map((i) => ({ id: i.id, label: i.name })),
      commonValues,
      students,
      context: {
        academyName: '',
        teacherName: '',
        className: '',
        lessonDate: lesson.lesson_date,
      },
    })
  }

  return {
    lesson,
    template,
    commonValues,
    setCommonValues,
    students,
    setStudents,
    messagePreview,
    inputCount,
    isLoading,
    handleExcelDownload,
  }
}