import { useMemo, useState } from 'react'
import type { TemplateItem } from '@/app/(main)/template/_types/template'
import { INITIAL_COMMON_ITEMS, INITIAL_INDIVIDUAL_ITEMS } from '@/mocks/template'

interface InitialData {
  name?: string
  commonItems?: TemplateItem[]
  individualItems?: TemplateItem[]
}

export default function useTemplateEditor(initial: InitialData = {}) {
  const initCommon = initial.commonItems ?? INITIAL_COMMON_ITEMS
  const initIndividual = initial.individualItems ?? INITIAL_INDIVIDUAL_ITEMS

  const [templateName, setTemplateName] = useState(initial.name ?? '')
  const [commonItems, setCommonItems] = useState<TemplateItem[]>(initCommon)
  const [individualItems, setIndividualItems] = useState<TemplateItem[]>(initIndividual)
  const [messageOrder, setMessageOrder] = useState<string[]>([
    ...initCommon.map((i) => i.id),
    ...initIndividual.map((i) => i.id),
  ])

  const allItemsMap = useMemo(() => {
    const map = new Map<string, TemplateItem>()
    for (const item of commonItems) map.set(item.id, item)
    for (const item of individualItems) map.set(item.id, item)
    return map
  }, [commonItems, individualItems])

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
      { id: newId, label: '', isActive: true, isInMessage: true, category: 'common', itemType: 'inline' },
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
