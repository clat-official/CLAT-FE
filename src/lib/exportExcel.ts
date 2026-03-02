import * as XLSX from 'xlsx'
import type { LessonStudent } from '@/types/lessonStudent'
import { generateStudentMessage } from './generateStudentMessage'

interface LessonExportOptions {
  title: string
  commonItems: { id: number; label: string }[]
  commonValues: Record<number, string>
  students: LessonStudent[]
  context: {
    academyName: string
    teacherName: string
    className: string
    lessonDate: string
  }
}

export function exportLessonExcel({
  title,
  commonItems,
  commonValues,
  students,
  context,
}: LessonExportOptions) {
  const commonRows = commonItems.map((item) => [item.label, commonValues[item.id] || ''])
  const studentRows = students.map((s) => [
    s.name,
    s.attendance ?? '미입력',
    s.homework ?? '미입력',
    s.answerNote ?? '미입력',
    s.score || '0',
    s.memo || '',
  ])

  const ws = XLSX.utils.aoa_to_sheet([
    [title],
    [],
    ['공통 내용'],
    ...commonRows,
    [],
    ['개별 내용'],
    ['이름', '출결', '숙제', '오답노트', '시험 점수', '메모'],
    ...studentRows,
  ])

  const wsMessages = XLSX.utils.aoa_to_sheet([
    ['이름', '문자 내용'],
    ...students.map((s) => [s.name, generateStudentMessage(s, commonValues, context)]),
  ])

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '수업 결과')
  XLSX.utils.book_append_sheet(wb, wsMessages, '문자 내용')
  XLSX.writeFile(wb, '수업결과.xlsx')
}
