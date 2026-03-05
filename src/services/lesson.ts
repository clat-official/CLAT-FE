import axiosInstance from '@/lib/api/axiosInstance'

export interface LessonSummary {
  lesson_record_id: number
  class_id: number
  class_name: string
  academy_name: string
  template_id: number
  template_name: string
  progress_rate: number
  status: 'DRAFT' | 'SAVED'
  is_adhoc: boolean
}

export interface LessonListResponse {
  data: LessonSummary[]
  meta: { total: number }
}

export interface CommonDataItem {
  template_item_id: number
  value: string
}

export interface StudentDataItem {
  template_item_id: number
  value: string
  is_completed?: boolean
}

export interface StudentData {
  student_id: number
  items: StudentDataItem[]
}

export interface CreateLessonDto {
  class_id: number
  template_id: number
  lesson_date: string
  is_adhoc: boolean
  status: 'DRAFT' | 'SAVED'
  common_data: CommonDataItem[]
  student_data: StudentData[]
}

export interface UpdateLessonDto {
  template_id?: number
  status?: 'DRAFT' | 'SAVED'
  common_data: CommonDataItem[]
  student_data: StudentData[]
}

export const lessonService = {
  async getLessons(date: string): Promise<LessonListResponse> {
    const { data } = await axiosInstance.get('/lessons', { params: { date } })
    return data.data
  },

  async getLesson(id: number): Promise<any> {
    const { data } = await axiosInstance.get(`/lessons/${id}`)
    return data.data
  },

  async createLesson(dto: CreateLessonDto): Promise<any> {
    const { data } = await axiosInstance.post('/lessons', dto)
    return data.data
  },

  async updateLesson(id: number, dto: UpdateLessonDto): Promise<any> {
    const { data } = await axiosInstance.put(`/lessons/${id}`, dto)
    return data.data
  },

  async saveLesson(id: number): Promise<void> {
    await axiosInstance.post(`/lessons/${id}/save`)
  },

  async previewLesson(id: number): Promise<any> {
    const { data } = await axiosInstance.get(`/lessons/${id}/preview`)
    return data.data
  },

  async exportLesson(id: number): Promise<Blob> {
    const { data } = await axiosInstance.get(`/lessons/${id}/export`, {
      responseType: 'blob',
    })
    return data
  },
}