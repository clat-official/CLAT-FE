import type { Meta, StoryObj } from '@storybook/react'
import Text from './Text'

const meta: Meta<typeof Text> = {
  title: 'Common/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'headingLg', 'headingMd', 'headingSm', 'titleMd', 'titleSm', 'bodyLg', 'bodyMd', 'labelSm'],
    },
    color: {
      control: 'select',
      options: ['gray900', 'gray700', 'gray600', 'gray500', 'gray300', 'primary500', 'error500', 'success500', 'warning500'],
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label', 'div'],
    },
  },
  args: { children: '텍스트 샘플', variant: 'bodyMd', color: 'gray900', as: 'span' },
}
export default meta

type Story = StoryObj<typeof Text>

export const Default: Story = {}

export const TypeScale: Story = {
  render: () => (
    <div className="flex flex-col gap-300 p-700 bg-bg-default">
      {(
        [
          ['display',   '28px / Bold',    'Display'],
          ['headingLg', '24px / Semibold', 'Heading LG'],
          ['headingMd', '20px / Semibold', 'Heading MD'],
          ['headingSm', '18px / Semibold', 'Heading SM'],
          ['titleMd',   '16px / Semibold', 'Title MD'],
          ['titleSm',   '14px / Semibold', 'Title SM'],
          ['bodyLg',    '16px / Medium',   'Body LG'],
          ['bodyMd',    '14px / Medium',   'Body MD — 기본값'],
          ['labelSm',   '12px / Medium',   'Label SM'],
        ] as const
      ).map(([variant, spec, label]) => (
        <div key={variant} className="flex items-baseline gap-400 border-b border-border-subtle pb-200">
          <Text variant={variant} className="w-48 shrink-0">{label}</Text>
          <Text variant="labelSm" color="gray500">{spec}</Text>
        </div>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-200 p-700 bg-bg-default">
      {(
        [
          ['gray900',   '기본 텍스트',    'bg-bg-default'],
          ['gray700',   '보조 텍스트',    'bg-bg-default'],
          ['gray500',   '3차 텍스트',     'bg-bg-default'],
          ['gray300',   'Placeholder',   'bg-bg-default'],
          ['primary500','Brand',         'bg-bg-default'],
          ['error500',  'Error',         'bg-bg-default'],
          ['success500','Success',       'bg-bg-default'],
          ['warning500','Warning',       'bg-bg-default'],
        ] as const
      ).map(([color, label]) => (
        <div key={color} className="flex items-center gap-400">
          <Text variant="bodyMd" color={color} className="w-32">{label}</Text>
          <Text variant="labelSm" color="gray300">{color}</Text>
        </div>
      ))}
    </div>
  ),
}
