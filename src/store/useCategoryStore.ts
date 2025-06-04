import { create } from 'zustand'
import { Category } from '../models/category.model'
import { getCategories } from '../services'

interface CategoryStore {
  categories: Category[]
  loading: boolean
  error: string | null
  fetchData: () => Promise<void>
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true, error: null })
    try {
      const data = await getCategories();
      set({ categories: data, loading: false })
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err)
      set({ error: errorMsg, loading: false })
    }
  },
}))