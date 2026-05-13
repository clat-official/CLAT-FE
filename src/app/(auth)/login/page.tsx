'use client'

import { useRef, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { auth } from '@/services/auth'
import Input from '@/components/common/Input/Input'
import Button from '@/components/common/Button/Button'
import Text from '@/components/common/Text/Text'
import Logo from '@/assets/logo/logo-full.svg'

function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const passwordRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await auth.login({ email, password })

      // redirect 파라미터가 상대경로인 경우에만 사용, 아니면 홈으로
      const redirect = searchParams.get('redirect')
      const safeRedirect =
        redirect && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/'
      router.push(safeRedirect)
    } catch (err: any) {
      const message = err.response?.data?.message ?? '이메일 또는 비밀번호를 확인해주세요.'
      setError(message)
      passwordRef.current?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-background">
      <div className="w-full max-w-[400px] flex flex-col items-center px-5">
        {/* 로고 섹션 */}
        <div className="flex flex-col items-center gap-10 mb-[60px]">
          <Logo height={80} style={{ width: 'auto' }} />
          <Text variant="headingMd" color="gray500">
            출강 강사를 위한 운영 매니저
          </Text>
        </div>

        {/* 로그인 폼 */}
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <Input
            placeholder="이메일"
            shape="capsule"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
          />
          <Input
            placeholder="비밀번호"
            shape="capsule"
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
          />
          <Button
            variant="primary"
            size="lg"
            shape="capsule"
            fullWidth
            type="submit"
            className="mt-6"
            disabled={!email || !password || isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>

          {error && (
            <Text variant="bodyMd" color="error500">
              {error}
            </Text>
          )}
        </form>

        {/* 하단 링크 */}
        <div className="flex items-center gap-4 mt-6">
          <Text variant="bodyLg" color="gray300">
            회원가입
          </Text>
          <div className="w-px h-4 bg-gray-300" />
          <Text variant="bodyLg" color="gray300">
            비밀번호 찾기
          </Text>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
