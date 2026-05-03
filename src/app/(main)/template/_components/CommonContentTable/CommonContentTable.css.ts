import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'
import { fontStyles } from '@/styles/tokens/typography'

export const tableWrapperStyle = style({
  width: '100%',
  border: `1px solid ${colors.gray100}`,
  overflow: 'hidden',
})

export const tableStyle = style({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
})

export const trStyle = style({
  position: 'relative',
})

export const trDraggingStyle = style({
  opacity: 0.5,
  backgroundColor: colors.primary50,
  zIndex: 9999,
})

export const thStyle = style({
  width: '200px',
  height: '48px',
  backgroundColor: colors.gray50,
  borderBottom: `1px solid ${colors.gray100}`,
  borderRight: `1px solid ${colors.gray100}`,
  selectors: {
    'tr:last-child &': {
      borderBottom: 'none',
    },
  },
})

export const thEditingStyle = style({
  backgroundColor: colors.primary50,
})

export const thContentStyle = style({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '16px',
  paddingRight: '16px',
  height: '100%',
})

export const tdStyle = style({
  height: '48px',
  borderBottom: `1px solid ${colors.gray100}`,
  selectors: {
    'tr:last-child &': {
      borderBottom: 'none',
    },
  },
})

export const dragHandleStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
  cursor: 'grab',
  color: colors.gray300,
  flexShrink: 0,
  width: '16px',
  alignItems: 'center',
  selectors: {
    '&:active': {
      cursor: 'grabbing',
    },
  },
})

export const dragDotRowStyle = style({
  display: 'flex',
  gap: '2px',
})

export const dragDotStyle = style({
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  backgroundColor: 'currentColor',
})

export const rowLabelStyle = style({
  marginLeft: '8px',
  fontSize: fontStyles.titleSm.fontSize,
  fontWeight: fontStyles.titleSm.fontWeight,
  color: colors.gray700,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
  cursor: 'text',
})

export const rowInputStyle = style({
  flex: 1,
  marginLeft: '8px',
  fontSize: fontStyles.titleSm.fontSize,
  fontWeight: fontStyles.titleSm.fontWeight,
  color: colors.gray700,
  letterSpacing: '-0.03em',
  lineHeight: '140%',
  background: 'none',
  border: 'none',
  outline: 'none',
  padding: 0,
  width: '100%',
  selectors: {
    '&::placeholder': {
      color: colors.gray300,
    },
  },
})

export const deleteButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  color: colors.gray300,
  flexShrink: 0,
  marginLeft: 'auto',
  selectors: {
    '&:hover': {
      color: colors.gray500,
    },
  },
})

export const addRowButtonStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  width: '100%',
  padding: '10px 16px',
  backgroundColor: colors.white,
  border: 'none',
  borderTop: `1px solid ${colors.gray100}`,
  cursor: 'pointer',
  fontSize: fontStyles.bodyMd.fontSize,
  fontWeight: fontStyles.bodyMd.fontWeight,
  color: colors.primary500,
  letterSpacing: '-0.03em',
  selectors: {
    '&:hover': {
      backgroundColor: colors.primary50,
    },
  },
})

export const emptyTdStyle = style({
  padding: '24px 16px',
  textAlign: 'center',
  fontSize: fontStyles.bodyMd.fontSize,
  color: colors.gray300,
})
