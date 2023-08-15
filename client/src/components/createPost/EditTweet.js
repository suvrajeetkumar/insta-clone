import React, { Component, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './createPost.css';


const EditTweet = (props) => {

    const [tweet, setTweet] = useState("");
    const postId = props.match.params.postId;

    useEffect(()=>{
        console.log("postId => ", postId)//123

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
                    console.log("posted tweet => ", data.posts[0].tweet)
                    setTweet(data.posts[0].tweet);
                }
            }).catch(err=>{
                console.log(err)
            })

    },[])

    const editDetails = () => {
        console.log("post details");
        fetch("/edittweet",{                   
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                editedTweet: tweet,
                postId: postId
            })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                console.log(data.error);
                alert(data.error);
                }
                else{
                  console.log("posted")
                    
                }
            }).catch(err=>{
                console.log(err)
            })
    }

    return (
     
        
        <div className='container'>
            <h1 style={{margin:"5vh"}}>Edit tweet</h1>
            <div className='container-box'>
            <TextField id="standard-basic" label="add your tweet" style={{width:"100%"}}
            value={tweet}
            onChange={(e)=>setTweet(e.target.value)}/>
        <div style={{display:"flex",justifyContent:"center", marginTop: "50px"}}>
        <Link to="/">
            <Button variant="contained" color="primary" onClick={editDetails}>
            Post
            </Button>
        </Link>
      </div>
            </div>
        </div>
     
    );

}


export default EditTweet;