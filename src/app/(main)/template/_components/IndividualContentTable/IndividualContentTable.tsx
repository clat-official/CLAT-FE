'use client'

import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import XIcon from '@/assets/icons/icon-close.svg'
import PlusIcon from '@/assets/icons/icon-plus.svg'
import NumberIcon from '@/assets/icons/icon-number.svg'
import TextIcon from '@/assets/icons/icon-text.svg'
import SelectIcon from '@/assets/icons/icon-select.svg'
import CheckIcon from '@/assets/icons/icon-check.svg'
import type { LessonStudent } from '@/types/lessonStudent'
import type { IndividualTemplateItem, IndividualItemType } from '../../_types/template'
import AddItemModal from '../AddItemModal/AddItemModal'
import DragHandle from '@/components/common/DragHandle/DragHandle'
import {
  tableStyle,
  thStudentStyle,
  thAttendanceStyle,
  thColumnStyle,
  thAddStyle,
  tdStudentStyle,
  tdAttendanceStyle,
  tdColumnStyle,
  tdAddStyle,
  colHeaderWrapperStyle,
  colHeaderInnerStyle,
  colNameStyle,
  requiredMarkStyle,
  deleteButtonStyle,
  addColumnButtonStyle,
  nameCellStyle,
  cellButtonGroupStyle,
  cellButtonRecipe,
  dragOverlayWrapperStyle,
  dragOverlayThStyle,
  dragOverlayTdStyle,
} from './IndividualContentTable.css'

interface IndividualContentTableProps {
  students: LessonStudent[]
  items: IndividualTemplateItem[]
  onItemsChange: (items: IndividualTemplateItem[]) => void
}

function TypeIcon({ type }: { type: IndividualItemType }) {
  const props = { width: 14, height: 14 }
  if (type === 'SCORE') return <NumberIcon {...props} />
  if (type === 'TEXT') return <TextIcon {...props} />
  if (type === 'SELECT') return <SelectIcon {...props} />
  return <CheckIcon {...props} />
}

function mapToItemType(type: string): IndividualItemType {
  if (type === 'number') return 'SCORE'
  if (type === 'text') return 'TEXT'
  if (type === 'choice') return 'SELECT'
  return 'COMPLETE'
}

interface SortableColumnHeaderProps {
  item: IndividualTemplateItem
  onDelete: (id: string) => void
}

function SortableColumnHeader({ item, onDelete }: SortableColumnHeaderProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  })

  return (
    <th
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : undefined,
      }}
      className={thColumnStyle}
    >
      <div className={colHeaderWrapperStyle}>
        <span {...attributes} {...listeners}>
          <DragHandle />
        </span>
        <div className={colHeaderInnerStyle}>
          <TypeIcon type={item.item_type} />
          <span className={colNameStyle}>{item.name}</span>
        </div>
        <button
          type="button"
          className={deleteButtonStyle}
          onClick={() => onDelete(item.id)}
          aria-label={`${item.name} 삭제`}
        >
          <XIcon width={16} height={16} />
        </button>
      </div>
    </th>
  )
}

interface ColumnDragOverlayProps {
  item: IndividualTemplateItem
  students: LessonStudent[]
}

function ColumnDragOverlay({ item, students }: ColumnDragOverlayProps) {
  return (
    <div className={dragOverlayWrapperStyle}>
      <div className={dragOverlayThStyle}>
        <div className={colHeaderWrapperStyle}>
          <DragHandle />
          <div className={colHeaderInnerStyle}>
            <TypeIcon type={item.item_type} />
            <span className={colNameStyle}>{item.name}</span>
          </div>
          <button type="button" className={deleteButtonStyle} tabIndex={-1} aria-hidden>
            <XIcon width={16} height={16} />
          </button>
        </div>
      </div>
      {students.map((student) => (
        <div key={student.id} className={dragOverlayTdStyle}>
          {item.item_type === 'COMPLETE' && <CompletePreviewCell />}
        </div>
      ))}
    </div>
  )
}

function CompletePreviewCell() {
  return (
    <div className={cellButtonGroupStyle}>
      <button className={cellButtonRecipe({})} type="button" disabled>
        완료
      </button>
      <button className={cellButtonRecipe({})} type="button" disabled>
        미완료
      </button>
    </div>
  )
}

function AttendancePreviewCell() {
  return (
    <div className={cellButtonGroupStyle}>
      <button className={cellButtonRecipe({})} type="button" disabled>
        출석
      </button>
      <button className={cellButtonRecipe({})} type="button" disabled>
        지각
      </button>
      <button className={cellButtonRecipe({})} type="button" disabled>
        결석
      </button>
    </div>
  )
}

export default function IndividualContentTable({
  students,
  items,
  onItemsChange,
}: IndividualContentTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeItem = activeId ? (items.find((i) => i.id === activeId) ?? null) : null

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)
    onItemsChange(arrayMove(items, oldIndex, newIndex))
  }

  const handleDelete = (id: string) => {
    onItemsChange(items.filter((i) => i.id !== id))
  }

  const handleAdd = (name: string, type: string, choices?: string[]) => {
    const newItem: IndividualTemplateItem = {
      id: crypto.randomUUID(),
      name,
      item_type: mapToItemType(type),
      isInMessage: false,
      choices,
    }
    onItemsChange([...items, newItem])
  }

  return (
    <>
      <DndContext
        id="individual-items-table-dnd"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <table className={tableStyle}>
          <thead>
            <tr>
              <th className={thStudentStyle}>학생</th>
              <th className={thAttendanceStyle}>
                <div className={colHeaderInnerStyle}>
                  <SelectIcon width={14} height={14} />
                  <span className={colNameStyle}>출결</span>
                  <span className={requiredMarkStyle}>*</span>
                </div>
              </th>
              <SortableContext
                items={items.map((i) => i.id)}
                strategy={horizontalListSortingStrategy}
              >
                {items.map((item) => (
                  <SortableColumnHeader key={item.id} item={item} onDelete={handleDelete} />
                ))}
              </SortableContext>
              <th className={thAddStyle}>
                <button
                  type="button"
                  className={addColumnButtonStyle}
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <PlusIcon width={16} height={16} />
                  개별 항목 추가
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className={tdStudentStyle}>
                  <span className={nameCellStyle}>{student.name}</span>
                </td>
                <td className={tdAttendanceStyle}>
                  <AttendancePreviewCell />
                </td>
                {items.map((item) => (
                  <td key={item.id} className={tdColumnStyle}>
                    {item.item_type === 'COMPLETE' && <CompletePreviewCell />}
                  </td>
                ))}
                <td className={tdAddStyle} />
              </tr>
            ))}
          </tbody>
        </table>
        <DragOverlay>
          {activeItem && <ColumnDragOverlay item={activeItem} students={students} />}
        </DragOverlay>
      </DndContext>
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />
    </>
  )
}
