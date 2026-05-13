import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const chipVariants = cva(
  'inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium leading-[1.4] tracking-[-0.03em]',
  {
    variants: {
      variant: {
        default:    'bg-gray-50 text-gray-500',
        active:     'bg-primary-50 text-primary-500',
        ended:      'bg-error-50 text-error-500',
        done:       'bg-success-50 text-success-500',
        inProgress: 'bg-warning-50 text-warning-500',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

interface ChipProps extends VariantProps<typeof chipVariants> {
  label: string
  className?: string
}

export default function Chip({ variant = 'default', label, className }: ChipProps) {
  return (
    <span className={cn(chipVariants({ variant }), className)}>
      {label}
    </span>
  )
}
