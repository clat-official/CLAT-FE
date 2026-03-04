import axiosInstance from '@/lib/api/axiosInstance'

export interface ClassSchedule {
  day_of_week: number
}

export interface Class {
  id: number
  academy_name: string
  name: string
  schedules: ClassSchedule[]
  student_count: number
  ended_at: string | null
}

export interface ClassListResponse {
  data: Class[]
  meta: { total: number }
}

export const classService = {
  async getClasses(params?: { status?: 'active' | 'ended' }): Promise<ClassListResponse> {
    const { data } = await axiosInstance.get('/classes', { params })
    return data.data
  },
}