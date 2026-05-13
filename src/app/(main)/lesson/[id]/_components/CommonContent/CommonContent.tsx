const tableStyle = 'w-full border-collapse border border-gray-100 overflow-hidden'
const thStyle = 'w-[160px] h-12 pl-4 bg-gray-50 text-gray-900 text-sm font-semibold tracking-[-0.03em] text-left border-b border-r border-gray-100 [tr:last-child_&]:border-b-0'
const tdStyle = 'h-12 border-b border-gray-100 [tr:last-child_&]:border-b-0'
const inputStyle = 'w-full h-full px-4 border-none outline-none text-sm font-medium text-gray-700 tracking-[-0.03em] bg-transparent placeholder:text-gray-300 focus:bg-primary-50'

interface CommonItem {
  id: number
  label: string
}

interface CommonContentSectionProps {
  items: CommonItem[]
  values: Record<number, string>
  onChange: (id: number, value: string) => void
}

export default function CommonContent({ items, values, onChange }: CommonContentSectionProps) {
  return (
    <table className={tableStyle}>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <th className={thStyle}>{item.label}</th>
              <td className={tdStyle}>
                <input
                  className={inputStyle}
                  value={values[item.id] ?? ''}
                  onChange={(e) => onChange(item.id, e.target.value)}
                  placeholder="내용을 입력해주세요"
                />
              </td>
            </tr>
          ))}
        </tbody>
    </table>
  )
}