import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'



export async function POST(request: Request){
  const ticket = await request.json()

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies: () => cookies() })

  //get the current user seesion
  const {data: {session}} = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // insert the data
  const {data, error} = await supabase
  .from('Tickets')
  .insert({
    ...ticket,
    user_email: session?.user.email
  })
  .select()
  .single()

  
  return NextResponse.json({data, error})
}