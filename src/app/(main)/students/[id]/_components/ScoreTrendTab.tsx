'use client'

import { useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { useScoreHistory } from '@/hooks/useStudentDashboard'
import type { ScoreHistoryPeriod } from '@/services/student'
import { cn } from '@/lib/utils'

interface Props {
  studentId: number
}

const PERIODS: { label: string; value: ScoreHistoryPeriod }[] = [
  { label: '최근 5회', value: 'recent5' },
  { label: '최근 10회', value: 'recent10' },
  { label: '1개월', value: '1month' },
  { label: '3개월', value: '3months' },
  { label: '전체', value: 'all' },
]

export default function ScoreTrendTab({ studentId }: Props) {
  const [period, setPeriod] = useState<ScoreHistoryPeriod>('recent5')
  const { data, isLoading } = useScoreHistory(studentId, period)

  const chartData = data.map((d) => ({
    date: format(parseISO(d.lesson_date), 'M/d'),
    내점수: d.score,
    ...(d.class_avg !== null ? { 반평균: Math.round(d.class_avg) } : {}),
    ...(d.class_max !== null ? { 반최고: d.class_max } : {}),
  }))

  const hasClassAvg = data.some((d) => d.class_avg !== null)
  const hasClassMax = data.some((d) => d.class_max !== null)

  return (
    <div className="flex flex-col gap-5">
      {/* Period filter */}
      <div className="flex gap-2">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            className={cn(
              'text-sm font-medium tracking-[-0.03em] leading-[1.4] py-2 px-4 rounded-lg border-none cursor-pointer',
              period === p.value
                ? 'bg-gray-50 text-gray-700'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            )}
            onClick={() => setPeriod(p.value)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      {isLoading ? (
        <div className="h-[280px] flex items-center justify-center">
          <span className="text-sm text-gray-300 tracking-[-0.03em]">불러오는 중...</span>
        </div>
      ) : chartData.length === 0 ? (
        <div className="h-[280px] flex items-center justify-center">
          <span className="text-sm text-gray-300 tracking-[-0.03em]">데이터가 없어요.</span>
        </div>
      ) : (
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-75)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: 'var(--color-gray-500)', fontFamily: 'Pretendard' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: 'var(--color-gray-500)', fontFamily: 'Pretendard' }}
                axisLine={false}
                tickLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid var(--color-gray-100)',
                  fontSize: '12px',
                  fontFamily: 'Pretendard',
                }}
              />
              {(hasClassAvg || hasClassMax) && (
                <Legend
                  wrapperStyle={{ fontSize: '12px', fontFamily: 'Pretendard' }}
                />
              )}
              <Line
                type="monotone"
                dataKey="내점수"
                stroke="var(--color-primary-500)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-primary-500)', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              {hasClassAvg && (
                <Line
                  type="monotone"
                  dataKey="반평균"
                  stroke="var(--color-gray-300)"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={false}
                />
              )}
              {hasClassMax && (
                <Line
                  type="monotone"
                  dataKey="반최고"
                  stroke="var(--color-gray-200)"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={false}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
