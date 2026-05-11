import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { inputRecipe, inputWrapper, inputSuffix } from './Input.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'gray'
  shape?: 'square' | 'capsule'
  hasError?: boolean
  suffix?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', shape = 'square', hasError = false, suffix, ...props }, ref) => {
    const inputEl = <input ref={ref} className={inputRecipe({ variant, shape, hasError })} {...props} />

    if (!suffix) return inputEl

    return (
      <div className={inputWrapper}>
        {inputEl}
        <span className={inputSuffix}>{suffix}</span>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
