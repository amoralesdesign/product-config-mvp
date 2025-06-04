export interface Item {
  id: string
  created_at: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string
}