'use client'

import { use, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { cva } from 'class-variance-authority'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import { attendanceService } from '@/services/attendance'
import type { PublicAttendanceSession, SubmitAttendanceCodeResponse } from '@/types/attendance'
import useRemainingTime from '@/hooks/useRemainingTime'
import { getErrorStatus } from '@/lib/getErrorStatus'
import WarningIcon from '@/assets/icons/icon-warning-2.svg'
import CheckIcon from '@/assets/icons/icon-check-2.svg'

const codeBoxVariants = cva(
  'w-[63px] h-[81px] rounded-xl bg-background flex items-center justify-center text-[28px] font-bold tracking-[-0.03em] leading-[1.4] transition-[border-color] duration-150 relative',
  {
    variants: {
      state: {
        empty: 'border border-gray-100',
        focused: 'border-[1.5px] border-primary-500',
        filled: 'border-[1.5px] border-primary-500 text-gray-900',
        error: 'border-[1.5px] border-error-500 text-error-500',
      },
    },
    defaultVariants: { state: 'empty' },
  }
)

type PageState = 'input' | 'error' | 'success' | 'expired' | 'no_student'

function RemainingTimer({ expiresAt }: { expiresAt: string }) {
  const remaining = useRemainingTime(expiresAt)

  return (
    <div className="text-center mb-7 w-full">
      <Text variant="bodyMd">
        <span className="text-gray-500">남은 시간</span>{' '}
        <span className="text-primary-500 font-semibold">{remaining}</span>
      </Text>
    </div>
  )
}

function CodeInputScreen({
  session,
  onSubmit,
}: {
  session: PublicAttendanceSession
  onSubmit: (code: string) => Promise<void>
}) {
  const [digits, setDigits] = useState(['', '', '', ''])
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const code = digits.join('')
  const isFilled = code.length === 4

  const handleInput = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    setHasError(false)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const next = [...digits]
      next[index - 1] = ''
      setDigits(next)
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleConfirm = async () => {
    if (!isFilled || isSubmitting) return
    setIsSubmitting(true)
    try {
      await onSubmit(code)
    } catch {
      setHasError(true)
      setDigits(['', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setIsSubmitting(false)
    }
  }

  const getBoxState = (index: number) => {
    if (hasError) return 'error'
    if (digits[index]) return 'filled'
    if (focusedIndex === index) return 'focused'
    return 'empty'
  }

  return (
    <div className="min-h-[100dvh] max-w-[440px] mx-auto bg-background flex flex-col items-center px-6 relative">
      <span className="inline-flex items-center py-1 px-2 rounded bg-primary-100 text-primary-400 text-xs font-semibold tracking-[-0.03em] leading-[1.4] absolute top-[177px] left-1/2 -translate-x-1/2">
        {session.class_name}
      </span>

      <div className="flex flex-col items-center w-full max-w-[276px] absolute top-[221px]">
        <div className="text-center mb-[22px]">
          <Text variant="headingLg" as="h1">
            출결 코드를 입력해주세요
          </Text>
        </div>

        <div className="text-center mb-7 whitespace-pre-line">
          <Text variant="bodyMd" color="gray500">
            {'선생님께 받은\n4자리 코드를 입력해주세요'}
          </Text>
        </div>

        <RemainingTimer expiresAt={session.expires_at} />

        <div className="flex gap-2 w-full justify-center">
          {digits.map((digit, i) => (
            <div key={i} className={codeBoxVariants({ state: getBoxState(i) })}>
              <input
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onFocus={() => setFocusedIndex(i)}
                onBlur={() => setFocusedIndex(null)}
                className="absolute inset-0 opacity-0 cursor-text w-full h-full border-none bg-transparent"
              />
              {digit}
            </div>
          ))}
        </div>

        {hasError && (
          <div className="mt-4 text-center">
            <Text variant="bodyMd" color="error500">
              코드가 올바르지 않아요
            </Text>
          </div>
        )}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[calc(440px-48px)]">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleConfirm}
          disabled={!isFilled || isSubmitting}
        >
          확인
        </Button>
      </div>
    </div>
  )
}

const STATUS_DISPLAY: Record<'PRESENT' | 'ABSENT', string> = {
  PRESENT: '출석',
  ABSENT: '결석',
}

function SuccessScreen({ result }: { result: SubmitAttendanceCodeResponse }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}월 ${d.getDate()}일(${['일', '월', '화', '수', '목', '금', '토'][d.getDay()]})`
  }

  return (
    <div className="min-h-[100dvh] max-w-[440px] mx-auto bg-background flex flex-col items-center relative">
      <div className="flex flex-col items-center gap-[30px] absolute top-[177px] left-1/2 -translate-x-1/2 w-[186px] whitespace-pre-line text-center">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
          <CheckIcon width={80} height={80} />
        </div>

        <Text variant="headingLg" as="h1">
          출결이 확인됐어요
        </Text>

        <Text variant="bodyMd" color="gray500">
          {'선생님께 출석이\n자동으로 전달됐어요'}
        </Text>
      </div>

      <div className="absolute top-[439px] left-[55px] right-[55px] rounded-3xl bg-gray-50 p-6">
        <div className="flex justify-between items-center [&+&]:mt-3">
          <Text variant="labelSm" color="gray700">반</Text>
          <span className="text-xs font-semibold text-gray-900 tracking-[-0.03em]">{result.class_name}</span>
        </div>
        <div className="flex justify-between items-center [&+&]:mt-3">
          <Text variant="labelSm" color="gray700">날짜</Text>
          <span className="text-xs font-semibold text-gray-900 tracking-[-0.03em]">{formatDate(result.lesson_date)}</span>
        </div>
        <div className="flex justify-between items-center [&+&]:mt-3">
          <Text variant="labelSm" color="gray700">상태</Text>
          <span className="text-xs font-semibold text-primary-500 tracking-[-0.03em]">{STATUS_DISPLAY[result.status] ?? result.status}</span>
        </div>
      </div>
    </div>
  )
}

function ExpiredScreen() {
  return (
    <div className="min-h-[100dvh] max-w-[440px] mx-auto bg-background flex flex-col items-center relative">
      <div className="flex flex-col items-center gap-[30px] absolute top-[177px] left-1/2 -translate-x-1/2 w-[186px] whitespace-pre-line text-center">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
          <WarningIcon width={80} height={80} />
        </div>

        <Text variant="headingLg" as="h1">
          출결이 마감됐어요
        </Text>

        <Text variant="bodyMd" color="gray500">
          {'출결 가능 시간이 지났어요.\n선생님께 직접 문의해주세요.'}
        </Text>
      </div>
    </div>
  )
}

function NoStudentScreen() {
  return (
    <div className="min-h-[100dvh] max-w-[440px] mx-auto bg-background flex flex-col items-center relative">
      <div className="flex flex-col items-center gap-[30px] absolute top-[177px] left-1/2 -translate-x-1/2 w-[186px] whitespace-pre-line text-center">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
          <WarningIcon width={80} height={80} />
        </div>

        <Text variant="headingLg" as="h1">
          잘못된 링크입니다
        </Text>

        <Text variant="bodyMd" color="gray500">
          {'선생님께 올바른 링크를\n다시 받아주세요.'}
        </Text>
      </div>
    </div>
  )
}

export default function AttendancePage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const sessionIdNum = Number(sessionId)
  const searchParams = useSearchParams()
  const studentIdRaw = searchParams.get('studentId')
  const studentId = studentIdRaw !== null ? Number(studentIdRaw) : null
  const hasValidStudentId =
    !isNaN(sessionIdNum) &&
    studentId !== null &&
    !isNaN(studentId) &&
    studentId > 0

  const [session, setSession] = useState<PublicAttendanceSession | null>(null)
  const [pageState, setPageState] = useState<PageState>(hasValidStudentId ? 'input' : 'no_student')
  const [result, setResult] = useState<SubmitAttendanceCodeResponse | null>(null)
  const [isLoading, setIsLoading] = useState(hasValidStudentId)

  useEffect(() => {
    if (!hasValidStudentId || !studentId) return

    const load = async () => {
      try {
        const s = await attendanceService.getPublicCheckSession(sessionIdNum, studentId)
        setSession(s)
        if (s.closed || !s.session_active) {
          setPageState('expired')
        } else if (s.already_checked) {
          setResult({
            student_name: s.student_name,
            status: s.current_status ?? 'PRESENT',
            class_name: s.class_name,
            lesson_date: s.expires_at.slice(0, 10),
          })
          setPageState('success')
        }
      } catch (err: unknown) {
        const status = getErrorStatus(err)
        setPageState(status === 400 || status === 404 ? 'no_student' : 'expired')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [sessionIdNum, studentId, hasValidStudentId])

  useEffect(() => {
    if (pageState !== 'input' || !hasValidStudentId || !studentId) return

    const interval = setInterval(async () => {
      try {
        const s = await attendanceService.getPublicCheckSession(sessionIdNum, studentId)
        if (s.closed || !s.session_active) {
          setPageState('expired')
        }
      } catch {
        // 폴링 실패는 무시
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [pageState, sessionIdNum, studentId, hasValidStudentId])

  const handleSubmit = async (code: string) => {
    if (!studentId) return
    try {
      const res = await attendanceService.submitAttendanceCode(sessionIdNum, {
        student_id: studentId,
        code,
      })
      setResult(res)
      setPageState('success')
    } catch (err: unknown) {
      const status = getErrorStatus(err)
      if (status === 400 || status === 422) throw err
      setPageState('expired')
    }
  }

  if (isLoading) return null

  if (pageState === 'no_student') return <NoStudentScreen />
  if (pageState === 'expired') return <ExpiredScreen />
  if (pageState === 'success' && result) return <SuccessScreen result={result} />

  return <CodeInputScreen session={session!} onSubmit={handleSubmit} />
}
