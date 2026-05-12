import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const barStyle = style({
  position: 'fixed',
  bottom: '48px',
  left: '288px',
  right: '48px',
  zIndex: 200,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px 32px',
  backgroundColor: colors.primary400,
  borderRadius: '20px',
  boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.25)',
  '@media': {
    'screen and (max-width: 1279px)': {
      padding: '20px 24px',
      gap: '16px',
    },
    'screen and (max-width: 1023px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '14px',
      padding: '20px 24px',
    },
  },
})

export const leftSectionStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '60px',
  '@media': {
    'screen and (max-width: 1279px)': { gap: '32px' },
    'screen and (max-width: 1023px)': { gap: '20px' },
  },
})

export const titleGroupStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '@media': {
    'screen and (max-width: 1279px)': { gap: '8px' },
  },
})

export const statGroupStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
  '@media': {
    'screen and (max-width: 1279px)': { gap: '24px' },
  },
})

export const statItemWrapperStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '40px',
  '@media': {
    'screen and (max-width: 1279px)': { gap: '24px' },
  },
})

export const statItemStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2px',
  minWidth: '30px',
})

export const statNumberStyle = style({
  fontSize: '28px',
  fontWeight: '600',
  letterSpacing: '-0.03em',
  lineHeight: '140%',
  color: colors.white,
  textAlign: 'center',
  '@media': {
    'screen and (max-width: 1279px)': { fontSize: '22px' },
    'screen and (max-width: 1023px)': { fontSize: '20px' },
  },
})

export const statDividerStyle = style({
  width: '0px',
  height: '44px',
  borderLeft: `1px solid ${colors.primary300}`,
  '@media': {
    'screen and (max-width: 1279px)': { height: '36px' },
  },
})

export const rightSectionStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '28px',
  '@media': {
    'screen and (max-width: 1279px)': { gap: '16px' },
    'screen and (max-width: 1023px)': { justifyContent: 'space-between' },
  },
})

export const buttonGroupStyle = style({
  display: 'flex',
  gap: '8px',
})

export const detailButtonStyle = style({
  padding: '8px 12px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: colors.primary200,
  color: colors.primary800,
  fontSize: fontStyles.titleSm.fontSize,
  fontWeight: fontStyles.titleSm.fontWeight,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})

export const endButtonStyle = style({
  padding: '8px 12px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: colors.primary500,
  color: colors.white,
  fontSize: fontStyles.titleSm.fontSize,
  fontWeight: fontStyles.titleSm.fontWeight,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})
