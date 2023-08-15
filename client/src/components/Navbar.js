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
import '../styles/Navbar.css';

<style>
@import url('https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap');
</style>


const useStyles = makeStyles((theme) => ({
  searchLink: {
    textDecoration: "none",
    color: "black",
  },
}))



export default function SearchAppBar() {
  const [open, setOpen] = useState(false);
  const [searchUsers,setSeachUsers] = useState([]);
  const {state,dispatch} = useContext(UserContext) 
  const [location,setLocation] = useState("/");
  const history = useHistory();
  const classes = useStyles();
  const [ showBurgerMenu, setShowBurgerMenu ] = useState(null);

  const humbergerMenuHandler = () => {
    console.log("hamburerger menu toggle!")
    setShowBurgerMenu(!showBurgerMenu);  
  }

  useEffect(()=>{
    return history.listen((location) => { 
      var str = location.pathname
    
    setLocation(str)
    console.log("the location is=> ", str);
   })

  },[history])

  useEffect(()=>{

    const navbarCard = document.querySelector(".navbar-menu");
    if(showBurgerMenu !== null){
        if(!showBurgerMenu) {
            navbarCard.classList.remove("show-navbar");
            navbarCard.classList.add("hide-navbar");
        } else if(showBurgerMenu) {
            navbarCard.classList.remove("hide-navbar");
            navbarCard.classList.add("show-navbar");
        }
    }
  }, [showBurgerMenu])

  useEffect(()=>{
    console.log("searchUser state => ", searchUsers);
  }, [searchUsers])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const renderList = () =>{
  if(state){
    return [
      <div className='navbar-item-text-style'><Link to="/profile" className="navbar-link-style">Profile</Link></div>,
      <div className='navbar-item-text-style'><Link to="/createpost" className="navbar-link-style">CreatePost</Link></div>,
      <div className='navbar-item-text-style'><Link to="/" className="navbar-link-style">Home</Link></div>,
      <Button variant="contained" className='logout-btn' color="secondary" onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push("/login")
      }}>Logout</Button>
     
    ]
  }
  else{
    return[
      <div style={{padding:"1%" ,display:"inline"}}><Link to="/signup" className="navbar-link-style">Signup</Link></div>,
      <div style={{padding:"1%" ,display:"inline"}}><Link to="/login" className="navbar-link-style">Login</Link></div>,
      
     
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
  <div className='search-modal'>
  <InputBase
      placeholder="Search…"
      style={{border:"1px solid black"}}
      inputProps={{ 'aria-label': 'search' }}
      onChange = {(e)=>searchHandle(e.target.value)}
    />
  <ul style = {{"list-style-type":"none"}}>
  {searchUsers.map((item)=>{
    if(item.tweet){
      return <Link className={classes.searchLink} to={`/tweet/${item._id}`} onClick={handleClose}><li><div className='search-item'>{item.tweet}</div></li></Link>
    }
    return(
      
        <Link className={classes.searchLink} to={state._id&&item._id === state._id?"/profile":"/profiles/"+item._id} onClick={handleClose}><li><div className='search-item'>{item.email}</div></li></Link>
      
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
    fetch('/search',{
    method:'post',
    headers:{
      'Content-type': 'application/json'
    },
    body:JSON.stringify({
      query:query
    })

  }).then(res => res.json())
  .then((result)=>{
    setSeachUsers([ ...result.tweets, ...result.users])
    console.log("search result are => ", [ ...result.tweets, ...result.users])
  }).catch((err)=>{
    console.log(err)
  })

}

  return (
    <div>
      <AppBar position="static" style={{backgroundColor:"white",color:"black"}}>
        
          <IconButton onClick={humbergerMenuHandler} className='hamburger-icon' edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <div className="instagramtext">Instagram</div> 
          <div className='navbar-menu'>
          {renderList()}

          <div style={{
                position:"relative" ,
                width:"70%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
          }}>
          
          </div >
          
          {renderSearch()}
          </div>
      </AppBar>
    </div>
  );
}
