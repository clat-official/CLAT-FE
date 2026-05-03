import Text from '@/components/common/Text'
import Input from '@/components/common/Input'
import { sectionStyle, requiredMarkStyle } from './TemplateName.css'

const MAX_LENGTH = 20

interface TemplateNameProps {
  value: string
  onChange: (value: string) => void
  hasError?: boolean
}

export default function TemplateNameSection({ value, onChange, hasError }: TemplateNameProps) {
  return (
    <div className={sectionStyle}>
      <Text variant="headingMd" as="h2">
        템플릿 이름 <span className={requiredMarkStyle}>*</span>
      </Text>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        placeholder="예) 정규 수업 템플릿"
        hasError={hasError}
        maxLength={MAX_LENGTH}
        suffix={`${value.length}/${MAX_LENGTH}`}
      />
    </div>
  )
}