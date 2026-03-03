import axiosInstance from '@/lib/api/axiosInstance'
import { setCookie, deleteCookie } from 'cookies-next'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
}

export const auth = {
  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const { data } = await axiosInstance.post<LoginResponse>('/auth/login', { email, password })

    // 미들웨어용 쿠키 저장
    setCookie('accessToken', data.accessToken, {
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    })
    // Axios 인터셉터용 localStorage 저장
    localStorage.setItem('accessToken', data.accessToken)

    return data
  },

  logout() {
    localStorage.removeItem('accessToken')
    deleteCookie('accessToken', { path: '/' })
    window.location.href = '/login'
  },
}
