import axios from 'axios'
import { deleteCookie } from 'cookies-next'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config.url?.includes('/auth/login')
      if (!isLoginRequest) {
        localStorage.removeItem('accessToken')
        deleteCookie('accessToken', { path: '/' })
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance