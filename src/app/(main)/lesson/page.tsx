'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { startOfWeek, addWeeks, subWeeks, format, addDays, isSameDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import Text from '@/components/common/Text'
import DateCard from './_components/DateCard/DateCard'
import LessonCard from './_components/LessonCard/LessonCard'
import AddCard from '@/components/common/AddCard'
import AddLessonModal from './_components/AddLessonModal/AddLessonModal'
import PlusCircleIcon from '@/assets/icons/icon-plus-circle.svg'
import ArrowLeftIcon from '@/assets/icons/icon-chevron-left.svg'
import ArrowRightIcon from '@/assets/icons/icon-chevron-right.svg'
import {
  pageStyle,
  dateGridStyle,
  lessonGridStyle,
  sectionTitleStyle,
  navButtonStyle,
  weekNavStyle,
} from './lesson.css'
import { lessonService, type LessonSummary } from '@/services/lesson'

const DAYS_KO = ['월', '화', '수', '목', '금', '토', '일']

export default function LessonPage() {
  const router = useRouter()
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false)
  const [lessons, setLessons] = useState<LessonSummary[]>([])
  const [isLoadingLessons, setIsLoadingLessons] = useState(false)

  useEffect(() => {
    setIsLoadingLessons(true)
    lessonService
      .getLessons(format(selectedDate, 'yyyy-MM-dd'))
      .then((res) => setLessons(res.data))
      .catch((err) => console.error('수업 목록 조회 실패', err))
      .finally(() => setIsLoadingLessons(false))
  }, [selectedDate])

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 })

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(weekStart, i)
    return {
      date: date.getDate(),
      day: DAYS_KO[i],
      fullDate: date,
      status: 'none' as const, // 추후 API 연동 시 교체
    }
  })

  const headerText = `${format(weekStart, 'M월 d일')} – ${format(addDays(weekStart, 6), 'M월 d일')}`
  const selectedLabel = `${format(selectedDate, 'M월 d일')}(${DAYS_KO[selectedDate.getDay() === 0 ? 6 : selectedDate.getDay() - 1]}) 수업`

  return (
    <div className={pageStyle}>
      <Text variant="display" as="h1">
        수업 입력
      </Text>

      {/* 주간 네비게이션 */}
      <div className={weekNavStyle}>
        <button className={navButtonStyle} onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}>
          <ArrowLeftIcon width={24} height={24} />
        </button>
        <Text variant="headingMd">{headerText}</Text>
        <button className={navButtonStyle} onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>
          <ArrowRightIcon width={24} height={24} />
        </button>
      </div>

      {/* 날짜 카드 */}
      <div className={dateGridStyle}>
        {weekDays.map((item) => (
          <DateCard
            key={item.date}
            day={item.day}
            date={item.date}
            status={item.status}
            isSelected={isSameDay(item.fullDate, selectedDate)}
            onClick={() => setSelectedDate(item.fullDate)}
          />
        ))}
      </div>

      {/* 수업 목록 */}
      <div className={sectionTitleStyle}>
        <Text variant="headingMd">{selectedLabel}</Text>
      </div>
      <div className={lessonGridStyle}>
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.lesson_record_id}
            academyName={lesson.academy_name}
            templateName={lesson.template_name}
            className={lesson.class_name}
            progress={lesson.progress_rate}
            totalStudents={0}
            inputCount={0}
            isDone={lesson.status === 'SAVED'}
            onClick={() => router.push(`/lesson/${lesson.lesson_record_id}`)}
          />
        ))}
        <AddCard
          icon={<PlusCircleIcon width={36} height={36} />}
          label="다른 수업 추가"
          description="오늘 일정에 없는 반의 수업을 입력할 수 있어요"
          onClick={() => setIsAddLessonOpen(true)}
        />

        <AddLessonModal
          isOpen={isAddLessonOpen}
          onClose={() => setIsAddLessonOpen(false)}
          onConfirm={(classId) => {
            router.push(
              `/lesson/new?class_id=${classId}&date=${format(selectedDate, 'yyyy-MM-dd')}`
            )
          }}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  )
}
