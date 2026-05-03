export type ItemCategory = 'common' | 'individual'
export type ItemType = 'number' | 'text' | 'choice' | 'completion' | 'inline' | 'attendance'

export interface TemplateItem {
  id: string
  label: string
  isActive: boolean
  isInMessage: boolean
  locked?: boolean
  category: ItemCategory
  itemType: ItemType
  choices?: string[]
}

export type IndividualItemType = 'TEXT' | 'SCORE' | 'SELECT' | 'COMPLETE'

export interface IndividualTemplateItem {
  id: string
  name: string
  item_type: IndividualItemType
  isInMessage: boolean
  choices?: string[]
}
