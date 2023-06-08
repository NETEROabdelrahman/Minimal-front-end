"use client"

import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Nav = () => {
  const [username, setUsername] = useState('')
  const [userID, setUserID] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchedUsers, setSearchedUsers] = useState(null)
  const [searchReveal, setSearchReveal] = useState(false)
  const [limit, setLimit] = useState(3)

  const pathname = usePathname()
  
  //console.log(searchedUsers)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUsername(JSON.parse(localStorage.getItem("user")).username)
      setUserID(JSON.parse(localStorage.getItem("user")).userID)
    }
    
  }, [username])
  const router = useRouter()
  const signUp = () => {
    router.push('/signup')
  }

  const logout = () => {
    localStorage.removeItem("user")
    window.location.replace('/')
  }


  const searching = async (e) => {
    setSearchValue(e.target.value)
    if (e.target.value) {
        
      try {
        const res = await axios.get(`http://localhost:3008/users/search/${e.target.value}?limit=${limit}`)
        setSearchedUsers(res.data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    } else {
      setSearchedUsers(null)

    }

  }
  


  return (
    <nav>
      <Link className="link" href="/"><h1>minimal</h1></Link>
      {pathname!="/usersSearch"&&<div className="search-value-container">

      
        <div className={!searchReveal ? "search-container" : "search-container-reveal"}>
          <input
            placeholder="users search"
            className={!searchReveal ? "search" : "search-reveal"}
            type="search"
            value={searchValue}
            onChange={searching}
          />
          <Image
            className="search-glasses"
            alt="search-glasses"
            width={25}
            height={25}
            src={require('../icons/search.svg')}
            onClick={() => setSearchReveal(prev => !prev)}

          />
        </div>
        {searchReveal && searchedUsers &&pathname!="/usersSearch"&& <div className="searched-users">
          {searchedUsers.map(user => {
            return (
              <div key={user._id}>
                <Link href={user._id}><h5>{user.username}</h5></Link>
              </div>
            )
          })}
          <Link className="link"  href={{ pathname: '/usersSearch', query: { searchValue } }}><div className="all-results">see all results</div></Link>
        </div>}
      </div>}
      <ul>
        {username ? <>
          <Link className="link" href={{ pathname: `/${userID}` }}><li >{username}</li></Link>
          <li onClick={logout}>
            <Image
              className="logout"
              alt="logout"
              width={25}
              height={25}
              src={require('../icons/logout.svg')}
            />
          </li>
        </>
          :
          <li onClick={signUp}>login</li>
        }
      </ul>
    </nav>
  )
};

export default Nav