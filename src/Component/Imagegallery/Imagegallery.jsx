import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Imagegallery() {
    const [imageData,setImageData]=useState([]);
    const[enteredData,setEnteredData]=useState('');
    const [submitData, setSubmitData]=useState('');
   
    const onchngeHandler=(event)=>{
        setEnteredData(event.target.value);
    }
    useEffect(()=>{
       const fetchData= async()=>{
        const response=await axios.get(`https://api.pexels.com/v1/search?query=${submitData}&per_page=15`,{
        headers:{
            Authorization : "RIvMzZ4pXRe1k9XcMWFlRe7xKggttE1D5qEBM2w7CJtbHZA6jGQv29b8",
        }
     })
     
    //  console.log(response.data.photos);
     const data=response.data.photos
     setImageData(data);
       }
       if(submitData){
        fetchData();
       }
    },[submitData])
    const submitHandler= async (event)=>{
        event.preventDefault();
        setSubmitData(enteredData);
        
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
            <label>Search Images</label>
            <input type='text' value={enteredData} onChange={onchngeHandler}/>
            <button >GET Image</button>
        </form>
        
        <div style={{display:'flex', margin:'1rem', flexWrap:'wrap' }}>
        {imageData.map((item)=>(
            <span key={item.id} >
               <img src={item.src.medium} alt={item.alt} style={{ margin:'1rem'}} />
            </span>
        ))}
        </div>
    </div>
  )
}
