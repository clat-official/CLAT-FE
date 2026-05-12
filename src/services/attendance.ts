import axiosInstance from '@/lib/api/axiosInstance'
import type {
  AttendanceSession,
  CreateSessionDto,
  EndSessionResponse,
  PatchStudentAttendanceDto,
  PublicAttendanceSession,
  SubmitAttendanceCodeDto,
  SubmitAttendanceCodeResponse,
} from '@/types/attendance'

export const attendanceService = {
  // 강사 측

  async createSession(dto: CreateSessionDto): Promise<AttendanceSession> {
    const { data } = await axiosInstance.post('/attendance/sessions', dto)
    return data.data
  },

  async getSessionByLesson(lessonRecordId: number): Promise<AttendanceSession | null> {
    const { data } = await axiosInstance.get(
      `/attendance/sessions/by-lesson/${lessonRecordId}`
    )
    return data.data
  },

  async getSession(sessionId: number): Promise<AttendanceSession> {
    const { data } = await axiosInstance.get(`/attendance/sessions/${sessionId}`)
    return data.data
  },

  async endSession(sessionId: number): Promise<EndSessionResponse> {
    const { data } = await axiosInstance.post(`/attendance/sessions/${sessionId}/end`)
    return data.data
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

  async getPublicSession(sessionId: number): Promise<PublicAttendanceSession> {
    const { data } = await axiosInstance.get(
      `/attendance/public/sessions/${sessionId}`
    )
    return data.data
  },

  async submitAttendanceCode(
    sessionId: number,
    dto: SubmitAttendanceCodeDto
  ): Promise<SubmitAttendanceCodeResponse> {
    const { data } = await axiosInstance.post(
      `/attendance/public/sessions/${sessionId}/check`,
      dto
    )
    return data.data
  },
}
