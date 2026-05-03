import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const tableStyle = style({
  width: '100%',
  borderCollapse: 'collapse',
  border: `1px solid ${colors.gray100}`,
  overflow: 'hidden',
})

const baseThStyles = {
  height: '40px',
  paddingLeft: '16px',
  backgroundColor: colors.gray50,
  color: colors.gray700,
  fontSize: fontStyles.titleSm.fontSize,
  fontWeight: fontStyles.titleSm.fontWeight,
  letterSpacing: '-0.03em',
  textAlign: 'left' as const,
  borderBottom: `1px solid ${colors.gray100}`,
  borderRight: `1px solid ${colors.gray100}`,
  whiteSpace: 'nowrap' as const,
}

const baseTdStyles = {
  height: '40px',
  paddingLeft: '16px',
  paddingRight: '16px',
  backgroundColor: colors.white,
  borderBottom: `1px solid ${colors.gray100}`,
  borderRight: `1px solid ${colors.gray100}`,
  selectors: {
    'tr:last-child &': { borderBottom: 'none' as const },
  },
}

export const thStudentStyle = style({
  ...baseThStyles,
  paddingRight: '36px',
  width: '1%',
})

export const thAttendanceStyle = style({
  ...baseThStyles,
  paddingRight: '36px',
  width: '1%',
})

export const thColumnStyle = style({
  ...baseThStyles,
  paddingRight: '16px',
  width: '1%',
  selectors: {
    '&:hover': { backgroundColor: colors.primary50 },
  },
})

export const thAddStyle = style({
  ...baseThStyles,
  paddingRight: '24px',
  borderRight: 'none',
  selectors: {
    '&:hover': { backgroundColor: colors.primary50 },
  },
})

export const tdStudentStyle = style({
  ...baseTdStyles,
  paddingRight: '36px',
  width: '1%',
})

export const tdAttendanceStyle = style({
  ...baseTdStyles,
  paddingRight: '16px',
  width: '1%',
})

export const tdColumnStyle = style({
  ...baseTdStyles,
  width: '1%',
})

export const tdAddStyle = style({
  ...baseTdStyles,
  borderRight: 'none',
})

export const colHeaderInnerStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: colors.gray300,
  flex: 1,
})

export const colHeaderWrapperStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',        
})

export const colNameStyle = style({
  fontSize: fontStyles.titleSm.fontSize,
  fontWeight: fontStyles.titleSm.fontWeight,
  color: colors.gray700,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
})

export const requiredMarkStyle = style({
  color: colors.error500,
})

export const deleteButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  color: colors.gray300,
  marginLeft: 'auto',
  selectors: {
    '&:hover': { color: colors.gray500 },
  },
})

export const addColumnButtonStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  color: colors.primary500,
  fontSize: fontStyles.titleSm.fontSize,
  fontWeight: fontStyles.titleSm.fontWeight,
  letterSpacing: '-0.03em',
  whiteSpace: 'nowrap' as const,
})

export const nameCellStyle = style({
  fontSize: fontStyles.bodyMd.fontSize,
  fontWeight: fontStyles.bodyMd.fontWeight,
  color: colors.gray700,
  letterSpacing: '-0.03em',
  whiteSpace: 'nowrap' as const,
})

export const cellButtonGroupStyle = style({
  display: 'flex',
  gap: '4px',
})

export const cellButtonRecipe = recipe({
  base: {
    height: '24px',
    width: '44px',
    borderRadius: '6px',
    fontSize: fontStyles.labelSm.fontSize,
    fontWeight: fontStyles.labelSm.fontWeight,
    letterSpacing: '-0.03em',
    lineHeight: '140%',
    border: 'none',
    backgroundColor: colors.gray50,
    color: colors.gray300,
    cursor: 'default',
  },
  variants: {},
})

export const dragOverlayWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  overflow: 'hidden',
})

export const dragOverlayThStyle = style({
  height: '40px',
  paddingLeft: '16px',
  paddingRight: '16px',
  backgroundColor: colors.gray50,
  borderBottom: `1px solid ${colors.gray100}`,
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap' as const,
})

export const dragOverlayTdStyle = style({
  height: '40px',
  paddingLeft: '16px',
  paddingRight: '16px',
  backgroundColor: colors.white,
  borderBottom: `1px solid ${colors.gray100}`,
  display: 'flex',
  alignItems: 'center',
})
