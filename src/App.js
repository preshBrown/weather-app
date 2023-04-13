import React, { useEffect, useState } from "react"

import hotBg from "./assets/hot.jpg"
import coldBg from "./assets/cold.jpg"
import Descriptions from "./components/Descriptions"
import Spinner from "./components/Spinner"
import ErrorModal from "./components/ErrorModal"
// import getFormattedWeatherData from "./weatherService"



const App = () => {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg)
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);



console.log(`ERR: ${err}`);
  
//   useEffect ( () => {
//     const fetchWeatherData = async () => {
//       const data = await getFormattedWeatherData(city, units);
//       setWeather(data);

    
//     // dynamic bg
//     const threshold = units === "metric" ? 20 : 60;
//     if (data.temp <= threshold) setBg(coldBg)
//     else setBg(hotBg) ;
//     }

//     fetchWeatherData();
// }, [units, city])

useEffect ( () => {
  const API_KEY = "b952f74e3c1a2c265b7ffa57a78e62ed";
const makeIconURL = (iconID) => `https://openweathermap.org/img/wn/${iconID}@2x.png`


const getFormattedWeatherData = async (city, units = "metric") => {
  setLoading(true)
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    

    const data = await fetch(URL)
    .then((res) => res.json())
    .then( (data) => {
      setLoading(false)
      return data}).catch(error =>  {
        setWeather(false)
        setErr("Something went wrong!")
        setLoading(false)
        console.log(error);
      });


    const {
        weather,
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
        name,
        sys: {country},
        wind: {speed}
    } = data; 

    const {description, icon} = weather[0]

    return {description, temp, feels_like, temp_min, temp_max, pressure,
            humidity, name, country, iconURL: makeIconURL(icon), speed};

}


  const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city, units);
    setWeather(data);

  
  // dynamic bg
  const threshold = units === "metric" ? 20 : 60;
  if (data.temp <= threshold) setBg(coldBg)
  else setBg(hotBg) ;
  }

  fetchWeatherData();
}, [units, city])


const handleUnitsClick = (e) => {
  const button = e.currentTarget;
  const currentUnit = button.innerText.slice(1);
  console.log(currentUnit)

  const isCelsius = currentUnit === "C";
  button.innerText = isCelsius ? "°F" : "°C";
  setUnits(isCelsius ? "metric" : "inperial"); 
}
const enterkeyPressed = (e) => {
  if (e.keyCode === 13) {
    setCity(e.currentTarget.value);
    e.currentTarget.blur();
  }
}

const clearError = () => {
  setErr(null);
};

         let weatherOutput = <Spinner />
         if(!loading && weather) {
          weatherOutput = (
            <div style={{display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh'}}>
            <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL}
                   alt="weatherIcon" 
                   />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{weather.temp.toFixed()} °{units ==="metric" ? "C" : "F"}</h1>
            </div>
          </div>
  
          <Descriptions 
            weather={weather}
            units={units}/>
            </div>
          )}

          if(!loading && !weather ) {
            weatherOutput = (<div className="reload-app" style={{display: 'flex', 
                                          justifyContent: 'center', 
                                          alignItems: 'center', 
                                          height: '100vh'}}>
           <a href="/"> <h3><strong>Reload App</strong></h3></a>
            </div>)
          };

  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {err && (
        <ErrorModal onClose={clearError}>{err}</ErrorModal>
      )}
        
            <div className="container" >
        <div className="section section__inputs">
          <input onKeyDown={enterkeyPressed} type="text" name="city" placeholder="Enter City Name.." 
           />
          <button onClick={(e) => handleUnitsClick(e)}>°F</button>
        </div>
        {weatherOutput}
       
      </div>
    </div>
  </div>
  )
}

export default App


























// import './App.css';
// import TopButtons from "./components/TopButtons";
// import Inputs from "./components/Inputs";
// import TimeAndLocation from "./components/TimeAndLocation";
// import TemperatureAndDetails from "./components/TemperatureAndDetails";
// import Forecast from "./components/Forecast";
// import getFormattedWeatherData from './services/weatherService';

// const App = () => {

//   const fetchWeather = async () => {
//     const data = await getFormattedWeatherData({q: "london"});
//     console.log(data);
//   }

// fetchWeather();
//   return (
//     <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
//       <TopButtons />
//       <Inputs />

//       <TimeAndLocation />
//       <TemperatureAndDetails />
//       <Forecast title="Hourly forecast" />
//       <Forecast title="Daily" />
//     </div>
//   );
// }

// export default App;
