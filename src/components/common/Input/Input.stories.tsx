import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'gray'] },
    shape: { control: 'select', options: ['square', 'capsule'] },
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: { placeholder: '입력해주세요', variant: 'default', shape: 'square' },
  decorators: [(Story) => <div className="w-80 p-400"><Story /></div>],
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Gray: Story = { args: { variant: 'gray' } }

export const Capsule: Story = { args: { shape: 'capsule', placeholder: '검색어를 입력하세요' } }

export const WithError: Story = {
  args: { hasError: true, defaultValue: '잘못된 값', placeholder: '입력해주세요' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '비활성화된 값' },
}

export const WithSuffix: Story = {
  args: { suffix: '점', placeholder: '0', type: 'number' },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-300 p-700 bg-bg-page w-96">
      <Input placeholder="기본" />
      <Input variant="gray" placeholder="회색 배경" />
      <Input defaultValue="포커스 상태" autoFocus />
      <Input hasError defaultValue="에러 상태" />
      <Input disabled defaultValue="비활성화" />
      <Input suffix="점" placeholder="0" type="number" />
      <Input shape="capsule" placeholder="캡슐 형태" />
    </div>
  ),
}
