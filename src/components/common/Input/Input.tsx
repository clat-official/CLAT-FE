import { InputHTMLAttributes } from 'react'
import { inputRecipe } from './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'gray'
}

export default function Input({ variant = 'default', ...props }: InputProps) {
  return <input className={inputRecipe({ variant })} {...props} />
}