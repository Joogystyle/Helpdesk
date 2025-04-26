'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function addTicket(formData: Iterable<readonly [PropertyKey, any]>){
  const ticket = Object.fromEntries(formData)

  const supabase = createServerActionClient({cookies})

  const {data: {session}} = await supabase.auth.getSession()

  //insert the data
  const { error } = await supabase
    .from('Tickets')
    .insert({
      ...ticket,
      user_email: session?.user.email
    })
  revalidatePath('/tickets') // run the fetch inside that path, refresh in the background
  redirect('/tickets')
}