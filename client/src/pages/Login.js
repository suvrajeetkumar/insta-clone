import React,{useState,useContext} from 'react';
import {UserContext} from '../App'
import Button from '@material-ui/core/Button';
import '../styles/LoginPage.css';
import TextField from '@material-ui/core/TextField';
import {Link, useHistory} from 'react-router-dom';

export default function SimpleCard() {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const PostData = () =>{
    

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
        return alert("invalid email")
    }
     
      //to handle the CORS error we can use a npm CORS dependancy but we will use proxy instead which will forward the request of localhost 4000 through localost 3000 internally
      //the above is theory delete later
      fetch("/signin",{                   
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email:email,
              password:password
              
          })
          }).then(res=>res.json())
          .then(data=>{
              console.log(data)
              if(data.error){
              console.log(data.error);
              alert(data.error);
              }
              else{
                console.log("else statement had run")
                  localStorage.setItem("jwt",data.token)
                  localStorage.setItem("user",JSON.stringify(data.user))
                  dispatch({type:"USER",payload:data.user})
                  history.push("/")
              }
          }).catch(err=>{
              console.log(err);
          })
  }
  
  

  return (
      <div className="Logincontainer">
    <div className="cardComponent">
       
      <div>
        <div className="Logintext">
          Login
        </div>
        
      </div>
      <div className="textfields">
      <TextField id="standard-basic" className='textField-styles' label="email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)} />
      </div>
      <div className="textfields">
      <TextField id="standard-basic" className='textField-styles-last' label="password"
      type="password"
      value={password} 
      onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={PostData}>Login</Button>
      </div>
      <h1><Link to = "/signup" style={{textDecoration:"none"}}>Don't have an account?</Link></h1>
     
    </div>
    </div>
  );
}
