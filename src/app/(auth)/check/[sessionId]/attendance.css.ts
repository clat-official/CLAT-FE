import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { colors } from '@/styles/tokens/colors'

export const pageStyle = style({
  minHeight: '100dvh',
  maxWidth: '440px',
  margin: '0 auto',
  backgroundColor: colors.background,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 24px',
  position: 'relative',
})

export const classBadgeStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: '4px',
  backgroundColor: colors.primary100,
  color: colors.primary400,
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '-0.03em',
  lineHeight: '140%',
  position: 'absolute',
  top: '177px',
  left: '50%',
  transform: 'translateX(-50%)',
})

export const centerContentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '276px',
  position: 'absolute',
  top: '221px',
})

export const titleStyle = style({
  textAlign: 'center',
  marginBottom: '22px',
})

export const subtitleStyle = style({
  textAlign: 'center',
  marginBottom: '28px',
  whiteSpace: 'pre-line',
})

export const timerStyle = style({
  textAlign: 'center',
  marginBottom: '28px',
  width: '100%',
})

export const timerLabelStyle = style({
  color: colors.gray500,
})

export const timerValueStyle = style({
  color: colors.primary500,
  fontWeight: 600,
})

export const codeInputGroupStyle = style({
  display: 'flex',
  gap: '8px',
  width: '100%',
  justifyContent: 'center',
})

export const codeBoxRecipe = recipe({
  base: {
    width: '63px',
    height: '81px',
    borderRadius: '12px',
    backgroundColor: colors.background,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '-0.03em',
    lineHeight: '140%',
    transition: 'border-color 0.15s',
    position: 'relative',
  },
  variants: {
    state: {
      empty: { border: `1px solid ${colors.gray100}` },
      focused: { border: `1.5px solid ${colors.primary500}` },
      filled: { border: `1.5px solid ${colors.primary500}`, color: colors.gray900 },
      error: { border: `1.5px solid ${colors.error500}`, color: colors.error500 },
    },
  },
  defaultVariants: { state: 'empty' },
})

export const codeBoxInputStyle = style({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  cursor: 'text',
  width: '100%',
  height: '100%',
  border: 'none',
  background: 'transparent',
})

export const errorTextStyle = style({
  marginTop: '16px',
  textAlign: 'center',
})

export const confirmButtonWrapperStyle = style({
  position: 'fixed',
  bottom: '32px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'calc(100% - 48px)',
  maxWidth: 'calc(440px - 48px)',
})

// 출결 확인/마감/에러 화면

export const resultPageStyle = style({
  minHeight: '100dvh',
  maxWidth: '440px',
  margin: '0 auto',
  backgroundColor: colors.background,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
})

export const resultCenterStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '30px',
  position: 'absolute',
  top: '177px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '186px',
  whiteSpace: 'pre-line',
  textAlign: 'center',
})

export const resultIconStyle = style({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: colors.primary100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const resultInfoCardStyle = style({
  position: 'absolute',
  top: '439px',
  left: '55px',
  right: '55px',
  borderRadius: '24px',
  backgroundColor: colors.gray50,
  padding: '24px',
})

export const resultInfoRowStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  selectors: {
    '& + &': {
      marginTop: '12px',
    },
  },
})

export const resultInfoValueStyle = style({
  fontSize: '12px',
  fontWeight: 600,
  color: colors.gray900,
  letterSpacing: '-0.03em',
})

export const resultInfoStatusStyle = style({
  fontSize: '12px',
  fontWeight: 600,
  color: colors.primary500,
  letterSpacing: '-0.03em',
})
