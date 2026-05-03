'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ArrowLeftIcon from '@/assets/icons/icon-arrow-left.svg'
import StarIcon from '@/assets/icons/icon-star.svg'
import TemplateName from '@/app/(main)/template/_components/TemplateName/TemplateName'
import CommonContentTable from '@/app/(main)/template/_components/CommonContentTable/CommonContentTable'
import IndividualContentTable from '@/app/(main)/template/_components/IndividualContentTable/IndividualContentTable'
import ConfirmModal from '@/components/common/ConfirmModal'
import Button from '@/components/common/Button'
import Toggle from '@/components/common/Toggle'
import { templateService } from '@/services/template'
import type { CreateTemplateDto } from '@/services/template'
import type { TemplateItem, IndividualTemplateItem } from '../_types/template'
import type { LessonStudent } from '@/types/lessonStudent'
import { useToastStore } from '@/stores/toastStore'
import {
  pageWrapperStyle,
  headerStyle,
  backButtonStyle,
  pageTitleStyle,
  contentStyle,
  templateNameWidthStyle,
  sectionStyle,
  sectionHeaderRowStyle,
  sectionTitleStyle,
  sectionHintStyle,
  tableScrollStyle,
  notificationListStyle,
  notificationItemStyle,
  notificationItemLeftStyle,
  notifDragHandleStyle,
  notifDragDotRowStyle,
  notifDragDotStyle,
  commonBadgeStyle,
  individualBadgeStyle,
  notifItemNameStyle,
} from '../template-form.css'

const ITEM_TYPE_MAP: Record<string, string> = {
  text: 'TEXT',
  number: 'SCORE',
  choice: 'SELECT',
  completion: 'COMPLETE',
}

const INITIAL_COMMON_ITEMS: TemplateItem[] = [
  {
    id: '1',
    label: '오늘 수업 내용',
    isActive: true,
    isInMessage: true,
    category: 'common',
    itemType: 'text',
  },
  {
    id: '2',
    label: '다음 시간 예고',
    isActive: true,
    isInMessage: true,
    category: 'common',
    itemType: 'text',
  },
  {
    id: '3',
    label: '전달 사항',
    isActive: true,
    isInMessage: true,
    category: 'common',
    itemType: 'text',
  },
]

const MOCK_STUDENTS: LessonStudent[] = [{ id: 1, name: '홍길동', attendance: null, items: [] }]

const INITIAL_INDIVIDUAL_ITEMS: IndividualTemplateItem[] = [
  { id: '1', name: '시험 점수', item_type: 'NUMBER' },
  { id: '2', name: '과제', item_type: 'COMPLETE' },
  { id: '3', name: '피드백', item_type: 'TEXT' },
]

type NotificationItemData = {
  id: string
  name: string
  category: 'common' | 'individual'
  enabled: boolean
}

const INITIAL_NOTIFICATION_ITEMS: NotificationItemData[] = [
  { id: 'c1', name: '오늘 학습 내용', category: 'common', enabled: true },
  { id: 'c2', name: '다음 시간 예고', category: 'common', enabled: true },
  { id: 'c3', name: '전달 사항', category: 'common', enabled: true },
  { id: 'i1', name: '출결', category: 'individual', enabled: false },
  { id: 'i2', name: '시험 점수', category: 'individual', enabled: true },
  { id: 'i3', name: '과제', category: 'individual', enabled: true },
  { id: 'i4', name: '피드백', category: 'individual', enabled: false },
]

function DragHandle() {
  return (
    <span className={notifDragHandleStyle}>
      {[0, 1, 2].map((row) => (
        <span key={row} className={notifDragDotRowStyle}>
          <span className={notifDragDotStyle} />
          <span className={notifDragDotStyle} />
        </span>
      ))}
    </span>
  )
}

function NotificationItem({
  item,
  onToggle,
}: {
  item: NotificationItemData
  onToggle: (id: string) => void
}) {
  return (
    <div className={notificationItemStyle}>
      <div className={notificationItemLeftStyle}>
        <DragHandle />
        <span className={item.category === 'common' ? commonBadgeStyle : individualBadgeStyle}>
          {item.category === 'common' ? '공통' : '개별'}
        </span>
        <span className={notifItemNameStyle}>{item.name}</span>
      </div>
      <Toggle checked={item.enabled} onChange={() => onToggle(item.id)} />
    </div>
  )
}

export default function TemplateNewPage() {
  const router = useRouter()
  const addToast = useToastStore((s) => s.addToast)
  const [templateName, setTemplateName] = useState('')
  const [commonItems, setCommonItems] = useState<TemplateItem[]>(INITIAL_COMMON_ITEMS)
  const [individualItems, setIndividualItems] =
    useState<IndividualTemplateItem[]>(INITIAL_INDIVIDUAL_ITEMS)
  const [notificationItems, setNotificationItems] = useState<NotificationItemData[]>(
    INITIAL_NOTIFICATION_ITEMS
  )
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const isValid =
    templateName.trim() !== '' && (commonItems.length > 0 || individualItems.length > 0)

  const handleBack = () => setIsExitModalOpen(true)

  const handleConfirmExit = () => {
    router.back()
    setIsExitModalOpen(false)
  }

  const handleToggleNotification = (id: string) => {
    setNotificationItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    )
  }

  const handleCreate = async () => {
    if (!isValid) return

    const dto: CreateTemplateDto = {
      name: templateName.trim(),
      items: [
        ...commonItems.map((item, i) => ({
          name: item.label,
          item_type: ITEM_TYPE_MAP[item.itemType] ?? 'TEXT',
          is_common: true,
          include_in_message: item.isInMessage,
          sort_order: i,
          options: item.choices ?? [],
        })),
        ...individualItems.map((item, i) => ({
          name: item.name,
          item_type: item.item_type === 'NUMBER' ? 'SCORE' : item.item_type,
          is_common: false,
          include_in_message: false,
          sort_order: commonItems.length + i,
          options: [],
        })),
      ],
    }

    try {
      setIsSaving(true)
      await templateService.createTemplate(dto)
      addToast({ variant: 'success', message: '템플릿이 저장됐어요.' })
      router.push('/template')
    } catch {
      addToast({ variant: 'error', message: '템플릿 저장에 실패했어요.' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={pageWrapperStyle}>
      {/* 헤더 */}
      <div className={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            className={backButtonStyle}
            onClick={handleBack}
            aria-label="뒤로가기"
          >
            <ArrowLeftIcon width={24} height={24} />
          </button>
          <h1 className={pageTitleStyle}>수업 템플릿 생성</h1>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<StarIcon width={16} height={16} />}
          onClick={handleCreate}
          disabled={!isValid || isSaving}
        >
          {isSaving ? '저장 중...' : '템플릿 만들기'}
        </Button>
      </div>

      <div className={contentStyle}>
        {/* 템플릿 이름 */}
        <div className={templateNameWidthStyle}>
          <TemplateName value={templateName} onChange={setTemplateName} />
        </div>

        {/* 공통 내용 */}
        <div className={sectionStyle}>
          <div className={sectionHeaderRowStyle}>
            <span className={sectionTitleStyle}>공통 내용</span>
            <span className={sectionHintStyle}>헤더를 드래그해서 순서를 바꿀 수 있어요</span>
          </div>
          <CommonContentTable
            items={commonItems}
            onDelete={(id) => setCommonItems((prev) => prev.filter((i) => i.id !== id))}
            onAddInline={() => {
              const id = crypto.randomUUID()
              setCommonItems((prev) => [
                ...prev,
                {
                  id,
                  label: '',
                  isActive: true,
                  isInMessage: false,
                  category: 'common',
                  itemType: 'inline',
                },
              ])
              return id
            }}
            onUpdate={(id, label) =>
              setCommonItems((prev) => prev.map((i) => (i.id === id ? { ...i, label } : i)))
            }
            onReorder={setCommonItems}
          />
        </div>

        {/* 개별 내용 */}
        <div className={sectionStyle}>
          <div className={sectionHeaderRowStyle}>
            <span className={sectionTitleStyle}>개별 내용</span>
            <span className={sectionHintStyle}>헤더를 드래그해서 순서를 바꿀 수 있어요</span>
          </div>
          <div className={tableScrollStyle}>
            <IndividualContentTable
              students={MOCK_STUDENTS}
              items={individualItems}
              onItemsChange={setIndividualItems}
            />
          </div>
        </div>

        {/* 알림톡 포함 항목 */}
        <div className={sectionStyle}>
          <div className={sectionHeaderRowStyle}>
            <span className={sectionTitleStyle}>알림톡 포함 항목</span>
            <span className={sectionHintStyle}>
              수업 입력 항목과 별개로 알림톡 포함 여부 및 순서를 설정할 수 있어요
            </span>
          </div>
          {/* TODO: NotificationItemList 컴포넌트 분리 + DnD 순서 변경 */}
          <div className={notificationListStyle}>
            {notificationItems.map((item) => (
              <NotificationItem key={item.id} item={item} onToggle={handleToggleNotification} />
            ))}
          </div>
        </div>
      </div>

      {/* 이탈 확인 모달 */}
      <ConfirmModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={handleConfirmExit}
        title="지금 나가면 내용이 사라져요"
        descriptions={['작성 중인 내용은 저장되지 않아요.']}
        confirmLabel="나가기"
        cancelLabel="계속 작성"
        confirmVariant="danger"
      />
    </div>
  )
}