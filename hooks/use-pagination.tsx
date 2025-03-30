"use client"

import { useState, useCallback } from "react"

interface PaginationOptions {
  initialPage?: number
  initialPageSize?: number
  totalItems?: number
}

export function usePagination({ initialPage = 1, initialPageSize = 10, totalItems = 0 }: PaginationOptions = {}) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [total, setTotal] = useState(totalItems)

  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }, [totalPages])

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToPage = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages))
      setCurrentPage(pageNumber)
    },
    [totalPages],
  )

  const changePageSize = useCallback((size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to first page when changing page size
  }, [])

  const updateTotal = useCallback(
    (count: number) => {
      setTotal(count)
      // Adjust current page if it's now out of bounds
      if (currentPage > Math.ceil(count / pageSize)) {
        setCurrentPage(Math.max(1, Math.ceil(count / pageSize)))
      }
    },
    [currentPage, pageSize],
  )

  // Calculate pagination metadata
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize - 1, total - 1)

  // Generate page numbers for pagination UI
  const getPageNumbers = useCallback(() => {
    const maxPageButtons = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
    let endPage = startPage + maxPageButtons - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPageButtons + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [currentPage, totalPages])

  return {
    currentPage,
    pageSize,
    totalItems: total,
    totalPages,
    startIndex,
    endIndex,
    nextPage,
    prevPage,
    goToPage,
    changePageSize,
    updateTotal,
    getPageNumbers,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }
}

