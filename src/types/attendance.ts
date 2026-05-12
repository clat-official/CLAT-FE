// 출석 상태 (null = 미응답)
export type AttendanceStatus = '출석' | '지각' | '결석'

// 세션 진행 상태 (강사 측)
export type SessionStatus = 'ACTIVE' | 'ENDED'

// 세션 진행 상태 (학생 측 공개)
export type PublicSessionStatus = 'ACTIVE' | 'ENDED' | 'EXPIRED'

// 강사 측

export interface AttendanceStudentRecord {
  student_id: number
  name: string
  status: AttendanceStatus | null // null = 미응답
  submitted_at: string | null // ISO timestamp, 미응답 시 null
}

export interface AttendanceSession {
  session_id: number
  lesson_record_id: number
  status: SessionStatus
  code: string // 4자리 코드
  duration_minutes: number
  expires_at: string // ISO timestamp
  created_at: string // ISO timestamp
  students: AttendanceStudentRecord[]
}

export interface AttendanceSummary {
  present: number // 출석
  late: number // 지각
  absent: number // 결석
  total: number
}

export interface EndSessionResponse {
  session_id: number
  summary: AttendanceSummary
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
  session_id: number
  status: PublicSessionStatus
  expires_at: string // ISO timestamp
  class_name: string
  lesson_date: string // YYYY-MM-DD
}

export interface SubmitAttendanceCodeDto {
  code: string
}

export interface SubmitAttendanceCodeResponse {
  student_name: string
  status: AttendanceStatus
  class_name: string
  lesson_date: string // YYYY-MM-DD
}
