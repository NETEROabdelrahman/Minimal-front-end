"use client"

import { Suspense, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Loading from "./loading"

const page = () => {
    const router = useRouter()

   const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState([])
    const [switchLogin, setSwitchLogin] = useState(false)
    const [loading, setLoading] = useState(false)


    console.log(userData)
    
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.post('https://minimal-2.onrender.com/auth/register', { username, password })
            console.log(res)
            if (res.status == 201) {
                const loginRes = await axios.post('https://minimal-2.onrender.com/auth/login', { username, password })
                setUserData(loginRes.data)
                localStorage.setItem('user',JSON.stringify(loginRes.data))
                //router.push('/')
                window.location.replace('/')
            }
        } catch (error) {
            alert(error.response.data.message)
            console.log(error)
        }
        setLoading(false)

}
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true)
            const loginRes = await axios.post('https://minimal-2.onrender.com/auth/login', { username, password })
            console.log(loginRes)
            setUserData(loginRes.data)
            localStorage.setItem('user',JSON.stringify(loginRes.data))
                //router.replace('/')
                window.location.replace('/')
            
        } catch (error) {
            alert(error.response.data.message)
                console.log(error.response.data)
            }
             setLoading(false)

}

    return (
        <>
            {loading ? <Loading /> : <>
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
            </>}
        
        </>
        
  )
}

export default page