import React,{useEffect,useState,useContext} from 'react';
import { UserContext } from '../App';
import Button from '@material-ui/core/Button';
import '../styles/profilePage.css'

const Profile = () =>{
    const [post,setPost] = useState([])
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
            
            
            // console.log(result)
            setPost(result.posts)
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
        <div style={{
            display:"flex",
            justifyContent:"center",
            margin: "5vh 0",
            borderBottom:"2px solid grey"
        }}>
            <div style={{width:"15%"}}>
                <img style={{width: "160px",height: "160px", borderRadius:"80px" }} src={state?state.pic:"loading"}/>
                
               
            <div className="file-field input-field" style={{left:"10%"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>updateProfilePic(e.target.files[0])} />
            </div>
            
            </div>

            </div>
            <div style={{width:"30%" ,paddingLeft:"5vw" }}>
                <h1>{state?state.name:"loading"}</h1>
                <div style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
                    <h3>{post.length} posts</h3>
                    <h3>{state?state.followers.length:"loading"} followers</h3>
                    <h3>{state?state.following.length:"loading"} following</h3>
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