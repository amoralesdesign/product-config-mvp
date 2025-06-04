import { database } from '../config';
import { Rule } from '../models'
import { RuleCondition } from '../models'

export const getRules = async (): Promise<Rule[]> => {
  const { data, error } = await database.from('rules').select('*');
  if (error) throw error;
  return data as Rule[];
};

export const getRuleConditions = async (): Promise<RuleCondition[]> => {
  const { data, error } = await database.from('rule_conditions').select('*');
  if (error) throw error;
  return data as RuleCondition[];
};