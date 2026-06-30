import { ReactNode, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 border-0 rounded-lg box-border cursor-pointer transition-[background-color,opacity] duration-200 whitespace-nowrap disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-fg-on-color',
          'enabled:hover:bg-primary-600 enabled:active:bg-primary-700',
          'disabled:bg-gray-300 disabled:text-fg-disabled',
        ].join(' '),
        secondary: [
          'bg-bg-brand-hover text-fg-brand',
          'enabled:hover:bg-primary-200 enabled:active:bg-primary-300',
          'disabled:bg-bg-subtle disabled:text-gray-200',
        ].join(' '),
        ghost: [
          'bg-bg-subtle text-gray-500',
          'enabled:hover:bg-bg-hover enabled:active:bg-bg-disabled',
          'disabled:bg-bg-subtle disabled:text-fg-disabled',
        ].join(' '),
        outlined: [
          'bg-bg-default text-fg-secondary ring-1 ring-border-strong',
          'enabled:hover:bg-bg-brand enabled:hover:text-fg-brand enabled:hover:ring-primary-500',
          'enabled:active:bg-bg-brand enabled:active:text-fg-brand enabled:active:ring-primary-500',
          'disabled:text-fg-disabled disabled:ring-border-strong',
        ].join(' '),
        danger: [
          'bg-error-500 text-fg-on-color',
          'enabled:hover:bg-error-600 enabled:active:bg-error-700',
          'disabled:bg-gray-300 disabled:text-fg-disabled',
        ].join(' '),
        endClass: [
          'bg-bg-default text-fg-brand ring-1 ring-primary-200',
          'enabled:hover:bg-primary-500 enabled:hover:text-fg-on-color enabled:hover:ring-primary-500',
          'enabled:active:bg-primary-600',
        ].join(' '),
        deleteClass: [
          'bg-bg-default text-fg-danger ring-1 ring-error-200',
          'enabled:hover:bg-error-500 enabled:hover:text-fg-on-color enabled:hover:ring-error-500',
          'enabled:active:bg-error-600',
        ].join(' '),
      },
      size: {
        sm: 'text-sm font-semibold rounded-lg',
        md: 'text-sm font-semibold rounded-lg',
        lg: 'text-base font-semibold rounded-xl',
      },
      shape: {
        square:  '',
        capsule: 'h-12 rounded-full',
      },
      fullWidth: {
        true:  'w-full',
        false: '',
      },
    },
    compoundVariants: [
      { shape: 'square',  size: 'sm', class: 'py-2 px-3' },
      { shape: 'square',  size: 'md', class: 'py-3 px-6' },
      { shape: 'square',  size: 'lg', class: 'py-4 px-6' },
      { shape: 'capsule',             class: 'py-0 px-8' },
    ],
    defaultVariants: { variant: 'primary', size: 'md', shape: 'square', fullWidth: false },
  },
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}

export default function Button({
  variant,
  size,
  shape,
  fullWidth,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, shape, fullWidth }), className)} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
