export interface Category {
  id: string
  created_at: string
  name: string
  description: string | null
  order: number
  required: boolean
}