export interface StudentClass {
  id: number
  name: string
  academy_name?: string
}

export interface StudentStats {
  total_complete_items: number
  total_incomplete_items: number
  completion_rate: number
}

export interface Student {
  id: number
  name: string
  phone: string
  parent_phone: string
  school_name?: string
  memo?: string
  classes: StudentClass[]
  completion_rate: number
  remaining_task_count: number
}

export interface StudentDetail {
  id: number
  name: string
  phone: string
  parent_phone: string
  school_name: string
  classes: StudentClass[]
  stats: StudentStats
  incomplete_items: any[]
}