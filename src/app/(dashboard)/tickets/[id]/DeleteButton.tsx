'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { TiDelete } from "react-icons/ti"

export default function DeleteButton({ id }: {id:number}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleCLick = async() => {
    setIsLoading(true)
    
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: 'DELETE'
    })
    const json = await res.json()

    if(json.error){
      console.log(json.error)
      setIsLoading(false)
    }
    if(!json.error){
      router.refresh()
      router.push('/tickets')
    }
    
  }
  
  return (
    <button 
      className="btn-primary"
      onClick={handleCLick}
      disabled={isLoading}
    >
      {isLoading 
        ? <>
        <TiDelete/>
          Deleting...
        </>
        : <>
        <TiDelete/>
        Delete Ticket
        </>
      }
    </button>
  )
}
