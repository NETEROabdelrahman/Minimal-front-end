"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Nav = () => {
  const [username, setUsername] = useState('')
  const [userID, setUserID] = useState('')

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUsername(JSON.parse(localStorage.getItem("user")).username)
      setUserID(JSON.parse(localStorage.getItem("user")).userID)
    }
    
  },[username])
  const router = useRouter()
  const signUp = () => {
    router.push('/signup')
  }

  const logout = () => {
    localStorage.removeItem("user")
    window.location.replace('/')
  }
  return (
      <nav>
          <Link className="link" href="/"><h1>minimal</h1></Link>
      <ul>
        {username ? <>
          <Link className="link" href={{pathname:`/${userID}`}}><li >{username}</li></Link>
          <li onClick={logout}>logout</li
          ></>
          :
          <li onClick={signUp}>login</li>
        }
              
          </ul>
    </nav>
  )
}

export default Nav