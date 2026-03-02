'use client'

import CheckIcon from '@/assets/icons/icon-check.svg'
import {
  tableStyle,
  thStyle,
  tdStyle,
  thCompactStyle,
  tdCompactStyle,
  thShrinkStyle,
  tdShrinkStyle,
  cellButtonGroupStyle,
  cellButtonRecipe,
  cellEditableStyle,
  nameCellStyle,
  thInnerStyle,
  checkboxLabelStyle,
  checkboxLabelActiveStyle,
  activeRowStyle,
} from './LessonTable.css'

import type { LessonStudent as Student, Attendance, CompletionStatus } from '@/types/lessonStudent'

interface LessonTableSectionProps {
  students: Student[]
  onChange: (students: Student[]) => void
}

function AttendanceCell({
  value,
  onChange,
}: {
  value: Attendance
  onChange: (v: Attendance) => void
}) {
  return (
    <div className={cellButtonGroupStyle}>
      <button
        className={cellButtonRecipe({ variant: value === '출석' ? 'attend' : 'default' })}
        onClick={() => onChange(value === '출석' ? null : '출석')}
      >
        출석
      </button>
      <button
        className={cellButtonRecipe({ variant: value === '지각' ? 'late' : 'default' })}
        onClick={() => onChange(value === '지각' ? null : '지각')}
      >
        지각
      </button>
      <button
        className={cellButtonRecipe({ variant: value === '결석' ? 'absent' : 'default' })}
        onClick={() => onChange(value === '결석' ? null : '결석')}
      >
        결석
      </button>
    </div>
  )
}

function CompletionCell({
  value,
  onChange,
}: {
  value: CompletionStatus
  onChange: (v: CompletionStatus) => void
}) {
  return (
    <div className={cellButtonGroupStyle}>
      <button
        className={cellButtonRecipe({ variant: value === '완료' ? 'done' : 'default' })}
        onClick={() => onChange(value === '완료' ? null : '완료')}
      >
        완료
      </button>
      <button
        className={cellButtonRecipe({ variant: value === '미완료' ? 'undone' : 'default' })}
        onClick={() => onChange(value === '미완료' ? null : '미완료')}
      >
        미완료
      </button>
    </div>
  )
}

export default function LessonTable({ students, onChange }: LessonTableSectionProps) {
  const updateStudent = (id: number, field: keyof Student, value: unknown) => {
    onChange(students.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const allAttend = students.every((s) => s.attendance === '출석')
  const allHomework = students.every((s) => s.homework === '완료')
  const allAnswerNote = students.every((s) => s.answerNote === '완료')

  const handleAllAttend = (checked: boolean) => {
    onChange(students.map((s) => ({ ...s, attendance: checked ? '출석' : null })))
  }
  const handleAllHomework = (checked: boolean) => {
    onChange(students.map((s) => ({ ...s, homework: checked ? '완료' : null })))
  }
  const handleAllAnswerNote = (checked: boolean) => {
    onChange(students.map((s) => ({ ...s, answerNote: checked ? '완료' : null })))
  }

  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          <th className={thCompactStyle}>학생</th>
          <th className={thCompactStyle}>
            <div className={thInnerStyle}>
              출결
              <div
                className={`${checkboxLabelStyle}${allAttend ? ` ${checkboxLabelActiveStyle}` : ''}`}
                onClick={() => handleAllAttend(!allAttend)}
              >
                <CheckIcon width={14} height={14} />
                전체 출석
              </div>
            </div>
          </th>
          <th className={thShrinkStyle}>
            <div className={thInnerStyle}>
              과제
              <div
                className={`${checkboxLabelStyle}${allHomework ? ` ${checkboxLabelActiveStyle}` : ''}`}
                onClick={() => handleAllHomework(!allHomework)}
              >
                <CheckIcon width={14} height={14} />
                전체 완료
              </div>
            </div>
          </th>
          <th className={thShrinkStyle}>
            <div className={thInnerStyle}>
              오답노트
              <div
                className={`${checkboxLabelStyle}${allAnswerNote ? ` ${checkboxLabelActiveStyle}` : ''}`}
                onClick={() => handleAllAnswerNote(!allAnswerNote)}
              >
                <CheckIcon width={14} height={14} />
                전체 완료
              </div>
            </div>
          </th>
          <th className={thShrinkStyle}>시험 점수</th>
          <th className={thStyle}>메모</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr
            key={student.id}
            className={
              student.attendance !== null &&
              student.homework !== null &&
              student.answerNote !== null &&
              student.score !== ''
                ? activeRowStyle
                : undefined
            }
          >
            <td className={tdCompactStyle}>
              <span className={nameCellStyle}>{student.name}</span>
            </td>
            <td className={tdCompactStyle}>
              <AttendanceCell
                value={student.attendance}
                onChange={(v) => updateStudent(student.id, 'attendance', v)}
              />
            </td>
            <td className={tdShrinkStyle}>
              <CompletionCell
                value={student.homework}
                onChange={(v) => updateStudent(student.id, 'homework', v)}
              />
            </td>
            <td className={tdShrinkStyle}>
              <CompletionCell
                value={student.answerNote}
                onChange={(v) => updateStudent(student.id, 'answerNote', v)}
              />
            </td>
            <td className={tdShrinkStyle}>
              <div
                contentEditable
                suppressContentEditableWarning
                className={cellEditableStyle}
                onBlur={(e) => updateStudent(student.id, 'score', e.currentTarget.textContent ?? '')}
                dangerouslySetInnerHTML={{ __html: student.score }}
              />
            </td>
            <td className={tdStyle}>
              <div
                contentEditable
                suppressContentEditableWarning
                className={cellEditableStyle}
                onBlur={(e) => updateStudent(student.id, 'memo', e.currentTarget.textContent ?? '')}
                dangerouslySetInnerHTML={{ __html: student.memo }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
