import React, { useEffect, useState } from "react";
import axios from 'axios';


export default function MovieApp() {
   const [movieData,setMovieData]=useState([]);
   const [changeData,setChangeData]=useState('');
   const [submitData,setSubmitData]=useState('');

const options = {
  method: 'GET',
  url: 'https://online-movie-database.p.rapidapi.com/auto-complete',
  params: {q: `${submitData}`},
  headers: {
    'X-RapidAPI-Key': 'b2348dbc2fmsh07266e5a813589ep1349ebjsn74336d471aa3',
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }
};
useEffect(()=>{
    const getData= async()=>{
        try {
            const response = await axios.request(options);
            console.log(response.data.d[0].i.imageUrl);
            setMovieData(response.data.d)
        } catch (error) {
            console.error(error);
        }
    }
    if(submitData){
        getData();
    }
},[submitData])



    const onchangeHandler=(event)=>{
        setChangeData(event.target.value);
    }
    const submitHandler=(event)=>{
       event.preventDefault();
       setSubmitData(changeData);
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
            <label >Search Movie</label>
            <input type="text" onChange={onchangeHandler}/>
            <button >GET</button>
        </form>
      
      {
        movieData.map((item)=>(
            <div style={{display:'flex', flexWrap:'wrap', margin:'2rem'}} key={item.id}><span style={{margin:'4px'}}>Name: {item.l}</span>  <span span style={{margin:'4px'}}>Type of the Show: {item.q}</span>  
            {item.i && item.i.imageUrl && <img style={{height:'14rem', width:'10rem'}} src={item.i.imageUrl} alt={item.l} />}
            
            </div>
        ))
      }
    </div>
  );
}
