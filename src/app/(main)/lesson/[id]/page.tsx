'use client'

import { use } from 'react'
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
import MessagePreview from './_components/MessagePreview/MessagePreview'
import {
  pageStyle,
  headerStyle,
  footerStyle,
  sectionStyle,
  templateSectionStyle,
  templateLabelRowStyle,
  backButtonStyle,
  headerLeftStyle,
  headerButtonGroupStyle,
} from './lessonDetail.css'
import useLessonDetail from '@/hooks/useLessonDetail'
import { lessonService } from '@/services/lesson'
import { useToastStore } from '@/stores/toastStore'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export default function LessonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const lessonId = Number(id)
  const router = useRouter()
  const addToast = useToastStore((s) => s.addToast)

  const {
    lesson,
    template,
    commonValues,
    setCommonValues,
    students,
    setStudents,
    messagePreview,
    inputCount,
    isLoading,
    handleExcelDownload,
  } = useLessonDetail(lessonId)

  const handleSave = async () => {
    try {
      await lessonService.saveLesson(lessonId)
      addToast({ variant: 'success', message: '저장됐어요.' })
    } catch {
      addToast({ variant: 'error', message: '저장에 실패했어요.' })
    }
  }

  if (isLoading || !lesson || !template) return null

  const commonItems = template.items
    .filter((i) => i.is_common)
    .map((i) => ({ id: i.id, label: i.name }))

  return (
    <div className={pageStyle}>
      {/* 헤더 */}
      <div className={headerStyle}>
        <div className={headerLeftStyle}>
          <button onClick={() => router.back()} className={backButtonStyle}>
            <ArrowLeftIcon width={24} height={24} />
          </button>
          <Text variant="display" as="h1">
            {format(new Date(lesson.lesson_date), 'M월 d일(E)', { locale: ko })} {lesson.class_name}
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
          <Button
            variant="primary"
            size="sm"
            leftIcon={<SaveIcon width={20} height={20} />}
            onClick={handleSave}
            disabled={lesson.status === 'SAVED'}
          >
            저장
          </Button>
        </div>
      </div>

      {/* 템플릿 정보 */}
      <div className={templateSectionStyle}>
        <div className={templateLabelRowStyle}>
          <Text variant="headingMd">템플릿</Text>
          <Text variant="bodyMd" color="gray500">
            {template.name}
          </Text>
        </div>
      </div>

      {/* 공통 내용 */}
      {commonItems.length > 0 && (
        <div className={sectionStyle}>
          <Text variant="headingMd">공통 내용</Text>
          <CommonContent
            items={commonItems}
            values={commonValues}
            onChange={(id, value) => setCommonValues((prev) => ({ ...prev, [id]: value }))}
          />
        </div>
      )}

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
        context={{
          academyName: lesson.academy_name,
          teacherName: '',
          className: lesson.class_name,
          lessonDate: format(new Date(lesson.lesson_date), 'M월 d일(E)', { locale: ko }),
        }}
      />
    </div>
  )
}
