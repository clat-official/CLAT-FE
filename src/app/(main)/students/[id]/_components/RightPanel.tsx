'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import ScoreTrendTab from './ScoreTrendTab'
import LessonHistoryTab from './LessonHistoryTab'
import AlimtalkTab from './AlimtalkTab'
import AiAnalysisCard from './AiAnalysisCard'

type Tab = 'score' | 'lesson' | 'alimtalk'

interface Props {
  studentId: number
}

const TABS: { label: string; value: Tab }[] = [
  { label: '점수 추이', value: 'score' },
  { label: '수업 이력', value: 'lesson' },
  { label: '알림톡', value: 'alimtalk' },
]

export default function RightPanel({ studentId }: Props) {
  const [tab, setTab] = useState<Tab>('score')

  return (
    <div className="flex-1 bg-white rounded-[20px] flex flex-col">
      {/* Tab bar */}
      <div className="relative px-7 pt-7">
        <div className="flex gap-7">
          {TABS.map((t) => (
            <button
              key={t.value}
              className={cn(
                'pb-4 text-xl font-semibold tracking-[-0.03em] leading-[1.4] border-none bg-transparent cursor-pointer p-0 pb-4',
                tab === t.value ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'
              )}
              onClick={() => setTab(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Active underline */}
        <div
          className="absolute bottom-0 h-[2px] bg-gray-900 transition-[left,width] duration-200"
          style={getUnderlineStyle(tab)}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100" />
      </div>

      {/* Tab content */}
      <div className="flex-1 px-7 py-6">
        {tab === 'score' && <ScoreTrendTab studentId={studentId} />}
        {tab === 'lesson' && <LessonHistoryTab studentId={studentId} />}
        {tab === 'alimtalk' && <AlimtalkTab studentId={studentId} />}
      </div>

      {/* AI Analysis card */}
      <div className="px-7 pb-7">
        <AiAnalysisCard studentId={studentId} />
      </div>
    </div>
  )
}

function getUnderlineStyle(tab: Tab): React.CSSProperties {
  const tabWidths: Record<Tab, number> = { score: 72, lesson: 64, alimtalk: 52 }
  const tabOffsets: Record<Tab, number> = { score: 28, lesson: 28 + 72 + 28, alimtalk: 28 + 72 + 28 + 64 + 28 }
  return {
    left: `${tabOffsets[tab]}px`,
    width: `${tabWidths[tab]}px`,
  }
}
