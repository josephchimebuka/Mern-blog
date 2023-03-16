import {React} from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import {useContext, useEffect} from 'react'
import { UserContext } from '../UserContext'

const Header = () => {
  const {setUserinfo,userinfo} = useContext(UserContext)
useEffect(() => {
   fetch('http://localhost:4000/profile',{
    credentials:'include'
  }).then(response => {
    response.json().then(userinfo =>{
      setUserinfo(userinfo)
    })
  })
}, []);

function logout(){
  fetch('http://localhost:4000/logout',{
    credentials: 'include',
    method: 'POST',
  });

  setUserinfo(null)
  console.log(setUserinfo)
}

const username = userinfo?.username
  return (
   <header className='header'>
    <Link to='/' className='logo'>MyBlog</Link>
    <nav>
      { 
        username &&(
      <>
      <Link to='/create'>Create new post</Link>
      <Link to='' onClick={logout}>Logout</Link>
    </>
        )
      }
      {!username &&(
      <>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
        </>
      )

      }
    </nav>
   </header>
  )
}

export default Header