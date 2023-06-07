import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherApp() {
  const [data, setData] = useState([]);
  const [enteredCity, setEnteredCity]=useState('');
  const [submitCity,setSubmitCity]=useState('');

  const[cityData,setcityData]=useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Z5wHCGQ8pkqz0ZtaiwWxCdh4GuIAsPln&q=${submitCity}`
        );
        console.log("Location",res.data[0].Key);
        const LocationKey=res.data[0].Key;
        const weatherData = await axios.get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LocationKey}?apikey=Z5wHCGQ8pkqz0ZtaiwWxCdh4GuIAsPln`
        );

        const response = weatherData.data.DailyForecasts;
        console.log("Response", response);
        setData(response);
        setcityData(res.data[0].LocalizedName);
      } catch (error) {
        console.log(error);
      }
    };
    if(submitCity){
      fetchData();
    }
    
  }, [submitCity]);
  const handleCityChange=(event)=>{
    setEnteredCity(event.target.value);
  }
 
  const submitHandler=(event)=>{
    event.preventDefault();
    setSubmitCity(enteredCity.toLowerCase())
    
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
      <label>Input City</label>
      <input value={enteredCity} type="text" onChange={handleCityChange}/>
      <button>Submit</button>
      </form>
        <h3>{cityData}</h3>
      {data.map((item, index) => (
        <li key={index}>
          {item.Date} <br/>
          Minimum Temperature: {item.Temperature.Minimum.Value}{" "}
          {item.Temperature.Minimum.Unit}
          <br />
          Maximum Temperature: {item.Temperature.Maximum.Value}{" "}
          {item.Temperature.Maximum.Unit}<br/>
          Night Weather :{item.Night.IconPhrase}<br/>
          Day Weather :{item.Day.IconPhrase}
        </li>
      ))}
    </div>
  );
}
