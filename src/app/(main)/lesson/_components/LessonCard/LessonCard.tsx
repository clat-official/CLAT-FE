import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import Chip from '@/components/common/Chip'

const cardStyle = 'flex flex-col gap-4 bg-white border border-gray-75 rounded-2xl p-6 min-h-[160px] cursor-pointer'
const chipGroupStyle = 'flex gap-1'
const progressWrapperStyle = 'flex flex-col gap-2 mb-1'
const progressLabelStyle = 'flex justify-between items-center'
const progressTrackStyle = 'w-full h-4 bg-primary-50 rounded-[999px] overflow-hidden'
const progressBarStyle = 'h-full bg-primary-500 rounded-[999px] transition-[width] duration-300'

interface LessonCardProps {
  academyName: string
  templateName: string
  className: string
  progress: number
  totalStudents: number
  inputCount: number
  isDone: boolean
  onClick: () => void
}

export default function LessonCard({
  academyName,
  templateName,
  className,
  progress,
  totalStudents,
  inputCount,
  isDone,
  onClick,
}: LessonCardProps) {
  return (
    <div className={cardStyle}>
      <div className={chipGroupStyle}>
        <Chip label={academyName} />
        {templateName && <Chip variant="active" label={templateName} />}
      </div>
      <Text variant="headingLg">{className}</Text>
      <div className={progressWrapperStyle}>
        <div className={progressLabelStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Text variant="titleSm" color="gray500">
              진행률
            </Text>
            <Text variant="titleSm" color="primary500">
              {progress}%
            </Text>
          </div>
          <Text variant="titleSm" color="gray500">
            {inputCount} / {totalStudents}명 입력
          </Text>
        </div>
        <div className={progressTrackStyle}>
          <div className={progressBarStyle} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Button variant={isDone ? 'secondary' : 'primary'} size="md" fullWidth onClick={onClick}>
        {isDone ? '수정하기' : '입력하기'}
      </Button>
    </div>
  )
}
