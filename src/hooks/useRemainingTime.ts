import { useState, useEffect } from 'react'

export default function useRemainingTime(expiresAt: string): string {
  const [remaining, setRemaining] = useState('')

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, new Date(expiresAt).getTime() - Date.now())
      const m = Math.floor(diff / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setRemaining(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [expiresAt])

  return remaining
}
