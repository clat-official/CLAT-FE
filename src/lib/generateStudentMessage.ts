import type { LessonStudent } from '@/types/lessonStudent'

export interface MessageContext {
  academyName: string
  teacherName: string
  className: string
  lessonDate: string
}

export function generateStudentMessage(
  student: LessonStudent,
  commonValues: Record<number, string>,
  context: MessageContext,
): string {
  return `안녕하세요, ${context.academyName} ${context.teacherName} 강사입니다.
${context.className} ${context.lessonDate} 수업 결과입니다.

• 오늘 학습 내용: ${commonValues[1] || '-'}
• 다음 시간 범위: ${commonValues[2] || '-'}
• 클리닉 안내: ${commonValues[3] || '-'}

• 출결: ${student.attendance || '미입력'}
• 시험 점수: ${student.score || '0'}점

감사합니다.`
}
