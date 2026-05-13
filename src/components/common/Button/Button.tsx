import { ReactNode, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 border-0 rounded-lg box-border cursor-pointer transition-[background-color,opacity] duration-200 whitespace-nowrap disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-500 text-gray-50',
          'enabled:hover:bg-primary-600 enabled:active:bg-primary-700',
          'disabled:bg-gray-300 disabled:text-gray-100',
        ].join(' '),
        secondary: [
          'bg-primary-100 text-primary-500',
          'enabled:hover:bg-primary-200 enabled:active:bg-primary-300',
          'disabled:bg-gray-50 disabled:text-gray-200',
        ].join(' '),
        ghost: [
          'bg-gray-50 text-gray-500',
          'enabled:hover:bg-gray-75 enabled:active:bg-gray-100',
          'disabled:bg-gray-50 disabled:text-gray-100',
        ].join(' '),
        outlined: [
          'bg-white text-gray-700 ring-1 ring-gray-100',
          'enabled:hover:bg-primary-50 enabled:hover:text-primary-500 enabled:hover:ring-primary-500',
          'enabled:active:bg-primary-50 enabled:active:text-primary-500 enabled:active:ring-primary-500',
          'disabled:text-gray-100 disabled:ring-gray-100',
        ].join(' '),
        danger: [
          'bg-error-500 text-white',
          'enabled:hover:bg-error-600 enabled:active:bg-error-700',
          'disabled:bg-gray-300 disabled:text-gray-100',
        ].join(' '),
        endClass: [
          'bg-white text-primary-500 ring-1 ring-primary-200',
          'enabled:hover:bg-primary-500 enabled:hover:text-white enabled:hover:ring-primary-500',
          'enabled:active:bg-primary-600',
        ].join(' '),
        deleteClass: [
          'bg-white text-error-500 ring-1 ring-error-200',
          'enabled:hover:bg-error-500 enabled:hover:text-white enabled:hover:ring-error-500',
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
