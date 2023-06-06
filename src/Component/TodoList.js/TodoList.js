import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function TodoList() {

    const [data, setData]= useState([]);
    const [filteredData, setfilteredData]= useState([]);

    useEffect(()=>{
   try{  async function  fetchData(){
   const res= await axios.get('https://dummyjson.com/todos')
    console.log(res.data);
    setData(res.data.todos);
    
      }
      fetchData();}
      catch(err){
        console.log(err);
      }
    },[])

    const findComplete=(data)=>{
    const completed= data.filter((item)=>item.completed===true);
    
    setfilteredData(completed)
    }
    const notComplete=(data)=>{
        const notComplete=data.filter((item)=>item.completed===false);
        setfilteredData(notComplete);
    }
  return (
    <div>
        <button onClick={()=>{findComplete(data)}}>Completed</button>
        <button onClick={()=>{notComplete(data)}}>Not completed</button>
        {filteredData.map((item)=>(
            <li key={item.id}>{item.todo}</li>
        ))}
        {filteredData.length===0 && data.map((item)=>(
            <li key={item.id}>{item.todo} {item.completed.toString()}</li>
        ))}

        
    </div>
  )
}
