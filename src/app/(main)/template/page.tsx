'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Text from '@/components/common/Text'
import AddCard from '@/components/common/AddCard'
import TemplateCard from './_components/TemplateCard/TemplateCard'
import DeleteConfirmModal from './_components/DeleteConfirmModal/DeleteConfirmModal'
import PlusCircleIcon from '@/assets/icons/icon-plus-circle.svg'
import { gridStyle } from './template.css'

const MOCK_TEMPLATES = [
  { id: 1, title: '정규 수업 템플릿1', classCount: 4, classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'] },
  { id: 2, title: '보강 수업 템플릿', classCount: 4, classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'] },
  { id: 3, title: '방학 특강 템플릿', classCount: 4, classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'] },
  { id: 4, title: '정규 수업 템플릿2', classCount: 4, classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'] },
  { id: 5, title: '시험대비 클리닉 템플릿', classCount: 4, classList: ['미적분 A반', '미적분 B반', '미적분 C반', '미적분 D반'] },
]

type DeleteTarget = {
  id: number
  title: string
  classCount: number
}

export default function TemplatePage() {
  const router = useRouter()
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)

  return (
    <>
      <Text variant="display" as="h1">수업 템플릿</Text>
      <div className={gridStyle}>
        {MOCK_TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            {...template}
            onDelete={(id) => setDeleteTarget({ id, title: template.title, classCount: template.classCount })}
          />
        ))}
        <AddCard
          icon={<PlusCircleIcon width={36} height={36} />}
          label="템플릿 추가"
          onClick={() => router.push('/template/new')}
        />
      </div>
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          console.log('delete', deleteTarget?.id)
          setDeleteTarget(null)
        }}
        templateName={deleteTarget?.title ?? ''}
        classCount={deleteTarget?.classCount ?? 0}
      />
    </>
  )
}