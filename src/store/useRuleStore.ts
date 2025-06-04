import { create } from 'zustand'
import { Rule } from '../models/rule.model'
import { RuleCondition } from '../models/rule-condition.model'
import { getRules, getRuleConditions } from '../services'

interface RuleWithConditions extends Rule {
  conditions: RuleCondition[]
}

interface RuleStore {
  rules: RuleWithConditions[]
  loading: boolean;
  error: string | null
  fetchRules: () => Promise<void>
}

export const useRuleStore = create<RuleStore>((set) => ({
  rules: [],
  loading: false,
  error: null,
  fetchRules: async () => {
    set({ loading: true, error: null })
    try {
      const [rules, conditions] = await Promise.all([getRules(), getRuleConditions()])
     
      const rulesWithConditions: RuleWithConditions[] = rules.map(rule => ({
        ...rule,
        conditions: conditions.filter(cond => cond.rule_id === rule.id)
      }));
      set({ rules: rulesWithConditions, loading: false })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), loading: false })
    }
  },
}))