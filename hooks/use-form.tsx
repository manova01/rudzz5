"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { isValidEmail, isValidPhone } from "@/lib/utils"

interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  isEmail?: boolean
  isPhone?: boolean
  custom?: (value: any) => boolean
  message?: string
}

interface FormField {
  value: any
  error: string | null
  touched: boolean
  rules: ValidationRules
}

type FormState<T> = {
  [K in keyof T]: FormField
}

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const createInitialState = () => {
    const state: Partial<FormState<T>> = {}

    for (const key in initialValues) {
      state[key as keyof T] = {
        value: initialValues[key],
        error: null,
        touched: false,
        rules: {},
      }
    }

    return state as FormState<T>
  }

  const [formState, setFormState] = useState<FormState<T>>(createInitialState())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const validateField = useCallback((name: keyof T, value: any, rules: ValidationRules): string | null => {
    if (rules.required && (!value || (typeof value === "string" && value.trim() === ""))) {
      return rules.message || "This field is required"
    }

    if (rules.minLength && typeof value === "string" && value.length < rules.minLength) {
      return rules.message || `Minimum length is ${rules.minLength} characters`
    }

    if (rules.maxLength && typeof value === "string" && value.length > rules.maxLength) {
      return rules.message || `Maximum length is ${rules.maxLength} characters`
    }

    if (rules.pattern && typeof value === "string" && !rules.pattern.test(value)) {
      return rules.message || "Invalid format"
    }

    if (rules.isEmail && typeof value === "string" && !isValidEmail(value)) {
      return rules.message || "Invalid email address"
    }

    if (rules.isPhone && typeof value === "string" && !isValidPhone(value)) {
      return rules.message || "Invalid phone number"
    }

    if (rules.custom && !rules.custom(value)) {
      return rules.message || "Invalid value"
    }

    return null
  }, [])

  const validateForm = useCallback(() => {
    let isFormValid = true
    const newFormState = { ...formState }

    for (const key in formState) {
      const field = formState[key as keyof T]
      const error = validateField(key as keyof T, field.value, field.rules)

      newFormState[key as keyof T] = {
        ...field,
        error,
      }

      if (error) {
        isFormValid = false
      }
    }

    setFormState(newFormState)
    setIsValid(isFormValid)

    return isFormValid
  }, [formState, validateField])

  const setField = useCallback(
    (name: keyof T, value: any) => {
      setFormState((prev) => {
        const field = prev[name]
        const error = validateField(name, value, field.rules)

        return {
          ...prev,
          [name]: {
            ...field,
            value,
            error,
            touched: true,
          },
        }
      })
    },
    [validateField],
  )

  const setFieldRules = useCallback(
    (name: keyof T, rules: ValidationRules) => {
      setFormState((prev) => {
        const field = prev[name]
        const error = validateField(name, field.value, rules)

        return {
          ...prev,
          [name]: {
            ...field,
            rules,
            error: field.touched ? error : field.error,
          },
        }
      })
    },
    [validateField],
  )

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => Promise<void> | void) => {
      return async (e: React.FormEvent) => {
        e.preventDefault()

        const isFormValid = validateForm()

        if (isFormValid) {
          setIsSubmitting(true)

          const values = Object.entries(formState).reduce((acc, [key, field]) => {
            acc[key as keyof T] = field.value
            return acc
          }, {} as T)

          try {
            await onSubmit(values)
          } catch (error) {
            console.error("Form submission error:", error)
          } finally {
            setIsSubmitting(false)
          }
        }
      }
    },
    [formState, validateForm],
  )

  const resetForm = useCallback(() => {
    setFormState(createInitialState())
    setIsValid(false)
    setIsSubmitting(false)
  }, [])

  return {
    formState,
    setField,
    setFieldRules,
    handleSubmit,
    resetForm,
    isSubmitting,
    isValid,
  }
}

