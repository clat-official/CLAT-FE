'use client'

import { useAiAnalysis } from '@/hooks/useStudentDashboard'
import StarIcon from '@/assets/icons/icon-star-fill.svg'

interface Props {
  studentId: number
}

export default function AiAnalysisCard({ studentId }: Props) {
  const { analysis, isLoading, error, refresh } = useAiAnalysis(studentId)

  return (
    <div className="bg-primary-50 rounded-xl px-6 py-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <StarIcon width={20} height={20} />
          <span className="text-base font-semibold text-primary-500 tracking-[-0.03em] leading-[1.4]">
            AI 분석
          </span>
        </div>
        <button
          className="text-xs font-medium text-primary-500 bg-transparent border-none cursor-pointer tracking-[-0.03em] hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={refresh}
          disabled={isLoading}
        >
          {isLoading ? '분석 중...' : '새로고침'}
        </button>
      </div>

      {isLoading && (
        <p className="text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.6]">
          AI가 학생 데이터를 분석하고 있어요...
        </p>
      )}
      {error && !isLoading && (
        <p className="text-sm font-medium text-error-500 tracking-[-0.03em] leading-[1.6]">
          분석에 실패했어요. 새로고침을 눌러주세요.
        </p>
      )}
      {analysis && !isLoading && (
        <p className="text-sm font-medium text-gray-700 tracking-[-0.03em] leading-[1.6] whitespace-pre-line">
          {analysis.content}
        </p>
      )}
    </div>
  )
}
