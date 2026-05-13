'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DndContext, closestCenter } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import ArrowLeftIcon from '@/assets/icons/icon-arrow-left.svg'
import StarIcon from '@/assets/icons/icon-star.svg'
import TemplateName from '@/app/(main)/template/_components/TemplateName/TemplateName'
import CommonContentTable from '@/app/(main)/template/_components/CommonContentTable/CommonContentTable'
import IndividualContentTable from '@/app/(main)/template/_components/IndividualContentTable/IndividualContentTable'
import ConfirmModal from '@/components/common/ConfirmModal'
import Button from '@/components/common/Button'
import Toggle from '@/components/common/Toggle'
import { templateService, EDITOR_TO_API_ITEM_TYPE } from '@/services/template'
import type { CreateTemplateDto } from '@/services/template'
import type { TemplateItem, IndividualTemplateItem } from '../_types/template'
import type { LessonStudent } from '@/types/lessonStudent'
import { useToastStore } from '@/stores/toastStore'
import {
  pageWrapperStyle,
  headerStyle,
  headerLeftStyle,
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
} from '../template-form'

const INITIAL_COMMON_ITEMS: TemplateItem[] = [
  { id: 'common-1', label: '오늘 수업 내용', isActive: true, isInMessage: true, category: 'common', itemType: 'text' },
  { id: 'common-2', label: '다음 시간 예고', isActive: true, isInMessage: true, category: 'common', itemType: 'text' },
  { id: 'common-3', label: '전달 사항', isActive: true, isInMessage: true, category: 'common', itemType: 'text' },
]

const MOCK_STUDENTS: LessonStudent[] = [{ id: 1, name: '홍길동', attendance: null, items: [] }]

const INITIAL_INDIVIDUAL_ITEMS: IndividualTemplateItem[] = [
  { id: 'individual-1', name: '시험 점수', item_type: 'SCORE', isInMessage: true },
  { id: 'individual-2', name: '과제', item_type: 'COMPLETE', isInMessage: true },
  { id: 'individual-3', name: '피드백', item_type: 'TEXT', isInMessage: false },
]

type NotificationEntry = {
  id: string
  name: string
  category: 'common' | 'individual'
  isInMessage: boolean
}

function DragHandle(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={notifDragHandleStyle} {...props}>
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
  item: NotificationEntry
  onToggle: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className={notificationItemStyle}>
      <div className={notificationItemLeftStyle}>
        <DragHandle {...attributes} {...listeners} />
        <span className={item.category === 'common' ? commonBadgeStyle : individualBadgeStyle}>
          {item.category === 'common' ? '공통' : '개별'}
        </span>
        <span className={notifItemNameStyle}>{item.name}</span>
      </div>
      <Toggle checked={item.isInMessage} onChange={() => onToggle(item.id)} />
    </div>
  )
}

export default function TemplateNewPage() {
  const router = useRouter()
  const addToast = useToastStore((s) => s.addToast)
  const [templateName, setTemplateName] = useState('')
  const [commonItems, setCommonItems] = useState<TemplateItem[]>(INITIAL_COMMON_ITEMS)
  const [individualItems, setIndividualItems] = useState<IndividualTemplateItem[]>(INITIAL_INDIVIDUAL_ITEMS)
  const [attendanceInMessage, setAttendanceInMessage] = useState(false)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [notificationOrder, setNotificationOrder] = useState<string[]>(() => [
    ...INITIAL_COMMON_ITEMS.map((i) => i.id),
    '__attendance__',
    ...INITIAL_INDIVIDUAL_ITEMS.map((i) => i.id),
  ])

  useEffect(() => {
    setNotificationOrder((prev) => {
      const allIds = new Set([
        ...commonItems.map((i) => i.id),
        '__attendance__',
        ...individualItems.map((i) => i.id),
      ])
      const filtered = prev.filter((id) => allIds.has(id))
      const added = [...commonItems.map((i) => i.id), ...individualItems.map((i) => i.id)].filter(
        (id) => !filtered.includes(id)
      )
      return [...filtered, ...added]
    })
  }, [commonItems, individualItems])

  const notificationItemMap = useMemo(() => {
    const map = new Map<string, NotificationEntry>()
    commonItems.forEach((item) =>
      map.set(item.id, {
        id: item.id,
        name: item.label || '(이름 없음)',
        category: 'common',
        isInMessage: item.isInMessage,
      })
    )
    map.set('__attendance__', {
      id: '__attendance__',
      name: '출결',
      category: 'individual',
      isInMessage: attendanceInMessage,
    })
    individualItems.forEach((item) =>
      map.set(item.id, {
        id: item.id,
        name: item.name,
        category: 'individual',
        isInMessage: item.isInMessage,
      })
    )
    return map
  }, [commonItems, individualItems, attendanceInMessage])

  const notificationItems = useMemo<NotificationEntry[]>(
    () => notificationOrder.flatMap((id) => (notificationItemMap.has(id) ? [notificationItemMap.get(id)!] : [])),
    [notificationOrder, notificationItemMap]
  )

  const isValid =
    templateName.trim() !== '' && (commonItems.length > 0 || individualItems.length > 0)

  const handleBack = () => setIsExitModalOpen(true)

  const handleConfirmExit = () => {
    router.back()
    setIsExitModalOpen(false)
  }

  const handleToggleNotification = (id: string) => {
    if (id === '__attendance__') {
      setAttendanceInMessage((prev) => !prev)
      return
    }
    setCommonItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isInMessage: !item.isInMessage } : item))
    )
    setIndividualItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isInMessage: !item.isInMessage } : item))
    )
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setNotificationOrder((prev) =>
      arrayMove(prev, prev.indexOf(String(active.id)), prev.indexOf(String(over.id)))
    )
  }

  const handleCreate = async () => {
    if (!isValid) return

    const sortOrderMap = new Map(notificationOrder.map((id, i) => [id, i]))

    const dto: CreateTemplateDto = {
      name: templateName.trim(),
      items: [
        ...commonItems.map((item) => ({
          name: item.label,
          item_type: EDITOR_TO_API_ITEM_TYPE[item.itemType],
          is_common: true,
          include_in_message: item.isInMessage,
          sort_order: sortOrderMap.get(item.id) ?? 0,
          options: item.choices ?? [],
        })),
        {
          name: '출결',
          item_type: 'ATTENDANCE' as const,
          is_common: false,
          include_in_message: attendanceInMessage,
          sort_order: sortOrderMap.get('__attendance__') ?? 0,
          options: [],
        },
        ...individualItems.map((item) => ({
          name: item.name,
          item_type: item.item_type,
          is_common: false,
          include_in_message: item.isInMessage,
          sort_order: sortOrderMap.get(item.id) ?? 0,
          options: item.choices ?? [],
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
        <div className={headerLeftStyle}>
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
                { id, label: '', isActive: true, isInMessage: false, category: 'common', itemType: 'inline' },
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
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={notificationOrder} strategy={verticalListSortingStrategy}>
              <div className={notificationListStyle}>
                {notificationItems.map((item) => (
                  <NotificationItem
                    key={item.id === '__attendance__' ? 'attendance-__attendance__' : `${item.category}-${item.id}`}
                    item={item}
                    onToggle={handleToggleNotification}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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
