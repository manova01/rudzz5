"use client"

import { useState, useCallback } from "react"
import { ApiError } from "@/lib/api-client"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const request = useCallback(
    async <R = T>(
      apiCall: () => Promise<R>,
      options?: {
        onSuccess?: (data: R) => void
        onError?: (error: Error) => void
      },
    ): Promise<R | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const data = await apiCall()

        setState((prev) => ({ ...prev, data: data as unknown as T, loading: false }))

        if (options?.onSuccess) {
          options.onSuccess(data)
        }

        return data
      } catch (err) {
        const errorMessage =
          err instanceof ApiError ? err.message : err instanceof Error ? err.message : "An unknown error occurred"

        setState((prev) => ({ ...prev, loading: false, error: errorMessage }))

        if (options?.onError && err instanceof Error) {
          options.onError(err)
        }

        return null
      }
    },
    [],
  )

  return {
    ...state,
    request,
  }
}

