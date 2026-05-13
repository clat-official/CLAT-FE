import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const checkIconStyle = style({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: colors.primary100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
})

export const titleStyle = style({
  marginBottom: '40px',
})

export const statCardGroupStyle = style({
  display: 'flex',
  gap: '8px',
  marginBottom: '40px',
})

export const statCardStyle = style({
  flex: 1,
  borderRadius: '12px',
  backgroundColor: colors.gray50,
  padding: '16px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
})

export const statNumberStyle = style({
  fontSize: '28px',
  fontWeight: '600',
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})

export const statNumberPrimaryStyle = style([statNumberStyle, { color: colors.primary500 }])
export const statNumberGrayStyle = style([statNumberStyle, { color: colors.gray700 }])

export const confirmButtonStyle = style({
  width: '100%',
  height: '54px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: colors.primary500,
  color: colors.white,
  fontSize: fontStyles.titleMd.fontSize,
  fontWeight: fontStyles.titleMd.fontWeight,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
})
