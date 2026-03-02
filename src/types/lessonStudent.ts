export type Attendance = '출석' | '지각' | '결석' | null
export type CompletionStatus = '완료' | '미완료' | null

export interface LessonStudent {
  id: number
  name: string
  attendance: Attendance
  homework: CompletionStatus
  answerNote: CompletionStatus
  score: string
  memo: string
}
