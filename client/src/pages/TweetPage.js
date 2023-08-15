import React, { useEffect, useState } from 'react';
import TweetCard from '../components/TweetCard';
import '../styles/HomePage.css';

const TweetPage = (props) => {

    const [tweetData, setTweetData] = useState(null);
    const postId = props.match.params.postId;

    useEffect(()=>{
        getTweet();
    },[])

    const getTweet = () => {
        fetch(`/gettweet?postId=${postId}`,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                    alert(data.error);
                }
                else{
                    console.log("posted tweet => ", data.posts[0])
                    setTweetData(data.posts[0]);
                }
            }).catch(err=>{
                console.log(err)
            })
    }

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
            setTweetData(result)
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
            setTweetData(result);
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
            setTweetData(result);
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
            setTweetData(result);
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
            setTweetData(result);
        })
    }
// return <h1>this is tweet page</h1>
    return tweetData ? <div className='post-card-container'><TweetCard key={tweetData._id} id={tweetData._id} deleteCommentfun = {deleteComment} deletefun={deletePost} commentfun={makeComment} likefun={likePost} unlikefun={unlikePost} likes={tweetData.likes} comments={tweetData.comments} postedBy={tweetData.postedBy} tweet={tweetData.tweet}/></div> : <div>...Loading</div>
}

export default TweetPage;