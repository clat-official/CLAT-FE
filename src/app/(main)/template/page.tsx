'use client'

import TemplateCard from './_components/TemplateCard/TemplateCard'
import { gridStyle } from './template.css'
import Text from '@/components/common/Text'
const MOCK_TEMPLATES = [
  {
    id: 1,
    title: '정규 수업 템플릿1',
    classCount: 4,
    classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'],
  },
  {
    id: 2,
    title: '보강 수업 템플릿',
    classCount: 4,
    classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'],
  },
  {
    id: 3,
    title: '방학 특강 템플릿',
    classCount: 4,
    classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'],
  },
  {
    id: 4,
    title: '정규 수업 템플릿2',
    classCount: 4,
    classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'],
  },
  {
    id: 5,
    title: '시험대비 클리닉 템플릿',
    classCount: 4,
    classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'],
  },
]

export default function TemplatePage() {
  return (
    <div>
      <Text variant="display" as="h1">
        수업 템플릿
      </Text>
      <div className={gridStyle}>
        {MOCK_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            {...template}
            onDelete={(id) => console.log('delete', id)}
          />
        ))}
      </div>
    </div>
  )
}
