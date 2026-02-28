'use client'

import { useRouter } from 'next/navigation'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import ClassInfoTable from './_components/ClassInfoTable/ClassInfoTable'
import StudentTable from './_components/StudentTable/StudentTable'
import ArrowLeftIcon from '@/assets/icons/icon-arrow-left.svg'
import EditIcon from '@/assets/icons/icon-edit.svg'
import PlusIcon from '@/assets/icons/icon-plus.svg'

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
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
          >
            수정
          </Button>
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
          <Button variant="primary" size="sm" leftIcon={<PlusIcon width={20} height={20} />}>
            학생 추가
          </Button>
        </div>
        <StudentTable students={MOCK_STUDENTS} onDelete={(id) => console.log('delete', id)} />
      </section>

      {/* 반 종료 */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          backgroundColor: '#F3F4F5',
          borderRadius: '12px',
        }}
      >
        <div>
          <Text variant="headingMd">반 종료</Text>
          <Text variant="bodyMd" color="gray500">
            학기가 끝났거나 더 이상 수업이 없다면 반을 종료할 수 있어요.
          </Text>
        </div>
        <Button variant="outlined" size="sm">
          반 종료하기
        </Button>
      </section>

      {/* 반 삭제 */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          backgroundColor: '#FFF1F1',
          borderRadius: '12px',
        }}
      >
        <div>
          <Text variant="headingMd">반 삭제</Text>
          <Text variant="bodyMd" color="error500">
            반을 삭제하면 학생 배정이 해제되지만, 수업 기록은 그대로 남아요.
          </Text>
        </div>
        <Button variant="danger" size="sm">
          반 삭제하기
        </Button>
      </section>
    </div>
  )
}
