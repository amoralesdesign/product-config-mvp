import { database } from '../config'
import { Category } from '../models'

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await database
    .from('categories')
    .select('*')
    .order('order', { ascending: true })
  
  if (error) {
    throw error
  }
  
  return data as Category[]
}
