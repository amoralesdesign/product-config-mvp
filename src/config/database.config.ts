import { createClient } from '@supabase/supabase-js'

const databaseUrl = import.meta.env.VITE_API_URL
const databaseAnonKey = import.meta.env.VITE_API_KEY

export const database = createClient(databaseUrl, databaseAnonKey)