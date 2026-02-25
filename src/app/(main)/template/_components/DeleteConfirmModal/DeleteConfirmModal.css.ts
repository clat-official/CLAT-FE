import { style } from '@vanilla-extract/css'

export const deleteModalContentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '36px',
  marginTop: '44px',
  textAlign: 'center',
  alignItems: 'center',
})

export const titleStyle = style({
  marginBottom: '12px',
})

export const deleteModalActionsStyle = style({
  display: 'flex',
  gap: '8px',
})