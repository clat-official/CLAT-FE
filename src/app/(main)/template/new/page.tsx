'use client'

import { useState } from 'react'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import TemplateName from '../_components/TemplateName/TemplateName'
import ContentSection from '../_components/ContentSection/ContentSection'
import {
  pageStyle,
  leftSectionStyle,
  rightSectionStyle,
  sectionBoxStyle,
} from '../template-form.css'
import SaveIcon from '@/assets/icons/icon-save.svg'

const INITIAL_COMMON_ITEMS = [
  { id: '1', label: '오늘 학습 내용' },
  { id: '2', label: '다음 시간 범위' },
  { id: '3', label: '클리닉 안내' },
  { id: '4', label: '이번 주 과제' },
  { id: '5', label: '다음 시험 일정' },
]

const INITIAL_INDIVIDUAL_ITEMS = [
  { id: '1', label: '출결 *', isActive: true, locked: true },
  { id: '2', label: '시험 점수', isActive: true },
  { id: '3', label: '과제', isActive: false },
  { id: '4', label: '반평균', isActive: true },
  { id: '5', label: '오답노트', isActive: true },
]

export default function TemplateNewPage() {
  const [templateName, setTemplateName] = useState('')
  const [commonItems, setCommonItems] = useState(
    INITIAL_COMMON_ITEMS.map((item) => ({ ...item, isActive: true }))
  )
  const [individualItems, setIndividualItems] = useState(INITIAL_INDIVIDUAL_ITEMS)

  const handleToggleCommonItem = (id: string) => {
    setCommonItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    )
  }

  const handleDeleteCommonItem = (id: string) => {
    setCommonItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddCommonItem = (): string => {
    const newId = String(Date.now())
    setCommonItems((prev) => [...prev, { id: newId, label: '', isActive: true }])
    return newId
  }

  const handleUpdateCommonItem = (id: string, label: string) => {
    setCommonItems((prev) => prev.map((item) => (item.id === id ? { ...item, label } : item)))
  }

  const handleToggleIndividualItem = (id: string) => {
    setIndividualItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    )
  }

  const handleDeleteIndividualItem = (id: string) => {
    setIndividualItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAddIndividualItem = (label: string) => {
    const newId = String(Date.now())
    setIndividualItems((prev) => [...prev, { id: newId, label, isActive: true }])
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
          {/* 문자 설정 */}
          {/* 문자 미리보기 */}
        </div>
      </div>
    </>
  )
}
