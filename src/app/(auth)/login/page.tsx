"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState('')
  
  const handleSubmit: (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => Promise<void> 
  = async (e, email, password) => {
    e.preventDefault();
    setError('')
    
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if(error){
      setError(error.message)
    }
    if(!error){
      router.push('/')
    }


  };
  return (
    <main>
      <h2 className="text-center">Login</h2>

      <AuthForm handleSubmit={handleSubmit}/>

      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  )
}
