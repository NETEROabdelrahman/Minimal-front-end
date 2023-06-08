"use client"

import { Suspense, useEffect, useState } from "react"
import axios from "axios"
import Post from "@/components/post";
import MakeApost from "./makeApost";
import Loading from "@/app/signup/loading";
import Modal from "./modal";

const Posts = () => {
    const [creators, setCreators] = useState('')
    const [posts, setPosts] = useState([])
    const [userID, setUserID] = useState('')
    const [limit, setLimit] = useState(5)
    //const [page, setPage] = useState(1)


    console.log(posts)
    
    
    const getAllposts = async () => {
        try {
            const res = await axios.get(`https://minimal-2.onrender.com/posts?limit=${limit}`)
            
            setPosts(res.data)
                
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const fetchMore = (e) => {
        e.preventDefault()
        setLimit(prev => prev + 5)
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

                    <Post posts={posts} userID={userID} setUserID={setUserID} getAllposts={getAllposts} limit={limit} />
                                
                    <p className="fetch-more" onClick={fetchMore}>fetch more?</p>
                    
                </div>
            }

        </>
    )
};

export default Posts