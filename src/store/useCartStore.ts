import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Item } from '../models/item.model'

interface CartStore {
  cart: Item[]
  addToCart: (item: Item) => void
  removeFromCart: (categoryId: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const cart = get().cart;
        const filtered = cart.filter((i) => i.category !== item.category)
        const newCart = [...filtered, item]
        set({ cart: newCart })
      },
      removeFromCart: (categoryId) => {
        const cart = get().cart.filter((i) => i.category !== categoryId)
        set({ cart })
      },
      clearCart: () => {
        set({ cart: [] })
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)