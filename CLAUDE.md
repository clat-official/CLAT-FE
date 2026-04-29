# CLAT-FE — Claude Code 가이드

> 코드 작성 전 반드시 전체를 읽으세요.
> 마지막 업데이트: 2026-04-30

---

## 1. 서비스 개요

CLAT은 **출강 강사를 위한 학생 관리 + 알림톡 자동화 SaaS**입니다.

핵심 도메인:
- **수업(Lesson)**: 날짜별 수업 조회, 수업 입력(공통·개별 항목), 출결 관리
- **관리(Management)**: 반(Class) 생성·수정, 학생 등록·관리
- **템플릿(Template)**: 수업 항목 구성, 알림톡 포함 항목 설정
- **완료 추적**: 미완료 항목(숙제·보강 등) 자동 추적 및 완료 처리

---

## 2. 기술 스택

```
Next.js 16 (App Router) + React 19 + TypeScript 5
스타일: vanilla-extract (.css.ts 파일 분리)
전역 상태: Zustand 5
HTTP: axios — axiosInstance만 사용 (직접 import 금지)
패키지 매니저: pnpm
폰트: Pretendard Variable
```

---

## 3. 절대 규칙 (예외 없음)

### 코드
- NEVER import axios directly → `@/lib/api/axiosInstance` only
- NEVER use `any` type → `unknown` + 타입 가드로 처리
- NEVER use inline `style={{}}` → `.css.ts` 파일로 분리
- NEVER hardcode colors → `@/styles/theme.css.ts` 토큰 사용
- NEVER commit `console.log`
- 클라이언트 훅 사용 시 반드시 파일 상단에 `'use client'` 명시

### 구현 순서
**type → service → hook → UI** 순서를 반드시 따를 것

---

## 4. 폴더 구조

```
src/
├── app/
│   ├── (auth)/              # 인증 불필요 라우트 (로그인 등)
│   └── (main)/              # 인증 필요 라우트 (사이드바 포함)
│       ├── home/
│       ├── lesson/
│       │   └── _components/
│       ├── management/
│       │   └── _components/
│       └── template/
│           ├── _components/
│           └── _types/
├── components/common/       # 재사용 공통 컴포넌트
├── hooks/                   # 커스텀 훅
├── services/                # API 호출 함수 (도메인별)
├── stores/                  # Zustand 스토어
├── styles/                  # 디자인 토큰, 테마
├── types/                   # 전역 타입 정의
└── lib/                     # 유틸리티 (axiosInstance 등)
```

새 파일 위치 결정 기준:
- 특정 페이지에서만 쓰이면 → 해당 페이지의 `_components/`
- 2개 이상 페이지에서 쓰이면 → `components/common/`

---

## 5. 도메인 설계 결정사항

### 템플릿 항목 타입
| 타입 | 설명 | 알림톡 포함 가능 |
|---|---|---|
| 단답형 | 선택지 설정 필요 (예: 출석/지각/결석) | O |
| 장문형 | 자유 텍스트 | X (대시보드 미표시) |
| 점수형 | 숫자 입력 | O |
| 완료형 | 완료/미완료 → 미완료 시 자동 추적 등록 | O |

- 출결은 항상 단답형, 템플릿에 항상 포함 (유일한 보장 데이터)
---

## 6. 페이지별 작업 메모

### 수업 템플릿 생성/수정 (template/)
> AS-IS → TO-BE 리뉴얼 작업 중 (2026-04-30~)

**레이아웃 변경**
- AS-IS: 2컬럼 (폼 좌 / 문자설정·미리보기 우)
- TO-BE: 1컬럼 풀스크린 모달

**섹션 구성 (TO-BE)**
1. 템플릿 이름 — 필수(`*`), 20자 제한, `N/20` 카운터
2. 공통 내용 — 테이블 행 형태, 드래그 순서 변경 가능
3. 개별 내용 — 수업 입력 폼과 동일한 테이블 (학생 행 × 항목 열)
4. 알림톡 포함 항목 — 드래그 핸들 + 공통/개별 뱃지 + 토글

**CTA**
- 하단 고정 버튼: 생성 시 "템플릿 만들기" / 수정 시 "저장"
- 헤더: 뒤로가기 버튼만 (임시저장 없음 — 불필요하다고 판단, 제거)

**모달 3종**
- 이탈 모달: 뒤로가기 시 → "지금 나가면 내용이 사라져요" + [나가기 / 계속 작성]
- 항목 추가 모달 (점수형·장문형·완료형): 항목 이름 + 2×2 타입 선택 그리드
- 항목 추가 모달 (단답형): 위 + 선택지 설정 섹션 (칩 형태 추가/삭제)

### 학부모 대시보드 (parent-dashboard/)
- 모바일 퍼스트 (390px, 4컬럼 그리드, 16px 마진/거터)
- KakaoTalk 알림톡 링크로 접근 (별도 로그인 없음)
- 섹션: 최근 수업 요약 / AI 피드백 / 미완료 항목 / 수업 이력
- 수업 이력: 2줄 row 레이아웃

### 학생 대시보드 (student-dashboard/)
- 5컬럼 좌측 패널 + 7컬럼 우측 탭 패널
- 점수 트렌드: 기간 필터, 반 평균/최고점 토글, 반 선택, AI 인사이트 블록
- 미완료 항목: 체크 시 자동 제거, 항목명 하이퍼링크

---

## 7. 공통 컴포넌트 현황

> 작업 완료 후 계속 업데이트할 것

| 컴포넌트 | 경로 | Props 요약 |
|---|---|---|
| `AddCard` | `components/common/AddCard` | `icon?`, `label`, `description?` + 버튼 HTML 속성 — 항목 추가용 카드 버튼 |
| `Button` | `components/common/Button` | `variant`(primary·secondary·ghost·outlined·danger·endClass·deleteClass), `size`(sm·md·lg), `shape`(square·capsule), `fullWidth`, `leftIcon?`, `rightIcon?` |
| `Chip` | `components/common/Chip` | `variant`(default·active·ended·done·inProgress), `label` — 상태 뱃지 |
| `ConfirmModal` | `components/common/ConfirmModal` | `isOpen`, `onClose`, `onConfirm`, `title`, `descriptions?[]`, `confirmLabel?`, `cancelLabel?`, `confirmVariant?` |
| `Dropdown` | `components/common/Dropdown` | `options[]`(label+value), `value`, `onChange`, `placeholder?`, `menuLabel?`, `noBorder?`, `fullWidth?` |
| `Input` | `components/common/Input` | `variant`(default·gray), `shape`(square·capsule), `hasError?` + input HTML 속성, `forwardRef` |
| `Modal` | `components/common/Modal` | `isOpen`, `onClose`, `size`(sm·md), `children` — 오버레이 기반 범용 모달 |
| `Sidebar` | `components/common/Sidebar` | props 없음 — `(main)` 레이아웃 전용 네비게이션 |
| `Text` | `components/common/Text` | `variant`(타이포 토큰), `color`(색상 토큰), `as`(h1~h6·p·span·label·div), `children` |
| `Textarea` | `components/common/Textarea` | textarea HTML 속성 래퍼 |
| `Toast` / `ToastContainer` | `components/common/Toast` | `variant`, `message` — Zustand 토스트 스토어와 연동 |
| `Toggle` | `components/common/Toggle` | `checked`, `onChange`, `disabled?` — switch 역할 버튼 |

---

*이 파일은 기능 추가/변경 시마다 업데이트합니다.*
*새 페이지 작업 시작 전: `## 6`에 섹션 추가*
*작업 완료 후: `## 7` 컴포넌트 목록 업데이트*