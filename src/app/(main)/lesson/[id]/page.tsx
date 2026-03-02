'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as XLSX from 'xlsx'
import { generateStudentMessage } from '@/lib/generateStudentMessage'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import ArrowLeftIcon from '@/assets/icons/icon-arrow-left.svg'
import DownloadIcon from '@/assets/icons/icon-download.svg'
import SaveIcon from '@/assets/icons/icon-save.svg'
import MessageIcon from '@/assets/icons/icon-message.svg'
import LessonTable from './_components/LessonTableSection/LessonTableSection'
import CommonContent from './_components/CommonContent/CommonContent'
import ProgressBar from './_components/ProgressBar/ProgressBar'
import {
  pageStyle,
  headerStyle,
  footerStyle,
  sectionStyle,
  templateSectionStyle,
  templateLabelRowStyle,
  templateChipGroupStyle,
  templateChipRecipe,
  backButtonStyle,
  headerLeftStyle,
  headerButtonGroupStyle,
} from './lessonDetail.css'
import MessagePreview from './_components/MessagePreview/MessagePreview'

const MOCK_TEMPLATES = [
  { id: 1, name: '정규 수업 템플릿' },
  { id: 2, name: '클리닉 템플릿' },
  { id: 3, name: '보강 템플릿' },
]

const MOCK_COMMON_ITEMS = [
  { id: 1, label: '오늘 학습 내용' },
  { id: 2, label: '다음 시간 범위' },
  { id: 3, label: '클리닉 안내' },
  { id: 4, label: '이번 주 과제' },
]

const MOCK_STUDENTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: '홍길동',
  attendance: null as '출석' | '지각' | '결석' | null,
  homework: null as '완료' | '미완료' | null,
  answerNote: null as '완료' | '미완료' | null,
  score: '',
  memo: '',
}))

export default function LessonDetailPage() {
  const router = useRouter()
  const [selectedTemplateId, setSelectedTemplateId] = useState(1)
  const [commonValues, setCommonValues] = useState<Record<number, string>>({})
  const [students, setStudents] = useState(MOCK_STUDENTS)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleExcelDownload = () => {
    const commonRows = MOCK_COMMON_ITEMS.map((item) => [item.label, commonValues[item.id] || ''])
    const studentRows = students.map((s) => [
      s.name,
      s.attendance ?? '미입력',
      s.homework ?? '미입력',
      s.answerNote ?? '미입력',
      s.score || '0',
      s.memo || '',
    ])

    const ws = XLSX.utils.aoa_to_sheet([
      ['2월 20일(금) 미적분 A반 수업 결과'],
      [],
      ['공통 내용'],
      ...commonRows,
      [],
      ['개별 내용'],
      ['이름', '출결', '숙제', '오답노트', '시험 점수', '메모'],
      ...studentRows,
    ])

    const wsMessages = XLSX.utils.aoa_to_sheet([
      ['이름', '문자 내용'],
      ...students.map((s) => [s.name, generateStudentMessage(s, commonValues)]),
    ])

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '수업 결과')
    XLSX.utils.book_append_sheet(wb, wsMessages, '문자 내용')
    XLSX.writeFile(wb, '수업결과.xlsx')
  }

  const inputCount = students.filter(
    (s) => s.attendance !== null && s.homework !== null && s.answerNote !== null && s.score !== ''
  ).length

  return (
    <div className={pageStyle}>
      {/* 헤더 */}
      <div className={headerStyle}>
        <div className={headerLeftStyle}>
          <button
            onClick={() => router.back()}
            className={backButtonStyle}
          >
            <ArrowLeftIcon width={24} height={24} />
          </button>

          <Text variant="display" as="h1">
            2월 20일(금) 미적분 A반
          </Text>
        </div>
        <div className={headerButtonGroupStyle}>
          <Button variant="secondary" size="sm" leftIcon={<DownloadIcon width={20} height={20} />} onClick={handleExcelDownload}>
            엑셀 다운로드
          </Button>
          <Button variant="primary" size="sm" leftIcon={<SaveIcon width={20} height={20} />}>
            저장
          </Button>
        </div>
      </div>

      {/* 템플릿 선택 */}
      <div className={templateSectionStyle}>
        <div className={templateLabelRowStyle}>
          <Text variant="headingMd">템플릿</Text>
          <Text variant="bodyMd" color="gray500">
            오늘 수업에 적용할 템플릿을 선택해주세요
          </Text>
        </div>
        <div className={templateChipGroupStyle}>
          {MOCK_TEMPLATES.map((t) => (
            <button
              key={t.id}
              className={templateChipRecipe({ selected: selectedTemplateId === t.id })}
              onClick={() => setSelectedTemplateId(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 공통 내용 */}
      <div className={sectionStyle}>
        <Text variant="headingMd">공통 내용</Text>
        <CommonContent
          items={MOCK_COMMON_ITEMS}
          values={commonValues}
          onChange={(id, value) => setCommonValues((prev) => ({ ...prev, [id]: value }))}
        />
      </div>

      {/* 개별 내용 */}
      <div className={sectionStyle}>
        <Text variant="headingMd">개별 내용</Text>
        <LessonTable students={students} onChange={setStudents} />
      </div>

      {/* 하단 진행도 */}
      <div className={footerStyle}>
        <ProgressBar current={inputCount} total={students.length} />
        <Button
          variant="primary"
          size="sm"
          leftIcon={<MessageIcon width={20} height={20} />}
          onClick={() => setIsDrawerOpen(true)}
        >
          문자 미리보기
        </Button>
      </div>

      <MessagePreview
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        commonValues={commonValues}
        students={students}
      />
    </div>
  )
}
