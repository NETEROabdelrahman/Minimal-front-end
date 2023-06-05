"use client"

import { Suspense, useEffect, useState } from "react"
import axios from "axios"
import Post from "@/components/post";
import MakeApost from "./makeApost";
import Loading from "@/app/signup/loading";

const Posts = () => {
    const [creators, setCreators] = useState('')
    const [posts, setPosts] = useState(null)
    const [userID, setUserID] = useState('')
    const [limit, setLimit] = useState(5)


    
    
    const fetchMore = (e) => {
        e.preventDefault()
        setLimit(prev => prev + 5)
    }

    const getAllposts = async () => {
        try {
            const res = await axios.get(`https://minimal-dcd9.onrender.com/posts?limit=${limit}`)
            setPosts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    

    

    
    useEffect(() => {
        getAllposts()
        if (localStorage.getItem("user")) {
            setUserID(JSON.parse(localStorage.getItem("user")).userID)
            setCreators(JSON.parse(localStorage.getItem("user")).username)
        }
    }, [limit])

    return (
        <>
            
            {!posts ?
                <Loading/>:<div>
                    <MakeApost getAllposts={getAllposts} creators={creators} userID={userID}/>

                    <Post posts={posts} userID={userID} setUserID={setUserID} getAllposts={getAllposts} />
                                
                    <p className="fetch-more" onClick={fetchMore}>fetch more?</p>
                    
                </div>
            }
        </>
    )
};

export default Posts