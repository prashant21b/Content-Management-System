import React, { useEffect, useState } from 'react'
import Card from './Card';
import './cards.css'
import Filter from './Filter';
import { Spinner } from './Spinner';
export const Cards = () => {
const [loading,setLoading]=useState(false);
const [data,setData]=useState([]);
   async function getData(){
        const API_URL='http://localhost:4000/api/v1/post'
        try {
          setLoading(true);
            const res = await fetch(API_URL);
            console.log("re->>",res)
            if (res.ok) {
              const iteams = await res.json();
              console.log("product data", iteams.data);
              const sortedData = iteams.data.sort((a, b) => b.likes - a.likes);
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
const [category, setCategory] = useState("All");
function getdata() {
  if(category === "All") {
      
      
      return data;
  }
  else {
      //main sirf specific categiry ka data array krunga  
      const filteredData = data.filter(item => item.categories === category);
      return filteredData;       
  }

}
  return (
    <>{
    !loading?(<>
    <h2 style={{textAlign:"center"}}>TOP POSTS</h2>
    <Filter 
          filterData={data}
            category={category}
            setCategory={setCategory}
          />
    <div className='container'>
       
      {
        
     getdata().map((item)=>{
       return <Card  key={item._id} item={item} category={category}/>
     })
        }
    </div>
    </>):(<Spinner/>)
}
    </>
  )
}
