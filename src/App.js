import React, { useEffect, useState } from "react"

import hotBg from "./assets/hot.jpg"
import coldBg from "./assets/cold.jpg"
import Descriptions from "./components/Descriptions"
import getFormattedWeatherData from "./weatherService"



const App = () => {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg)
  
  useEffect ( () => {
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

  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
        <div className="section section__inputs">
          <input onKeyDown={enterkeyPressed} type="text" name="city" placeholder="Enter City Name.." 
           />
          <button onClick={(e) => handleUnitsClick(e)}>°F</button>
        </div>

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
          )
        }
      
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
