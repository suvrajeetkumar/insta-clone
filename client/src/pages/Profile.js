import React,{useEffect,useState,useContext} from 'react';
import { UserContext } from '../App';
import '../styles/profilePage.css'
import {Link} from 'react-router-dom';
import Loader from '../components/Loader';

const Profile = () =>{
    const [post,setPost] = useState(null)
    const [followers,setFollowers] = useState(null)
    const [following,setFollowing] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    
    // console.log(state)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log("this")
            
            console.log(result);
            var posts = [];
            posts = [...result.photos, ...result.tweets];

            setPost(posts);
            // setPost(result.posts)
        })
       

        
    },[])

    useEffect(()=>{
        if(image){
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","insta-clone")
            data.append("cloud_name","suvra15")
            fetch("https://api.cloudinary.com/v1_1/suvra15/image/upload",{
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then(data=>{
               
            //    console.log(data.url)
            //    localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
            //    dispatch({type:"UPDATEPIC",payload:data.url})
               fetch("/updatepic",{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        pic:data.url
                    })
    
               }).then(res=>res.json())
               .then(result=>{
                   console.log(result);
               }).catch(err=>{
                   console.log(err);
               })
            })
            .catch(err=>{
                console.log(err)
            })
        }
       
    },[image])

    const updateProfilePic=(file)=>{
        setImage(file)
    }
    
    return(
    <div style={{maxWidth:"80vw" , margin:"0 10vw"}}>
        <div className='profile-section-wrapper'>
            <div style={{width:"15%", marginTop: "10px"}}>
                <img className='photo-pic' src={state?state.pic:"loading"}/>
                
               
            <div className="file-field input-field" style={{left:"10%"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>updateProfilePic(e.target.files[0])} />
            </div>
            
            </div>

            </div>
            <div style={{width:"" ,paddingLeft:"5vw" }} className='profile-user-section'>
                <div className='profile-user-name'>{state?state.name:"loading"}</div>
                <div style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
                    <div className='profile-item'>{post ? post.length : "..."} posts</div>
                    <div className='profile-item'>{state?state.followers.length:"loading"} followers</div>
                    <div className='profile-item'>{state?state.following.length:"loading"} following</div>
                </div>
            </div>
            
        </div>
        
       <div className='gallery-container'>
        {!post &&  <Loader />}
        <div className="gallery">
        { post &&
            post.map(data=>{
                if(data.tweet) {
                return(
                    <Link className="link-style-none" to={`/tweet/${data._id}`}>
                    <div key={data._id} className="tweet-cards">
                    <div className="tweet" key={data._id}>{data.tweet}</div>
                    </div>
                    </Link>
                  )
                } else {
                    return(
                        <div key={data._id} className="profile-cards">
                        <img className="item" src={data.pic} key={data._id}></img>
                        </div>
                    )
                }
            })
        }
        </div>
        </div>
    </div>
    )
}
export default Profile;