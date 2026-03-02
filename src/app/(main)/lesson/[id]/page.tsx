'use client'

import { useRouter } from 'next/navigation'
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
import { MOCK_LESSON_TEMPLATES, MOCK_COMMON_ITEMS } from '@/mocks/lesson'
import useLessonDetail, { DEFAULT_LESSON_CONTEXT } from '@/hooks/useLessonDetail'

export default function LessonDetailPage() {
  const router = useRouter()
  const {
    selectedTemplateId,
    setSelectedTemplateId,
    commonValues,
    setCommonValues,
    students,
    setStudents,
    messagePreview,
    inputCount,
    handleExcelDownload,
  } = useLessonDetail()

  return (
    <div className={pageStyle}>
      {/* 헤더 */}
      <div className={headerStyle}>
        <div className={headerLeftStyle}>
          <button onClick={() => router.back()} className={backButtonStyle}>
            <ArrowLeftIcon width={24} height={24} />
          </button>
          <Text variant="display" as="h1">
            {DEFAULT_LESSON_CONTEXT.lessonDate} {DEFAULT_LESSON_CONTEXT.className}
          </Text>
        </div>
        <div className={headerButtonGroupStyle}>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<DownloadIcon width={20} height={20} />}
            onClick={handleExcelDownload}
          >
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
          {MOCK_LESSON_TEMPLATES.map((t) => (
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
          onClick={messagePreview.open}
        >
          문자 미리보기
        </Button>
      </div>

      <MessagePreview
        isOpen={messagePreview.isOpen}
        onClose={messagePreview.close}
        commonValues={commonValues}
        students={students}
      />
    </div>
  )
}
