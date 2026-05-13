'use client'

import { useState } from 'react'
import Image from 'next/image'
import LogoBetaIcon from '@/assets/logo/logo-beta.svg'
import bannerIllust from '@/assets/images/banner-illust.png'
import giftBox from '@/assets/images/gift-box.png'
import envelope from '@/assets/images/envelope.png'
import BookOpen from '@/assets/icons/icon-book-open.svg'
import ChevronRight from '@/assets/icons/icon-chevron-right.svg'

const steps = [
  {
    number: '1',
    tag: 'STEP 1',
    title: '반 & 학생 등록',
    items: [
      '[반 관리] 메뉴에서 반 이름 입력 후 반 생성 (예: "중등 수학 A반")',
      '생성된 반에 학생 개별 추가 또는 엑셀 파일로 일괄 등록',
      '학생 정보 입력 (이름, 학생 전화번호, 학부모 전화번호)',
      '등록 완료 → 이후 수업 입력 시 해당 반·학생 자동 연동',
    ],
  },
  {
    number: '2',
    tag: 'STEP 2',
    title: '수업 준비 — 템플릿 설정',
    items: [
      '템플릿 이름 입력 (예: "중등 수업 템플릿")',
      '공통 항목 추가 (예: 오늘 수업 내용, 과제 범위)',
      '개별 항목 추가 (시험 점수→숫자형 / 출결→선택형 / 과제→완료형)',
      '문자에 포함할 항목 선택 후 저장 → 이후 수업에서 반복 사용',
    ],
  },
  {
    number: '3',
    tag: 'STEP 3',
    title: '수업 데이터 입력 & 문자 발송',
    items: [
      '홈 화면에서 날짜 선택 → 해당 날짜 수업반 자동 표시',
      '반 선택 후 [입력하기] 클릭 → 템플릿 선택',
      '공통 내용 및 학생별 개별 내용 입력',
      '저장 → 완료율 자동 계산 및 미완료 항목 추적 시작',
      '학생별 문자 내용 미리보기 확인 후 엑셀 내보내기',
    ],
  },
  {
    number: '4',
    tag: 'STEP 4',
    title: '학생 추적',
    items: [
      '템플릿 생성 시 관리할 항목을 완료형으로 설정',
      '학생 목록에서 완료율이 낮은 학생 확인',
      '학생 개인 페이지 진입 → 미완료 항목 및 수업 확인',
      '페이지에서 바로 완료 처리 → 즉시 반영',
    ],
  },
]

const tabBase = 'rounded-full border-none text-xs font-semibold tracking-[-0.03em] cursor-pointer transition-all duration-150'
const tabStyle = `${tabBase} py-2 px-4 bg-gray-50 text-gray-500`
const tabActiveStyle = `${tabBase} py-[7px] px-4 bg-primary-500 text-white`

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="flex flex-col gap-9">
      {/* 웰컴 배너 */}
      <div className="[background:radial-gradient(circle_at_right_center,var(--color-primary-400)_0%,transparent_75%),var(--color-primary-100)] rounded-[20px] p-8 flex items-center justify-between overflow-hidden relative min-h-[160px]">
        <div className="flex flex-col gap-4 z-[1]">
          <div className="overflow-hidden h-6 w-[120px]">
            <LogoBetaIcon className="h-4 w-auto ml-[3px]" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-[-0.05em] text-gray-700">수업 기록부터 문자까지,</div>
            <div className="text-[52px] font-[800] tracking-[-0.05em] text-primary-500">3분이면 끝</div>
          </div>
        </div>
        <div className="absolute right-[-140px] bottom-[-110px] flex">
          <Image
            src={bannerIllust}
            alt="배너 일러스트"
            height={380}
            className="object-contain object-right-bottom"
          />
        </div>
      </div>

      {/* 클랫 시작 가이드 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen width={24} height={24} />
          <span className="text-xl font-bold tracking-[-0.03em] text-gray-900">클랫 시작 가이드</span>
        </div>

        {/* 탭 */}
        <div className="flex gap-2 mb-4">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={activeStep === i ? tabActiveStyle : tabStyle}
            >
              {step.tag}
            </button>
          ))}
        </div>

        {/* 스텝 카드 */}
        <div className="bg-gray-50 rounded-[20px] py-6 px-7">
          <div className="flex items-center gap-[10px] mb-4">
            <div className="text-lg font-semibold tracking-[-0.03em] text-gray-900">{steps[activeStep].title}</div>
          </div>
          <div className="flex flex-col gap-[10px]">
            {steps[activeStep].items.map((item, i) => (
              <div key={i} className="flex items-start gap-[10px]">
                <div className="shrink-0 px-3 h-5 rounded-full bg-gray-75 text-gray-500 text-[11px] font-semibold tracking-[-0.03em] inline-flex items-center justify-center mt-0.5 whitespace-nowrap">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="text-sm font-medium text-gray-700 tracking-[-0.03em] leading-[1.65]">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 2열 카드 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 베타 혜택 */}
        <div className="bg-primary-100 rounded-[20px] py-7 px-8 overflow-hidden min-h-[200px] relative">
          <div className="flex flex-col gap-3 z-[1] relative">
            <div className="inline-flex bg-primary-200 rounded-full py-1 px-3 text-sm font-semibold tracking-[-0.03em] text-primary-400 w-fit">
              베타 테스터 혜택
            </div>
            <div className="text-2xl font-bold tracking-[-0.05em] text-gray-900 leading-[1.3]">
              지금 참여하면
              <br />
              3개월 무료
            </div>
            <div className="text-sm font-semibold tracking-[-0.03em] text-gray-700">
              베타 기간 동안 모든 기능을
              <br />
              무료로 사용하세요.
            </div>
          </div>
          <div className="absolute right-[-100px] bottom-[-120px]">
            <Image
              src={giftBox}
              alt="선물상자"
              width={360}
              height={360}
              className="object-contain"
            />
          </div>
        </div>

        {/* 친구 초대 */}
        <div className="bg-primary-500 rounded-[20px] py-7 px-8 overflow-hidden min-h-[200px] relative">
          <div className="flex flex-col gap-3 z-[1] relative">
            <div className="inline-flex bg-transparent border border-primary-100 rounded-full py-1 px-3 text-sm font-semibold tracking-[-0.03em] text-primary-100 w-fit">
              친구 초대 이벤트
            </div>
            <div className="text-2xl font-bold tracking-[-0.05em] text-white leading-[1.3]">
              친구 초대하고
              <br />
              3개월 추가 무료
            </div>
            <a
              href="https://forms.gle/GnAunK7KUQQuHCSY8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-5 bg-white border-none rounded-full py-2 px-4 text-base font-bold tracking-[-0.03em] text-primary-500 cursor-pointer w-fit no-underline transition-all duration-150 hover:bg-primary-50 active:opacity-80"
            >
              친구 초대하기
              <ChevronRight width={24} height={24} />
            </a>
          </div>
          <div className="absolute right-[-100px] bottom-[-120px]">
            <Image
              src={envelope}
              alt="편지봉투"
              width={360}
              height={360}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
