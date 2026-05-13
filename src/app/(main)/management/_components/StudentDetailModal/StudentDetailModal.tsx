'use client'

import { useEffect, useState } from 'react'
import Modal from '@/components/common/Modal'
import Text from '@/components/common/Text'
import { studentService } from '@/services/student'
import { useToastStore } from '@/stores/toastStore'
import useDisclosure from '@/hooks/useDisclosure'
import type { StudentDetail, IncompleteItem } from '@/types/student'
import CloseIcon from '@/assets/icons/icon-close.svg'
import CheckIcon from '@/assets/icons/icon-check.svg'
import AddStudentFormModal from '../AddStudentFormModal/AddStudentFormModal'

interface StudentDetailModalProps {
  studentId: number | null
  onClose: () => void
  onUpdated?: () => void
}

export default function StudentDetailModal({
  studentId,
  onClose,
  onUpdated,
}: StudentDetailModalProps) {
  const addToast = useToastStore((s) => s.addToast)
  const [detail, setDetail] = useState<StudentDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const editStudent = useDisclosure()

  useEffect(() => {
    if (!studentId) return
    setIsLoading(true)
    setDetail(null)
    studentService
      .getStudent(studentId)
      .then(setDetail)
      .catch(() => addToast({ variant: 'error', message: '학생 정보를 불러오지 못했어요.' }))
      .finally(() => setIsLoading(false))
  }, [studentId])

  const handleComplete = async (itemId: number) => {
    try {
      await studentService.completeItem(itemId)
      setDetail((prev) =>
        prev
          ? {
              ...prev,
              incomplete_items: prev.incomplete_items.filter(
                (i) => i.lesson_student_data_id !== itemId
              ),
              stats: {
                ...prev.stats,
                total_incomplete_items: prev.stats.total_incomplete_items - 1,
                total_complete_items: prev.stats.total_complete_items + 1,
                completion_rate:
                  (prev.stats.total_complete_items + 1) /
                  (prev.stats.total_complete_items + 1 + prev.stats.total_incomplete_items - 1),
              },
            }
          : prev
      )
      addToast({ variant: 'success', message: '완료 처리됐어요.' })
      onUpdated?.()
    } catch {
      addToast({ variant: 'error', message: '완료 처리에 실패했어요.' })
    }
  }

  return (
    <>
      <Modal isOpen={!!studentId} onClose={onClose} size="md">
        {isLoading || !detail ? (
          <div className="p-10 text-center">
            <Text variant="bodyMd" color="gray500">
              불러오는 중...
            </Text>
          </div>
        ) : (
          <>
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-9">
              <Text variant="headingLg" as="h2">
                {detail.name}
              </Text>
              <button
                className="bg-transparent border-none cursor-pointer text-gray-500 flex items-center justify-center p-1 hover:text-gray-600"
                onClick={onClose}
              >
                <CloseIcon width={24} height={24} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-[3px] hover:[&::-webkit-scrollbar-thumb]:bg-gray-200">
              {/* 기본 정보 */}
              <div className="mb-9">
                <div className="flex items-center gap-3 mb-3">
                  <Text variant="headingMd" as="h3">
                    기본 정보
                  </Text>
                  <button
                    className="text-xs font-medium bg-primary-50 border-none rounded-[6px] h-6 px-3 cursor-pointer text-primary-500 shrink-0 tracking-[-0.03em] leading-[1.4] hover:bg-primary-100"
                    onClick={editStudent.open}
                  >
                    수정
                  </button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex gap-4">
                    <span className="text-sm font-medium text-gray-500 w-[140px] shrink-0 tracking-[-0.03em] leading-[1.4]">학생 전화번호</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 tracking-[-0.03em] leading-[1.4]">{detail.phone || '-'}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sm font-medium text-gray-500 w-[140px] shrink-0 tracking-[-0.03em] leading-[1.4]">학부모 전화번호</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 tracking-[-0.03em] leading-[1.4]">{detail.parent_phone || '-'}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sm font-medium text-gray-500 w-[140px] shrink-0 tracking-[-0.03em] leading-[1.4]">소속 반</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 tracking-[-0.03em] leading-[1.4]">
                      {detail.classes.map((c) => c.name).join(', ') || '-'}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-sm font-medium text-gray-500 w-[140px] shrink-0 tracking-[-0.03em] leading-[1.4]">학교명</span>
                    <span className="text-sm font-medium text-gray-900 flex-1 tracking-[-0.03em] leading-[1.4]">{detail.school_name || '-'}</span>
                  </div>
                </div>
              </div>

              {/* 통계 요약 */}
              <div className="mb-9">
                <Text variant="headingMd" as="h3" className="mb-3">
                  통계 요약
                </Text>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-xl h-[104px] p-4 flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.4]">완료율</span>
                    <span className="text-2xl font-semibold text-success-500 tracking-[-0.03em] leading-[1.4]">
                      {Math.round(detail.stats.completion_rate * 100)}%
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl h-[104px] p-4 flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.4]">완료</span>
                    <span className="text-2xl font-semibold text-gray-700 tracking-[-0.03em] leading-[1.4]">{detail.stats.total_complete_items}개</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl h-[104px] p-4 flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.4]">미완료</span>
                    <span className="text-2xl font-semibold text-gray-700 tracking-[-0.03em] leading-[1.4]">{detail.stats.total_incomplete_items}개</span>
                  </div>
                </div>
              </div>

              {/* 미완료 항목 */}
              <div className="mb-9">
                <Text variant="headingMd" as="h3" className="mb-3">
                  미완료 항목{' '}
                  <span className="text-primary-500">{detail.incomplete_items.length}</span>
                </Text>
                <div className="flex flex-col gap-2">
                  {detail.incomplete_items.length === 0 ? (
                    <Text variant="bodyMd" color="gray500">
                      미완료 항목이 없어요.
                    </Text>
                  ) : (
                    detail.incomplete_items.map((item: IncompleteItem) => (
                      <div key={item.lesson_student_data_id} className="flex items-center justify-between py-[14px] px-4 bg-gray-50 rounded-lg">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-gray-900 tracking-[-0.03em] leading-[1.4]">{item.item_name}</span>
                          <span className="text-xs text-gray-500">
                            {item.lesson_date} · {item.class_name}
                          </span>
                        </div>
                        <button
                          className="group flex items-center gap-1 text-xs font-medium text-gray-500 bg-white border-none rounded py-1 px-2 cursor-pointer tracking-[-0.03em] leading-[1.4] hover:bg-success-50 hover:text-success-500 active:bg-success-200"
                          onClick={() => handleComplete(item.lesson_student_data_id)}
                        >
                          <CheckIcon width={16} height={16} className="text-gray-100 group-hover:text-success-500" />
                          완료 처리
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>

      {detail && (
        <AddStudentFormModal
          isOpen={editStudent.isOpen}
          onClose={editStudent.close}
          mode="edit"
          defaultValues={{
            name: detail.name,
            phone: detail.phone,
            parent_phone: detail.parent_phone,
            school_name: detail.school_name,
            class_ids: detail.classes.map((c) => c.id),
          }}
          onConfirm={async (data) => {
            try {
              await studentService.updateStudent(detail.id, data)
              const updated = await studentService.getStudent(detail.id)
              setDetail(updated)
              editStudent.close()
              addToast({ variant: 'success', message: '학생 정보가 수정됐어요.' })
              onUpdated?.()
            } catch {
              addToast({ variant: 'error', message: '학생 정보 수정에 실패했어요.' })
            }
          }}
        />
      )}
    </>
  )
}
