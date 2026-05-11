import { ButtonHTMLAttributes, ReactNode } from 'react'
import { addCardStyle } from './AddCard.css'
import Text from '@/components/common/Text'

interface AddCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  label: string
  description?: string
}

export default function AddCard({ icon, label, description, ...props }: AddCardProps) {
  return (
    <button className={addCardStyle} {...props}>
      {icon}
      <Text variant="titleMd" color="gray300">{label}</Text>
    </button>
  )
}