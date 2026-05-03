'use client'

import { useState } from 'react'
import Modal from '@/components/common/Modal'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import NumberIcon from '@/assets/icons/icon-number.svg'
import TextIcon from '@/assets/icons/icon-text.svg'
import SelectIcon from '@/assets/icons/icon-select.svg'
import CheckIcon from '@/assets/icons/icon-check.svg'
import CloseIcon from '@/assets/icons/icon-close.svg'
import InfoIcon from '@/assets/icons/icon-info.svg'
import {
  fieldStyle,
  labelStyle,
  typeGridStyle,
  typeCardRecipe,
  typeCardTitleStyle,
  typeCardDescStyle,
  tagInputContainerStyle,
  tagStyle,
  tagRemoveButtonStyle,
  tagInputStyle,
  completionInfoStyle,
  completionInfoTitleStyle,
  completionInfoListStyle,
  actionsStyle,
  contentStyle,
  requiredMarkStyle,
  infoRowStyle,
  infoIconStyle,
} from './AddItemModal.css'

type ItemTypeId = 'number' | 'text' | 'choice' | 'completion'

const ITEM_TYPES: Array<{ id: ItemTypeId; name: string; desc: string }> = [
  { id: 'choice', name: '단답형', desc: '예: 출석 / 지각 / 결석' },
  { id: 'text', name: '텍스트형', desc: '예: 메모' },
  { id: 'number', name: '점수형', desc: '예: 시험 점수' },
  { id: 'completion', name: '완료형', desc: '완료/미완료' },
]

const MAX_LENGTH = 10

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (label: string, type: string, choices?: string[]) => void
}

export default function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [label, setLabel] = useState('')
  const [selectedType, setSelectedType] = useState<ItemTypeId | null>(null)
  const [choices, setChoices] = useState<string[]>([])
  const [choiceInput, setChoiceInput] = useState('')

  const reset = () => {
    setLabel('')
    setSelectedType(null)
    setChoices([])
    setChoiceInput('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const addChoice = (value: string) => {
    const trimmed = value.trim()
    if (trimmed) {
      setChoices((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]))
    }
  }

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.includes(',')) {
      const parts = value.split(',')
      const lastPart = parts.pop() || ''
      parts.forEach((part) => addChoice(part))
      setChoiceInput(lastPart)
    } else {
      setChoiceInput(value)
    }
  }

  const handleChoiceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      addChoice(choiceInput)
      setChoiceInput('')
    }
  }

  const removeChoice = (index: number) => {
    setChoices((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAdd = () => {
    if (!label.trim() || !selectedType) return
    const finalChoices =
      selectedType === 'choice'
        ? [...choices, ...(choiceInput.trim() ? [choiceInput.trim()] : [])]
        : undefined
    onAdd(label.trim(), selectedType, finalChoices)
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm">
      <div className={contentStyle}>
        {/* 항목 이름 */}
        <div className={fieldStyle}>
          <span className={labelStyle}>
            항목 이름 <span className={requiredMarkStyle}>*</span>
          </span>
          <Input
            value={label}
            variant="gray"
            onChange={(e) => setLabel(e.target.value.slice(0, MAX_LENGTH))}
            placeholder="예) 금요일 과제"
            maxLength={MAX_LENGTH}
            suffix={`${label.length}/${MAX_LENGTH}`}
          />
        </div>

        {/* 항목 타입 */}
        <div className={fieldStyle}>
          <span className={labelStyle}>
            항목 타입 <span className={requiredMarkStyle}>*</span>
          </span>
          <div className={typeGridStyle}>
            {ITEM_TYPES.map((type) => {
              const isSelected = selectedType === type.id
              return (
                <button
                  key={type.id}
                  className={typeCardRecipe({ selected: isSelected })}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className={typeCardTitleStyle}>
                    {type.id === 'number' && <NumberIcon width={16} height={16} />}
                    {type.id === 'text' && <TextIcon width={16} height={16} />}
                    {type.id === 'choice' && <SelectIcon width={16} height={16} />}
                    {type.id === 'completion' && <CheckIcon width={16} height={16} />}
                    {type.name}
                  </div>
                  <div className={typeCardDescStyle}>{type.desc}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 선택지 설정 */}
        {selectedType === 'choice' && (
          <div className={fieldStyle}>
            <span className={labelStyle}>
              선택지 설정 <span className={requiredMarkStyle}>*</span>
            </span>
            <div className={tagInputContainerStyle}>
              {choices.map((choice, i) => (
                <span key={i} className={tagStyle}>
                  {choice}
                  <button className={tagRemoveButtonStyle} onClick={() => removeChoice(i)}>
                    <CloseIcon width={12} height={12} />
                  </button>
                </span>
              ))}
              <input
                className={tagInputStyle}
                value={choiceInput}
                onChange={handleChoiceChange}
                onKeyDown={handleChoiceKeyDown}
                placeholder="쉼표로 구분"
              />
            </div>
          </div>
        )}

        {/* 완료형 안내 */}
        {selectedType === 'completion' && (
          <div className={completionInfoStyle}>
            <div className={infoRowStyle}>
              <InfoIcon width={16} height={16} className={infoIconStyle} />
              <span className={completionInfoTitleStyle}>완료형은 이런 기능을 지원해요</span>
            </div>
            <ul className={completionInfoListStyle}>
              <li>미완료 학생 자동 분류</li>
              <li>학생 관리 탭에서 한눈에 확인</li>
            </ul>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className={actionsStyle}>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAdd}
            disabled={!label.trim() || !selectedType}
          >
            추가
          </Button>
        </div>
      </div>
    </Modal>
  )
}
