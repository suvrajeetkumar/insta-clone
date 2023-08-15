import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import '../styles/LoginPage.css';
import TextField from '@material-ui/core/TextField';
import {Link, useHistory} from 'react-router-dom';

export default function Signup() {
const history = useHistory();
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [image,setImage] = useState("")
const [url,setUrl] = useState(undefined)


useEffect(()=>{
  if(url){
      uploadFields()
  }
},[url])

const uploadPic = ()=>{
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
     setUrl(data.url)
  })
  .catch(err=>{
      console.log(err)
  })
}
const uploadFields = ()=>{

  if (!/^[a-z\d\s]{5,30}$/i.test(name))        //look for regex(regular expression) javascript validation which checks for name , password , email to be valid
    {
        return alert("give a valid name of only characters greater than 5")
    }
    if (!/^[#\w@_-]{8,20}$/.test(password))
    {
        return alert("week password set a password of length 8 or more")
    }
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
        return alert("invalid email")
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      return alert("enter a valid phone number of 10 digits");
    }
    // to handle the CORS error we can use a npm CORS dependancy but we will use proxy instead which will forward the request of localhost 4000 through localost 3000 internally
    // the above is theory delete later
    fetch("/signup",{                   
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            password:password,
            email:email,
            pic:url,
            phoneNumber:phoneNumber
        })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
            console.log(data.error);
            alert(data.error);
            }
            else{
                history.push("/login")
            }
        }).catch(err=>{
            console.log(err);
        })


}


const PostData = ()=>{
  if(image){
      uploadPic()
  }else{
      uploadFields()
  }
 
}

  return (
      <div className="Logincontainer">
    <div className="cardComponent">
       
      <div>
        <div className="Logintext">
          Signup
        </div>
        
      </div>
      <div className="textfields">
      <TextField id="standard-basic" className='textField-styles' label="name"
      value={name}
      onChange={(e)=>setName(e.target.value)} />
      </div>
      <div className="textfields">
      <TextField id="standard-basic" className='textField-styles' label="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)} />
      </div>
      <div className="textfields">
      <TextField id="standard-basic" className='textField-styles' label="password"
      type="password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <div className="textfields">
      <TextField id="standard-basic" className='textField-styles-last' label="phone Number"
      value={phoneNumber}
      onChange={(e)=>setPhoneNumber(e.target.value)} />
      </div>

      <div className="file-field input-field textField-styles-last">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>

      <div>
        <Button variant="contained" color="primary" onClick={PostData}>Signup</Button>
      </div>
     <h1><Link to = "/login" style={{textDecoration:"none"}}>already have an account?</Link></h1>
    </div>
    </div>
  );
}
