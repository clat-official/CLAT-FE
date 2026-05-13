import axiosInstance from '@/lib/api/axiosInstance'
import publicAxiosInstance from '@/lib/api/publicAxiosInstance'
import type {
  AttendanceSession,
  AttendanceSummary,
  CreateSessionDto,
  PatchStudentAttendanceDto,
  PublicAttendanceSession,
  SessionByLessonResponse,
  SubmitAttendanceCodeDto,
  SubmitAttendanceCodeResponse,
} from '@/types/attendance'

export const attendanceService = {
  // 강사 측

  async createSession(dto: CreateSessionDto): Promise<void> {
    await axiosInstance.post('/attendance/sessions', dto)
  },

  async getSessionByLesson(lessonRecordId: number): Promise<SessionByLessonResponse> {
    const { data } = await axiosInstance.get(
      `/attendance/sessions/by-lesson/${lessonRecordId}`
    )
    return data.data.data
  },

  async getSession(sessionId: number): Promise<AttendanceSession> {
    const { data } = await axiosInstance.get(`/attendance/sessions/${sessionId}`)
    return data.data.data
  },

  async endSession(sessionId: number): Promise<AttendanceSummary> {
    const { data } = await axiosInstance.post(`/attendance/sessions/${sessionId}/end`)
    return data.data.data
  },

  async patchStudentAttendance(
    sessionId: number,
    studentId: number,
    dto: PatchStudentAttendanceDto
  ): Promise<void> {
    await axiosInstance.patch(
      `/attendance/sessions/${sessionId}/students/${studentId}`,
      dto
    )
  },

  // 학생 측 (공개, 인증 불필요)

  async getPublicCheckSession(sessionId: number, studentId: number): Promise<PublicAttendanceSession> {
    const { data } = await publicAxiosInstance.get(
      `/attendance/public/sessions/${sessionId}`,
      { params: { student_id: studentId } }
    )
    return data.data.data
  },

  async submitAttendanceCode(
    sessionId: number,
    dto: SubmitAttendanceCodeDto
  ): Promise<SubmitAttendanceCodeResponse> {
    const { data } = await publicAxiosInstance.post(
      `/attendance/public/sessions/${sessionId}/check`,
      dto
    )
    return data.data.data
  },
}
