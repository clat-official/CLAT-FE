'use client'

import { useRouter } from 'next/navigation'
import Text from '@/components/common/Text'
import Chip from '@/components/common/Chip'

import TrashIcon from '@/assets/icons/icon-trash.svg'

const cardStyle = 'flex flex-col gap-3 bg-white border border-gray-75 rounded-2xl p-6 min-h-[160px] cursor-pointer transition-colors duration-200 hover:bg-primary-50'
const cardHeaderStyle = 'flex items-start justify-between mb-2'
const iconButtonStyle = 'bg-transparent border-none cursor-pointer p-1 text-gray-100 flex items-center justify-center transition-colors duration-200 hover:text-gray-300'
const classCountStyle = 'text-sm font-semibold tracking-[-0.03em] leading-[140%] text-gray-500'
const countHighlightStyle = 'text-primary-500 font-semibold'
const chipGroupStyle = 'flex flex-wrap gap-1'

interface TemplateCardProps {
  id: number
  title: string
  classCount: number
  classList: string[]
  onDelete: (id: number) => void
}

export default function TemplateCard({
  id,
  title,
  classCount,
  classList,
  onDelete,
}: TemplateCardProps) {
  const router = useRouter()

  return (
    <div className={cardStyle} onClick={() => router.push(`/template/${id}/edit`)}>
      <div className={cardHeaderStyle}>
        <Text variant="headingLg" as="h3">
          {title}
        </Text>
        <button
          className={iconButtonStyle}
          onClick={(e) => {
            e.stopPropagation()
            onDelete(id)
          }}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
      <p className={classCountStyle}>
        사용 중인 반 <span className={countHighlightStyle}>{classCount}</span>
      </p>
      <div className={chipGroupStyle}>
        {classList.map((name) => (
          <Chip key={name} variant="default" label={name} />
        ))}
      </div>
    </div>
  )
}
