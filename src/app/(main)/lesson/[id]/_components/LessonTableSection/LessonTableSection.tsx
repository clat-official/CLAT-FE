'use client'

import CheckIcon from '@/assets/icons/icon-check.svg'
import { cva } from 'class-variance-authority'
import type { LessonStudent, Attendance, CompletionStatus } from '@/types/lessonStudent'
import type { LessonItemDetail } from '@/services/lesson'

const tableStyle = 'w-full border-collapse border border-gray-100 overflow-hidden'
const thBase = 'h-10 pl-4 bg-gray-50 text-gray-900 text-sm font-semibold tracking-[-0.03em] text-left border-b border-r border-gray-100 whitespace-nowrap last:border-r-0'
const thCompactStyle = `${thBase} pr-9 w-[1%]`
const thShrinkStyle = `${thBase} pr-4 w-[1%]`
const tdBase = 'h-10 pl-4 bg-white border-b border-r border-gray-100 last:border-r-0 [tr:last-child_&]:border-b-0'
const tdStyle = `${tdBase} pr-4`
const tdCompactStyle = `${tdBase} pr-9 w-[1%]`
const tdShrinkStyle = `${tdBase} pr-4 w-[1%]`
const cellButtonGroupStyle = 'flex gap-1'
const cellEditableStyle = 'w-full text-sm font-medium text-gray-700 tracking-[-0.03em] outline-none cursor-text whitespace-nowrap overflow-hidden [&:empty::before]:content-["—"] [&:empty::before]:text-gray-300 [&:empty::before]:pointer-events-none'
const nameCellStyle = 'text-sm font-medium text-gray-700 tracking-[-0.03em] whitespace-nowrap'
const thInnerStyle = 'flex items-center gap-4 whitespace-nowrap'
const checkboxLabelStyle = 'flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-300 tracking-[-0.03em]'
const checkboxLabelActiveStyle = 'text-primary-500'
const activeRowStyle = 'bg-success-50'

const cellButtonVariants = cva(
  'h-6 w-[44px] rounded-[6px] cursor-pointer text-xs font-medium tracking-[-0.03em] leading-[140%] transition-colors duration-150 border-none',
  {
    variants: {
      variant: {
        default: 'bg-gray-50 text-gray-300',
        attend: 'bg-success-500 text-white',
        late: 'bg-warning-500 text-white',
        absent: 'bg-error-500 text-white',
        done: 'bg-success-500 text-white',
        undone: 'bg-error-500 text-white',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

interface LessonTableSectionProps {
  students: LessonStudent[]
  templateItems: LessonItemDetail[]
  onChange: (students: LessonStudent[]) => void
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
        className={cellButtonVariants({ variant: value === '출석' ? 'attend' : 'default' })}
        onClick={() => onChange(value === '출석' ? null : '출석')}
      >
        출석
      </button>
      <button
        className={cellButtonVariants({ variant: value === '지각' ? 'late' : 'default' })}
        onClick={() => onChange(value === '지각' ? null : '지각')}
      >
        지각
      </button>
      <button
        className={cellButtonVariants({ variant: value === '결석' ? 'absent' : 'default' })}
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
        className={cellButtonVariants({ variant: value === '완료' ? 'done' : 'default' })}
        onClick={() => onChange(value === '완료' ? null : '완료')}
      >
        완료
      </button>
      <button
        className={cellButtonVariants({ variant: value === '미완료' ? 'undone' : 'default' })}
        onClick={() => onChange(value === '미완료' ? null : '미완료')}
      >
        미완료
      </button>
    </div>
  )
}

function SelectCell({
  options,
  value,
  onChange,
}: {
  options: { id: number; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className={cellButtonGroupStyle}>
      {options.map((opt) => (
        <button
          key={opt.id}
          className={cellButtonVariants({ variant: value === opt.label ? 'attend' : 'default' })}
          onClick={() => onChange(value === opt.label ? '' : opt.label)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default function LessonTable({
  students,
  templateItems,
  onChange,
}: LessonTableSectionProps) {
  const dynamicItems = templateItems.filter((i) => !i.is_common && i.item_type !== 'ATTENDANCE')

  const updateAttendance = (studentId: number, value: Attendance) => {
    onChange(students.map((s) => (s.id === studentId ? { ...s, attendance: value } : s)))
  }

  const updateItem = (
    studentId: number,
    templateItemId: number,
    value: string,
    is_completed?: boolean | null
  ) => {
    onChange(
      students.map((s) => {
        if (s.id !== studentId) return s
        const items = s.items.map((item) =>
          item.template_item_id === templateItemId
            ? { ...item, value, is_completed: is_completed ?? item.is_completed }
            : item
        )
        return { ...s, items }
      })
    )
  }

  const allAttend = students.every((s) => s.attendance === '출석')
  const handleAllAttend = (checked: boolean) => {
    onChange(students.map((s) => ({ ...s, attendance: checked ? '출석' : null })))
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
          {dynamicItems.map((item) => (
            <th key={item.id} className={thShrinkStyle}>
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td className={tdCompactStyle}>
              <span className={nameCellStyle}>{student.name}</span>
            </td>
            <td className={tdCompactStyle}>
              <AttendanceCell
                value={student.attendance}
                onChange={(v) => updateAttendance(student.id, v)}
              />
            </td>
            {dynamicItems.map((item) => {
              const studentItem = student.items.find((i) => i.template_item_id === item.id)
              if (item.item_type === 'SELECT') {
                return (
                  <td key={item.id} className={tdShrinkStyle}>
                    <SelectCell
                      options={item.options ?? []}
                      value={studentItem?.value ?? ''}
                      onChange={(v) => updateItem(student.id, item.id, v)}
                    />
                  </td>
                )
              }
              
              if (item.item_type === 'COMPLETE') {
                const status: CompletionStatus =
                  studentItem?.is_completed === true
                    ? '완료'
                    : studentItem?.is_completed === false
                      ? '미완료'
                      : null
                return (
                  <td key={item.id} className={tdShrinkStyle}>
                    <CompletionCell
                      value={status}
                      onChange={(v) =>
                        updateItem(
                          student.id,
                          item.id,
                          v ?? '',
                          v === '완료' ? true : v === '미완료' ? false : null
                        )
                      }
                    />
                  </td>
                )
              }
              return (
                <td key={item.id} className={tdStyle}>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className={cellEditableStyle}
                    onBlur={(e) =>
                      updateItem(student.id, item.id, e.currentTarget.textContent ?? '')
                    }
                    dangerouslySetInnerHTML={{ __html: studentItem?.value ?? '' }}
                  />
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
