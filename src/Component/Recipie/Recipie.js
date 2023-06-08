import React, { useEffect,useState } from 'react'
import axios from 'axios'

export default function Recipie() {
    const [mealData,setMealData]=useState([]);
    const[inputData,setInputData]=useState('');
    const [submitData,setSubmitData]=useState('');
    useEffect(()=>{
        const fetchData= async()=>{
            const response= await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${submitData}`)
            console.log(response.data.meals);
            setMealData(response.data.meals)
        }
        if(submitData){
        fetchData()}

    },[submitData])

    const changeHandler=(event)=>{
        setInputData(event.target.value);
    }

    const submithandler=(event)=>{
        event.preventDefault();
        setSubmitData(inputData);
    }
  return (
    <div>
    <form onSubmit={submithandler}>
        <label>Recipie</label>
        <input type='text' onChange={changeHandler}/>
        <button> Search</button>
    </form>
    {mealData.map((item)=>(
        <ul key={item.id}>
           <li>Recipie title :{item.strMeal}</li> 
            <li>Recipie Category :{item.strCategory}</li>
            <li> Recipie :{item.strInstructions}</li>
            <img src={item.strMealThumb}/>
            </ul>
    ))}
    </div>
  )
}
