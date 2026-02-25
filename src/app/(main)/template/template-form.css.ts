import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'

export const pageStyle = style({
  display: 'flex',
  gap: '20px',
})

export const leftSectionStyle = style({
  flex: 5,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

export const rightSectionStyle = style({
  flex: 7,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
})

export const sectionBoxStyle = style({
  backgroundColor: colors.gray50,
  borderRadius: '16px',
  padding: '32px',
})