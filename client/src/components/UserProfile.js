import React,{useEffect,useState,useContext} from 'react';
import { UserContext } from '../App';
import {useParams} from 'react-router-dom';
import '../styles/profilePage.css'

const Profile = () =>{
    const [UserProfile,setUser] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowfollow] = useState(state?!state.following.includes(userid):true)
    console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setUser(result)
            
        })
    },[])
    console.log(UserProfile)

const followUser = () =>{
    fetch('/follow',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            followId:userid
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setUser((prevState)=>{
            return{
                ...prevState,
                user:{
                    ...prevState.user,
                    followers:[...prevState.user.followers,data._id]
                }
            }
        })
        setShowfollow(false);
    })
}

const unfollowUser = () =>{
    fetch('/unfollow',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            unfollowId:userid
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setUser((prevState)=>{
            const newFollower = prevState.user.followers.filter(item=>item != data._id)
            return{
                ...prevState,
                user:{
                    ...prevState.user,
                    followers:newFollower
                }
            }
        })
        setShowfollow(true);
    })
}

    return(
        <>
        {UserProfile ?  <div style={{maxWidth:"80vw" , margin:"0 10vw"}}>
        <div style={{
            display:"flex",
            justifyContent:"center",
            margin: "5vh 0",
            borderBottom:"2px solid grey"
        }}>
            <div style={{width:"15%"}}>
                <img style={{width: "160px",height: "160px", borderRadius:"80px" }} src={UserProfile.user.pic}/>
            </div>
            <div style={{width:"30%" ,paddingLeft:"5vw" }}>
                <h1>{UserProfile.user.name}</h1>
                <div style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
                    <h3>{UserProfile.posts.length} posts</h3>
                    <h3>{UserProfile.user.followers.length} followers</h3>
                    <h3>{UserProfile.user.following.length} following</h3>
                </div>
                {showfollow?<button onClick={followUser}>follow</button>:<button onClick={unfollowUser}>unfollow</button>}
                
                
            </div>
        </div>
       
        <div className="gallery">
        {
            UserProfile.posts.map(data=>{
                return(
                    <div className="item">
                    <img className="item" src={data.pic} key={data._id}></img>
                    </div>
                )
            })
        }
        </div>
    </div>:<h2>Loading...!</h2>}
    
    </>
    )
}
export default Profile;