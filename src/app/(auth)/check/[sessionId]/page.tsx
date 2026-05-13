'use client'

import { use, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import { attendanceService } from '@/services/attendance'
import type { PublicAttendanceSession, SubmitAttendanceCodeResponse } from '@/types/attendance'
import {
  pageStyle,
  classBadgeStyle,
  centerContentStyle,
  titleStyle,
  subtitleStyle,
  timerStyle,
  timerLabelStyle,
  timerValueStyle,
  codeInputGroupStyle,
  codeBoxRecipe,
  codeBoxInputStyle,
  errorTextStyle,
  confirmButtonWrapperStyle,
  resultPageStyle,
  resultCenterStyle,
  resultIconStyle,
  resultInfoCardStyle,
  resultInfoRowStyle,
  resultInfoValueStyle,
  resultInfoStatusStyle,
} from './attendance.css'
import WarningIcon from '@/assets/icons/icon-warning-2.svg'
import CheckIcon from '@/assets/icons/icon-check-2.svg'

type PageState = 'input' | 'error' | 'success' | 'expired' | 'no_student'

function RemainingTimer({ expiresAt }: { expiresAt: string }) {
  const [remaining, setRemaining] = useState('')

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, new Date(expiresAt).getTime() - Date.now())
      const m = Math.floor(diff / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setRemaining(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [expiresAt])

  return (
    <div className={timerStyle}>
      <Text variant="bodyMd">
        <span className={timerLabelStyle}>남은 시간</span>{' '}
        <span className={timerValueStyle}>{remaining}</span>
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
    <div className={pageStyle}>
      <span className={classBadgeStyle}>{session.class_name}</span>

      <div className={centerContentStyle}>
        <div className={titleStyle}>
          <Text variant="headingLg" as="h1">
            출결 코드를 입력해주세요
          </Text>
        </div>

        <div className={subtitleStyle}>
          <Text variant="bodyMd" color="gray500">
            {'선생님께 받은\n4자리 코드를 입력해주세요'}
          </Text>
        </div>

        <RemainingTimer expiresAt={session.expires_at} />

        <div className={codeInputGroupStyle}>
          {digits.map((digit, i) => (
            <div key={i} className={codeBoxRecipe({ state: getBoxState(i) })}>
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
                className={codeBoxInputStyle}
              />
              {digit}
            </div>
          ))}
        </div>

        {hasError && (
          <div className={errorTextStyle}>
            <Text variant="bodyMd" color="error500">
              코드가 올바르지 않아요
            </Text>
          </div>
        )}
      </div>

      <div className={confirmButtonWrapperStyle}>
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

const STATUS_DISPLAY: Record<string, string> = {
  PRESENT: '출석',
  LATE: '지각',
  ABSENT: '결석',
}

function SuccessScreen({ result }: { result: SubmitAttendanceCodeResponse }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}월 ${d.getDate()}일(${['일', '월', '화', '수', '목', '금', '토'][d.getDay()]})`
  }

  return (
    <div className={resultPageStyle}>
      <div className={resultCenterStyle}>
        <div className={resultIconStyle}>
          <CheckIcon width={80} height={80} />
        </div>

        <Text variant="headingLg" as="h1">
          출결이 확인됐어요
        </Text>

        <Text variant="bodyMd" color="gray500">
          {'선생님께 출석이\n자동으로 전달됐어요'}
        </Text>
      </div>

      <div className={resultInfoCardStyle}>
        <div className={resultInfoRowStyle}>
          <Text variant="labelSm" color="gray700">반</Text>
          <span className={resultInfoValueStyle}>{result.class_name}</span>
        </div>
        <div className={resultInfoRowStyle}>
          <Text variant="labelSm" color="gray700">날짜</Text>
          <span className={resultInfoValueStyle}>{formatDate(result.lesson_date)}</span>
        </div>
        <div className={resultInfoRowStyle}>
          <Text variant="labelSm" color="gray700">상태</Text>
          <span className={resultInfoStatusStyle}>{STATUS_DISPLAY[result.status] ?? result.status}</span>
        </div>
      </div>
    </div>
  )
}

function ExpiredScreen() {
  return (
    <div className={resultPageStyle}>
      <div className={resultCenterStyle}>
        <div className={resultIconStyle}>
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
    <div className={resultPageStyle}>
      <div className={resultCenterStyle}>
        <div className={resultIconStyle}>
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
        const status =
          err !== null &&
          typeof err === 'object' &&
          'response' in err &&
          err.response !== null &&
          typeof err.response === 'object' &&
          'status' in err.response
            ? (err.response as { status: number }).status
            : null
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
      const status =
        err !== null &&
        typeof err === 'object' &&
        'response' in err &&
        err.response !== null &&
        typeof err.response === 'object' &&
        'status' in err.response
          ? (err.response as { status: number }).status
          : null
      // 400/422: 코드 불일치 → CodeInputScreen의 catch가 "코드가 올바르지 않아요" 표시
      // 그 외(404·410 등): 세션 만료·종료 → 만료 화면으로 전환
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
