import React, { useEffect, useState } from 'react';
import './blogpost.css'
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import { Comment } from '../Components/Comment';

const BlogPost = () => {
   const location=useLocation();
   console.log("kmdqkm",location.state._id);
   const timestamp = new Date(location.state.createdAt);
const year = timestamp.getFullYear().toString().slice(2);
const month = ('0' + (timestamp.getMonth() + 1)).slice(-2);
const day = ('0' + timestamp.getDate()).slice(-2);
const authorobj=location.state.author;
const author=authorobj.username;
const yyMMdd = year + '-' + month + '-' + day;
//http://localhost:4000/api/v1/getcomment   --getcomment
  // http://localhost:4000/api/v1/comment      --handling comment
  const token = localStorage.getItem('jwtToken');
  const decodedToken = token ? jwtDecode(token) : null;
  const [comment,setComment]=useState('');
  const navigate=useNavigate();
async function clickHandler(){
  const response=await fetch('http://localhost:4000/api/v1/comment ',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      comment:comment,
      userId:decodedToken.id,
      postId:location.state._id,
    })
  })
window.location.reload();

}
const [data,setData]=useState([]);
async function getComment(){
  const response=await fetch('http://localhost:4000/api/v1/getcomment',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      id:location.state._id,
    })

  })
  console.log(response ,49)
  if (response.ok) {
    const iteams = await response.json();
    console.log("comments", iteams.data);
    setData(iteams.data);
  } else {
    console.error("Error: " + response.status);
    setData([]);
  }

}


useEffect(()=>{
  getComment();
},[]);
  return (
    <div className='blog-box'>
    <div className="blog-post">
      <img className="blog-post__image" src={`http://localhost:4000/${location.state.photo}`} alt="Blog Post" />
      <div className="blog-post__content">
        <h2 className="blog-post__title">{location.state.title}</h2>
        <p className="blog-post__categories" style={{color:"green"}}>{location.state.categories}</p>
        <p className='info'>{yyMMdd}{' |'} <span style={{color:"blue"}}>{author}</span></p>
        <p className="blog-post__text">{location.state.content}  </p>
      </div>
      
    </div>
    <div className="comment">
      <div className=''>
       <h3>{data.length} Comments</h3>
      </div>
      <hr></hr>
  {
    data.map((comment)=>{
      return <Comment item={comment}/>
    })
  }
  <hr></hr>
  <div className="comment-form">
    <textarea className='textarea' type="text" id="comment-input" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Add a comment"/>
    <button id="submit-btn" onClick={clickHandler}>Submit</button>
  </div>
</div>

  </div>
  );
};

export default BlogPost;
