import { useCallback } from 'react'
import { useCartStore } from '../store/useCartStore'
import { useRuleEngine } from './useRuleEngine'
import { Item } from '../models/item.model'

export const useItemSelector = (categoryId: string) => {
  const { cart, addToCart } = useCartStore()
  const { getItemInfo } = useRuleEngine()
  
  const selectedItem = cart.find((item) => item.category === categoryId);
  
  const handleItemClick = useCallback((item: Item, isSelected: boolean, isDisabled: boolean) => {
    if (!isSelected && !isDisabled) {
      addToCart(item)
    }
  }, [addToCart]);

  const processItem = useCallback((item: Item) => {
    const itemInfo = getItemInfo(item)
    const isSelected = selectedItem?.id === item.id;
    const isDisabled = itemInfo.isDisabled && !isSelected;
    
    return {
      itemInfo,
      isSelected,
      isDisabled,
      onClick: () => handleItemClick(item, isSelected, isDisabled)
    };
  }, [selectedItem, getItemInfo, handleItemClick])

  return { 
    processItem,
    cart,
    selectedItem 
  }
}