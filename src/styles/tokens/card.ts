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
