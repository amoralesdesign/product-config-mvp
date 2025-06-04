import { create } from 'zustand'
import { Item } from '../models/item.model'

interface CartStore {
  cart: Item[]
  addToCart: (item: Item) => void
  removeFromCart: (categoryId: string) => void
  clearCart: () => void
  isSelected: (item: Item) => boolean
}

const getInitialCart = (): Item[] => {
  const stored = localStorage.getItem('cart')
  return stored ? JSON.parse(stored) : []
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: getInitialCart(),
  addToCart: (item) => {
    const cart = get().cart;
    const filtered = cart.filter((i) => i.category !== item.category)
    const newCart = [...filtered, item]
    set({ cart: newCart })
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  removeFromCart: (categoryId) => {
    const cart = get().cart.filter((i) => i.category !== categoryId)
    set({ cart })
    localStorage.setItem('cart', JSON.stringify(cart))
  },
  clearCart: () => {
    set({ cart: [] })
    localStorage.removeItem('cart')
  },
  isSelected: (item) => {
    return get().cart.some((i) => i.id === item.id)
  },
}))