'use client'

import { useState } from 'react'
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import XIcon from '@/assets/icons/icon-close.svg'
import PlusIcon from '@/assets/icons/icon-plus.svg'
import DragHandle from '@/components/common/DragHandle/DragHandle'
import type { TemplateItem } from '../../_types/template'

const tableWrapperStyle = 'w-full border border-gray-100 overflow-hidden'
const tableStyle = 'w-full border-separate border-spacing-0'
const trStyle = 'relative'
const trDraggingStyle = 'opacity-50 bg-primary-50 z-[9999]'
const thStyle = 'w-[200px] h-12 bg-gray-50 border-b border-r border-gray-100 [tr:last-child_&]:border-b-0'
const thEditingStyle = 'bg-primary-50'
const thContentStyle = 'flex items-center px-4 h-full'
const tdStyle = 'h-12 border-b border-gray-100 [tr:last-child_&]:border-b-0'
const rowLabelStyle = 'ml-2 text-sm font-semibold text-gray-700 tracking-[-0.03em] leading-[140%] cursor-text'
const rowInputStyle = 'flex-1 ml-2 text-sm font-semibold text-gray-700 tracking-[-0.03em] leading-[140%] bg-transparent border-none outline-none p-0 w-full placeholder:text-gray-300'
const deleteButtonStyle = 'flex items-center bg-transparent border-none cursor-pointer p-1 text-gray-300 shrink-0 ml-auto hover:text-gray-500'
const addRowButtonStyle = 'flex items-center justify-center gap-1 w-full py-[10px] px-4 bg-white border-0 border-t border-gray-100 cursor-pointer text-sm font-semibold text-primary-500 tracking-[-0.03em] hover:bg-primary-50'
const emptyTdStyle = 'px-4 py-6 text-center text-sm text-gray-300'

interface CommonContentTableProps {
  items: TemplateItem[]
  onDelete: (id: string) => void
  onAddInline: () => string
  onUpdate: (id: string, label: string) => void
  onReorder: (newItems: TemplateItem[]) => void
}

interface SortableRowProps {
  item: TemplateItem
  isEditing: boolean
  editingValue: string
  onEditStart: (id: string, currentLabel: string) => void
  onEditChange: (value: string) => void
  onEditConfirm: () => void
  onEditCancel: () => void
  onDelete: (id: string) => void
}

function SortableRow({
  item,
  isEditing,
  editingValue,
  onEditStart,
  onEditChange,
  onEditConfirm,
  onEditCancel,
  onDelete,
}: SortableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  const inlineStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onEditConfirm()
    else if (e.key === 'Escape') onEditCancel()
  }

  return (
    <tr
      ref={setNodeRef}
      style={inlineStyle}
      className={`${trStyle}${isDragging ? ` ${trDraggingStyle}` : ''}`}
    >
      <th className={`${thStyle}${isEditing ? ` ${thEditingStyle}` : ''}`} scope="row">
        <div className={thContentStyle}>
          <span {...attributes} {...listeners}>
            <DragHandle />
          </span>
          {isEditing ? (
            <input
              className={rowInputStyle}
              value={editingValue}
              placeholder="항목 이름 입력"
              onChange={(e) => onEditChange(e.target.value)}
              onBlur={onEditConfirm}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span className={rowLabelStyle} onClick={() => onEditStart(item.id, item.label)}>
              {item.label}
            </span>
          )}
          <button
            className={deleteButtonStyle}
            onClick={() => onDelete(item.id)}
            type="button"
            aria-label="항목 삭제"
          >
            <XIcon width={16} height={16} />
          </button>
        </div>
      </th>
      <td className={tdStyle} />
    </tr>
  )
}

export default function CommonContentTable({
  items,
  onDelete,
  onAddInline,
  onUpdate,
  onReorder,
}: CommonContentTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState('')

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    onReorder(arrayMove(items, oldIndex, newIndex))
  }

  const handleAddRow = () => {
    const newId = onAddInline()
    setEditingId(newId)
    setEditingValue('')
  }

  const confirmEdit = (id: string) => {
    const trimmed = editingValue.trim()
    if (trimmed === '') {
      onDelete(id)
    } else {
      onUpdate(id, trimmed)
    }
    setEditingId(null)
  }

  const cancelEdit = (id: string) => {
    const item = items.find((i) => i.id === id)
    if (item && item.label === '') {
      onDelete(id)
    }
    setEditingId(null)
  }

  const handleEditStart = (id: string, currentLabel: string) => {
    setEditingId(id)
    setEditingValue(currentLabel)
  }

  return (
    <div className={tableWrapperStyle}>
      <DndContext
        id="common-content-table-dnd"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <table className={tableStyle}>
            <tbody>
              {items.length === 0 && editingId === null ? (
                <tr>
                  <td className={emptyTdStyle} colSpan={2}>
                    항목을 추가해보세요
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <SortableRow
                    key={item.id}
                    item={item}
                    isEditing={editingId === item.id}
                    editingValue={editingValue}
                    onEditStart={handleEditStart}
                    onEditChange={setEditingValue}
                    onEditConfirm={() => confirmEdit(item.id)}
                    onEditCancel={() => cancelEdit(item.id)}
                    onDelete={onDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
      <button className={addRowButtonStyle} onClick={handleAddRow} type="button">
        <PlusIcon width={16} height={16} />
        공통 항목 추가
      </button>
    </div>
  )
}
