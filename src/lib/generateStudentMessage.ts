import type { LessonStudent } from '@/types/lessonStudent'

export function generateStudentMessage(
  student: LessonStudent,
  commonValues: Record<number, string>,
): string {
  return `안녕하세요, 엘리에듀학원 윤준용 강사입니다.
미적분 A반 2월 20일(금) 수업 결과입니다.

• 오늘 학습 내용: ${commonValues[1] || '-'}
• 다음 시간 범위: ${commonValues[2] || '-'}
• 클리닉 안내: ${commonValues[3] || '-'}

• 출결: ${student.attendance || '미입력'}
• 시험 점수: ${student.score || '0'}점

감사합니다.`
}
