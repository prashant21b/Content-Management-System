import React, { useEffect, useState } from 'react'
import Blog from '../Components/Blog';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
// import '../Components/card.css'
export const Blogs = () => {
const [loading,setLoading]=useState(false);
const [data,setData]=useState([]);
   async function getData(){
    const token = localStorage.getItem('jwtToken');
  const decodedToken = token ? jwtDecode(token) : null;
  const userId=decodedToken.id;
        const API_URL=`http://localhost:4000/api/v1/userpost/${userId}`
        try {
            const res = await fetch(API_URL);
            console.log("re->>",res)
            if (res.ok) {
              const iteams = await res.json();
              console.log("product data", iteams.data);
              setData(iteams.data);
            } else {
              console.error("Error: " + res.status);
              setData([]);
            }
          } catch (error) {
            console.error("Error:", error);
            setData([]);
          }
          setLoading(false);
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <>
    {
      data.length>0?(
        <>

    <h2 style={{textAlign:"center",marginTop:"50px"}} >MY BLOGS</h2>
    <div className='container' style={{width:"1570px",margin:"auto",display:"flex",flexWrap:"wrap",justifyContent:"space-around",marginTop:"40px"}}>
        
      {
        
     data.map((item)=>{
       return <Blog  key={item._id} item={item}/>
     })
        }
    </div>
    </>
      ):(<div className='msg'>
          <h4>No Blog Found....</h4>
          <Link className='button' to='/create'>Create Now</Link>
      </div>)
    }
    </>
  )
}
