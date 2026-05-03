import { style } from '@vanilla-extract/css'
import { colors } from '@/styles/tokens/colors'

export const layoutWrapperStyle = style({
  display: 'flex',
})

export const mainContentStyle = style({
  marginLeft: '240px',
  flex: 1,
  minWidth: 0,
  minHeight: '100vh',
  padding: '48px',
  backgroundColor: colors.background,
})
