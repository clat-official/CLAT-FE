import PlusIcon from '@/assets/icons/icon-plus.svg'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Textarea from '@/components/common/Textarea'

export default function HomePage() {
  return (
    <div
      style={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '600px',
      }}
    >
      <Input placeholder="예) 정규 수업 템플릿" />
      <Input defaultValue="정규 수업 템플릿" />
      <Input disabled placeholder="disabled" />
      <Textarea placeholder="내용을 입력해주세요" />
      <Textarea defaultValue="내용내용내용내용내용내용내용내용내용내용내용내용" />
      <Textarea disabled placeholder="disabled" />
    </div>
  )
}
