import React,{useEffect,useState,useContext} from 'react';
import { UserContext } from '../App';
import '../styles/profilePage.css'

const Profile = () =>{
    const [post,setPost] = useState([])
    const {state,dispatch} = useContext(UserContext)
    console.log(state)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            
        })
    },[])
    console.log(post)
    return(
    <div style={{maxWidth:"80vw" , margin:"0 10vw"}}>
        <div style={{
            display:"flex",
            justifyContent:"center",
            margin: "5vh 0",
            borderBottom:"2px solid grey"
        }}>
            <div style={{width:"15%"}}>
                <img style={{width: "160px",height: "160px", borderRadius:"80px" }} src="https://images.unsplash.com/photo-1590133853249-4166757d26ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80"/>
            </div>
            <div style={{width:"30%" ,paddingLeft:"5vw" }}>
                <h1>{state?state.name:"loading"}</h1>
                <div style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
                    <h3>40 posts</h3>
                    <h3>40 followers</h3>
                    <h3>40 following</h3>
                </div>
            </div>
        </div>
       
        <div className="gallery">
        {
            post.map(data=>{
                return(
                    <div className="item">
                    <img className="item" src={data.pic} key={data._id}></img>
                    </div>
                )
            })
        }
        </div>
    </div>
    )
}
export default Profile;