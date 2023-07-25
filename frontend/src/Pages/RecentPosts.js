import React, { useEffect, useState } from 'react'

import '../Components/cards.css'
import { RecentPost } from '../Components/RecentPost';
import { Spinner } from '../Components/Spinner';
export const RecentPosts= () => {
const [loading,setLoading]=useState(false);
const [data,setData]=useState([]);
   async function getData(){
        const API_URL='http://localhost:4000/api/v1/post'
        try {
          setLoading(true)
            const res = await fetch(API_URL);
            console.log("re->>",res)
            if (res.ok) {
              const iteams = await res.json();
              console.log("product data", iteams.data);
              const sortedData = iteams.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              setData(sortedData);
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
<>{
  !loading?(<>
<h2 style={{textAlign:"center"}}>RECENT POSTS</h2>
    <div className=''>
       
      {
        
     data.map((item)=>{
       return <RecentPost  key={item._id} item={item}/>
     })
        }
    </div>
    </>):(<Spinner/>)
}
    </>
  )
}
