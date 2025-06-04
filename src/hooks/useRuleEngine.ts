import { useMemo } from 'react';
import { useRuleStore } from '../store/useRuleStore';
import { useCartStore } from '../store/useCartStore';
import { Item } from '../models/item.model';

interface ItemPriceInfo {
  originalPrice: number;
  modifiedPrice: number;
  isDisabled: boolean;
  disabledReason?: string;
}

interface RuleEngineResult {
  getItemInfo: (item: Item) => ItemPriceInfo;
  isComboAllowed: (itemA: Item, itemB: Item) => boolean;
}

export const useRuleEngine = (): RuleEngineResult => {
  const { rules } = useRuleStore();
  const { cart } = useCartStore();

  return useMemo(() => {
    
    const priceModRules = rules.filter(rule => rule.type === 'price_mod');
    const allowRules = rules.filter(rule => rule.type === 'allow' && rule.value === false);

    const getItemInfo = (item: Item): ItemPriceInfo => {
      let modifiedPrice = item.price;
      let isDisabled = false;
      let disabledReason = '';

      
      for (const rule of priceModRules) {
        const affectedCondition = rule.conditions.find(
          cond => cond.item_id === item.id && cond.is_affected
        );
        
        if (affectedCondition) {
          
          const requirementConditions = rule.conditions.filter(
            cond => !cond.is_affected
          );
          
          const requirementsMet = requirementConditions.every(reqCond => {
            return cart.some(cartItem => cartItem.id === reqCond.item_id);
          });

          if (requirementsMet && typeof rule.value === 'number') {
            modifiedPrice += rule.value;
          }
        }
      }

      
      for (const rule of allowRules) {
        
        const itemInRule = rule.conditions.find(cond => cond.item_id === item.id);
        
        if (itemInRule) {
          
          const otherItemsInRule = rule.conditions.filter(cond => cond.item_id !== item.id);
          
          
          const hasConflictingItem = otherItemsInRule.some(otherCond => {
            return cart.some(cartItem => cartItem.id === otherCond.item_id);
          });

          if (hasConflictingItem) {
            isDisabled = true;
            disabledReason = rule.description || 'Combination not allowed';
            break;
          }
        }
      }

      return {
        originalPrice: item.price,
        modifiedPrice,
        isDisabled,
        disabledReason
      };
    };

    const isComboAllowed = (itemA: Item, itemB: Item): boolean => {
      for (const rule of allowRules) {
        const hasItemA = rule.conditions.some(cond => cond.item_id === itemA.id);
        const hasItemB = rule.conditions.some(cond => cond.item_id === itemB.id);
        
        if (hasItemA && hasItemB) {
          return false;
        }
      }
      return true;
    };

    return {
      getItemInfo,
      isComboAllowed
    };
  }, [rules, cart]);
}; 