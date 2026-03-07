'use client'

import { useState, useEffect, useRef } from 'react'
import * as XLSX from 'xlsx'
import Text from '@/components/common/Text'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import useToggleArray from '@/hooks/useToggleArray'
import { classService, type Class } from '@/services/class'
import { studentService, type BulkCreateStudentDto } from '@/services/student'
import { useToastStore } from '@/stores/toastStore'
import {
  fieldGroupStyle,
  fieldStyle,
  labelStyle,
  classChipGroupStyle,
  classChipRecipe,
  actionsStyle,
} from './AddStudentFormModal.css'

interface StudentFormData {
  name: string
  phone: string
  parent_phone: string
  school_name: string
  class_ids: number[]
}

interface AddStudentFormModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: StudentFormData) => void
  onBulkConfirm?: () => void
  mode?: 'add' | 'edit'
  defaultValues?: Partial<StudentFormData>
}

export default function AddStudentFormModal({
  isOpen,
  onClose,
  onConfirm,
  onBulkConfirm,
  mode = 'add',
  defaultValues,
}: AddStudentFormModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [classes, setClasses] = useState<Class[]>([])
  const [isBulkLoading, setIsBulkLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const addToast = useToastStore((s) => s.addToast)

  const {
    items: selectedClassIds,
    toggle: toggleClass,
    reset: resetClasses,
    set: setSelectedClassIds,
  } = useToggleArray<number>()

  useEffect(() => {
    if (!isOpen) return
    classService
      .getClasses({ status: 'active' })
      .then((res) => {
        setClasses(res.data)
        if (defaultValues) {
          setName(defaultValues.name ?? '')
          setPhone(defaultValues.phone ?? '')
          setParentPhone(defaultValues.parent_phone ?? '')
          setSchoolName(defaultValues.school_name ?? '')
          setSelectedClassIds(defaultValues.class_ids ?? [])
        }
      })
      .catch((err) => console.error('반 목록 조회 실패', err))
  }, [isOpen])

  const handleClose = () => {
    setName('')
    setPhone('')
    setParentPhone('')
    setSchoolName('')
    resetClasses()
    onClose()
  }

  const handleConfirm = () => {
    if (!name.trim()) return
    onConfirm({
      name,
      phone,
      parent_phone: parentPhone,
      school_name: schoolName,
      class_ids: selectedClassIds,
    })
    handleClose()
  }

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length < 4) return digits
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  }

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('파일 선택됨', e.target.files?.[0])
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsBulkLoading(true)
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer, { type: 'array' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      // 헤더 제외, 최대 1000행
      const dataRows = rows.slice(1, 1001).filter((row) => row[0])

      const students: BulkCreateStudentDto[] = dataRows.map((row) => ({
        name: String(row[0] ?? '').trim(),
        phone: String(row[1] ?? '').trim(),
        parent_phone: String(row[2] ?? '').trim(),
        school_name: String(row[3] ?? '').trim(),
      }))

      if (students.length === 0) {
        addToast({ variant: 'error', message: '등록할 학생 데이터가 없어요.' })
        return
      }

      await studentService.bulkCreateStudents(students)
      addToast({ variant: 'success', message: `${students.length}명의 학생이 등록됐어요.` })
      onBulkConfirm?.()
      handleClose()
    } catch (err) {
      addToast({ variant: 'error', message: '엑셀 업로드에 실패했어요.' })
    } finally {
      setIsBulkLoading(false)
      // input 초기화 (같은 파일 재업로드 가능하도록)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text variant="headingLg" as="h2">
          {mode === 'add' ? '학생 등록' : '학생 정보 수정'}
        </Text>
        {mode === 'add' && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              style={{ display: 'none' }}
              onChange={handleExcelUpload}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isBulkLoading}
            >
              {isBulkLoading ? '업로드 중...' : '엑셀로 일괄 등록'}
            </Button>
          </>
        )}
      </div>
      <div className={fieldGroupStyle}>
        <div className={fieldStyle}>
          <span className={labelStyle}>
            학생명 <span style={{ color: '#EF4453' }}>*</span>
          </span>
          <Input variant="gray" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>학생 전화번호</span>
          <Input
            variant="gray"
            value={phone}
            placeholder="숫자만 입력"
            onChange={(e) => setPhone(formatPhone(e.target.value))}
          />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>학부모 전화번호</span>
          <Input
            variant="gray"
            value={parentPhone}
            placeholder="숫자만 입력"
            onChange={(e) => setParentPhone(formatPhone(e.target.value))}
          />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>학교명</span>
          <Input
            variant="gray"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </div>
        <div className={fieldStyle}>
          <span className={labelStyle}>소속 반</span>
          <div className={classChipGroupStyle}>
            {classes.map((cls) => (
              <button
                key={cls.id}
                className={classChipRecipe({ selected: selectedClassIds.includes(cls.id) })}
                onClick={() => toggleClass(cls.id)}
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={actionsStyle}>
        <Button variant="ghost" size="lg" fullWidth onClick={handleClose}>
          취소
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!name.trim()}
          onClick={handleConfirm}
        >
          {mode === 'add' ? '등록하기' : '저장'}
        </Button>
      </div>
    </Modal>
  )
}
