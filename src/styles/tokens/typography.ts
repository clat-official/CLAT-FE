// @deprecated — Phase 1에서 src/app/globals.css의 @theme 블록으로 이관 완료. Phase 2에서 삭제 예정.
export const fontStyles = {
  display:   { fontSize: '28px', fontWeight: '700' },
  headingLg: { fontSize: '24px', fontWeight: '600' },
  headingMd: { fontSize: '20px', fontWeight: '600' },
  headingSm: { fontSize: '18px', fontWeight: '600' },
  titleMd:   { fontSize: '16px', fontWeight: '600' },
  titleSm:   { fontSize: '14px', fontWeight: '600' },
  bodyLg:    { fontSize: '16px', fontWeight: '500' },
  bodyMd:    { fontSize: '14px', fontWeight: '500' },
  labelSm:   { fontSize: '12px', fontWeight: '500' },
} as const

export type FontStylesType = typeof fontStyles
