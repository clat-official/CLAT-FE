import { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full min-h-10 py-[10px] px-4 rounded-lg border border-border-strong bg-bg-page',
        'text-sm font-medium leading-[1.4] tracking-[-0.03em] text-fg-secondary',
        'outline-none resize-y transition-[border-color] duration-200',
        'placeholder:text-fg-disabled focus:border-border-brand',
        'disabled:text-fg-disabled disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  )
}
