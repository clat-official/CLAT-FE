import { cva } from 'class-variance-authority'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import TrashIcon from '@/assets/icons/icon-trash.svg'
import FlagIcon from '@/assets/icons/icon-flag.svg'

const sectionVariants = cva(
  'flex justify-between items-center rounded-2xl p-6',
  {
    variants: {
      variant: {
        end: 'bg-primary-50 border border-primary-200',
        delete: 'bg-error-50 border border-error-200',
      },
    },
  }
)

interface DangerSectionProps {
  variant: 'end' | 'delete'
  title: string
  description: string
  buttonLabel: string
  onConfirm: () => void
}

export default function DangerSection({
  variant,
  title,
  description,
  buttonLabel,
  onConfirm,
}: DangerSectionProps) {
  return (
    <div className={sectionVariants({ variant })}>
      <div className="flex flex-col gap-2">
        <Text variant="headingMd" color="gray900">
          {title}
        </Text>
        <Text variant="bodyLg" color="gray500">
          {description}
        </Text>
      </div>
      <Button
        variant={variant === 'delete' ? 'deleteClass' : 'endClass'}
        size="sm"
        leftIcon={variant === 'delete' ? <TrashIcon width={20} height={20} /> : <FlagIcon width={20} height={20} />}
        onClick={onConfirm}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}
