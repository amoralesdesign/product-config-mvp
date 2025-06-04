import { useMemo, useCallback } from 'react'
import { useCartStore } from '../store/useCartStore'
import { useCategoryStore } from '../store/useCategoryStore'
import { useRuleEngine } from './useRuleEngine'
import { Item } from '../models/item.model'

export interface CartItem {
  category: string
  name: string
  originalPrice: number
  modifiedPrice: number
  item: Item
}

export interface ProcessedCategory {
  id: string
  name: string
  cartItem: CartItem | null
  hasItem: boolean
}

export const useCart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore()
  const { categories } = useCategoryStore()
  const { getItemInfo } = useRuleEngine()

  const processCategory = useCallback((category: { id: string; name: string }): ProcessedCategory => {
    const cartItem = cart.find((item) => item.category === category.id)
    
    if (cartItem) {
      const itemInfo = getItemInfo(cartItem)
      return {
        id: category.id,
        name: category.name,
        cartItem: {
          category: cartItem.category,
          name: cartItem.name,
          originalPrice: itemInfo.originalPrice,
          modifiedPrice: itemInfo.modifiedPrice,
          item: cartItem
        },
        hasItem: true
      }
    }

    return {
      id: category.id,
      name: category.name,
      cartItem: null,
      hasItem: false
    }
  }, [cart, getItemInfo])

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const itemInfo = getItemInfo(item)
      return sum + itemInfo.modifiedPrice
    }, 0)
  }, [cart, getItemInfo])

  const handleRemoveItem = useCallback((categoryId: string) => {
    removeFromCart(categoryId)
  }, [removeFromCart])

  const handleClearCart = useCallback(() => {
    clearCart()
  }, [clearCart])

  const hasItems = cart.length > 0

  return {
    categories,
    processCategory,
    total,
    hasItems,
    handleRemoveItem,
    handleClearCart
  }
}
