
import { createClient } from '@supabase/supabase-js'

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const service_role_key = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE || '';
export const supabase = createClient(supabase_url, service_role_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

