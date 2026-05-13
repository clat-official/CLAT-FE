import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { attendanceService } from '@/services/attendance'
import type { AttendanceSession, AttendanceSummary, AttendanceStatus } from '@/types/attendance'

let pollInterval: ReturnType<typeof setInterval> | null = null

function stopPolling() {
  if (pollInterval) {
    clearInterval(pollInterval)
    pollInterval = null
  }
}

// onRehydrateStorage에서 호출할 수 있도록 모듈 레벨에 정의
// useAttendanceStore.setState는 런타임 호출 시점에 이미 할당되어 있으므로 안전
function startPolling(sessionId: number) {
  stopPolling()
  pollInterval = setInterval(async () => {
    try {
      const s = await attendanceService.getSession(sessionId)
      useAttendanceStore.setState({ session: s })
      if (!s.is_active) stopPolling()
    } catch {}
  }, 3000)
}

interface AttendanceState {
  session: AttendanceSession | null
  summary: AttendanceSummary | null
  isFetching: boolean
  lessonId: number | null
  className: string
  isDetailModalOpen: boolean
  isCompleteModalOpen: boolean
}

interface AttendanceActions {
  init: (lessonId: number, className: string) => Promise<void>
  createSession: (durationMinutes: number) => Promise<void>
  endSession: () => Promise<void>
  patchStudentAttendance: (studentId: number, status: AttendanceStatus) => Promise<void>
  openDetailModal: () => void
  closeDetailModal: () => void
  closeCompleteModal: () => void
}

export const useAttendanceStore = create<AttendanceState & AttendanceActions>()(
  persist(
    (set, get) => ({
      session: null,
      summary: null,
      isFetching: false,
      lessonId: null,
      className: '',
      isDetailModalOpen: false,
      isCompleteModalOpen: false,

      init: async (lessonId, className) => {
        if (get().lessonId === lessonId) {
          set({ className })
          // 다른 페이지 갔다가 재진입 시 폴링이 끊겼을 수 있으므로 복구
          const { session } = get()
          if (session?.is_active) startPolling(session.session_id)
          return
        }
        stopPolling()
        set({ lessonId, className, isFetching: true, session: null, summary: null })
        try {
          const { session_id } = await attendanceService.getSessionByLesson(lessonId)
          if (session_id) {
            const s = await attendanceService.getSession(session_id)
            set({ session: s, isFetching: false })
            if (s.is_active) startPolling(session_id)
          } else {
            set({ session: null, isFetching: false })
          }
        } catch {
          set({ session: null, isFetching: false })
        }
      },

      createSession: async (durationMinutes) => {
        const { lessonId } = get()
        if (!lessonId) return
        await attendanceService.createSession({
          lesson_record_id: lessonId,
          duration_minutes: durationMinutes,
        })
        const { session_id } = await attendanceService.getSessionByLesson(lessonId)
        if (!session_id) return
        const s = await attendanceService.getSession(session_id)
        set({ session: s })
        if (s.is_active) startPolling(session_id)
      },

      endSession: async () => {
        const { session } = get()
        if (!session) return
        const result = await attendanceService.endSession(session.session_id)
        stopPolling()
        set({
          session: { ...session, is_active: false },
          summary: result,
          isDetailModalOpen: false,
          isCompleteModalOpen: true,
        })
      },

      patchStudentAttendance: async (studentId, status) => {
        const { session } = get()
        if (!session) return
        await attendanceService.patchStudentAttendance(session.session_id, studentId, { status })
        set({
          session: {
            ...session,
            students: session.students.map((s) =>
              s.student_id === studentId
                ? { ...s, status, checked_at: s.checked_at ?? new Date().toISOString() }
                : s
            ),
          },
        })
      },

      openDetailModal: () => set({ isDetailModalOpen: true }),
      closeDetailModal: () => set({ isDetailModalOpen: false }),
      closeCompleteModal: () => set({ isCompleteModalOpen: false }),
    }),
    {
      name: 'attendance-session',
      storage: createJSONStorage(() => sessionStorage),
      // 모달 상태·로딩 플래그·summary는 새로고침 후 복원할 필요 없음
      partialize: (state) => ({
        session: state.session,
        lessonId: state.lessonId,
        className: state.className,
      }),
      // 새로고침 후 rehydration 시 활성 세션이면 폴링 재시작
      onRehydrateStorage: () => (state) => {
        if (state?.session?.is_active) {
          startPolling(state.session.session_id)
        }
      },
    }
  )
)
