"use server";

import React from 'react'
import createSupabaseServerClient from '@/utils/supabase'
import { redirect } from 'next/navigation';

export default async function page() {
  const supabase = await createSupabaseServerClient()
  const session = await supabase.auth.getSession();
  
  if(session?.data?.session?.user?.user_metadata?.role !== "admin") {
    redirect("/");
  }
  
  return (
    <div className=' w-full px-10 py-20'>
      <h1 className='text-4xl text-primaryBlack py-2'>Dashboard</h1>
      <hr className="border-2 border-primaryGreen"/>
    </div>
  )
}
