'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { startOfWeek, addWeeks, subWeeks, format, addDays, isSameDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import Text from '@/components/common/Text'
import DateCard from './_components/DateCard/DateCard'
import LessonCard from './_components/LessonCard/LessonCard'
import AddCard from '@/components/common/AddCard'
import PlusCircleIcon from '@/assets/icons/icon-plus-circle.svg'
import ArrowLeftIcon from '@/assets/icons/icon-chevron-left.svg'
import ArrowRightIcon from '@/assets/icons/icon-chevron-right.svg'
import { pageStyle, dateGridStyle, lessonGridStyle, sectionTitleStyle, navButtonStyle } from './lesson.css'

const DAYS_KO = ['월', '화', '수', '목', '금', '토', '일']

const MOCK_LESSONS = [
  { id: 1, academyName: '엘리에듀학원', templateName: '정규 수업 템플릿', className: '미적분 A반', progress: 100, totalStudents: 29, inputCount: 29, isDone: true },
  { id: 2, academyName: '엘리에듀학원', templateName: '겨울방학 특강 템플릿', className: '미적분 A반', progress: 0, totalStudents: 29, inputCount: 0, isDone: false },
  { id: 3, academyName: '엘리에듀학원', templateName: '겨울방학 특강 템플릿', className: '미적분 A반', progress: 0, totalStudents: 29, inputCount: 0, isDone: false },
]

export default function LessonPage() {
  const router = useRouter()
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

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
      <Text variant="display" as="h1">수업 입력</Text>

      {/* 주간 네비게이션 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '60px', marginBottom: '24px'}}>
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
        {MOCK_LESSONS.map((lesson) => (
          <LessonCard
            key={lesson.id}
            {...lesson}
            onClick={() => router.push(`/lesson/${lesson.id}`)}
          />
        ))}
        <AddCard
          icon={<PlusCircleIcon width={36} height={36} />}
          label="다른 수업 추가"
          description="오늘 일정에 있는 반의 수업을 입력하러 이어요"
          onClick={() => console.log('다른 수업 추가')}
        />
      </div>
    </div>
  )
}