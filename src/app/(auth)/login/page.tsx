'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  containerStyle,
  loginBoxStyle,
  logoSectionStyle,
  formStyle,
  submitButtonStyle,
  footerLinkStyle,
} from './login.css'
import Input from '@/components/common/Input/Input'
import Button from '@/components/common/Button/Button'
import Text from '@/components/common/Text/Text'
import Logo from '@/assets/logo/logo-full.svg'
import { colors } from '@/styles/tokens/colors'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: authService.login(email, password) 연동
    console.log('Login attempt:', { email, password })
  }

  return (
    <div className={containerStyle}>
      <div className={loginBoxStyle}>
        {/* 로고 섹션 */}
        <div className={logoSectionStyle}>
          <Logo height={80} style={{ width: 'auto' }} />
          <Text variant="headingMd" color="gray500">
            출강 강사를 위한 운영 매니저
          </Text>
        </div>

        {/* 로그인 폼 */}
        <form className={formStyle} onSubmit={handleLogin}>
          <Input
            placeholder="이메일"
            shape="capsule"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            placeholder="비밀번호"
            shape="capsule"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            variant="primary"
            size="lg"
            shape="capsule"
            fullWidth
            type="submit"
            className={submitButtonStyle}
            disabled={!email || !password}
          >
            로그인
          </Button>
        </form>

        {/* 하단 링크 */}
        <div className={footerLinkStyle}>
          <Link href="/signup">
            <Text variant="bodyLg" color="gray500">
              회원가입
            </Text>
          </Link>
          <div style={{ width: 1, height: 16, backgroundColor: colors.gray300 }} />
          <Link href="/find-password">
            <Text variant="bodyLg" color="gray500">
              비밀번호 찾기
            </Text>
          </Link>
        </div>
      </div>
    </div>
  )
}
