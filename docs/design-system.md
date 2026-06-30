# CLAT Design System

> 마지막 업데이트: 2026-06-30  
> 토큰 정의 위치: `src/app/globals.css`

---

## 개요

CLAT 디자인 시스템의 원칙:

- **Brand-first** — 주요 액션 색상은 `primary-400` (`#5774DA`)입니다. gray는 보조 UI에만 씁니다.
- **Semantic over Primitive** — 컴포넌트는 항상 semantic 토큰(`bg-hover`, `fg-secondary`, `border-default` 등)을 사용합니다. primitive 색상(`gray-*`, `primary-*`)을 직접 참조하지 않습니다.
- **Tailwind-native** — 모든 토큰은 `@theme`에 정의되어 Tailwind 유틸리티 클래스로 사용 가능합니다 (`bg-bg-hover`, `text-fg-default`, `border-border-default` 등).
- **Pretendard 단일 서체** — 12px caption부터 28px display까지 9단계 스케일. `@utility text-*` 클래스로 복합 적용.

---

## 1. Color — Primitives

### Primary (Brand)

| Token | Class | Value |
|-------|-------|-------|
| `--color-primary-50` | `bg-primary-50` | `#F1F4FD` |
| `--color-primary-100` | `bg-primary-100` | `#E0E7F9` |
| `--color-primary-200` | `bg-primary-200` | `#C8D5F5` |
| `--color-primary-300` | `bg-primary-300` | `#A3BAED` |
| `--color-primary-400` | `bg-primary-400` | `#5774DA` ← 브랜드 메인 |
| `--color-primary-500` | `bg-primary-500` | `#3B51CC` |
| `--color-primary-600` | `bg-primary-600` | `#3946BC` |
| `--color-primary-700` | `bg-primary-700` | `#333A9A` |
| `--color-primary-800` | `bg-primary-800` | `#2E367A` |

### Gray (Purple-tinted)

| Token | Class | Value |
|-------|-------|-------|
| `--color-gray-50` | `bg-gray-50` | `#F3F4F5` |
| `--color-gray-100` | `bg-gray-100` | `#D7D7E3` |
| `--color-gray-200` | `bg-gray-200` | `#C5C6D3` |
| `--color-gray-300` | `bg-gray-300` | `#A9AABF` |
| `--color-gray-400` | `bg-gray-400` | `#999BB3` |
| `--color-gray-500` | `bg-gray-500` | `#9492A9` |
| `--color-gray-600` | `bg-gray-600` | `#757693` |
| `--color-gray-700` | `bg-gray-700` | `#5B5C72` |
| `--color-gray-800` | `bg-gray-800` | `#474859` |
| `--color-gray-900` | `bg-gray-900` | `#363744` |

### Status

| Token | Value |
|-------|-------|
| `--color-success-50` | `#EDFCF5` |
| `--color-success-200` | `#ABEFD2` |
| `--color-success-500` | `#1DAA7F` |
| `--color-warning-50` | `#FFF9EB` |
| `--color-warning-200` | `#FFEEC6` |
| `--color-warning-500` | `#FDAD22` |
| `--color-error-50` | `#FFF1F1` |
| `--color-error-200` | `#FDCED0` |
| `--color-error-500` | `#EF4453` |
| `--color-error-600` | `#DC223B` ← danger hover |
| `--color-error-700` | `#B91730` ← danger active |

---

## 2. Color — Semantic

컴포넌트는 아래 semantic 토큰만 사용합니다. primitive를 직접 쓰지 않습니다.

### Background

| Token | Class | Value | 사용처 |
|-------|-------|-------|--------|
| `--color-bg-page` | `bg-bg-page` | `#FAFAFA` | 전체 페이지 배경 |
| `--color-bg-default` | `bg-bg-default` | `#FFFFFF` | 카드, 컴포넌트 표면 |
| `--color-bg-subtle` | `bg-bg-subtle` | `#F3F4F5` | 보조 섹션 배경 |
| `--color-bg-hover` | `bg-bg-hover` | `#E5E6EC` | hover 상태 배경 |
| `--color-bg-selected` | `bg-bg-selected` | `#E0E7F9` | selected 상태 배경 |
| `--color-bg-disabled` | `bg-bg-disabled` | `#D7D7E3` | disabled 상태 배경 |
| `--color-bg-brand` | `bg-bg-brand` | `#F1F4FD` | brand 강조 배경 |
| `--color-bg-brand-hover` | `bg-bg-brand-hover` | `#E0E7F9` | brand 버튼 hover |
| `--color-bg-positive` | `bg-bg-positive` | `#EDFCF5` | success 배경 |
| `--color-bg-warning` | `bg-bg-warning` | `#FFF9EB` | warning 배경 |
| `--color-bg-danger` | `bg-bg-danger` | `#FFF1F1` | danger/error 배경 |

### Foreground (Text & Icon)

| Token | Class | Value | 사용처 |
|-------|-------|-------|--------|
| `--color-fg-default` | `text-fg-default` | `#363744` | 기본 본문 텍스트 |
| `--color-fg-secondary` | `text-fg-secondary` | `#5B5C72` | 보조 텍스트 |
| `--color-fg-tertiary` | `text-fg-tertiary` | `#757693` | 3차 텍스트, placeholder |
| `--color-fg-disabled` | `text-fg-disabled` | `#9492A9` | disabled 텍스트 |
| `--color-fg-on-color` | `text-fg-on-color` | `#FFFFFF` | 채운 버튼 위 텍스트 |
| `--color-fg-brand` | `text-fg-brand` | `#3B51CC` | 브랜드 강조 텍스트, 링크 |
| `--color-fg-positive` | `text-fg-positive` | `#1DAA7F` | success 텍스트 |
| `--color-fg-warning` | `text-fg-warning` | `#FDAD22` | warning 텍스트 |
| `--color-fg-danger` | `text-fg-danger` | `#EF4453` | error/danger 텍스트 |

### Border

| Token | Class | Value | 사용처 |
|-------|-------|-------|--------|
| `--color-border-default` | `border-border-default` | `#E5E6EC` | 카드, 인풋 기본 보더 |
| `--color-border-subtle` | `border-border-subtle` | `#F3F4F5` | 구분선, 약한 경계 |
| `--color-border-strong` | `border-border-strong` | `#D7D7E3` | 강조 보더 |
| `--color-border-brand` | `border-border-brand` | `#5774DA` | 포커스, brand 강조 보더 |
| `--color-border-danger` | `border-border-danger` | `#EF4453` | error 상태 보더 |

---

## 3. Typography

모든 타이포그래피는 `@utility` 복합 클래스로 정의되어 있습니다. 폰트 사이즈·굵기·행간·자간이 하나의 클래스로 적용됩니다.

| Class | Size | Weight | Line Height | Letter Spacing | 사용처 |
|-------|------|--------|-------------|----------------|--------|
| `text-display` | 28px | 700 | 1.35 | -0.03em | 페이지 최상단 타이틀 |
| `text-heading-lg` | 24px | 600 | 1.33 | -0.03em | 섹션 헤딩 (대) |
| `text-heading-md` | 20px | 600 | 1.4 | -0.03em | 섹션 헤딩 (중) |
| `text-heading-sm` | 18px | 600 | 1.44 | -0.03em | 섹션 헤딩 (소) |
| `text-title-md` | 16px | 600 | 1.5 | -0.03em | 카드 제목, 중간 강조 |
| `text-title-sm` | 14px | 600 | 1.43 | -0.03em | 레이블, 버튼 텍스트 |
| `text-body-lg` | 16px | 500 | 1.5 | -0.03em | 본문 (대) |
| `text-body-md` | 14px | 500 | 1.43 | -0.03em | **기본 본문** ← 기본값 |
| `text-label-sm` | 12px | 500 | 1.5 | -0.03em | 캡션, 보조 설명 |

**원칙**
- 기본 본문: `text-body-md`
- UI 레이블·버튼: `text-title-sm` 또는 `text-body-md`
- 공간 제한 영역: `text-label-sm`

---

## 4. Spacing

`--spacing-*` 토큰은 Tailwind의 spacing 스케일로 등록됩니다.  
`p-100`, `gap-200`, `mx-400` 등 모든 spacing 유틸리티에서 사용 가능합니다.

| Token | Class (예시) | Value |
|-------|-------------|-------|
| `--spacing-100` | `p-100`, `gap-100` | 4px |
| `--spacing-200` | `p-200`, `gap-200` | 8px |
| `--spacing-300` | `p-300`, `gap-300` | 12px |
| `--spacing-400` | `p-400`, `gap-400` | 16px |
| `--spacing-600` | `p-600`, `gap-600` | 20px |
| `--spacing-700` | `p-700`, `gap-700` | 24px |
| `--spacing-800` | `p-800`, `gap-800` | 28px |
| `--spacing-900` | `p-900`, `gap-900` | 36px |

---

## 5. Border Radius

| Token | Class | Value |
|-------|-------|-------|
| `--radius-100` | `rounded-100` | 4px |
| `--radius-200` | `rounded-200` | 8px |
| `--radius-300` | `rounded-300` | 12px |
| `--radius-400` | `rounded-400` | 16px ← 카드 기본 |
| `--radius-full` | `rounded-full` | 9999px |

---

## 6. Shadows

| Token | Class | Value | 사용처 |
|-------|-------|-------|--------|
| `--shadow-01` | `shadow-01` | `0 0 8px rgba(0,0,0,0.08)` | 카드, 패널 |
| `--shadow-dropdown` | `shadow-dropdown` | `0 0 12px rgba(0,0,0,0.08)` | 드롭다운, 팝오버 |

---

## 7. Z-Index

| Token | Class | Value | Layer |
|-------|-------|-------|-------|
| `--z-bar` | `z-bar` | 100 | GNB / 상단 바 |
| `--z-tooltip` | `z-tooltip` | 150 | 툴팁 |
| `--z-dropdown` | `z-dropdown` | 150 | 드롭다운, 셀렉트 |
| `--z-modal` | `z-modal` | 300 | 모달, 다이얼로그 |
| `--z-sidebar` | `z-sidebar` | 300 | 사이드바 |
| `--z-toast` | `z-toast` | 500 | 토스트 알림 |

---

## 8. Compatibility Tokens (Stage 3에서 class명 교체 예정)

아래 토큰은 색상 값 자체는 유효하지만, class명을 semantic 토큰으로 교체하는 마이그레이션이 남아있습니다.  
신규 코드에서는 대체 토큰을 사용합니다.

| 기존 class | 대체 class | 비고 |
|-----------|-----------|------|
| `bg-background` | `bg-bg-page` | layout, auth 페이지 배경 |
| `bg-gray-75` | `bg-bg-hover` | hover 상태 배경 |
| `border-gray-75` | `border-border-default` | 카드, 인풋 기본 보더 |

---

## 9. 사용 예시

```tsx
/* ❌ 이전 방식 (primitive 직접 참조) */
<div className="bg-white border border-gray-75 text-gray-700 rounded-2xl p-6">

/* ✅ 새 방식 (semantic 토큰 사용) */
<div className="bg-bg-default border border-border-default text-fg-secondary rounded-400 p-700">
```

```tsx
/* ❌ 이전 방식 (임의 폰트 클래스 조합) */
<p className="text-sm font-medium tracking-[-0.03em] leading-[140%]">

/* ✅ 새 방식 (typography utility 클래스) */
<p className="text-body-md">
```
