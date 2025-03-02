"use client"

import { useEffect, useState } from "react"

export function useInfiniteScroll<T>({
  data,
  initialItemsToShow = 5,
  incrementBy = 3,
  threshold = 300
}: {
  data: T[]
  initialItemsToShow?: number
  incrementBy?: number
  threshold?: number
}) {
  const [visibleData, setVisibleData] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize with initial items
  useEffect(() => {
    setVisibleData(data.slice(0, initialItemsToShow))
    setHasMore(data.length > initialItemsToShow)
  }, [data, initialItemsToShow])

  // Load more items function
  const loadMore = () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      const currentLength = visibleData.length
      const newItems = data.slice(currentLength, currentLength + incrementBy)
      
      if (newItems.length > 0) {
        // Add a unique identifier to each item before adding to prevent duplicate keys
        const uniqueItems = newItems.map((item: any) => ({
          ...item,
          // Use a combination of ID and timestamp to ensure uniqueness
          uniqueId: `${(item as any).id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        }))
        setVisibleData(prev => [...prev, ...uniqueItems])
        setHasMore(currentLength + newItems.length < data.length)
      } else {
        setHasMore(false)
      }
      
      setIsLoading(false)
    }, 800)
  }

  // Set up scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + threshold >= 
          document.documentElement.offsetHeight) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [visibleData, isLoading, hasMore])

  return { visibleData, isLoading, hasMore, loadMore }
}
