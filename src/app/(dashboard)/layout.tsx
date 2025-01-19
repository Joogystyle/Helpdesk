import Navbar from '@/components/Navbar'
import { createServerComponentClient, User } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react'

export default async function DashboardLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  const supabase = createServerComponentClient({cookies})
  //const {data} = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if(!user){
    redirect('/login')
  }
  return (
    <>
      <Navbar user={user}></Navbar>
      {children}
    </>
  )
}
