export interface StudentClass {
  id: number
  name: string
  academy_name?: string
}

export interface RecentScore {
  lesson_date: string
  item_name: string
  value: string
}

export interface StudentStats {
  total_complete_items: number
  total_incomplete_items: number
  completion_rate: number
  monthly_completion_rate: number
  monthly_attendance_rate: number
  recent_scores: RecentScore[]
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
  total_incomplete_items: number
}

export interface IncompleteItem {
  lesson_student_data_id: number
  item_name: string
  lesson_date: string
  class_name: string
  template_name: string
}

export interface StudentDetail {
  id: number
  name: string
  phone: string
  parent_phone: string
  school_name: string
  classes: StudentClass[]
  stats: StudentStats
  incomplete_items: IncompleteItem[]
}

export interface ScoreDataPoint {
  lesson_date: string
  class_name: string
  score: number
  class_avg: number | null
  class_max: number | null
}

export interface LessonHistoryDataItem {
  item_name: string
  value: string | null
}

export interface LessonHistoryRecord {
  lesson_id: number
  lesson_date: string
  class_name: string
  attendance: string | null
  items: LessonHistoryDataItem[]
}

export interface AlimtalkRecord {
  id: number
  sent_at: string
  lesson_date: string
  class_name: string
  status: 'sent' | 'failed' | 'pending'
  preview?: string
}

export interface AiAnalysis {
  content: string
  generated_at: string | null
}