'use client'

import { useEffect, useState } from 'react'
import Text from '@/components/common/Text'
import type { AttendanceSession } from '@/types/attendance'
import {
  barStyle,
  leftSectionStyle,
  titleGroupStyle,
  statGroupStyle,
  statItemWrapperStyle,
  statItemStyle,
  statNumberStyle,
  statDividerStyle,
  rightSectionStyle,
  buttonGroupStyle,
  detailButtonStyle,
  endButtonStyle,
} from './AttendanceFloatingBar.css'
import TimerIcon from '@/assets/icons/icon-timer.svg'

interface Props {
  session: AttendanceSession
  className: string
  onOpenDetail: () => void
  onEnd: () => Promise<void>
}

function useRemainingTime(expiresAt: string) {
  const [remaining, setRemaining] = useState('')

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, new Date(expiresAt).getTime() - Date.now())
      const m = Math.floor(diff / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setRemaining(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [expiresAt])

  return remaining
}

export default function AttendanceFloatingBar({ session, className, onOpenDetail, onEnd }: Props) {
  const remaining = useRemainingTime(session.expires_at)
  const [isEnding, setIsEnding] = useState(false)

  const handleEnd = async () => {
    setIsEnding(true)
    try {
      await onEnd()
    } finally {
      setIsEnding(false)
    }
  }

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
          <button className={endButtonStyle} onClick={handleEnd} disabled={isEnding}>
            출결 종료
          </button>
        </div>
      </div>
    </div>
  )
}
