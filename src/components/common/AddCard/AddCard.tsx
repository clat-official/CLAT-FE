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
        'bg-bg-default border border-border-default rounded-2xl p-6 min-h-[160px] cursor-pointer',
        'transition-[background-color] duration-200 hover:bg-bg-brand',
        'flex flex-col items-center justify-center gap-1 w-full text-fg-disabled',
        'disabled:cursor-not-allowed disabled:text-fg-disabled',
      ].join(' ')}
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon}
        <Text variant="titleMd" color="fgDisabled">{label}</Text>
      </div>
      {description && (
        <Text variant="bodyMd" color="fgDisabled">{description}</Text>
      )}
    </button>
  )
}
