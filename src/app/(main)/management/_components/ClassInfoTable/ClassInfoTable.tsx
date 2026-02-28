import { tableStyle, thStyle, tdStyle } from './ClassInfoTable.css'

interface ClassInfo {
  academyName: string
  schedule: string
  time: string
  template: string
}

export default function ClassInfoTable({ academyName, schedule, time, template }: ClassInfo) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <table className={tableStyle}>
          <colgroup>
            <col style={{ width: '116px' }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th className={thStyle}>학원명</th>
              <td className={tdStyle}>{academyName}</td>
            </tr>
            <tr>
              <th className={thStyle}>수업 시간</th>
              <td className={tdStyle}>{time}</td>
            </tr>
          </tbody>
        </table>
        <table className={tableStyle}>
          <colgroup>
            <col style={{ width: '116px' }} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <th className={thStyle}>수업 요일</th>
              <td className={tdStyle}>{schedule}</td>
            </tr>
            <tr>
              <th className={thStyle}>수업 템플릿</th>
              <td className={tdStyle}>{template}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }