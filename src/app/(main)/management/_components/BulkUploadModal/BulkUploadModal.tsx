'use client'

import { useRef, useState } from 'react'
import Text from '@/components/common/Text'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import UploadCloudIcon from '@/assets/icons/icon-upload-cloud.svg'
import DownloadIcon from '@/assets/icons/icon-download.svg'
import CloseIcon from '@/assets/icons/icon-close.svg'
import XlsxIcon from '@/assets/icons/icon-xlsx.svg'
import { cn } from '@/lib/utils'

interface BulkUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (file: File) => void
}

export default function BulkUploadModal({ isOpen, onClose, onConfirm }: BulkUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => setFile(f)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleClose = () => {
    setFile(null)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className="mb-9">
        <Text variant="headingLg" as="h2">
          일괄 등록
        </Text>
      </div>
      <div className="flex flex-col gap-3 mb-10">
        {/* Step 1 */}
        <div className="flex flex-col gap-4 p-6 bg-background border border-gray-50 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white text-base font-semibold shrink-0">1</span>
            <span className="text-lg font-semibold text-gray-900 tracking-[-0.03em] leading-[1.4]">양식 다운로드</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<DownloadIcon width={20} height={20} />}
            className="ml-8 self-start"
            onClick={() => {
              const link = document.createElement('a')
              link.href = '/templates/student-template.xlsx'
              link.download = '학생_일괄등록_양식.xlsx'
              link.click()
            }}
          >
            엑셀 양식 다운로드
          </Button>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-4 p-6 bg-background border border-gray-50 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white text-base font-semibold shrink-0">2</span>
            <span className="text-lg font-semibold text-gray-900 tracking-[-0.03em] leading-[1.4]">학생 정보 작성</span>
          </div>
          <span className="ml-8 text-sm font-medium text-gray-500 tracking-[-0.03em] leading-[1.4]">
            양식에 학생명, 학생 전화, 학부모 전화를 입력해주세요
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col gap-4 p-6 bg-background border border-gray-50 rounded-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-500 text-white text-base font-semibold shrink-0">3</span>
            <span className="text-lg font-semibold text-gray-900 tracking-[-0.03em] leading-[1.4]">파일 업로드</span>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
          />
          {file ? (
            <div className="flex items-center gap-1 py-3 px-4 bg-white rounded-lg">
              <XlsxIcon width={24} height={24} />
              <span className="text-sm font-semibold text-gray-700 tracking-[-0.03em]">{file.name}</span>
              <button
                className="bg-transparent border-none cursor-pointer p-0 flex items-center text-gray-300 ml-auto hover:text-gray-500"
                onClick={() => {
                  setFile(null)
                  if (inputRef.current) inputRef.current.value = ''
                }}
              >
                <CloseIcon width={20} height={20} />
              </button>
            </div>
          ) : (
            <div
              className={cn(
                'group flex flex-col items-center justify-center gap-2 p-6 mx-8 mb-4 border-none dropzone-dashed-border rounded-xl bg-white cursor-pointer transition-colors duration-200 hover:bg-primary-50',
                isDragging && 'bg-primary-50'
              )}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <span className="text-gray-300 transition-colors duration-200 group-hover:text-primary-500">
                <UploadCloudIcon width={24} height={24} />
              </span>
              <span className="text-sm font-semibold text-gray-300 tracking-[-0.03em] group-hover:text-primary-500">
                파일을 드래그하거나 클릭하여 선택하세요
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  inputRef.current?.click()
                }}
              >
                파일 열기
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" size="lg" fullWidth onClick={handleClose}>
          취소
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!file}
          onClick={() => {
            if (file) {
              onConfirm(file)
              handleClose()
            }
          }}
        >
          업로드
        </Button>
      </div>
    </Modal>
  )
}
