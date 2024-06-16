import "./write.css"
import TopBar from "../topbar/TopBar";
import axios from "axios";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar"


function Write() {
  
  const [title, setTitle] = useState('')
  const [blogbody, setBlogbody] = useState('')
console.log(title)
console.log(blogbody)

  const addblog =async () => {
   await axios.post('http://localhost:8052/blog/addblog/1941',
        // params: {
        //   uid: {id},
        // },
      // },
{
        blogtitle:title,
        body:blogbody,
      })
      .then(() => {
        console.log(title)
console.log(blogbody)
        console.log('Success')
        
        alert('added successed!')
      }
      )
      
  }

  return (
    <div>
    <Navbar/>
      <div className="postswrite">
        
        <div>
        <TopBar/>
        </div>
         
    <div className="writes">
       
      {/* <img 
      className="writeImg"
      src="https://images.unsplash.com/photo-1598929440520-dc9f18462281?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" 
      alt=""/> */}
    <form className="writeForm">
        <div className="writeFormGroup">
            <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
            </label>


            <input type="file" id="fileInput"/>
            <input type="text" 
            onChange={(event) => {
              setTitle(event.target.value)
            }}
            placeholder="   Title" 
            className="writeInput" 
           />
        </div>
        <div className="writeFormGroup">
            <textarea placeholder="Tell your story..." 
            type="text"
            onChange={(event) => {
              setBlogbody(event.target.value)
            }}
            className="writeInput writeText">
            </textarea>
            
        </div>
       
        <button type="submit" className="writeSubmits" onClick={addblog}
        >Publish</button>
       
        
    </form>
    </div>
    </div>
    </div>
  )
}

export default  Write;