import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreateTemplateItemDto, templateService } from '@/services/template'
import type { TemplateItem } from '@/app/(main)/template/_types/template'
import { INITIAL_COMMON_ITEMS, INITIAL_INDIVIDUAL_ITEMS } from '@/mocks/template'

interface InitialData {
  name?: string
  commonItems?: TemplateItem[]
  individualItems?: TemplateItem[]
}

export default function useTemplateEditor(initial: InitialData = {}) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const initCommon = initial.commonItems ?? INITIAL_COMMON_ITEMS
  const initIndividual = initial.individualItems ?? INITIAL_INDIVIDUAL_ITEMS

  const [templateName, setTemplateName] = useState(initial.name ?? '')
  const [commonItems, setCommonItems] = useState<TemplateItem[]>(initCommon)
  const [individualItems, setIndividualItems] = useState<TemplateItem[]>(initIndividual)
  const [messageOrder, setMessageOrder] = useState<string[]>([
    ...initCommon.map((i) => i.id),
    ...initIndividual.map((i) => i.id),
  ])

  const [originalItemIds] = useState<number[]>(
    () =>
      [...(initial.commonItems ?? []), ...(initial.individualItems ?? [])]
        .map((item) => Number(item.id))
        .filter((id) => !isNaN(id) && id > 0) // 새로 추가한 'c-xxx', 'i-xxx' 제외
  )

  const allItemsMap = useMemo(() => {
    const map = new Map<string, TemplateItem>()
    for (const item of commonItems) map.set(item.id, item)
    for (const item of individualItems) map.set(item.id, item)
    return map
  }, [commonItems, individualItems])

  const ITEM_TYPE_MAP: Record<TemplateItem['itemType'], string> = {
    number: 'NUMBER',
    text: 'TEXT',
    choice: 'SELECT',
    completion: 'COMPLETE',
    inline: 'TEXT',
  }

  const buildItems = (items: TemplateItem[]): CreateTemplateItemDto[] =>
    items
      .filter((item) => item.label.trim() !== '')
      .map((item, index) => ({
        name: item.label,
        item_type: ITEM_TYPE_MAP[item.itemType],
        is_common: item.category === 'common',
        include_in_message: item.isInMessage,
        sort_order: index + 1,
        options: item.choices ?? [],
      }))

  const handleSave = async () => {
    if (!templateName.trim()) {
      alert('템플릿 이름을 입력해주세요.')
      return
    }
    setIsSaving(true)
    try {
      await templateService.createTemplate({
        name: templateName,
        items: buildItems([...commonItems, ...individualItems]),
      })
      router.push('/template')
    } catch (err) {
      console.error('템플릿 저장 실패', err)
      alert('템플릿 저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdate = async (templateId: number) => {
    if (!templateName.trim()) {
      alert('템플릿 이름을 입력해주세요.')
      return
    }
    setIsSaving(true)
    try {
      await templateService.updateTemplate(templateId, {
        name: templateName,
        items: buildItems([...commonItems, ...individualItems]),
        deleted_item_ids: originalItemIds, // 기존 아이템 전부 삭제 후 새로 삽입
      })
      router.push('/template')
    } catch (err) {
      console.error('템플릿 수정 실패', err)
      alert('템플릿 수정에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSaving(false)
    }
  }
  
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
    setCommonItems((prev) => [
      ...prev,
      {
        id: newId,
        label: '',
        isActive: true,
        isInMessage: true,
        category: 'common',
        itemType: 'inline',
      },
    ])
    setMessageOrder((prev) => [...prev, newId])
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
    setMessageOrder((prev) => prev.filter((orderId) => orderId !== id))
  }

  const handleAddIndividualItem = (label: string, type: string, choices?: string[]) => {
    const newId = 'i-' + Date.now()
    setIndividualItems((prev) => [
      ...prev,
      {
        id: newId,
        label,
        isActive: true,
        isInMessage: true,
        category: 'individual',
        itemType: type as TemplateItem['itemType'],
        choices,
      },
    ])
    setMessageOrder((prev) => [...prev, newId])
  }

  const handleMessagePreviewToggle = (id: string) => {
    const toggle = (prev: TemplateItem[]) =>
      prev.map((item) => (item.id === id ? { ...item, isInMessage: !item.isInMessage } : item))
    setCommonItems(toggle)
    setIndividualItems(toggle)
  }

  const handleMessageReorder = (newOrder: string[]) => setMessageOrder(newOrder)

  return {
    templateName,
    setTemplateName,
    commonItems,
    individualItems,
    messageOrder,
    allItemsMap,
    isSaving,
    handleSave,
    handleUpdate,
    handleToggleCommonItem,
    handleDeleteCommonItem,
    handleAddCommonItem,
    handleUpdateCommonItem,
    handleToggleIndividualItem,
    handleDeleteIndividualItem,
    handleAddIndividualItem,
    handleMessagePreviewToggle,
    handleMessageReorder,
  }
}
