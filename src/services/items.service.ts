import { database } from '../config'
import { Item } from '../models'

export const getItems = async (categoryId?: string): Promise<Item[]> => {
  let query = database.from('items').select('*')
  if (categoryId) {
    query = query.eq('category', categoryId)
  }
  const { data, error } = await query
  if (error) {
    throw error
  }
  return data as Item[]
}
