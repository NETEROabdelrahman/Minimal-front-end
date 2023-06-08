"use client"

import { Suspense, useEffect, useState } from "react"
import axios from "axios"
import { AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { parseISO, formatDistanceToNow } from 'date-fns';
import Loading from "@/app/signup/loading";
import Link from "next/link";
import Modal from "./modal";



const Post = ({ userID, posts, getAllposts, setUserID, limit }) => {
    
    const [liked, setLiked] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchedPosts, setSearchedPosts] = useState(null)
    const [searchReveal, setSearchReveal] = useState(false)

    console.log(searchedPosts)

    const router = useRouter()

    


    const searching = async (e) => {
        setSearchValue(e.target.value)
        if (e.target.value) {
            
            try {
                const res = await axios.get(`http://localhost:3008/posts/search/${e.target.value}?limit=${limit}`)
                setSearchedPosts(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        } else {
            setSearchedPosts(null)

        }
  
    }

    
    
    
    
    useEffect(() => {
        getAllposts()
        if (localStorage.getItem("user")) {
            setUserID(JSON.parse(localStorage.getItem("user")).userID)
        }
    }, [limit])
    
    
    const like = async (e) => {
        if (!userID) {
            alert("you have to login first!")
            router.push('/signup')
        }

        try {
            const res = await axios.put(`http://localhost:3008/posts/like/${userID}/${e.target.id}`)
            console.log(res)
            getAllposts()
            setLiked(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    




    
    return (
        <>
            <div className={!searchReveal?"search-container":"search-container-reveal"}>
                <input
                    placeholder="search for a post"
                    className={!searchReveal?"search":"search-reveal"}
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
                    onClick={()=>setSearchReveal(prev=>!prev)}

                />
            </div>
            { searchedPosts ? <>{searchedPosts && <>
                {searchedPosts.map(post => {
                    return (
                        
                        <div key={post._id} className="post">
                            <div className="name">
                                <Link className="link" href={post.creator._id}><h4>{post.creator?.username}</h4></Link>
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
                                    src={!post.likes.map(like => like._id).includes(userID) ? require('../icons/heart.svg') : require('../icons/heart2.svg')}
                                />
                                <div
                                    className="like"
                                    id={post._id}
                                >{post.likes.length}
                                    {post.likes.length > 0 && <div className="like-box">{post.likes.map((like,index) => <div key={index}>{like.username}</div>)}</div>}
                                </div>
                                
                            </div>
                            <div className="br"></div>

                        </div>
                    )
                })}
            </>} </> : <>
                {posts && <>
                    {posts.map(post => {
                        return (
                        
                            <div key={post._id} className="post">
                                <div className="name">
                                    <Link className="link" href={post.creator._id}><h4>{post.creator?.username}</h4></Link>
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
                                        src={!post.likes.map(like => like._id).includes(userID) ? require('../icons/heart.svg') : require('../icons/heart2.svg')}
                                    />
                                    <div
                                        className="like"
                                        id={post._id}
                                    >{post.likes.length}
                                        {post.likes.length > 0 && <div className="like-box">{post.likes.map((like,index) => <div key={index}>{like.username}</div>)}</div>}
                                    </div>
                                
                                </div>
                                <div className="br"></div>

                            </div>
                        )
                    })}
                </>} </>}
            
        </>
    )
};

export default Post

