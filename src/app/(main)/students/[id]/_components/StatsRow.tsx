'use client'

import type { StudentStats } from '@/types/student'

interface Props {
  stats: StudentStats | null
}

interface StatCardProps {
  label: string
  value: string
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex-1 bg-gray-50 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs font-semibold text-gray-500 tracking-[-0.03em] leading-[1.4]">{label}</span>
      <span className="text-2xl font-semibold text-gray-700 tracking-[-0.03em] leading-[1.4]">{value}</span>
    </div>
  )
}

export default function StatsRow({ stats }: Props) {
  if (!stats) {
    return <div className="flex gap-2 h-[88px]" />
  }

  return (
    <div className="flex gap-2">
      <StatCard label="완료율" value={`${Math.round(stats.completion_rate * 100)}%`} />
      <StatCard label="완료" value={`${stats.total_complete_items}개`} />
      <StatCard label="미완료" value={`${stats.total_incomplete_items}개`} />
    </div>
  )
}
