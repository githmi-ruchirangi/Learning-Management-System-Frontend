import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import "./Blogcomment.css"

export default function Blogcomment() {
    const location=useLocation();
const {bid} = location.state;
console.log(bid)
// const {bcomment} = location.state;
const [comments,setComments]=useState([])
const [cbody, setCbody] = useState('')

useEffect(()=>{
const getcomments=async(bid,e)=>{
  await axios.get(`http://localhost:8052/blog/comment/${bid}`).then((res)=>{
      console.log(res);
      setComments(res.data);
  }).catch((err)=>{
      alert(err.message);
  })
}

  getcomments(bid);
},[])


const addblogcomment =async (bid,e) => {
  await axios.post(`http://localhost:8052/blog/comment/1943&84`,
       // params: {
       //   uid: {id},
       // },
     // },
{
       commentbody:cbody,
     })
     .then(() => {
console.log(cbody)
       console.log('Success')
       
       alert('added successed!')
     }
     )
     
 }


  return (
    <div>
    
        <div className="commentbox">
        
  <div className="commentspace">
  <div class="form-outline mb-4">
          <input type="text" id="addANote" class="form-control" 
          onChange={(event) => {
            setCbody(event.target.value)
          }}
          placeholder="Type comment..." />
          
        </div>
        <button type="submit" onClick={addblogcomment}
            className="commentbtn">Submit</button>

        <div class="card mb-4">
         
            
            {comments.map(blog_comment=>{
      return(
        <div class="cardcomment">
        <div className="index" key={blog_comment}> {blog_comment.commenterid} 
            <div className="comment" type="text" key={blog_comment.blogid}>
            {blog_comment.commentbody}
            
            </div>
            </div>
            </div>
            
           )
          })}
      
            </div>
            
         
        </div>

        
  </div>
    
</div>

  )
}
