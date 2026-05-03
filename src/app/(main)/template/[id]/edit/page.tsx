'use client'

import { use, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import ArrowLeftIcon from '@/assets/icons/icon-arrow-left.svg'
import SaveIcon from '@/assets/icons/icon-save.svg'
import TemplateName from '@/app/(main)/template/_components/TemplateName/TemplateName'
import CommonContentTable from '@/app/(main)/template/_components/CommonContentTable/CommonContentTable'
import IndividualContentTable from '@/app/(main)/template/_components/IndividualContentTable/IndividualContentTable'
import ConfirmModal from '@/components/common/ConfirmModal'
import Button from '@/components/common/Button'
import Toggle from '@/components/common/Toggle'
import { templateService, toEditorItems, EDITOR_TO_API_ITEM_TYPE } from '@/services/template'
import type { UpdateTemplateDto } from '@/services/template'
import type { TemplateItem, IndividualTemplateItem } from '../../_types/template'
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
} from '../../template-form.css'
const MOCK_STUDENTS: LessonStudent[] = [{ id: 1, name: '홍길동', attendance: null, items: [] }]

const ITEM_TYPE_MAP: Record<string, IndividualTemplateItem['item_type']> = {
  number: 'SCORE',
  text: 'TEXT',
  choice: 'SELECT',
  completion: 'COMPLETE',
}

type NotificationEntry = {
  id: string
  name: string
  category: 'common' | 'individual'
  isInMessage: boolean
}

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
  item: NotificationEntry
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
      <Toggle checked={item.isInMessage} onChange={() => onToggle(item.id)} />
    </div>
  )
}

function TemplateEditForm({
  id,
  initialCommonItems,
  initialIndividualItems,
  initialName,
  initialAttendanceInMessage,
  initialAttendanceId,
}: {
  id: number
  initialName: string
  initialCommonItems: TemplateItem[]
  initialIndividualItems: IndividualTemplateItem[]
  initialAttendanceInMessage: boolean
  initialAttendanceId: number | null
}) {
  const router = useRouter()
  const addToast = useToastStore((s) => s.addToast)
  const [templateName, setTemplateName] = useState(initialName)
  const [commonItems, setCommonItems] = useState<TemplateItem[]>(initialCommonItems)
  const [individualItems, setIndividualItems] =
    useState<IndividualTemplateItem[]>(initialIndividualItems)
  const [attendanceInMessage, setAttendanceInMessage] = useState(initialAttendanceInMessage)
  const [attendanceId] = useState<number | null>(initialAttendanceId)
  const [isExitModalOpen, setIsExitModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [deletedItemIds, setDeletedItemIds] = useState<number[]>([])

  const notificationItems = useMemo<NotificationEntry[]>(
    () => [
      ...commonItems.map((item) => ({
        id: item.id,
        name: item.label || '(이름 없음)',
        category: 'common' as const,
        isInMessage: item.isInMessage,
      })),
      {
        id: '__attendance__',
        name: '출결',
        category: 'individual' as const,
        isInMessage: attendanceInMessage,
      },
      ...individualItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: 'individual' as const,
        isInMessage: item.isInMessage,
      })),
    ],
    [commonItems, individualItems, attendanceInMessage]
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

  const handleUpdate = async () => {
    if (!isValid) return

    const dto: UpdateTemplateDto = {
      name: templateName.trim(),
      items: [
        ...commonItems.map((item, i) => ({
          ...(Number(item.id) > 0 ? { id: Number(item.id) } : {}),
          name: item.label,
          item_type: EDITOR_TO_API_ITEM_TYPE[item.itemType],
          is_common: true,
          include_in_message: item.isInMessage,
          sort_order: i,
          options: item.choices ?? [],
        })),
        ...(attendanceId != null
          ? [
              {
                id: attendanceId,
                name: '출결',
                item_type: 'ATTENDANCE' as const,
                is_common: false,
                include_in_message: attendanceInMessage,
                sort_order: commonItems.length + individualItems.length,
                options: [],
              },
            ]
          : []),
        ...individualItems.map((item, i) => ({
          ...(Number(item.id) > 0 ? { id: Number(item.id) } : {}),
          name: item.name,
          item_type: item.item_type,
          is_common: false,
          include_in_message: item.isInMessage,
          sort_order: commonItems.length + i,
          options: item.choices ?? [],
        })),
      ],
      deleted_item_ids: deletedItemIds,
    }

    try {
      setIsSaving(true)
      await templateService.updateTemplate(id, dto)
      addToast({ variant: 'success', message: '템플릿이 수정됐어요.' })
      router.push('/template')
    } catch {
      addToast({ variant: 'error', message: '템플릿 수정에 실패했어요.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteCommonItem = (itemId: string) => {
    const numericId = Number(itemId)
    if (numericId > 0) setDeletedItemIds((prev) => [...prev, numericId])
    setCommonItems((prev) => prev.filter((i) => i.id !== itemId))
  }

  const handleDeleteIndividualItem = (itemId: string) => {
    const numericId = Number(itemId)
    if (numericId > 0) setDeletedItemIds((prev) => [...prev, numericId])
    setIndividualItems((prev) => prev.filter((i) => i.id !== itemId))
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
          <h1 className={pageTitleStyle}>수업 템플릿 수정</h1>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<SaveIcon width={16} height={16} />}
          onClick={handleUpdate}
          disabled={!isValid || isSaving}
        >
          {isSaving ? '저장 중...' : '저장'}
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
            onDelete={handleDeleteCommonItem}
            onAddInline={() => {
              const newId = crypto.randomUUID()
              setCommonItems((prev) => [
                ...prev,
                {
                  id: newId,
                  label: '',
                  isActive: true,
                  isInMessage: false,
                  category: 'common',
                  itemType: 'inline',
                },
              ])
              return newId
            }}
            onUpdate={(itemId, label) =>
              setCommonItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, label } : i)))
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
              onItemsChange={(newItems) => {
                const deletedIds = individualItems
                  .filter((i) => !newItems.find((n) => n.id === i.id))
                  .map((i) => Number(i.id))
                  .filter((n) => n > 0)
                setDeletedItemIds((prev) => [...prev, ...deletedIds])
                setIndividualItems(newItems)
              }}
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
          <div className={notificationListStyle}>
            {notificationItems.map((item) => (
              <NotificationItem
                key={
                  item.id === '__attendance__'
                    ? 'attendance-__attendance__'
                    : `${item.category}-${item.id}`
                }
                item={item}
                onToggle={handleToggleNotification}
              />
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

export default function TemplateEditPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [isLoading, setIsLoading] = useState(true)
  const [initialName, setInitialName] = useState('')
  const [initialCommonItems, setInitialCommonItems] = useState<TemplateItem[]>([])
  const [initialIndividualItems, setInitialIndividualItems] = useState<IndividualTemplateItem[]>([])
  const [initialAttendanceInMessage, setInitialAttendanceInMessage] = useState(false)
  const [initialAttendanceId, setInitialAttendanceId] = useState<number | null>(null)

  useEffect(() => {
    templateService
      .getTemplate(Number(id))
      .then((detail) => {
        const editor = toEditorItems(detail)
        setInitialName(editor.name)
        setInitialCommonItems(editor.commonItems)
        setInitialIndividualItems(
          editor.individualItems.map((item) => ({
            id: item.id,
            name: item.label,
            item_type: ITEM_TYPE_MAP[item.itemType] ?? 'TEXT',
            isInMessage: item.isInMessage,
            choices: item.choices,
          }))
        )
        const attendanceItem = detail.items.find((i) => i.item_type === 'ATTENDANCE')
        setInitialAttendanceInMessage(attendanceItem?.include_in_message ?? false)
        setInitialAttendanceId(attendanceItem?.id ?? null)
        setIsLoading(false)
      })
      .catch(() => {
        router.push('/template')
      })
  }, [id])

  if (isLoading) return null

  return (
    <TemplateEditForm
      id={Number(id)}
      initialName={initialName}
      initialCommonItems={initialCommonItems}
      initialIndividualItems={initialIndividualItems}
      initialAttendanceInMessage={initialAttendanceInMessage}
      initialAttendanceId={initialAttendanceId}
    />
  )
}
