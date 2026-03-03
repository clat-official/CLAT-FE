import axiosInstance from '@/lib/api/axiosInstance'
import { StringifyOptions } from 'querystring'

export interface TemplateItem {
  id: number
  name: string
  item_type: string
  is_common: boolean
  include_in_message: boolean
  sort_order: number
  options: string[]
}

export interface Template {
  id: number
  name: string
  item_count: number
  class_count: number
  class_list: string[]
  created_at: string
}

export interface TemplateDetail extends Template {
  items: TemplateItem[]
}

export interface CreateTEmplateItemDto {
  name: string
  item_type: string
  is_common: boolean
  include_in_message: boolean
  sort_order: number
  options: string[]
}

export interface CreateTemplateDto {
  name: string
  items: CreateTEmplateItemDto[]
}

export interface UpdateTemplateItemDto {
  id?: number
  name?: string
  item_type?: string
  is_common?: boolean
  include_in_message?: boolean
  sort_order?: number
  options?: string[]
}

export interface UpdateTemplateDto {
  name?: string
  items?: UpdateTemplateItemDto[]
  deleted_items_ids?: number[]
}

export const templateService = {
  // 목록 조회
  async getTemplates(): Promise<Template[]> {
    const { data } = await axiosInstance.get('/templates')
    return data.data.data
  },

  // 상세 조회
  async getTemplateDetail(id: number): Promise<TemplateDetail> {
    const { data } = await axiosInstance.get(`/templates/${id}`)
    return data.data
  },

  // 생성
  async createTemplate(dto: CreateTemplateDto): Promise<TemplateDetail> {
    const { data } = await axiosInstance.post('/templates', dto)
    return data.data
  },

  // 수정
  async updateTemplate(id: number, dto: UpdateTemplateDto): Promise<TemplateDetail> {
    const { data } = await axiosInstance.put(`/templates/${id}`, dto)
    return data.data
  },

  // 삭제
  async deleteTemplate(id: number): Promise<void> {
    await axiosInstance.delete(`/templates/${id}`)
  },
}
