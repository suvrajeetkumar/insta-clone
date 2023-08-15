import React, { Component, useState} from "react";
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './createPost.css';


const CreateTweet = () => {

    const [tweet, setTweet] = useState("");

    const postDetails = () => {
        console.log("post details");
        fetch("/createtweet",{                   
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                tweet: tweet
                
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
            <h1 className="add-tweet-header">Add tweet</h1>
            <div className='container-box'>
            <TextField id="standard-basic" label="add your tweet" style={{width:"100%"}}
            value={tweet}
            onChange={(e)=>setTweet(e.target.value)}/>
        <div style={{display:"flex",justifyContent:"center", marginTop: "50px"}}>
        <Link to="/">
            <Button variant="contained" color="primary" onClick={postDetails}>
            Post
            </Button>
        </Link>
      </div>
            </div>
        </div>
     
    );

}


export default CreateTweet;