import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function DELETE(request:Request, props: {
  params: Promise<{ id: string }>;
}){
  const params = (await props).params
  const id = (await params).id

  const supabase = createRouteHandlerClient({ cookies })
  const{ error } = await supabase 
    .from("Tickets")
    .delete()
    .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}




/* 
export const dynamic = 'force-dynamic'

export async function GET(request:Request, {params,}:{params: Promise<{ id: string }>}){
  const id = (await params).id
  const res = await fetch(`http://localhost:4000/tickets/${id}`)
  const ticket = await res.json()

  if(!res.ok){
    return NextResponse.json({error: 'Cannot find the ticket'}, {
      status:404
    })
  }

  return NextResponse.json(ticket, {
    status: 200
  })
} */




