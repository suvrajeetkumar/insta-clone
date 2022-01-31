const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = require('../models/posts');
const User = require('../models/accounts');
router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id name") 
    .populate("comments.postedBy","_id name")               //if we donot use populate then postedBy object will not expand . The second field in the populate function takes the items which needs to be shown eg., here we only show the _id , name instead of showing all the details of postedBy
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)    
    })
})
router.get('/mypost',requireLogin,(req,res)=>{
    
        Post.find({postedBy:req.user._id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({posts})
        })
    
})

router.get('/getsubposts',requireLogin,(req,res)=>{
    
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .sort('-createdAt')
    .exec((err,posts)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        res.json({posts})
    })

})
 
router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic} = req.body
    if(!title || !body || !pic){
        return res.status(422).json({error:"please add all the fields"})
    }
    console.log(req.user)
    const post = new Post({
        title,
        body,
        pic,
        postedBy:req.user
    })
    post.save().then(saved=>{
        res.json({post:saved})
    })
    .catch(err=>{
        console.log(err);
    })
   
})

router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postID,{
        $push:{likes:req.user._id}              //pushes the users id to the likes array
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postID,{
        $pull:{likes:req.user._id}          //pulls or removes the users id to the likes array
    },{
        new:true                    //so that mongodb returns us a new updated record and not an old record
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postID,{
        $push:{comments:comment}              //pushes the users id to the likes array
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{

        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/deletecomment/:postId/:commentI',requireLogin,(req,res)=>{
    var postedby = "";
    var commentedBy = "";
    Post.findOne({_id:req.params['postId']})
    .populate("postedBy","_id")
    .then(post=>{
        res.json({post})

        var i = 0 ;
        
        postedby = post.postedBy._id.toString();
        commentedBy = post.comments[0].postedBy._id.toString();
        console.log(post);
        while(i<post.comments.length){
            if(post.comments[i]._id === req.params['commentI']){
                console.log("yes")
                commentedBy = post.comments[i].postedBy._id.toString()
            }
            i++;
        }
       
        console.log(commentedBy);
        
    })
    .catch(err=>{
        console.log(err);
    })

    if((postedby === req.user._id.toString())||(commentedBy.toString() === req.user._id.toString())){
        console.log("running")
        Post.findByIdAndUpdate(req.params['postId'],{
            $pull:{comments:{_id:req.params['commentI']}}
        },{
            new:true  
        })
        .exec((err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }else{
                res.json(result)
            }
        })
    }
    
    
}) 

// router.get('/getacomment',requireLogin,(req,res)=>{
//     Post.find({_id:"608530dc02549e06882b478c"})
//     .populate("postedBy","_id")
//     .then(post=>{
//         res.json({post})
//     })
//     .catch(err=>{
//         console.log(err)    
//     })
// })

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
        }
    })
})

module.exports = router;