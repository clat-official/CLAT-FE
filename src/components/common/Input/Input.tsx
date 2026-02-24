import { InputHTMLAttributes } from 'react'
import { inputStyle } from './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`${inputStyle}${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
}