'use client'

import { use, useState, useEffect, useRef } from 'react'
import Text from '@/components/common/Text'
import { attendanceService } from '@/services/attendance'
import type { PublicAttendanceSession, SubmitAttendanceCodeResponse } from '@/types/attendance'
import {
  pageStyle,
  classBadgeStyle,
  centerContentStyle,
  titleStyle,
  subtitleStyle,
  timerStyle,
  codeInputGroupStyle,
  codeBoxRecipe,
  errorTextStyle,
  confirmButtonStyle,
  confirmButtonActiveStyle,
  confirmButtonDisabledStyle,
  resultPageStyle,
  resultCenterStyle,
  resultIconStyle,
  resultInfoCardStyle,
  resultInfoRowStyle,
} from './attendance.css'

type PageState = 'input' | 'error' | 'success' | 'expired'

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
      <Text variant="bodyMd" color="gray700">
        <span style={{ color: '#9492A9' }}>남은 시간</span>{' '}
        <span style={{ color: '#3B51CC', fontWeight: 600 }}>{remaining}</span>
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
    return 'empty'
  }

  return (
    <div className={pageStyle} style={{ position: 'relative' }}>
      {/* 반 배지 */}
      <span className={classBadgeStyle}>{session.class_name}</span>

      <div className={centerContentStyle}>
        {/* 제목 */}
        <div className={titleStyle}>
          <Text variant="headingLg" as="h1">출결 코드를 입력해주세요</Text>
        </div>

        {/* 부제 */}
        <div className={subtitleStyle}>
          <Text variant="bodyMd" color="gray500">
            {'선생님께 받은\n4자리 코드를 입력해주세요'}
          </Text>
        </div>

        {/* 남은 시간 */}
        <RemainingTimer expiresAt={session.expires_at} />

        {/* 4자리 코드 입력 */}
        <div className={codeInputGroupStyle}>
          {digits.map((digit, i) => (
            <div key={i} className={codeBoxRecipe({ state: getBoxState(i) })} style={{ position: 'relative' }}>
              <input
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'text',
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: 'transparent',
                }}
              />
              {digit}
            </div>
          ))}
        </div>

        {hasError && (
          <div className={errorTextStyle}>
            <Text variant="bodyMd" color="error500">코드가 올바르지 않아요</Text>
          </div>
        )}
      </div>

      {/* 확인 버튼 */}
      <button
        className={`${confirmButtonStyle} ${isFilled ? confirmButtonActiveStyle : confirmButtonDisabledStyle}`}
        onClick={handleConfirm}
        disabled={!isFilled || isSubmitting}
      >
        확인
      </button>
    </div>
  )
}

function SuccessScreen({ result }: { result: SubmitAttendanceCodeResponse }) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}월 ${d.getDate()}일(${['일', '월', '화', '수', '목', '금', '토'][d.getDay()]})`
  }

  return (
    <div className={resultPageStyle} style={{ position: 'relative' }}>
      <div className={resultCenterStyle}>
        {/* 성공 아이콘 */}
        <div className={resultIconStyle}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="#3B51CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <Text variant="headingLg" as="h1">출결이 확인됐어요</Text>

        <Text variant="bodyMd" color="gray500">
          {'선생님께 출석이\n자동으로 전달됐어요'}
        </Text>
      </div>

      {/* 정보 카드 */}
      <div className={resultInfoCardStyle}>
        <div className={resultInfoRowStyle}>
          <Text variant="labelSm" color="gray700">반</Text>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#363744', letterSpacing: '-0.03em' }}>
            {result.class_name}
          </span>
        </div>
        <div className={resultInfoRowStyle}>
          <Text variant="labelSm" color="gray700">날짜</Text>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#363744', letterSpacing: '-0.03em' }}>
            {formatDate(result.lesson_date)}
          </span>
        </div>
        <div className={resultInfoRowStyle}>
          <Text variant="labelSm" color="gray700">상태</Text>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#3B51CC', letterSpacing: '-0.03em' }}>
            {result.status}
          </span>
        </div>
      </div>
    </div>
  )
}

function ExpiredScreen() {
  return (
    <div className={resultPageStyle} style={{ position: 'relative' }}>
      <div className={resultCenterStyle}>
        {/* 마감 아이콘 */}
        <div className={resultIconStyle}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#3B51CC" strokeWidth="2" />
            <path d="M12 7v5l3 3" stroke="#3B51CC" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 3v2M12 19v2M3 12H1M23 12h-2" stroke="#3B51CC" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <Text variant="headingLg" as="h1">출결이 마감됐어요</Text>

        <Text variant="bodyMd" color="gray500">
          {'출결 가능 시간이 지났어요.\n선생님께 직접 문의해주세요.'}
        </Text>
      </div>
    </div>
  )
}

export default function AttendancePage({
  params,
}: {
  params: Promise<{ sessionId: string }>
}) {
  const { sessionId } = use(params)
  const sessionIdNum = Number(sessionId)

  const [session, setSession] = useState<PublicAttendanceSession | null>(null)
  const [pageState, setPageState] = useState<PageState>('input')
  const [result, setResult] = useState<SubmitAttendanceCodeResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const s = await attendanceService.getPublicSession(sessionIdNum)
        setSession(s)
        if (s.status === 'EXPIRED' || s.status === 'ENDED') {
          setPageState('expired')
        }
      } catch {
        setPageState('expired')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [sessionIdNum])

  const handleSubmit = async (code: string) => {
    const res = await attendanceService.submitAttendanceCode(sessionIdNum, { code })
    setResult(res)
    setPageState('success')
  }

  if (isLoading || !session) return null

  if (pageState === 'expired') return <ExpiredScreen />
  if (pageState === 'success' && result) return <SuccessScreen result={result} />

  return <CodeInputScreen session={session} onSubmit={handleSubmit} />
}
