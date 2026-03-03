import { forwardRef, InputHTMLAttributes } from 'react'
import { inputRecipe } from './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'gray'
  shape?: 'square' | 'capsule'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', shape = 'square', ...props }, ref) => {
    return <input ref={ref} className={inputRecipe({ variant, shape })} {...props} />
  }
)

Input.displayName = 'Input'

export default Input
