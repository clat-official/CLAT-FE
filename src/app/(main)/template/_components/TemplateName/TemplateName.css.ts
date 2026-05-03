import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const sectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
})

export const requiredMarkStyle = style({
  color: vars.color.semantic.error[500],
})

export const counterStyle = style({
  alignSelf: 'flex-end',
  color: vars.color.gray[500],
})