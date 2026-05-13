const wrapperStyle = 'flex items-center gap-9 flex-1 mr-6'
const labelStyle = 'text-[18px] font-semibold text-primary-500 tracking-[-0.03em] whitespace-nowrap'
const trackStyle = 'flex-1 h-4 bg-gray-50 rounded-[999px] overflow-hidden'
const barStyle = 'h-full bg-primary-500 rounded-[999px] transition-[width] duration-[400ms]'
const countStyle = 'text-[18px] font-semibold text-gray-700 tracking-[-0.03em] whitespace-nowrap'

interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100)

  return (
    <div className={wrapperStyle}>
      <span className={labelStyle}>진행도</span>
      <div className={trackStyle}>
        <div className={barStyle} style={{ width: `${percent}%` }} />
      </div>
      <span className={countStyle}>{current}/{total}명 입력</span>
    </div>
  )
}