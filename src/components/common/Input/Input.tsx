import { InputHTMLAttributes } from 'react'
import { inputRecipe } from './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'gray'
  shape?: 'square' | 'capsule'
}

export default function Input({ variant = 'default', shape = 'square', ...props }: InputProps) {
  return <input className={inputRecipe({ variant, shape })} {...props} />
}
