'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Text from '@/components/common/Text'
import useDisclosure from '@/hooks/useDisclosure'
import { MOCK_CLASSES, MOCK_ALL_STUDENTS } from '@/mocks/management'
import Button from '@/components/common/Button'
import PlusIcon from '@/assets/icons/icon-plus.svg'
import UploadIcon from '@/assets/icons/icon-upload.svg'
import AddCard from '@/components/common/AddCard'
import Dropdown from '@/components/common/Dropdown'
import ClassCard from './_components/ClassCard/ClassCard'
import PlusCircleIcon from '@/assets/icons/icon-plus-circle.svg'
import {
  tabStyle,
  tabActiveStyle,
  tabContainerStyle,
  tabActionsStyle,
  gridStyle,
} from './management.css'
import ClassFormModal from './_components/ClassFormModal/ClassFormModal'
import StudentTable from './_components/StudentTable/StudentTable'
import { tdStyle } from './_components/StudentTable/StudentTable.css'
import AddStudentFormModal from './_components/AddStudentFormModal/AddStudentFormModal'
import BulkUploadModal from './_components/BulkUploadModal/BulkUploadModal'
import ConfirmModal from '@/components/common/ConfirmModal'

const FILTER_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '진행 중', value: 'active' },
  { label: '종료', value: 'ended' },
]


function ManagementContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? 'class'
  const [filter, setFilter] = useState('all')

  const filteredClasses = MOCK_CLASSES.filter((cls) => {
    if (filter === 'active') return !cls.isEnded
    if (filter === 'ended') return cls.isEnded
    return true
  })

  const addClass = useDisclosure()
  const addStudent = useDisclosure()
  const bulkUpload = useDisclosure()
  const [deleteStudentTarget, setDeleteStudentTarget] = useState<number | null>(null)

  return (
    <>
      <Text variant="display" as="h1">
        학생·반 관리
      </Text>
      <div className={tabContainerStyle}>
        <button
          className={tab === 'class' ? tabActiveStyle : tabStyle}
          onClick={() => router.push('/management?tab=class')}
        >
          반별 보기
        </button>
        <button
          className={tab === 'students' ? tabActiveStyle : tabStyle}
          onClick={() => router.push('/management?tab=students')}
        >
          전체 학생
        </button>
        {tab === 'students' && (
          <div className={tabActionsStyle}>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<UploadIcon width={20} height={20} />}
              onClick={bulkUpload.open}
            >
              일괄 등록
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<PlusIcon width={20} height={20} />}
              onClick={addStudent.open}
            >
              학생 등록
            </Button>
          </div>
        )}
      </div>
      {tab === 'class' && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <Dropdown
              options={FILTER_OPTIONS}
              value={filter}
              onChange={setFilter}
              placeholder="전체"
            />
          </div>
          <div className={gridStyle}>
            {filteredClasses.map((cls) => (
              <ClassCard key={cls.id} {...cls} />
            ))}
            <AddCard
              icon={<PlusCircleIcon width={36} height={36} />}
              label="반 추가"
              onClick={addClass.open}
            />

            <ClassFormModal
              isOpen={addClass.isOpen}
              onClose={addClass.close}
              onConfirm={(data) => {
                console.log('새 반 추가:', data)
              }}
              mode="add"
            />
          </div>
        </>
      )}
      {tab === 'students' && (
        <>
          <BulkUploadModal
            isOpen={bulkUpload.isOpen}
            onClose={bulkUpload.close}
            onConfirm={(file) => console.log('업로드', file)}
          />
          <AddStudentFormModal
            isOpen={addStudent.isOpen}
            onClose={addStudent.close}
            onConfirm={(data) => {
              console.log('새 학생 추가:', data)
            }}
          />
          <StudentTable
            students={MOCK_ALL_STUDENTS}
            middleColumn={{
              header: '소속 반',
              render: (student) => (
                <td className={tdStyle}>{student.classes?.join(', ') ?? '-'}</td>
              ),
            }}
            onDelete={(id) => setDeleteStudentTarget(id)}
          />

          <ConfirmModal
            isOpen={!!deleteStudentTarget}
            onClose={() => setDeleteStudentTarget(null)}
            onConfirm={() => {
              console.log('학생 삭제', deleteStudentTarget)
              setDeleteStudentTarget(null)
            }}
            title={`'${MOCK_ALL_STUDENTS.find((s) => s.id === deleteStudentTarget)?.name}' 학생을 삭제할까요?`}
            descriptions={['삭제 후에는 복구할 수 없어요.']}
            confirmLabel="삭제"
            confirmVariant="danger"
          />
        </>
      )}
    </>
  )
}

export default function ManagementPage() {
  return (
    <Suspense>
      <ManagementContent />
    </Suspense>
  )
}
