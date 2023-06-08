"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react"
import axios from "axios"



const MakeApost = ({userID,creators,getAllposts}) => {
    const [post, setPost] = useState('')



    const router = useRouter()

    const makePost = async (e) => {
        e.preventDefault();
        if (!userID) {
            alert("you have to login first!")
            router.push('/signup')
        }
        try {
            const res = await axios.post(`http://localhost:3008/posts/${userID}`,  {post} , {
                headers: {
                    token:
                        `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                }
            })
            getAllposts()
        } catch (error) {
            console.log(error)
        }
        setPost('')
    }
    return (
        <form className="teaxt-area-container">
            <textarea maxLength={2000} value={post} onChange={e => setPost(e.target.value)} placeholder="make a post" ></textarea>
            <button onClick={makePost}>post</button>
        </form>
    )
};

export default MakeApost