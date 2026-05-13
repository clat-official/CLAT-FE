import { ButtonHTMLAttributes, ReactNode } from 'react'
import Text from '@/components/common/Text'

interface AddCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  label: string
  description?: string
}

export default function AddCard({ icon, label, description, ...props }: AddCardProps) {
  return (
    <button
      className={[
        'bg-white border border-gray-75 rounded-2xl p-6 min-h-[160px] cursor-pointer',
        'transition-[background-color] duration-200 hover:bg-primary-50',
        'flex flex-col items-center justify-center gap-1 w-full text-gray-300',
        'disabled:cursor-not-allowed disabled:text-gray-300',
      ].join(' ')}
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon}
        <Text variant="titleMd" color="gray300">{label}</Text>
      </div>
      {description && (
        <Text variant="bodyMd" color="gray300">{description}</Text>
      )}
    </button>
  )
}
