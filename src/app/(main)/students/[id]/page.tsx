'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStudentDetail } from '@/hooks/useStudentDashboard'
import { studentService } from '@/services/student'
import { useToastStore } from '@/stores/toastStore'
import type { IncompleteItem } from '@/types/student'
import ProfileCard from './_components/ProfileCard'
import StatsRow from './_components/StatsRow'
import IncompleteItemsPanel from './_components/IncompleteItemsPanel'
import RightPanel from './_components/RightPanel'
import ChevronLeftIcon from '@/assets/icons/icon-chevron-left.svg'

export default function StudentDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const studentId = Number(id)
  const router = useRouter()
  const addToast = useToastStore((s) => s.addToast)

  const { detail, isLoading, refetch } = useStudentDetail(studentId)
  const [incompleteItems, setIncompleteItems] = useState<IncompleteItem[]>([])

  useEffect(() => {
    if (detail) setIncompleteItems(detail.incomplete_items)
  }, [detail])

  const handleComplete = async (itemId: number) => {
    try {
      await studentService.completeItem(itemId)
      setIncompleteItems((prev) => prev.filter((i) => i.lesson_student_data_id !== itemId))
      refetch()
      addToast({ variant: 'success', message: '완료 처리됐어요.' })
    } catch {
      addToast({ variant: 'error', message: '완료 처리에 실패했어요.' })
    }
  }

  return (
    <>
      <button
        className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-gray-500 hover:text-gray-700 mb-8 p-0"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon width={20} height={20} />
        <span className="text-sm font-semibold text-gray-500 tracking-[-0.03em] leading-[1.4]">
          학생 대시보드
        </span>
      </button>

      <div className="flex gap-5 items-start">
        {/* 좌측 패널 */}
        <div className="w-[448px] shrink-0 flex flex-col gap-6">
          <ProfileCard detail={detail} isLoading={isLoading} />
          <StatsRow stats={detail?.stats ?? null} />
          <IncompleteItemsPanel
            items={incompleteItems}
            isLoading={isLoading}
            onComplete={handleComplete}
          />
        </div>

        {/* 우측 패널 */}
        <RightPanel studentId={studentId} />
      </div>
    </>
  )
}
