import Text from '@/components/common/Text'
import Input from '@/components/common/Input'
import { sectionStyle } from './TemplateName.css'

interface TemplateNameSectionProps {
  value: string
  onChange: (value: string) => void
}

export default function TemplateNameSection({ value, onChange }: TemplateNameSectionProps) {
  return (
    <div className={sectionStyle}>
      <Text variant="headingMd" as="h2">템플릿 이름</Text>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예) 정규 수업 템플릿"
      />
    </div>
  )
}