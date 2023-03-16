import React from 'react'
import { useState } from 'react'

const Register = () => {
  const[username, setUsername]  = useState('')
  const [email, setEmail]  = useState('')
  const [password, setPassword]  = useState('')
  async function register(e){
    e.preventDefault();
   const response = await fetch('http://localhost:4000/register',{
      method:'POST',
      body: JSON.stringify({username,password,email}),
      headers:{'Content-type':'application/json'}
    });

    if(response.status === 200){
      alert('Registration successful')
    }else{
      alert('Registration failed')
    }
  }
  
  return (
    <>
    <form onSubmit={register}>
    <h1>Register</h1>
    <input
     type='text' 
     value={username}
     onChange={(e)=> setUsername(e.target.value)}
    placeholder='Enter Username'/>
    <input
     type='email'
     placeholder='Enter email'
     value={email}
     onChange={(e)=> setEmail(e.target.value)}
     />
       <input
     type='password'
     placeholder='Enter password'
     value={password}
     onChange={(e)=> setPassword(e.target.value)}
     />
    <button type='submit'>Submit</button>
   </form>
  </>
  )
}

export default Register