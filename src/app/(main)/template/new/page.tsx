'use client'

import { useMemo, useState } from 'react'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import TemplateName from '../_components/TemplateName/TemplateName'
import ContentSection from '../_components/ContentSection/ContentSection'
import MessageSettings from '../_components/MessageSettings/MessageSettings'
import MessagePreview from '../_components/MessagePreview/MessagePreview'
import {
  pageStyle,
  leftSectionStyle,
  rightSectionStyle,
  sectionBoxStyle,
} from '../template-form.css'
import SaveIcon from '@/assets/icons/icon-save.svg'
import type { TemplateItem } from '../_types/template'

const INITIAL_COMMON_ITEMS: TemplateItem[] = [
  { id: 'c-1', label: '오늘 학습 내용', isActive: true, isInMessage: true, category: 'common', itemType: 'inline' },
  { id: 'c-2', label: '다음 시간 범위', isActive: true, isInMessage: true, category: 'common', itemType: 'inline' },
  { id: 'c-3', label: '클리닉 안내', isActive: true, isInMessage: true, category: 'common', itemType: 'inline' },
  { id: 'c-4', label: '이번 주 과제', isActive: true, isInMessage: true, category: 'common', itemType: 'inline' },
  { id: 'c-5', label: '다음 시험 일정', isActive: true, isInMessage: true, category: 'common', itemType: 'inline' },
]

const INITIAL_INDIVIDUAL_ITEMS: TemplateItem[] = [
  { id: 'i-1', label: '출결 *', isActive: true, isInMessage: true, locked: true, category: 'individual', itemType: 'completion' },
  { id: 'i-2', label: '시험 점수', isActive: true, isInMessage: true, category: 'individual', itemType: 'number' },
  { id: 'i-3', label: '과제', isActive: false, isInMessage: true, category: 'individual', itemType: 'completion' },
  { id: 'i-4', label: '반평균', isActive: true, isInMessage: true, category: 'individual', itemType: 'number' },
  { id: 'i-5', label: '오답노트', isActive: true, isInMessage: true, category: 'individual', itemType: 'completion' },
]

const INITIAL_MESSAGE_ORDER = [
  ...INITIAL_COMMON_ITEMS.map((i) => i.id),
  ...INITIAL_INDIVIDUAL_ITEMS.map((i) => i.id),
]

export default function TemplateNewPage() {
  const [templateName, setTemplateName] = useState('')
  const [commonItems, setCommonItems] = useState<TemplateItem[]>(INITIAL_COMMON_ITEMS)
  const [individualItems, setIndividualItems] = useState<TemplateItem[]>(INITIAL_INDIVIDUAL_ITEMS)
  const [messageOrder, setMessageOrder] = useState<string[]>(INITIAL_MESSAGE_ORDER)

  const allItemsMap = useMemo(() => {
    const map = new Map<string, TemplateItem>()
    for (const item of commonItems) map.set(item.id, item)
    for (const item of individualItems) map.set(item.id, item)
    return map
  }, [commonItems, individualItems])

  // --- 공통 내용 handlers ---
  const handleToggleCommonItem = (id: string) => {
    setCommonItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    )
  }

  const handleDeleteCommonItem = (id: string) => {
    setCommonItems((prev) => prev.filter((item) => item.id !== id))
    setMessageOrder((prev) => prev.filter((orderId) => orderId !== id))
  }

  const handleAddCommonItem = (): string => {
    const newId = 'c-' + Date.now()
    const newItem: TemplateItem = {
      id: newId, label: '', isActive: true, isInMessage: true, category: 'common', itemType: 'inline',
    }
    setCommonItems((prev) => [...prev, newItem])
    setMessageOrder((prev) => [...prev, newId])
    return newId
  }

  const handleUpdateCommonItem = (id: string, label: string) => {
    setCommonItems((prev) => prev.map((item) => (item.id === id ? { ...item, label } : item)))
  }

  // --- 개별 내용 handlers ---
  const handleToggleIndividualItem = (id: string) => {
    setIndividualItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    )
  }

  const handleDeleteIndividualItem = (id: string) => {
    setIndividualItems((prev) => prev.filter((item) => item.id !== id))
    setMessageOrder((prev) => prev.filter((orderId) => orderId !== id))
  }

  const handleAddIndividualItem = (label: string, type: string, choices?: string[]) => {
    const newId = 'i-' + Date.now()
    const newItem: TemplateItem = {
      id: newId,
      label,
      isActive: true,
      isInMessage: true,
      category: 'individual',
      itemType: type as TemplateItem['itemType'],
      choices,
    }
    setIndividualItems((prev) => [...prev, newItem])
    setMessageOrder((prev) => [...prev, newId])
  }

  // --- 문자 설정 토글 (미리보기 포함 여부) ---
  const handleMessagePreviewToggle = (id: string) => {
    const toggle = (prev: TemplateItem[]) =>
      prev.map((item) => (item.id === id ? { ...item, isInMessage: !item.isInMessage } : item))
    setCommonItems(toggle)
    setIndividualItems(toggle)
  }

  const handleMessageReorder = (newOrder: string[]) => {
    setMessageOrder(newOrder)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}
      >
        <Text variant="display" as="h1">
          수업 템플릿 생성
        </Text>
        <Button variant="primary" size="sm" leftIcon={<SaveIcon width={16} height={16} />}>
          저장
        </Button>
      </div>
      <div className={pageStyle}>
        <div className={leftSectionStyle}>
          <div className={sectionBoxStyle}>
            <TemplateName value={templateName} onChange={setTemplateName} />
            <div style={{ marginTop: '100px' }}>
              <ContentSection
                title="공통 내용"
                description="모든 학생에게 동일하게 전달할 내용이에요"
                items={commonItems}
                onToggle={handleToggleCommonItem}
                onDelete={handleDeleteCommonItem}
                onAddInline={handleAddCommonItem}
                onUpdate={handleUpdateCommonItem}
              />
            </div>
            <div style={{ marginTop: '100px' }}>
              <ContentSection
                title="개별 내용"
                description="학생마다 다르게 전달할 내용이에요"
                items={individualItems}
                onToggle={handleToggleIndividualItem}
                onDelete={handleDeleteIndividualItem}
                onAdd={handleAddIndividualItem}
              />
            </div>
          </div>
        </div>
        <div className={rightSectionStyle}>
          <div className={sectionBoxStyle}>
            <MessageSettings
              messageOrder={messageOrder}
              allItemsMap={allItemsMap}
              onToggle={handleMessagePreviewToggle}
              onReorder={handleMessageReorder}
            />
          </div>
          <div className={sectionBoxStyle}>
            <MessagePreview
              messageOrder={messageOrder}
              allItemsMap={allItemsMap}
            />
          </div>
        </div>
      </div>
    </>
  )
}
