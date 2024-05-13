import  { useEffect, useState } from 'react'
import {Container,PostCard  } from "../index"
import appwriteServies  from "../../appwrite/config"

export default function Allpost() {
  let [post ,setPost ] = useState('')
  useEffect(()=>{},[])
  appwriteServies.getPosts([]).then((posts)=>{
    if(posts){
        setPost(posts.documents)
    }
  })
    return (
    <div className='w-full'>
        <Container>
            <div className="flex flex-wrap">
                {
                    post.map((post)=>(
                        <div className="w1/4" key={post.$id}>
                            <PostCard post={post} />
                        </div>
                    ))
                }
            </div>
        </Container>



    </div>
  )
}
