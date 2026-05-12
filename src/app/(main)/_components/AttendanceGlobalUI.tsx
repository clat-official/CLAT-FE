'use client'

import { useAttendanceStore } from '@/stores/attendanceStore'
import AttendanceFloatingBar from '@/app/(main)/lesson/[id]/_components/AttendanceFloatingBar/AttendanceFloatingBar'
import AttendanceDetailModal from '@/app/(main)/lesson/[id]/_components/AttendanceDetailModal/AttendanceDetailModal'
import AttendanceCompleteModal from '@/app/(main)/lesson/[id]/_components/AttendanceCompleteModal/AttendanceCompleteModal'

export default function AttendanceGlobalUI() {
  const session = useAttendanceStore((s) => s.session)
  const summary = useAttendanceStore((s) => s.summary)
  const className = useAttendanceStore((s) => s.className)
  const isDetailModalOpen = useAttendanceStore((s) => s.isDetailModalOpen)
  const isCompleteModalOpen = useAttendanceStore((s) => s.isCompleteModalOpen)
  const openDetailModal = useAttendanceStore((s) => s.openDetailModal)
  const closeDetailModal = useAttendanceStore((s) => s.closeDetailModal)
  const closeCompleteModal = useAttendanceStore((s) => s.closeCompleteModal)
  const endSession = useAttendanceStore((s) => s.endSession)
  const patchStudentAttendance = useAttendanceStore((s) => s.patchStudentAttendance)

  return (
    <>
      {session?.is_active && (
        <AttendanceFloatingBar
          session={session}
          className={className}
          onOpenDetail={openDetailModal}
          onEnd={endSession}
        />
      )}

      {session?.is_active && (
        <AttendanceDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          onEnd={endSession}
          session={session}
          className={className}
          onPatchStudent={patchStudentAttendance}
        />
      )}

      {summary && (
        <AttendanceCompleteModal
          isOpen={isCompleteModalOpen}
          onClose={closeCompleteModal}
          summary={summary}
        />
      )}
    </>
  )
}
