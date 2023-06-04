"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { parseISO, formatDistanceToNow } from 'date-fns';


const Post = ({ userID, posts, getAllposts, setUserID }) => {
    
    const [liked,setLiked] = useState(false)

    const router = useRouter()



    
    
    
    useEffect(() => {
        getAllposts()
        if (localStorage.getItem("user")) {
        setUserID(JSON.parse(localStorage.getItem("user")).userID)
    }
    }, [])
    
    
    const like = async (e) => {
        if (!userID) {
            alert("you have to login first!")
            router.push('/signup')
        }

        try {
            const res = await axios.put(`https://minimal-dcd9.onrender.com/posts/like/${userID}/${e.target.id}`)
            console.log(res)
            getAllposts()
            setLiked(prev=>!prev)
        } catch (error) {
            console.log(error)
        }
    }




    
    return (
        <>
            {posts && <>
                {posts.map(post => {
                    return (
                        
                        <div key={post._id} className="post">
                            <div className="name">
                                <h4>{post.creator?.username}</h4>
                                <h6>{formatDistanceToNow(parseISO(post.createdAt))} ago</h6>

                            </div>
                            <p>{post.post}</p>
                            <div className="likes">
                                <Image
                                    className="heart"
                                    alt="like"
                                    id={post._id}
                                    onClick={like}
                                    width={25}
                                    height={25}
                                    src={!post.likes.includes(userID) ? require('../icons/heart.svg'):require('../icons/heart2.svg')}
                                />
                                <p>{post.likes.length }</p>
                            </div>
                            <div className="br"></div>

                        </div>
                    )
                })}
            </>}
        </>
    )
};

export default Post

