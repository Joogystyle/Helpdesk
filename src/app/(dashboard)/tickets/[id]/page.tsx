import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import DeleteButton from "./DeleteButton"

export const dynamicParams = true

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props){
  const id = (await params).id

  const supabase = createServerComponentClient({ cookies: () => cookies() })
  const {data: ticket} = await supabase
    .from("Tickets")
    .select()
    .eq('id', id)
    .single()

  return {
    title: `Dojo Helpdesk | ${ticket.title || "Ticket not found"}`
  }
}





async function getTicket(id: string){

  const supabase = createServerComponentClient({ cookies: () => cookies() })
  const {data} = await supabase
    .from("Tickets")
    .select()
    .eq('id', id)
    .single()


  if(!data){
    notFound()
  }

  return data
}

export default async function TicketDetails({params}:{params: {id:string}}) {
  const ticket:ticket = await getTicket( (await params).id)

  const supabase = createServerComponentClient({ cookies: () => cookies() })
  const { data } = await supabase.auth.getSession()
  
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {data.session?.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id}/>
          )}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}
