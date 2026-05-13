import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Chip from '@/components/common/Chip'

const dateCardVariants = cva(
  'flex flex-col items-center justify-center gap-1 aspect-square rounded-xl cursor-pointer transition-[background-color,border-color] duration-150 border border-gray-100 bg-white hover:bg-gray-50',
  {
    variants: {
      selected: {
        true: 'bg-primary-50 border-primary-500 hover:bg-primary-50',
        false: '',
      },
    },
    defaultVariants: { selected: false },
  }
)
const dayStyle = 'text-[20px] font-medium text-gray-300 tracking-[-0.03em] leading-[140%]'
const dateStyle = 'text-[28px] font-medium tracking-[-0.03em] leading-[140%]'
const dateDefaultStyle = 'text-gray-300'
const dateSelectedStyle = 'text-primary-500 font-semibold'

type DateStatus = 'done' | 'inProgress' | 'none'

interface DateCardProps {
  day: string
  date: number
  status: DateStatus
  isSelected: boolean
  onClick: () => void
}

const STATUS_LABEL: Record<DateStatus, string> = {
  done: '입력 완료',
  inProgress: '입력 중',
  none: '입력 전',
}

const STATUS_VARIANT: Record<DateStatus, 'done' | 'inProgress' | 'default'> = {
  done: 'done',
  inProgress: 'inProgress',
  none: 'default',
}

export default function DateCard({ day, date, status, isSelected, onClick }: DateCardProps) {
  return (
    <div className={dateCardVariants({ selected: isSelected })} onClick={onClick}>
      <span className={dayStyle}>{day}</span>
      <span className={cn(dateStyle, isSelected ? dateSelectedStyle : dateDefaultStyle)}>
        {date}
      </span>
      <Chip label={STATUS_LABEL[status]} variant={STATUS_VARIANT[status]} />
    </div>
  )
}
