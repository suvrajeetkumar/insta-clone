import React,{useState,useEffect} from 'react';
import PostCard from './HomePost';

const Home = () =>{
    const [data,setData] = useState([])
    
    useEffect(()=>{
        fetch('/getsubposts',{
            
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(datas=>{
            console.log(datas)
            setData(datas.posts)
        })
    },[])

    const likePost = (id) => {
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postID:id
            })
        }).then(res=>res.json())
        .then(result=>{
           const newData = data.map(item=>{
            if(item._id==result._id){
                return result
            }else{
                return item
            }
           })
           setData(newData)
        })
    }

    const unlikePost = (id) => {
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postID:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
               })
               setData(newData)
        })
        
    }

    const makeComment = (text,postID) => {
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postID,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
           
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
               })
               setData(newData)
        }).catch((err)=>{
            console.log(err)
        })
        
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item => {
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    const deleteComment = (postid,commentid)=>{
        fetch(`/deletecomment/${postid}/${commentid}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
               })
               setData(newData)
        })
    }

    // var rev = data.reverse();
    // console.log(rev);
    return(
        <div>
            {data.map(item=>{
                return(
                    <PostCard key={item._id} id={item._id} deleteCommentfun = {deleteComment} deletefun={deletePost} commentfun={makeComment} likefun={likePost} unlikefun={unlikePost} name={item.title} likes={item.likes} comments={item.comments} postedBy={item.postedBy} src={item.pic} description={item.body}/>
                )
            })}
         
              </div>
    
    )
}
export default Home