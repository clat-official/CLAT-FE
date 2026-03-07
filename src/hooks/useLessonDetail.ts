import { useState, useEffect } from 'react'
import type { LessonStudent } from '@/types/lessonStudent'
import { lessonService, type LessonDetail, type LessonItemDetail } from '@/services/lesson'
import { classService } from '@/services/class'
import { exportLessonExcel } from '@/lib/exportExcel'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import useDisclosure from './useDisclosure'

export default function useLessonDetail(lessonId: number) {
  const [lesson, setLesson] = useState<LessonDetail | null>(null)
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

        const attendanceItem = data.items.find((i) => i.item_type === 'ATTENDANCE')
        const individualItems = data.items.filter(
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
            ? (existingItems.find((ei) => ei.template_item_id === attendanceItem.id)?.value ?? null)
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
                is_completed:
                  typeof existing?.is_completed === 'boolean' ? existing.is_completed : null,
              }
            }),
          }
        })
        setStudents(initialized)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [lessonId, refreshKey])

  const inputCount = students.filter((s) => {
    if (s.attendance === null) return false
    return s.items.every((item) => {
      if (item.is_completed !== null) return item.is_completed !== null
      return item.value.trim() !== ''
    })
  }).length

  const handleExcelDownload = () => {
    if (!lesson) return
    const individualItems = lesson.items
      .filter((i) => !i.is_common && i.item_type !== 'ATTENDANCE')
      .map((i) => ({ id: i.id, label: i.name }))

    exportLessonExcel({
      title: `${format(new Date(lesson.lesson_date), 'M월 d일(E)', { locale: ko })} ${lesson.class_name} 수업 결과`,
      commonItems: lesson.items
        .filter((i) => i.is_common)
        .map((i) => ({ id: i.id, label: i.name })),
      commonValues,
      students,
      individualItems,
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