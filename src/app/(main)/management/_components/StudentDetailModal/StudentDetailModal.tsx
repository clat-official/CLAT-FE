'use client'

import { useEffect, useState } from 'react'
import Modal from '@/components/common/Modal'
import Text from '@/components/common/Text'
import { studentService } from '@/services/student'
import { useToastStore } from '@/stores/toastStore'
import type { StudentDetail } from '@/types/student'
import CloseIcon from '@/assets/icons/icon-close.svg'
import CheckIcon from '@/assets/icons/icon-check.svg'
import {
  headerStyle,
  closeButtonStyle,
  sectionStyle,
  sectionTitleStyle,
  infoRowStyle,
  infoLabelStyle,
  infoValueStyle,
  editButtonStyle,
  statsGridStyle,
  statCardStyle,
  statLabelStyle,
  statValueStyle,
  trackingListStyle,
  trackingItemStyle,
  trackingLabelStyle,
  completeButtonStyle,
} from './StudentDetailModal.css'

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
              incomplete_items: prev.incomplete_items.filter((i: any) => i.id !== itemId),
              stats: {
                ...prev.stats,
                total_incomplete_items: prev.stats.total_incomplete_items - 1,
                total_complete_items: prev.stats.total_complete_items + 1,
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
    <Modal isOpen={!!studentId} onClose={onClose} size="md">
      {isLoading || !detail ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Text variant="bodyMd" color="gray500">불러오는 중...</Text>
        </div>
      ) : (
        <>
          {/* 헤더 */}
          <div className={headerStyle}>
            <Text variant="headingLg" as="h2">{detail.name}</Text>
            <button className={closeButtonStyle} onClick={onClose}>
              <CloseIcon width={24} height={24} />
            </button>
          </div>

          {/* 기본 정보 */}
          <div className={sectionStyle}>
            <Text variant="headingMd" as="h3" className={sectionTitleStyle}>기본 정보</Text>
            <div>
              <div className={infoRowStyle}>
                <span className={infoLabelStyle}>학생 전화번호</span>
                <span className={infoValueStyle}>{detail.phone || '-'}</span>
                <button className={editButtonStyle}>수정</button>
              </div>
              <div className={infoRowStyle}>
                <span className={infoLabelStyle}>학부모 전화번호</span>
                <span className={infoValueStyle}>{detail.parent_phone || '-'}</span>
                <button className={editButtonStyle}>수정</button>
              </div>
              <div className={infoRowStyle}>
                <span className={infoLabelStyle}>소속 반</span>
                <span className={infoValueStyle}>
                  {detail.classes.map((c) => c.name).join(', ') || '-'}
                </span>
                <button className={editButtonStyle}>수정</button>
              </div>
            </div>
          </div>

          {/* 통계 요약 */}
          <div className={sectionStyle}>
            <Text variant="headingMd" as="h3" className={sectionTitleStyle}>통계 요약</Text>
            <div className={statsGridStyle}>
              <div className={statCardStyle}>
                <span className={statLabelStyle}>완료율</span>
                <span className={statValueStyle} style={{ color: '#1DAA7F' }}>
                  {detail.stats.completion_rate}%
                </span>
              </div>
              <div className={statCardStyle}>
                <span className={statLabelStyle}>완료</span>
                <span className={statValueStyle}>{detail.stats.total_complete_items}회</span>
              </div>
              <div className={statCardStyle}>
                <span className={statLabelStyle}>미완료</span>
                <span className={statValueStyle}>{detail.stats.total_incomplete_items}개</span>
              </div>
            </div>
          </div>

          {/* 추적 항목 */}
          <div className={sectionStyle}>
            <Text variant="headingMd" as="h3" className={sectionTitleStyle}>
              추적 항목{' '}
              <span style={{ color: '#3B51CC' }}>{detail.incomplete_items.length}</span>
            </Text>
            <div className={trackingListStyle}>
              {detail.incomplete_items.length === 0 ? (
                <Text variant="bodyMd" color="gray500">미완료 항목이 없어요.</Text>
              ) : (
                detail.incomplete_items.map((item: any) => (
                  <div key={item.id} className={trackingItemStyle}>
                    <span className={trackingLabelStyle}>{item.label ?? item.name}</span>
                    <button
                      className={completeButtonStyle}
                      onClick={() => handleComplete(item.id)}
                    >
                      <CheckIcon width={16} height={16} />
                      완료 처리
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}