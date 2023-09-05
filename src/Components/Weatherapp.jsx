import React, { useState } from 'react'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import cloudIcon from '../assets/cloud.png'
import humidIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import windIcon from '../assets/wind.png'
import snowIcon from '../assets/snow.png'
import drizzleIcon from '../assets/drizzle.png';
import './Weatherapp.css';

const Weatherapp =  () => {

    const [wicon,setWicon]=useState(cloudIcon);

    const apiKey='133026618a6977e450cfc1c1aad824fd';

    const search= async ()=>{
        const element=document.getElementsByClassName('city-input');
        if(element[0].value===0){
            return 0;
        }
       let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${apiKey}`;
try{
       let response=await fetch(url);
       if(!response){
        throw new Error(`API request failed with status: ${response.status}`);

       }
       let data=await response.json();

       const humidity=document.getElementsByClassName('humidity-per')
       const wind=document.getElementsByClassName('wind-speed');

       const temp=document.getElementsByClassName('weather-temp');

       const location=document.getElementsByClassName('weather-location');


       humidity[0].innerHTML=data.main.humidity+" %";
       wind[0].innerHTML=data.wind.speed+"km/h";
       temp[0].innerHTML=data.main.temp+"°";
       location[0].innerHTML=data.name;

       if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n' ){
        setWicon(clearIcon);
       }
       else if(data.weather[0].icon==='02d'|| data.weather[0].icon==='02n'){
        setWicon(cloudIcon);
       }
       else if(data.weather[0].icon==='03d'|| data.weather[0].icon==='03n'){
        setWicon(drizzleIcon);
       }
       
       else if(data.weather[0].icon==='04d'|| data.weather[0].icon==='04n'){
        setWicon(drizzleIcon);
       }
       else if(data.weather[0].icon==='09d'|| data.weather[0].icon==='09n'){
        setWicon(rainIcon);
       }
       
       else if(data.weather[0].icon==='10d'|| data.weather[0].icon==='10n'){
        setWicon(rainIcon);
       }
       else if(data.weather[0].icon==='13d'|| data.weather[0].icon==='13n'){
        setWicon(snowIcon );
       }
       else{
        setWicon(clearIcon);
       }
    }
    catch (error) {
        console.error(error);
        // Handle the error, e.g., show an error message to the user
      }







        
    }
  return (
    <div>
      <div className="container">
        <div className="top-bar">
            <input type="text" className="city-input topimg" placeholder='enter the city'/>
            <img src={searchIcon} className='searchIcon topimg' onClick={search } />
            
        </div>
      <div className="weather-image">
        <img src={wicon} alt=""  />

      </div>
      <div className="weather-temp">

      </div>
      <div className="weather-location">
      </div>

      <div className="data-container">
        <div className="element">
            <img src={humidIcon} alt="" />
            <div className="data">

            <div className="humidity-per"></div>
            <div className="text">Humidity</div>
            </div>
        </div>
        <div className="element">
            <img src={windIcon} alt="" />
            <div className="data">

            <div className="wind-speed"></div>
            <div className="text">Wind Speed</div>
            </div>
        </div>
      </div>
      </div>

    </div>
  )
}

export default Weatherapp
