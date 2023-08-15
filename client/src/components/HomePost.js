import React ,{useContext,useEffect} from 'react';
import {UserContext} from '../App'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    
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
  like:{
      color:"red"
  },
  unlike:{
      color:""
  },
  postCardContent: {
    width: "100%",
    padding: "0px 15px 24px 15px",
    boxSizing: "border-box",
  },
  postCardHeader: {
    width: "100%",
    paddingRight: "15px",
    boxSizing: "border-box",
  }

}));

export default function RecipeReviewCard(props) {

  const {state,dispatch} = useContext(UserContext)
  const [comment, setComment] = React.useState("");

  const classes = useStyles();
  const [like, setLike] = React.useState(false);
  let likeColor = "";

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

  console.log("comments are => ", props.comments);
  
  return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"3vh"}}>
    <Card className={classes.root}>
      <Link className={classes.postCardHeader} to={props.postedBy._id !== state._id?"/profiles/"+props.postedBy._id:"/profile"}><CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
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
      {props.postedBy._id === state._id&&<button onClick={deletePostHandle}>delete</button>}
      
      
     <img className={classes.media} src={props.src}></img>
           
      <CardContent className={classes.postCardContent}>
      
          <h4 style={{color:"black"}}>{props.name}</h4>
        
        <h5> {props.description}</h5>
   
      <IconButton aria-label="add to favorites" style={{color:like?"red":""}} onClick={likeHandle} >
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
          props.commentfun(e.target[0].value,props.id);
          setComment("");
        }}>
        <TextField id="standard-basic" value={comment} onChange={(e) => setComment(e.target.value)} label="add a comment" />
        <button type="submit">post</button>
        </form>
        </CardContent>
    </Card>
    </div>
  );
}
