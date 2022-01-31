import React,{useEffect,createContext,useReducer, useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import OtherUser from './components/OtherProfiles'
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost'
import {reducer,initialState} from './reducers/userReducer'


export const UserContext = createContext()

const Routing = () =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    else{
      history.push('/login')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
      <Home />
    </Route>
    <Route path="/signup">
      <Signup/>
    </Route>
    <Route exact path="/profile">
      <Profile/>
    </Route>
    <Route path="/login">
      <Login/>
    </Route>
    <Route path="/profiles/:userid">
      <UserProfile/>
    </Route>
    <Route path="/createpost">
      <CreatePost/>
    </Route>
    <Route path="/otherprofiles">
      <OtherUser/>
    </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state:state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>  
     
    
  );
}

export default App;
