'use client'

import { use, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import ArrowLeftIcon from '@/assets/icons/icon-arrow-left.svg'
import { templateService } from '@/services/template'
import { lessonService } from '@/services/lesson'
import { useToastStore } from '@/stores/toastStore'
import type { Template } from '@/services/template'
import {
  pageStyle,
  headerStyle,
  backButtonStyle,
  headerLeftStyle,
  templateSectionStyle,
  templateLabelRowStyle,
  templateChipGroupStyle,
  templateChipRecipe,
} from '../[id]/lessonDetail.css'

function LessonNewContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const classId = Number(searchParams.get('class_id'))
  const date = searchParams.get('date') ?? ''
  const addToast = useToastStore((s) => s.addToast)

  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    templateService.getTemplates().then((res) => {
      setTemplates(res)
      if (res.length > 0) setSelectedTemplateId(res[0].id)  // 첫 번째 자동 선택
    })
  }, [])

  const handleCreate = async () => {
    if (!selectedTemplateId) return
    setIsLoading(true)
    try {
      const lesson = await lessonService.createLesson({
        class_id: classId,
        template_id: selectedTemplateId,
        lesson_date: date,
        is_adhoc: true,
        status: 'DRAFT',
        common_data: [],
        student_data: [],
      })
      router.push(`/lesson/${lesson.id}`)
    } catch {
      addToast({ variant: 'error', message: '수업 생성에 실패했어요.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectTemplate = async (templateId: number) => {
    setSelectedTemplateId(templateId)
    setIsLoading(true)
    try {
      const lesson = await lessonService.createLesson({
        class_id: classId,
        template_id: templateId,
        lesson_date: date,
        is_adhoc: true,
        status: 'DRAFT',
        common_data: [],
        student_data: [],
      })
      router.push(`/lesson/${lesson.id}`)
    } catch {
      addToast({ variant: 'error', message: '수업 생성에 실패했어요.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={pageStyle}>
      <div className={headerStyle}>
        <div className={headerLeftStyle}>
          <button onClick={() => router.back()} className={backButtonStyle}>
            <ArrowLeftIcon width={24} height={24} />
          </button>
          <Text variant="display" as="h1">수업 추가</Text>
        </div>
      </div>

      <div className={templateSectionStyle}>
        <div className={templateLabelRowStyle}>
          <Text variant="headingMd">템플릿</Text>
          <Text variant="bodyMd" color="gray500">
            수업에 적용할 템플릿을 선택해주세요
          </Text>
        </div>
        <div className={templateChipGroupStyle}>
          {templates.map((t) => (
            <button
              key={t.id}
              className={templateChipRecipe({ selected: selectedTemplateId === t.id })}
              onClick={() => handleSelectTemplate(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LessonNewPage() {
  return (
    <Suspense>
      <LessonNewContent />
    </Suspense>
  )
}