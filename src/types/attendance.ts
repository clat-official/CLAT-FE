// 출석 상태 (null = 미응답)
export type AttendanceStatus = 'PRESENT' | 'ABSENT'

// 강사 측

export interface AttendanceStudentRecord {
  student_id: number
  student_name: string
  status: AttendanceStatus | null // null = 미응답
  checked_at: string | null // ISO timestamp, 미응답 시 null
  is_manual: boolean
}

export interface AttendanceSession {
  session_id: number
  code: string // 4자리 코드
  started_at: string // ISO timestamp
  expires_at: string // ISO timestamp
  is_active: boolean
  total_count: number
  present_count: number
  absent_count: number
  students: AttendanceStudentRecord[]
}

export interface AttendanceSummary {
  present_count: number
  absent_count: number
  note?: string
}

export interface SessionByLessonResponse {
  session_id: number | null
}

export interface CreateSessionDto {
  lesson_record_id: number
  duration_minutes: number
}

export interface PatchStudentAttendanceDto {
  status: AttendanceStatus
}

// 학생 측 (공개, 인증 불필요)

export interface PublicAttendanceSession {
  ok: boolean
  class_name: string
  expires_at: string
  student_name: string
  already_checked: boolean
  closed: boolean
  message: string
  session_active: boolean
  current_status: 'PRESENT' | 'ABSENT' | null
  reason_code: string
}

export interface SubmitAttendanceCodeDto {
  student_id: number
  code: string
}

export interface SubmitAttendanceCodeResponse {
  student_name: string
  status: AttendanceStatus
  class_name: string
  lesson_date: string // YYYY-MM-DD
}
