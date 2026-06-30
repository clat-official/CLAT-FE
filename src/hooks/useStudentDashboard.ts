'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { studentService, type ScoreHistoryPeriod } from '@/services/student'
import type {
  StudentDetail,
  ScoreDataPoint,
  LessonHistoryRecord,
  AlimtalkRecord,
  AiAnalysis,
} from '@/types/student'

export function useStudentDetail(id: number) {
  const [detail, setDetail] = useState<StudentDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const cancelledRef = useRef(false)

  useEffect(() => {
    if (!id) return
    cancelledRef.current = false
    setIsLoading(true)
    setError(null)

    studentService
      .getStudent(id)
      .then((data) => { if (!cancelledRef.current) setDetail(data) })
      .catch((err: unknown) => { if (!cancelledRef.current) setError(err instanceof Error ? err : new Error('Failed')) })
      .finally(() => { if (!cancelledRef.current) setIsLoading(false) })

    return () => { cancelledRef.current = true }
  }, [id])

  const refetch = useCallback(() => {
    if (!id) return
    studentService
      .getStudent(id)
      .then((data) => setDetail(data))
      .catch(() => {})
  }, [id])

  return { detail, isLoading, error, refetch }
}

export function useScoreHistory(id: number, period: ScoreHistoryPeriod = 'recent5') {
  const [data, setData] = useState<ScoreDataPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setIsLoading(true)
    setError(null)

    studentService
      .getScoreHistory(id, period)
      .then((res) => { if (!cancelled) setData(res) })
      .catch((err: unknown) => { if (!cancelled) setError(err instanceof Error ? err : new Error('Failed')) })
      .finally(() => { if (!cancelled) setIsLoading(false) })

    return () => { cancelled = true }
  }, [id, period])

  return { data, isLoading, error }
}

export function useLessonHistory(id: number) {
  const [data, setData] = useState<LessonHistoryRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setIsLoading(true)
    setError(null)

    studentService
      .getLessonHistory(id)
      .then((res) => { if (!cancelled) setData(res) })
      .catch((err: unknown) => { if (!cancelled) setError(err instanceof Error ? err : new Error('Failed')) })
      .finally(() => { if (!cancelled) setIsLoading(false) })

    return () => { cancelled = true }
  }, [id])

  return { data, isLoading, error }
}

export function useAlimtalkHistory(id: number) {
  const [data, setData] = useState<AlimtalkRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setIsLoading(true)
    setError(null)

    studentService
      .getAlimtalkHistory(id)
      .then((res) => { if (!cancelled) setData(res) })
      .catch((err: unknown) => { if (!cancelled) setError(err instanceof Error ? err : new Error('Failed')) })
      .finally(() => { if (!cancelled) setIsLoading(false) })

    return () => { cancelled = true }
  }, [id])

  return { data, isLoading, error }
}

export function useAiAnalysis(id: number) {
  const [analysis, setAnalysis] = useState<AiAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const run = useCallback(() => {
    if (!id) return
    setIsLoading(true)
    setError(null)

    studentService
      .postAiAnalysis(id)
      .then((res) => setAnalysis(res))
      .catch((err: unknown) => setError(err instanceof Error ? err : new Error('Failed')))
      .finally(() => setIsLoading(false))
  }, [id])

  useEffect(() => { run() }, [run])

  return { analysis, isLoading, error, refresh: run }
}
