"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const page = () => {
    const router = useRouter()

   const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState([])
    const [switchLogin, setSwitchLogin] = useState(false)

    console.log(userData)
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://minimal-dcd9.onrender.com/auth/register', { username, password })
            if (res.statusText == "Created") {
                const loginRes = await axios.post('https://minimal-dcd9.onrender.com/auth/login', { username, password })
                setUserData(loginRes.data)
                localStorage.setItem('user',JSON.stringify(loginRes.data))
                //router.push('/')
                window.location.replace('/')
            }
        } catch (error) {
            console.log(error)
        }

}
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
                const loginRes = await axios.post('https://minimal-dcd9.onrender.com/auth/login', { username, password })
            setUserData(loginRes.data)
            localStorage.setItem('user',JSON.stringify(loginRes.data))
                //router.push('/')
                window.location.replace('/')
            
        } catch (error) {
            console.log(error)
        }

}

    return (
        <>
        {!switchLogin?<div className="form-container">
        <p>don't have an account ? <span className="switchLogin" onClick={()=>setSwitchLogin(true)}>sign up</span></p>
      <form >
        <input placeholder="username" type="text" value={username} onChange={e=>setUsername(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </form>
      <button onClick={handleLogin}>login</button>
            </div>
                :
                <div className="form-container">
            <p>already have an account ? <span className="switchLogin" onClick={()=>setSwitchLogin(false)}>login</span></p>
      <form >
        <input placeholder="username" type="text" value={username} onChange={e=>setUsername(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </form>
      <button onClick={handleRegister}>register</button>
      </div>}
        </>
        
  )
}

export default page