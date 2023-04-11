const API_KEY = "b952f74e3c1a2c265b7ffa57a78e62ed";
const makeIconURL = (iconID) => `https://openweathermap.org/img/wn/${iconID}@2x.png`


const getFormattedWeatherData = async (city, units = "metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    

    const data = await fetch(URL)
    .then((res) => res.json())
    .then( (data) => data);


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
export default getFormattedWeatherData;