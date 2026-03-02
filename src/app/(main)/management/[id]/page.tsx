'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { colors } from '@/styles/tokens/colors'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import ClassInfoTable from './_components/ClassInfoTable/ClassInfoTable'
import StudentTable from '../_components/StudentTable/StudentTable'
import DangerSection from './_components/DangerSection/DangerSection'
import { sectionWrapperStyle } from './_components/DangerSection/DangerSection.css'
import ArrowLeftIcon from '@/assets/icons/icon-arrow-left.svg'
import EditIcon from '@/assets/icons/icon-edit.svg'
import PlusIcon from '@/assets/icons/icon-plus.svg'
import AddStudentModal from './_components/AddStudentModal/AddStudentModal'
import ConfirmModal from '@/components/common/ConfirmModal'
import ClassFormModal from '../_components/ClassFormModal/ClassFormModal'
import { tdStyle } from '../_components/StudentTable/StudentTable.css'

const MOCK_CLASS = {
  id: 1,
  name: '미적분 A반',
  academyName: '엘리에듀학원',
  schedule: '화·금',
  time: '16:00 - 17:30',
  template: '정규 수업 템플릿',
}

const MOCK_STUDENTS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: '홍길동',
  studentPhone: '010-1234-5678',
  parentPhone: '010-1234-5678',
  memo: '',
  completionRate: 47,
  remaining: 3,
}))

export default function ClassDetailPage() {
  const router = useRouter()
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [deleteStudentTarget, setDeleteStudentTarget] = useState<number | null>(null)
  const [isEndClassOpen, setIsEndClassOpen] = useState(false)
  const [isDeleteClassOpen, setIsDeleteClassOpen] = useState(false)
  const [isEditClassOpen, setIsEditClassOpen] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.gray500 }}
        >
          <ArrowLeftIcon width={24} height={24} />
        </button>
        <Text variant="display" as="h1">
          {MOCK_CLASS.name}
        </Text>
      </div>

      {/* 반 정보 */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Text variant="headingMd">반 정보</Text>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<EditIcon width={14} height={14} />}
            style={{ height: '28px' }}
            onClick={() => setIsEditClassOpen(true)}
          >
            수정
          </Button>

          <ClassFormModal
            isOpen={isEditClassOpen}
            onClose={() => setIsEditClassOpen(false)}
            onConfirm={(data) => console.log('반 수정', data)}
            mode="edit"
            defaultValues={{
              academyName: MOCK_CLASS.academyName,
              name: MOCK_CLASS.name,
              dayOfWeek: [2, 5],
            }}
          />
        </div>
        <ClassInfoTable {...MOCK_CLASS} />
      </section>

      {/* 학생 명단 */}
      <section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <Text variant="headingMd">학생 명단</Text>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<PlusIcon width={20} height={20} />}
            onClick={() => setIsAddStudentOpen(true)}
          >
            학생 등록
          </Button>

          <AddStudentModal
            isOpen={isAddStudentOpen}
            onClose={() => setIsAddStudentOpen(false)}
            onConfirm={(ids) => console.log('추가할 학생 ids:', ids)}
          />
        </div>
        <StudentTable
          students={MOCK_STUDENTS}
          middleColumn={{
            header: '메모',
            render: (student) => <td className={tdStyle}>{student.memo ?? ''}</td>,
          }}
          onDelete={(id) => setDeleteStudentTarget(id)}
        />
      </section>

      <div className={sectionWrapperStyle}>
        <DangerSection
          variant="end"
          title="반 종료"
          description="학기가 끝났거나 더 이상 수업이 없다면 반을 종료할 수 있어요."
          buttonLabel="반 종료하기"
          onConfirm={() => setIsEndClassOpen(true)}
        />
        <DangerSection
          variant="delete"
          title="반 삭제"
          description="반을 삭제하면 학생 배정이 해제되지만, 수업 기록은 그대로 남아요."
          buttonLabel="반 삭제하기"
          onConfirm={() => setIsDeleteClassOpen(true)}
        />

        {/* 모달들 */}
        <ConfirmModal
          isOpen={!!deleteStudentTarget}
          onClose={() => setDeleteStudentTarget(null)}
          onConfirm={() => {
            console.log('학생 삭제', deleteStudentTarget)
            setDeleteStudentTarget(null)
          }}
          title={`'${MOCK_STUDENTS.find((s) => s.id === deleteStudentTarget)?.name}' 학생을 ${MOCK_CLASS.name}에서 제거할까요?`}
          descriptions={['반에서 제거되지만 학생 정보는 그대로 남아요.']}
          confirmLabel="제거"
          confirmVariant="danger"
        />

        <ConfirmModal
          isOpen={isEndClassOpen}
          onClose={() => setIsEndClassOpen(false)}
          onConfirm={() => {
            console.log('반 종료')
            setIsEndClassOpen(false)
          }}
          title={`'${MOCK_CLASS.name}'을 종료할까요?`}
          descriptions={['종료 후에는 수업 입력이 불가능해요.']}
          confirmLabel="종료"
          confirmVariant="primary"
        />

        <ConfirmModal
          isOpen={isDeleteClassOpen}
          onClose={() => setIsDeleteClassOpen(false)}
          onConfirm={() => {
            console.log('반 삭제')
            setIsDeleteClassOpen(false)
          }}
          title={`'${MOCK_CLASS.name}'을 삭제할까요?`}
          descriptions={['학생 배정이 해제되지만, 수업 기록은 그대로 남아요.']}
          confirmLabel="삭제"
          confirmVariant="danger"
        />
      </div>
    </div>
  )
}
