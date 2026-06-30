import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  [
    'w-full py-[10px] px-4 text-sm font-medium leading-[1.4] tracking-[-0.03em] text-fg-secondary',
    'outline-none transition-all duration-200',
    'placeholder:text-fg-disabled focus:border-border-brand',
    'disabled:text-fg-disabled disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-bg-default border border-border-strong',
        gray:    'bg-bg-page border border-border-subtle',
      },
      shape: {
        square:  'h-12 rounded-lg',
        capsule: 'h-12 rounded-full px-8 border-border-default',
      },
      hasError: {
        true:  'border-border-danger focus:border-border-danger',
        false: '',
      },
    },
    defaultVariants: { variant: 'default', shape: 'square', hasError: false },
  },
)

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  suffix?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, shape, hasError = false, suffix, className, ...props }, ref) => {
    const inputEl = (
      <input
        ref={ref}
        className={cn(inputVariants({ variant, shape, hasError }), className)}
        {...props}
      />
    )

    if (!suffix) return inputEl

    return (
      <div className="relative flex items-center w-full">
        {inputEl}
        <span className="absolute right-4 text-fg-disabled text-sm font-medium pointer-events-none">
          {suffix}
        </span>
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
