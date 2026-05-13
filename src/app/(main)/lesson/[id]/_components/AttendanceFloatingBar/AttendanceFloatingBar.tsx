'use client'

import Text from '@/components/common/Text'
import useRemainingTime from '@/hooks/useRemainingTime'
import type { AttendanceSession } from '@/types/attendance'
import TimerIcon from '@/assets/icons/icon-timer.svg'

const barStyle = 'fixed bottom-12 left-[288px] right-12 z-[200] flex justify-between items-center py-6 px-8 bg-primary-400 rounded-[20px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.25)] max-xl:py-5 max-xl:px-6 max-xl:gap-4 max-lg:flex-col max-lg:items-stretch max-lg:gap-[14px]'
const leftSectionStyle = 'flex items-center gap-[60px] max-xl:gap-8 max-lg:gap-5'
const titleGroupStyle = 'flex items-center gap-3 max-xl:gap-2'
const statGroupStyle = 'flex items-center gap-10 max-xl:gap-6'
const statItemWrapperStyle = 'flex items-center gap-10 max-xl:gap-6'
const statItemStyle = 'flex flex-col items-center gap-[2px] min-w-[30px]'
const statNumberStyle = 'text-[28px] font-semibold tracking-[-0.03em] leading-[140%] text-white text-center max-xl:text-[22px] max-lg:text-[20px]'
const statDividerStyle = 'w-0 h-[44px] border-l border-primary-300 max-xl:h-9'
const rightSectionStyle = 'flex items-center gap-7 max-xl:gap-4 max-lg:justify-between'
const buttonGroupStyle = 'flex gap-2'
const detailButtonStyle = 'py-2 px-3 rounded-lg border-none cursor-pointer bg-primary-200 text-primary-800 text-sm font-semibold tracking-[-0.03em] leading-[140%]'
const endButtonStyle = 'py-2 px-3 rounded-lg border-none cursor-pointer bg-primary-500 text-white text-sm font-semibold tracking-[-0.03em] leading-[140%]'

interface Props {
  session: AttendanceSession
  className: string
  isEnding: boolean
  onOpenDetail: () => void
  onEnd: () => Promise<void>
}


export default function AttendanceFloatingBar({ session, className, isEnding, onOpenDetail, onEnd }: Props) {
  const remaining = useRemainingTime(session.expires_at)

  const presentCount = session.students.filter((s) => s.status === 'PRESENT').length
  const absentCount = session.students.filter((s) => s.status === 'ABSENT').length

  const STATS = [
    { label: '출석', value: presentCount },
    { label: '결석', value: absentCount },
  ]

  return (
    <div className={barStyle}>
      {/* 왼쪽: 타이머 아이콘 + 반명 + 통계 */}
      <div className={leftSectionStyle}>
        <div className={titleGroupStyle}>
          <TimerIcon width={36} height={36} />
          <Text variant="headingMd" color="white">{className} 출석체크</Text>
        </div>

        <div className={statGroupStyle}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className={statItemWrapperStyle}>
              <div className={statItemStyle}>
                <Text variant="bodyMd" color="white">{stat.label}</Text>
                <span className={statNumberStyle}>{stat.value}</span>
              </div>
              {i < STATS.length - 1 && <div className={statDividerStyle} />}
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽: 남은 시간 + 버튼 */}
      <div className={rightSectionStyle}>
        <Text variant="bodyMd" color="white">남은 시간 {remaining}</Text>
        <div className={buttonGroupStyle}>
          <button className={detailButtonStyle} onClick={onOpenDetail}>
            상세 보기
          </button>
          <button className={endButtonStyle} onClick={onEnd} disabled={isEnding}>
            출결 종료
          </button>
        </div>
      </div>
    </div>
  )
}
