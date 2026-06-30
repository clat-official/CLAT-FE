import { cn } from '@/lib/utils'

type TextVariant = 'display' | 'headingLg' | 'headingMd' | 'headingSm' | 'titleMd' | 'titleSm' | 'bodyLg' | 'bodyMd' | 'labelSm'
type TextColor =
  // Semantic tokens (권장)
  | 'fgDefault' | 'fgSecondary' | 'fgTertiary' | 'fgDisabled' | 'fgOnColor' | 'fgBrand' | 'fgDanger'
  // Primitive tokens (하위 호환)
  | 'primary50' | 'primary100' | 'primary200' | 'primary300' | 'primary400'
  | 'primary500' | 'primary600' | 'primary700' | 'primary800'
  | 'white' | 'background'
  | 'gray50' | 'gray75' | 'gray100' | 'gray200' | 'gray300'
  | 'gray500' | 'gray600' | 'gray700' | 'gray900'
  | 'success50' | 'success200' | 'success500'
  | 'warning50' | 'warning200' | 'warning500'
  | 'error50' | 'error200' | 'error500' | 'error600' | 'error700'
type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'div'

interface TextProps {
  variant?: TextVariant
  color?: TextColor
  as?: TextTag
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<TextVariant, string> = {
  display:   'text-display',
  headingLg: 'text-heading-lg',
  headingMd: 'text-heading-md',
  headingSm: 'text-heading-sm',
  titleMd:   'text-title-md',
  titleSm:   'text-title-sm',
  bodyLg:    'text-body-lg',
  bodyMd:    'text-body-md',
  labelSm:   'text-label-sm',
}

const colorClasses: Record<TextColor, string> = {
  // Semantic
  fgDefault:   'text-fg-default',
  fgSecondary: 'text-fg-secondary',
  fgTertiary:  'text-fg-tertiary',
  fgDisabled:  'text-fg-disabled',
  fgOnColor:   'text-fg-on-color',
  fgBrand:     'text-fg-brand',
  fgDanger:    'text-fg-danger',
  // Primitive
  primary50:  'text-primary-50',
  primary100: 'text-primary-100',
  primary200: 'text-primary-200',
  primary300: 'text-primary-300',
  primary400: 'text-primary-400',
  primary500: 'text-primary-500',
  primary600: 'text-primary-600',
  primary700: 'text-primary-700',
  primary800: 'text-primary-800',
  white:      'text-white',
  background: 'text-background',
  gray50:     'text-gray-50',
  gray75:     'text-gray-75',
  gray100:    'text-gray-100',
  gray200:    'text-gray-200',
  gray300:    'text-gray-300',
  gray500:    'text-gray-500',
  gray600:    'text-gray-600',
  gray700:    'text-gray-700',
  gray900:    'text-gray-900',
  success50:  'text-success-50',
  success200: 'text-success-200',
  success500: 'text-success-500',
  warning50:  'text-warning-50',
  warning200: 'text-warning-200',
  warning500: 'text-warning-500',
  error50:    'text-error-50',
  error200:   'text-error-200',
  error500:   'text-error-500',
  error600:   'text-error-600',
  error700:   'text-error-700',
}

export default function Text({
  variant = 'bodyMd',
  color = 'fgDefault',
  as: Tag = 'span',
  children,
  className,
}: TextProps) {
  return (
    <Tag className={cn(variantClasses[variant], colorClasses[color], className)}>
      {children}
    </Tag>
  )
}
