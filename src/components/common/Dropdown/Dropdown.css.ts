import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

const itemTypography = {
  fontSize: fontStyles.titleSm.fontSize,
  fontWeight: fontStyles.titleSm.fontWeight,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
} as const

export const containerStyle = style({
  position: 'relative',
  display: 'inline-block',
})

export const triggerStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray200}`,
  borderRadius: '8px',
  padding: '8px 16px',
  cursor: 'pointer',
  color: colors.gray700,
  transition: 'border-color 0.2s, color 0.2s',
  ...itemTypography,
  selectors: {
    '&:hover': {
      backgroundColor: colors.primary50,
    },
  },
})

export const triggerActiveStyle = style({
  color: colors.primary500,
})

export const menuStyle = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  backgroundColor: colors.white,
  border: `1px solid ${colors.gray200}`,
  borderRadius: '8px',
  zIndex: 100,
  minWidth: '100%',
  overflow: 'hidden',
  padding: '8px 0',
})

export const menuLabelStyle = style({
  padding: '8px 16px',
  color: colors.gray300,
  ...itemTypography,
})

export const optionStyle = style({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  cursor: 'pointer',
  color: colors.gray700,
  transition: 'background-color 0.15s',
  ...itemTypography,
  selectors: {
    '&:hover': {
      backgroundColor: colors.gray50,
    },
  },
})

export const optionSelectedStyle = style({
  color: colors.primary500,
})

export const chevronStyle = style({
  transition: 'transform 0.2s ease',
  flexShrink: 0,
})

export const chevronOpenStyle = style({
  transform: 'rotate(180deg)',
})
