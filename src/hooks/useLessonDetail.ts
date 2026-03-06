import { useState, useEffect } from 'react'
import type { LessonStudent } from '@/types/lessonStudent'
import { lessonService, type LessonDetail } from '@/services/lesson'
import { templateService, type TemplateDetail } from '@/services/template'
import { classService } from '@/services/class'
import { exportLessonExcel } from '@/lib/exportExcel'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import useDisclosure from './useDisclosure'

export default function useLessonDetail(lessonId: number) {
  const [lesson, setLesson] = useState<LessonDetail | null>(null)
  const [template, setTemplate] = useState<TemplateDetail | null>(null)
  const [commonValues, setCommonValues] = useState<Record<number, string>>({})
  const [students, setStudents] = useState<LessonStudent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [error, setError] = useState<'TEMPLATE_NOT_FOUND' | null>(null)
  const messagePreview = useDisclosure()

  const refetch = () => {
    setError(null)
    setRefreshKey((k) => k + 1)
  }

  useEffect(() => {
    if (!lessonId) return
    setIsLoading(true)
    let cancelled = false

    lessonService
      .getLesson(lessonId)
      .then(async (data) => {
        if (cancelled) return
        setLesson(data)

        const values: Record<number, string> = {}
        data.common_data.forEach((item) => {
          values[item.template_item_id] = item.value
        })
        setCommonValues(values)

        try {
          const tmpl = await templateService.getTemplate(data.template_id)
          setTemplate(tmpl)

          const attendanceItem = tmpl.items.find((i) => i.item_type === 'ATTENDANCE')
          const individualItems = tmpl.items.filter(
            (i) => !i.is_common && i.item_type !== 'ATTENDANCE'
          )
          const classStudents = await classService.getClassStudents(data.class_id, data.lesson_date)
          const studentDataMap = new Map(data.student_data.map((sd) => [sd.student_id, sd.items]))

          const validStudentIds =
            data.student_data.length > 0
              ? new Set(data.student_data.map((sd) => sd.student_id))
              : null
          const baseStudents = validStudentIds
            ? classStudents.filter((s) => validStudentIds.has(s.id))
            : classStudents

          const initialized: LessonStudent[] = baseStudents.map((s) => {
            const existingItems = studentDataMap.get(s.id) ?? []
            const attendanceRaw = attendanceItem
              ? (existingItems.find((ei) => ei.template_item_id === attendanceItem.id)?.value ??
                null)
              : null
            const attendance: LessonStudent['attendance'] =
              attendanceRaw === '출석' || attendanceRaw === '지각' || attendanceRaw === '결석'
                ? attendanceRaw
                : null

            return {
              id: s.id,
              name: s.name,
              attendance,
              items: individualItems.map((item) => {
                const existing = existingItems.find((ei) => ei.template_item_id === item.id)
                return {
                  template_item_id: item.id,
                  value: existing?.value ?? '',
                  is_completed: existing?.is_completed ?? null,
                }
              }),
            }
          })
          setStudents(initialized)
        } catch (err: any) {
          if (cancelled) return
          if (err?.response?.data?.error?.code === 'TEMPLATE_NOT_FOUND') {
            setError('TEMPLATE_NOT_FOUND')
          }
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [lessonId, refreshKey])

  const inputCount = students.filter((s) => s.attendance !== null).length

  const handleExcelDownload = () => {
    if (!lesson || !template) return
    exportLessonExcel({
      title: `${format(new Date(lesson.lesson_date), 'M월 d일(E)', { locale: ko })} ${lesson.class_name} 수업 결과`,
      commonItems: template.items
        .filter((i) => i.is_common)
        .map((i) => ({ id: i.id, label: i.name })),
      commonValues,
      students,
      context: {
        academyName: lesson.academy_name,
        teacherName: '',
        className: lesson.class_name,
        lessonDate: format(new Date(lesson.lesson_date), 'M월 d일(E)', { locale: ko }),
      },
    })
  }

  return {
    lesson,
    setLesson,
    template,
    error,
    commonValues,
    setCommonValues,
    students,
    setStudents,
    messagePreview,
    inputCount,
    isLoading,
    handleExcelDownload,
    refetch,
  }
}
