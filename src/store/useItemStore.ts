import { create } from 'zustand'
import { Item } from '../models/item.model'
import { getItems } from '../services'

interface ItemStore {
  items: Item[]
  loading: boolean
  error: string | null
  fetchData: (categoryId?: string) => Promise<void>
}

export const useItemStore = create<ItemStore>((set) => ({
  items: [],
  loading: false,
  error: null,
  fetchData: async (categoryId?: string) => {
    set({ loading: true, error: null })
    try {
      const data = await getItems(categoryId)
      set({ items: data, loading: false })
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      set({ error: errorMsg, loading: false })
    }
  },
}))