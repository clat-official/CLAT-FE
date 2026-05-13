import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 비로그인 전용 경로 (로그인 상태면 홈으로)
const AUTH_ONLY_PATHS = ['/login', '/signup', '/find-password']

// 로그인 여부 상관없이 접근 가능한 경로
const OPEN_PATHS = ['/check', '/api']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAuthOnlyPath = AUTH_ONLY_PATHS.some((path) => pathname.startsWith(path))
  const isOpenPath = OPEN_PATHS.some((path) => pathname.startsWith(path))

  // proxy에서는 localStorage 접근 불가 -> 쿠키 기반 토큰 확인
  const token = request.cookies.get('accessToken')?.value

  if (isOpenPath) return NextResponse.next()

  if (!isAuthOnlyPath && !token) {
    // 인증 필요한 페이지인데 토큰 없음 -> 로그인으로 리다이렉트
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthOnlyPath && token) {
    // 이미 로그인된 상태에서 비로그인 전용 페이지 접근 -> 홈으로 리다이렉트
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // 정적 파일(_next, favicon, .well-known, 확장자 있는 파일)은 제외
  matcher: ['/((?!_next/static|_next/image|favicon.ico|\\.well-known|.*\\.[^/]*$).*)'],
}
