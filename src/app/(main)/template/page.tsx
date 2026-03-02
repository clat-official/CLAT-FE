'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Text from '@/components/common/Text'
import AddCard from '@/components/common/AddCard'
import TemplateCard from './_components/TemplateCard/TemplateCard'
import DeleteConfirmModal from './_components/DeleteConfirmModal/DeleteConfirmModal'
import PlusCircleIcon from '@/assets/icons/icon-plus-circle.svg'
import { gridStyle } from './template.css'
import { MOCK_TEMPLATES } from '@/mocks/template'

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