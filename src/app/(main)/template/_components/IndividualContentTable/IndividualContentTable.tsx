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
import { cva } from 'class-variance-authority'
import type { LessonStudent } from '@/types/lessonStudent'
import type { IndividualTemplateItem, IndividualItemType } from '../../_types/template'
import AddItemModal from '../AddItemModal/AddItemModal'
import DragHandle from '@/components/common/DragHandle/DragHandle'

const tableStyle = 'w-full border-collapse border border-gray-100 overflow-hidden'
const thBase = 'h-10 pl-4 bg-gray-50 text-gray-700 text-sm font-semibold tracking-[-0.03em] text-left border-b border-r border-gray-100 whitespace-nowrap'
const thStudentStyle = `${thBase} pr-9 w-[1%]`
const thAttendanceStyle = `${thBase} pr-9 w-[1%]`
const thColumnStyle = `${thBase} pr-4 w-[1%] hover:bg-primary-50`
const thAddStyle = `${thBase} pr-6 border-r-0 hover:bg-primary-50`
const tdBase = 'h-10 pl-4 pr-4 bg-white border-b border-r border-gray-100 [tr:last-child_&]:border-b-0'
const tdStudentStyle = `${tdBase} pr-9 w-[1%]`
const tdAttendanceStyle = `${tdBase} w-[1%]`
const tdColumnStyle = `${tdBase} w-[1%]`
const tdAddStyle = `${tdBase} border-r-0`
const colHeaderInnerStyle = 'flex items-center gap-1 text-gray-300 flex-1'
const colHeaderWrapperStyle = 'flex items-center gap-4'
const colNameStyle = 'text-sm font-semibold text-gray-700 tracking-[-0.03em] leading-[140%]'
const requiredMarkStyle = 'text-error-500'
const deleteButtonStyle = 'flex items-center bg-transparent border-none cursor-pointer p-0 text-gray-300 ml-auto hover:text-gray-500'
const addColumnButtonStyle = 'inline-flex items-center gap-1 bg-transparent border-none cursor-pointer p-0 text-primary-500 text-sm font-semibold tracking-[-0.03em] whitespace-nowrap'
const nameCellStyle = 'text-sm font-medium text-gray-700 tracking-[-0.03em] whitespace-nowrap'
const cellButtonGroupStyle = 'flex gap-1'
const dragOverlayWrapperStyle = 'flex flex-col shadow-[0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden'
const dragOverlayThStyle = 'h-10 px-4 bg-gray-50 border-b border-gray-100 flex items-center whitespace-nowrap'
const dragOverlayTdStyle = 'h-10 px-4 bg-white border-b border-gray-100 flex items-center'

const cellButtonVariants = cva(
  'h-6 w-[44px] rounded-[6px] text-xs font-medium tracking-[-0.03em] leading-[140%] border-none bg-gray-50 text-gray-300 cursor-default'
)

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
      <button className={cellButtonVariants({})} type="button" disabled>
        완료
      </button>
      <button className={cellButtonVariants({})} type="button" disabled>
        미완료
      </button>
    </div>
  )
}

function AttendancePreviewCell() {
  return (
    <div className={cellButtonGroupStyle}>
      <button className={cellButtonVariants({})} type="button" disabled>
        출석
      </button>
      <button className={cellButtonVariants({})} type="button" disabled>
        지각
      </button>
      <button className={cellButtonVariants({})} type="button" disabled>
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
