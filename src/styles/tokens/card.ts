// @deprecated — Phase 1에서 src/app/globals.css의 @theme 블록으로 이관 완료. Phase 2에서 삭제 예정.
import type { StyleRule } from '@vanilla-extract/css'
import { colors } from './colors'

export const baseCardStyleRule: StyleRule = {
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray75}`,
  borderRadius: '16px',
  padding: '24px',
  minHeight: '160px',
  cursor: 'pointer',
}

export const interactiveCardStyleRule: StyleRule = {
  ...baseCardStyleRule,
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': { backgroundColor: colors.primary50 },
  },
}
