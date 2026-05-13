import { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full min-h-10 py-[10px] px-4 rounded-lg border border-gray-100 bg-background',
        'text-sm font-medium leading-[1.4] tracking-[-0.03em] text-gray-700',
        'outline-none resize-y transition-[border-color] duration-200',
        'placeholder:text-gray-300 focus:border-primary-500',
        'disabled:text-gray-100 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  )
}
