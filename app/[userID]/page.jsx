"use client"

import MakeApost from "@/components/makeApost"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { parseISO, formatDistanceToNow } from 'date-fns';
import Image from "next/image"
import jwt_decode from "jwt-decode";


const Page = () => {
    const [creators, setCreators] = useState([])
    const [posts, setPosts] = useState([])
    const id = usePathname()

    const decodedToken =JSON.parse(localStorage.getItem("user")) && jwt_decode(JSON.parse(localStorage.getItem("user"))?.token);
    

    const getAllPosts = async () => {
        try {
            const res = await axios.get(`http://localhost:3008/users${id}`)
            //console.log(res.data)
            setCreators(res.data)
            setPosts(res.data.posts)

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async(e) => {
        e.preventDefault()
        try {
            await axios.delete(`http://localhost:3008/posts${id}/${e.target.id}`,
                {
                    headers: {
                        token:
                            `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
                    }
})
            

        } catch (error) {
            console.log(error)
        }
        getAllPosts()
    }
    

    useEffect(() => {
        getAllPosts()
    }, [])

  return (
    <>
          {posts && <>
              {id.substring(1)==decodedToken?.id&&<MakeApost getAllposts={getAllPosts} creators={creators} userID={id} />}
                {posts.map(post => {
                    return (
                        
                        <div key={post._id}  className="post">
                            <div className="name">
                            <h4>{creators.username}</h4>
                            <h6>{formatDistanceToNow(parseISO(post?.createdAt))} ago</h6>

                            </div>
                            <p>{post.post}</p>
                            <div className="container">
                                <p className="like">{post.likes.length} likes
                                <div className="like-box">{post.likes.map(like => <div>{like.username}</div>) }</div>

                                </p>
                                {id.substring(1)==decodedToken?.id&&<Image
                                    id={post._id}
                                    alt="delete"
                                    onClick={handleDelete}
                                    src={require("../../icons/trash.svg")}
                                    width={25}
                                    height={25}
                                    className="trash"
                                />}
                            </div>
                            <div className="br"></div>
                    </div>
                        )
                })}
            </>}
        </>
  )
}

export default Page