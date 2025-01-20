import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Logo from './ninja.jpg'
import { User } from '@supabase/supabase-js'
import LogoutButton from './LogoutButton'

export default function Navbar({user}: {user:User | null}) {
  return (
    <nav>
      <Image
        src={Logo}
        alt='Dojo Helpdesk logo' 
        width={70}
        quality={100}
        placeholder='blur'
        />
      
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
      <Link href="/tickets/create" className='mr-auto'>Create Ticket</Link>
      
      {user && <span>Hello, {user.email}</span>}
      <LogoutButton/>
    </nav>
  )
}
