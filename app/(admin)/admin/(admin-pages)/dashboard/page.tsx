
import React from 'react'
import createSupabaseServerClient from '@/utils/supabase'
import { redirect } from 'next/navigation';

export default async function page() {
  const supabase = await createSupabaseServerClient()
  const session = await supabase.auth.getSession();
  
  if(session?.data?.session?.user?.role !== "admin") {
    redirect("/");
  }
  
  return (
    <div className='bg-offWhite w-full'>
      <h1>Admin Dashboard</h1>
    </div>
  )
}
