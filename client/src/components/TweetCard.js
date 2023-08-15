import React ,{useContext,useEffect} from 'react';
import {UserContext} from '../App'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import { createBrowserHistory } from 'history';


const useStyles = makeStyles((theme) => ({
  root: {
    width:"500px"
  },
  media: {
    height: "70vh",
    backgroundSize:"content" // 16:9

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  llke:{
      color:"red"
  },
  unlike:{
      color:""
  },
  tweet: {
    padding: "30px 10px",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
  },
  tweetCards: {
    width: "300px",
    height: "auto",
    boxShadow: "0 0 10px #ccc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px 10px",
    boxSizing: "border-box",
   },
   tweetCardContent: {
    width: "100%",
    padding: "0px 15px 24px 15px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignContent: "start",
   },
   tweetBtnWrapper: {
    display: "flex"
   },
   UpdateTweetBtn: {
    textDecoration: "none",
    color: "black",
    background: "lightblue",
    padding: "5px 20px",
    boxShadow: "0 0 10px #ccc",
    marginLeft: "10px",
    fontSize: "12px",
    fontWeight: "500",
    borderRadius: "5px",
   },
   DeleteTweetBtn: {
    textDecoration: "none",
    color: "white",
    background: "#ff5050",
    padding: "5px 20px",
    boxShadow: "0 0 10px #ccc",
    marginLeft: "10px",
    fontSize: "12px",
    fontWeight: "500",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
   },
   LinkStyleNone: {
    textDecoration: "none",
    color: "black"
   },

   '@media (max-width: 600px)': {
        root: {
            width:"80vw",
        }
    },

}));

export default function RecipeReviewCard(props) {

  const {state,dispatch} = useContext(UserContext)
  const history = createBrowserHistory();

  const classes = useStyles();
  const [like, setLike] = React.useState(false);
  const [comment, setComment] = React.useState("");

  useEffect(()=>{
    if(props.likes.includes(state._id)){
      setLike(true)
    }
  },[])

  const likeHandle=()=>{
    
     if(props.likes.includes(state._id)){
      
       if(like){
         props.unlikefun(props.id)
       }
       
     }
     else{
      
      like?props.unlikefun(props.id):props.likefun(props.id)
     }
     setLike(!like)
      
  }
  
  const deletePostHandle = () => {
    props.deletefun(props.id)
  }
  const deleteCommentHandle = (commentid) => {
    props.deleteCommentfun(props.id,commentid)
  }

  const shareButtonHandler = (postId) => {
    const currentUrl = window.location.href;
    const postLink = currentUrl + 'tweet/' + postId;
    const whatsappMessage = `Check out this post: ${postLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  }
  
  return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"3vh"}}>
    
    <Card className={classes.root}>
      <Link className={classes.LinkStyleNone} to={props.postedBy._id !== state._id?"/profiles/"+props.postedBy._id:"/profile"}><CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.postedBy.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.postedBy.name}
        subheader="September 14, 2016"
      />
      </Link>
      {props.postedBy._id === state._id&&<button className={classes.DeleteTweetBtn} onClick={deletePostHandle}>delete</button>}
      {props.postedBy._id === state._id&&<Link className={classes.UpdateTweetBtn} to={`/edit/${props.id}`}>Update</Link>}
           
      <CardContent className={classes.tweetCardContent}>
      <Link className={classes.LinkStyleNone} to={`/tweet/${props.id}`}>
        <div key={props.id} className={classes.tweet}>
          <div className={classes.tweetCards} key={props.id}>{props.tweet}</div>
        </div>
      </Link>
        <div className={classes.tweetBtnWrapper}>
        <IconButton aria-label="add to favorites" style={{color:like?"red":"", width: "25px"}} onClick={likeHandle} >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon onClick={() => shareButtonHandler(props.id)} />
        </IconButton>
        </div>
        <div>{props.likes.length} likes</div>
        {
          props.comments.map(record=>{
            return(
              <div key={record._id}><span style={{fontWeight:"800"}}>{record.postedBy.name} :</span><span> {record.text}</span>{props.postedBy._id === state._id&&<button onClick={()=>deleteCommentHandle(record._id)}>delete</button>}</div>
              
            )
          })
        }
        <form onSubmit={(e)=>{
          e.preventDefault()      //this to prevent the form from refreshing after the form has been submitted
          props.commentfun(e.target[0].value,props.id)
          setComment("");
        }}>
        <TextField id="standard-basic" label="add a comment" value={comment} onChange={(e) => {
            setComment(e.target.value)
            e.preventDefault();
            e.stopPropagation();
        } 
            }/>
        <button type="submit">post</button>
        </form>
        </CardContent>
    </Card>
    {/* </Link> */}
    </div>
  );
}
