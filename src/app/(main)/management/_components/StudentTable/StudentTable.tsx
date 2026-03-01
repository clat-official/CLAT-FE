'use client'

import { ReactNode } from 'react'
import TrashIcon from '@/assets/icons/icon-trash.svg'
import { colors } from '@/styles/tokens/colors'
import type { Student } from '@/types/student'
import {
  tableStyle,
  thStyle,
  tdStyle,
  completionCellStyle,
  progressTrackStyle,
  progressBarStyle,
  percentTextStyle,
  remainingTextStyle,
  deleteButtonStyle,
} from './StudentTable.css'

interface MiddleColumn {
  header: string
  render: (student: Student) => ReactNode
}

interface StudentTableProps {
  students: Student[]
  middleColumn: MiddleColumn
  onDelete: (id: number) => void
}

function getProgressColor(rate: number): string {
  if (rate >= 70) return colors.success500
  if (rate >= 40) return colors.warning500
  return colors.error500
}

export default function StudentTable({ students, middleColumn, onDelete }: StudentTableProps) {
  return (
    <table className={tableStyle}>
      <colgroup>
        <col style={{ width: '120px' }} />
        <col style={{ width: '180px' }} />
        <col style={{ width: '180px' }} />
        <col />
        <col style={{ width: '460px' }} />
      </colgroup>
      <thead>
        <tr>
          <th className={thStyle}>학생</th>
          <th className={thStyle}>학생 전화</th>
          <th className={thStyle}>학부모 전화</th>
          <th className={thStyle}>{middleColumn.header}</th>
          <th className={thStyle}>완료율</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => {
          const color = getProgressColor(student.completionRate)
          return (
            <tr key={student.id}>
              <td className={tdStyle}>{student.name}</td>
              <td className={tdStyle}>{student.studentPhone}</td>
              <td className={tdStyle}>{student.parentPhone}</td>
              {middleColumn.render(student)}
              <td className={tdStyle} style={{ padding: 0 }}>
                <div className={completionCellStyle}>
                  <div className={progressTrackStyle}>
                    <div
                      className={progressBarStyle}
                      style={{ width: `${student.completionRate}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className={percentTextStyle}>{student.completionRate}%</span>
                  <span className={remainingTextStyle} style={{ color }}>
                    {student.remaining}개 남음
                  </span>
                  <button className={deleteButtonStyle} onClick={() => onDelete(student.id)}>
                    <TrashIcon width={20} height={20} />
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}