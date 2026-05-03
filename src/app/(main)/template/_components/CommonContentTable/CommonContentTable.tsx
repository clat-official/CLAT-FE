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
import type { TemplateItem } from '../../_types/template'
import {
  tableWrapperStyle,
  tableStyle,
  trStyle,
  trDraggingStyle,
  thStyle,
  thEditingStyle,
  thContentStyle,
  tdStyle,
  dragHandleStyle,
  dragDotRowStyle,
  dragDotStyle,
  rowLabelStyle,
  rowInputStyle,
  deleteButtonStyle,
  addRowButtonStyle,
  emptyTdStyle,
} from './CommonContentTable.css'

interface CommonContentTableProps {
  items: TemplateItem[]
  onDelete: (id: string) => void
  onAddInline: () => string
  onUpdate: (id: string, label: string) => void
  onReorder: (newItems: TemplateItem[]) => void
}

function DragHandle() {
  return (
    <span className={dragHandleStyle}>
      <span className={dragDotRowStyle}>
        <span className={dragDotStyle} />
        <span className={dragDotStyle} />
      </span>
      <span className={dragDotRowStyle}>
        <span className={dragDotStyle} />
        <span className={dragDotStyle} />
      </span>
      <span className={dragDotRowStyle}>
        <span className={dragDotStyle} />
        <span className={dragDotStyle} />
      </span>
    </span>
  )
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

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
    onDelete(id)
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
