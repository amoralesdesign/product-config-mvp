import { useEffect } from 'react'
import { useCategoryStore } from '../store/useCategoryStore'

export const useCategories = () => {
  const { categories, fetchData } = useCategoryStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const scrollToElement = (categoryId: string) => {
    const element = document.getElementById(categoryId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      })
    }
  }

  return {
    categories,
    scrollToElement
  }
}