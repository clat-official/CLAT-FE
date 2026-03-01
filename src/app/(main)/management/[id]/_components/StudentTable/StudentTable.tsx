import TrashIcon from '@/assets/icons/icon-trash.svg'
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


interface Student {
  id: number
  name: string
  studentPhone: string
  parentPhone: string
  memo: string
  completionRate: number
  remaining: number
}

interface StudentTableProps {
  students: Student[]
  onDelete: (id: number) => void
}

function getProgressColor(rate: number): string {
  // 기준 미정 — 추후 수정
  if (rate >= 70) return '#4CAF50'
  if (rate >= 40) return '#FFA726'
  return '#EF4453'
}

export default function StudentTable({ students, onDelete }: StudentTableProps) {
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
          <th className={thStyle}>메모</th>
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
              <td className={tdStyle}>{student.memo}</td>
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
                    <TrashIcon width={16} height={16} />
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
