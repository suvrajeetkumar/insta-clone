import React, { Component} from "react";
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class CreatePhotoPost extends Component {

state = {
    title:"bjk",
    body:"",
    image:"",
    url:""
}

postDetails = () =>{
  console.log("runs")
    const data = new FormData()
    data.append("file",this.state.image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","suvra15")
    fetch("https://api.cloudinary.com/v1_1/suvra15/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      this.setState({url:data.url})

      fetch("/createpost",{                   
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
          title:this.state.title,
          body:this.state.body,
          pic:data.url
            
        })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
            console.log(data.error);
            alert(data.error);
            }
            else{
              console.log("posted")
              this.props.history.push('/');
                
            }
        }).catch(err=>{
            console.log(err)
        })

    })
    .catch(err=>{
      console.log(err)
    })

    
  
}

handleFileUpload = event => {
  console.log(event.target.files[0]);
  this.setState({image:event.target.files[0]})
  console.log(this.state.title)
  console.log(this.state.body)
};

  



  render() {
    return (
     
        
        <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            
        }}>
            <h1 style={{margin:"5vh"}}>Create Post</h1>
            <div style={{
            margin:"5vh",    
            padding:"5%",
            width: "60vw",
            boxShadow:"0 0 10px"}}>
            <TextField id="standard-basic" label="add titile" style={{width:"100%"}}
            value={this.state.title}
            onChange={(e)=>this.setState({title: e.target.value})}/>
            <TextField id="standard-basic" label="add Description" style={{width:"100%"}}
            value={this.state.body}
            onChange={(e)=>this.setState({body: e.target.value})}/>
            <input
          ref="fileInput"
          onChange={this.handleFileUpload}
          type="file"
          style={{ display: "none" }}
          // multiple={false}
        />
        <button onClick={() => this.refs.fileInput.click()}>Upload File</button>
        <div style={{display:"flex",justifyContent:"center"}}>
        <Button variant="contained" color="primary" onClick={this.postDetails}>
        Post
      </Button>
      </div>
            </div>
        </div>
     
    );
  }
}

export default CreatePhotoPost;