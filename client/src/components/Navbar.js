import React,{useContext,useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Link,useHistory} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import SearchIcon from '@material-ui/icons/Search';
import '../App.css';
import {UserContext} from '../App'
import { useEffect } from 'react';

<style>
@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');
</style>



export default function SearchAppBar() {
  const [open, setOpen] = useState(false);
  const [searchUsers,setSeachUsers] = useState([]);
const {state,dispatch} = useContext(UserContext) 
const [location,setLocation] = useState("");
const history = useHistory()

useEffect(()=>{
  return history.listen((location) => { 
    var str = location.pathname
  
  setLocation(str)
  console.log(str)
 })
  
},[history])

const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const renderList = () =>{
  if(state){
    return [
      <div style={{padding:"1%" ,display:"inline"}}><Link to="/profile" style={{textDecoration:"none"}}>Profile</Link></div>,
      <div style={{padding:"1%" ,display:"inline"}}><Link to="/createpost" style={{textDecoration:"none"}}>CreatePost</Link></div>,
      <div style={{padding:"1%" ,display:"inline"}}><Link to="/" style={{textDecoration:"none"}}>Home</Link></div>,
      <Button variant="contained" color="secondary" onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push("/login")
      }}>Logout</Button>
     
    ]
  }
  else{
    return[
      <div style={{padding:"1%" ,display:"inline"}}><Link to="/signup" style={{textDecoration:"none"}}>Signup</Link></div>,
      <div style={{padding:"1%" ,display:"inline"}}><Link to="/login" style={{textDecoration:"none"}}>Login</Link></div>,
      
     
    ]
  }
}


const renderSearch = () =>{

if(location === '/'){
  return [
    <div style={{"position":"relative" , "width":"20%"}}>
    <div style={{
        top:"50%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
      <SearchIcon onClick={handleOpen} style={{ cursor: "pointer"}}/>
    <h4 onClick={handleOpen}  style={{ cursor: "pointer"}}>search</h4>
    {/* <InputBase
      placeholder="Search…"
      style={{border:"1px solid black"}}
      inputProps={{ 'aria-label': 'search' }}
    /> */}
  </div>
  
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description"
  >
  <div style={{"overflow-y":"scroll",width:"30vw" , height:"50vh" , position:'absolute' ,top:"1%", left:"69%" , padding:"4% 2%" , boxSizing:"border-box", backgroundColor:"white"}}>
  <InputBase
      placeholder="Search…"
      style={{border:"1px solid black"}}
      inputProps={{ 'aria-label': 'search' }}
      onChange = {(e)=>searchHandle(e.target.value)}
    />
  <ul style = {{"list-style-type":"none"}}>
  {searchUsers.map((item)=>{
    return(
      
        <Link to={state._id&&item._id === state._id?"/profile":"/profiles/"+item._id} onClick={handleClose}><li><h2>{item.email}</h2></li></Link>
      
    )
  })}
    
  </ul>  
  </div>
  </Modal>
  
  </div>

  ]
}
}

  const searchHandle =(query)=>{
    fetch('/searchuser',{
    method:'post',
    headers:{
      'Content-type': 'application/json'
    },
    body:JSON.stringify({
      query:query
    })

  }).then(res => res.json())
  .then((result)=>{
    setSeachUsers(result)
    console.log(searchUsers)
  }).catch((err)=>{
    console.log(err)
  })

}

  return (
    <div>
      <AppBar position="static" style={{backgroundColor:"white",color:"black"}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>

          {renderList()}
         


          <div style={{
                position:"relative" ,
                width:"70%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
          }}>
          
           <div className="instagramtext">Instagram</div> 
          
          </div >
          
          {renderSearch()}

                 </Toolbar>
      </AppBar>
    </div>
  );
}
