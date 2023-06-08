"use client"

import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

const Page = ({ searchParams }) => {
    const searchInput = searchParams.searchValue
    console.log(searchParams)

    const [searchValue, setSearchValue] = useState(searchInput)
    const [searchedUsers, setSearchedUsers] = useState(null)
    const [limit, setLimit] = useState(3)

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
    
    console.log(searchInput)
   


    return (
        <div className='full-search-container'>
            <input
                placeholder="users search"
                className= "full-search-reveal"
                type="search"
                value={searchValue}
                onChange={searching}
            />
            <div className="full-search">
                {searchedUsers && searchedUsers.map(user => {
                    return (
                        <div key={user?._id}>
                            <Link className='link' href={user?._id}><h5>{user?.username}</h5></Link>
                        </div>
                    )
                })}
            {searchedUsers&&<div className='fetch-more' onClick={()=>setLimit(prev=>prev+3)}>fetch more ?</div>}
            </div>
        </div>
    )
};

export default Page
