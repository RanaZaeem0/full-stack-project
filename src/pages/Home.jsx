import React,{useState,useEffect} from 'react'
import appwriteServies from "../appwrite/config"
import {Container , PostCard} from "../compount/index"

export default function Home() {
  
  const [posts,setPost] = useState([])
  
    useEffect(()=>{
    appwriteServies.getPosts().then((posts)=>{
        if(posts){
            setPost(posts.documents)
            
        }
    })
  },[])
  
if(posts.length === 0 ){
    return  <div className="">
        <Container>
<div className="">
    login to red post
    not post find
</div>
        </Container>
    </div>
}
return <div className="w-full py-8">
       <div className='w-full'>
        <Container>
            <div className="flex flex-wrap">
                {
                    posts.map((post)=>(
                        <div className="w1/4" key={post.$id}>
                            {/* <PostCard post={post} /> */}
                            <PostCard {...post}/>
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
</div> 



}
