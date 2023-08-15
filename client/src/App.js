import React,{useEffect,createContext,useReducer, useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import OtherUser from './components/OtherProfiles'
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import {reducer,initialState} from './reducers/userReducer'
import SelectPostType from './components/createPost/SelectPostType';
import CreateTweet from './components/createPost/CreateTweet';
import CreatePhotoPost from './components/createPost/CreatePhotoPost';
import EditTweet from './components/createPost/EditTweet';
import TweetPage from './pages/TweetPage';


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
    <Route exact path="/createpost">
      <SelectPostType/>
    </Route>
    <Route path="/createpost/tweet">
      <CreateTweet/>
    </Route>
    <Route path="/createpost/photo">
      <CreatePhotoPost/>
    </Route>
    <Route path="/otherprofiles">
      <OtherUser/>
    </Route>
    <Route path="/edit/:postId" component={EditTweet}>
    </Route>
    <Route path="/tweet/:postId" component={TweetPage}>
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
