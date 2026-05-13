interface ClassInfo {
  academyName: string
  schedule: string
  status: '진행 중' | '종료'
  templates: { id: number; name: string }[]
}

const tableStyle = 'w-full border-collapse border border-gray-100 overflow-hidden'
const thStyle = 'w-[116px] h-10 px-4 bg-gray-50 text-gray-900 text-sm font-semibold tracking-[-0.03em] leading-[1.4] text-left border-r border-b border-gray-100'
const tdStyle = 'h-10 px-4 bg-white text-gray-700 text-sm font-medium tracking-[-0.03em] leading-[1.4] border-b border-gray-100 last:border-r-0'

export default function ClassInfoTable({ academyName, schedule, status, templates }: ClassInfo) {
  return (
    <div className="grid grid-cols-2 gap-5">
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
            <th className={thStyle}>수업 상태</th>
            <td className={tdStyle}>{status}</td>
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
            <td className={tdStyle}>
              {templates.length > 0 ? templates.map((t) => t.name).join(', ') : '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
