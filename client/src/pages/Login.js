import React from 'react'
import { useState,useContext } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const {setUserinfo} = useContext(UserContext)
 async function onSubmit(e){
    e.preventDefault()

    const response =  await fetch('http://localhost:4000/login',{
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers:{'Content-type': 'application/json'},
      credentials: 'include'
    })
    if(response.ok){
      response.json().then(userinfo =>{
        setUserinfo(userinfo);
        setRedirect(true);
      })

    }else{
      alert('login unsuccesful')
    }

 
    console.log(response)
  }
  if(redirect){
   return <Navigate to={'/'}/>
  }

  return (
  <>
    <form onSubmit={onSubmit}>
    <h1>Login</h1>
    <input 
    type='text'
    placeholder='Enter Username'
    value={username}
    onChange={(e)=> setUsername(e.target.value)}
    />
    <input
     type='password'
      placeholder='Enter password'
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      />
    <button>Submit</button>
   </form>
  </>
 
  )
}

export default Login