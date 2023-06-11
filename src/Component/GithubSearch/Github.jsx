import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Github() {
    const[data, setData]=useState();
    const[enteredName,setEnteredname]=useState('');
    const[submitName,setSubmitName]=useState('');

    useEffect(()=>{
        const fetchData=async()=>{
            const response=await axios.get(`https://api.github.com/users/${submitName}`);
            console.log(response.data);
            setData(response.data);
        }
        if(submitName){
        fetchData();
        }
    },[submitName])
    const changeHandler=(event)=>{
        setEnteredname(event.target.value);
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        setSubmitName(enteredName);
        setEnteredname('')
    }
  return (
    <div>
        <form onSubmit={submitHandler}>
         <label>Name</label>
         <input type='text' value={enteredName} onChange={changeHandler}/>
         <button>Submit</button>
        </form>
      {data && (
      <div>
        <h3>User: {data.name}</h3>
        <img src={data.avatar_url} style={{height:'120px', width:'120px'}}/> <br/>
        <a href={data.repos_url}>Repos</a><span style={{marginLeft:'1rem'}}>Public Repos:{data.public_repos}</span>
        <br/>
        <a href={data.html_url}>  Github</a>
        <p>Followers :{data.followers}</p>
        <p>Following :{data.following}</p>

        </div>
      )}
    </div>
  )
}
