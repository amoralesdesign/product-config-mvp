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
    // Mapas para optimizar las consultas
    const priceModRules = rules.filter(rule => rule.type === 'price_mod');
    const allowRules = rules.filter(rule => rule.type === 'allow' && rule.value === false);

    const getItemInfo = (item: Item): ItemPriceInfo => {
      let modifiedPrice = item.price;
      let isDisabled = false;
      let disabledReason = '';

      // Verificar modificaciones de precio
      for (const rule of priceModRules) {
        const affectedCondition = rule.conditions.find(
          cond => cond.item_id === item.id && cond.is_affected
        );
        
        if (affectedCondition) {
          // Verificar si las condiciones se cumplen con el carrito actual
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

      // Verificar restricciones de combinación
      for (const rule of allowRules) {
        // Buscar si este item está involucrado en la regla
        const itemInRule = rule.conditions.find(cond => cond.item_id === item.id);
        
        if (itemInRule) {
          // Buscar otros items en la misma regla
          const otherItemsInRule = rule.conditions.filter(cond => cond.item_id !== item.id);
          
          // Verificar si alguno de los otros items está en el carrito
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