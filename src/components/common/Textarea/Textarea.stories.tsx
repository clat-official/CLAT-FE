import type { Meta, StoryObj } from '@storybook/react'
import Textarea from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Common/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
  args: { placeholder: '내용을 입력해주세요', rows: 4 },
  decorators: [(Story) => <div className="w-80 p-400"><Story /></div>],
}
export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const WithValue: Story = {
  args: { defaultValue: '오늘 수업에서 이차방정식 풀이법을 배웠습니다.\n다음 시간에는 인수분해를 예습해오기로 했습니다.' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '비활성화된 텍스트' },
}
