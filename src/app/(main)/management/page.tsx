'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import Text from '@/components/common/Text'
import AddCard from '@/components/common/AddCard'
import Dropdown from '@/components/common/Dropdown'
import ClassCard from './_components/ClassCard/ClassCard'
import PlusCircleIcon from '@/assets/icons/icon-plus-circle.svg'
import { tabStyle, tabActiveStyle, tabContainerStyle, gridStyle } from './management.css'

const FILTER_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '진행 중', value: 'active' },
  { label: '종료', value: 'ended' },
]

const MOCK_CLASSES = [
  { id: 1, academyName: '엘리에듀학원', name: '미적분 A반', schedule: '수·금 14:00 – 16:00', studentCount: 25, isEnded: false },
  { id: 2, academyName: '엘리에듀학원', name: '미적분 A반', schedule: '수·금 14:00 – 16:00', studentCount: 25, isEnded: false },
  { id: 3, academyName: '엘리에듀학원', name: '미적분 A반', schedule: '수·금 14:00 – 16:00', studentCount: 25, isEnded: true, startDate: '26.02.14', endDate: '26.07.23' },
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

  return (
    <>
      <Text variant="display" as="h1">학생·반 관리</Text>
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
              onClick={() => console.log('반 추가')}
            />
          </div>
        </>
      )}
      {tab === 'students' && <div>{/* 전체 학생 */}</div>}
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