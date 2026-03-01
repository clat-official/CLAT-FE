export interface Student {
    id: number
    name: string
    studentPhone: string
    parentPhone: string
    completionRate: number
    remaining: number
    memo?: string
    classes?: string[]
  }