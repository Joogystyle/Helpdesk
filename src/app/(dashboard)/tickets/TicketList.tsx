import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"

async function getTickets(){
  
  const supabase = createServerComponentClient({ cookies: () => cookies() })

  const { data,error } = await supabase
    .from("Tickets")
    .select()
  if(error){
    console.log(error.message)
  }
  return data
}


export default async function TicketList() {
  const tickets = await getTickets()
  
  return (
    <>
      {tickets !== null 
        ? tickets.map((t:ticket) => (
        <div key={t.id} className="card my-5">
          <Link href={`/tickets/${t.id}`}>
            <h3>{t.title}</h3>
            <p>{t.body.slice(0,200)}...</p>
            <div className={`pill ${t.priority}`}>
              {t.priority} priority
            </div>
          </Link>
        </div>
        ))
        : <p className="text-center">There are no open tickets, yay!</p>}  
    </>
  )
}
