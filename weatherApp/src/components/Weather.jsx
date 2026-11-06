import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import sun_icon from '../assets/sun.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {
 const [favorites, setFavorites] = useState(() => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
});
const addFavorite = () => {
  if (!weatherData || !weatherData.location) return;

  if (!favorites.includes(weatherData.location)) {
    setFavorites([...favorites, weatherData.location]);
  }
};

const removeFavorite = (city) => {
  setFavorites(favorites.filter((item) => item !== city));
};

useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

  const [unit, setUnit] = useState("C");
  const toggleUnit = () => {
  setUnit(prev => prev === "C" ? "F" : "C");
};
    const[weatherData, setWeatherData] = useState(false)

const displayTemperature = weatherData
  ? unit === "C"
    ? weatherData.temperature
    : Math.round((weatherData.temperature * 9) / 5 + 32)
  : null;
  const inputRef = useRef()
     const allIcons = {
        "01d" : sun_icon,
        "01n" : sun_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,

 
     }
    
  const search = async (city)=>{
    console.log('cmomes here', city, typeof city);
    
    if(city === ""){
      alert("Enter The City Name");
      return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || sun_icon;
      setWeatherData ({
        Humidity : data.main.humidity,
        WindSpeed : data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location : data.name,
        icon : icon
      })
    } catch (error) {
        
    }
  }

  useEffect(()=>{
    search("chemmad")
  },[])

  return (
    <div className='weather'>
    <div className="favorites-section">
  <button onClick={addFavorite} className="add-favorite">
    ⭐ Add to Favorites
  </button>

  <h3>Favorite Cities</h3>

  <ul className="favorites-list">
    {favorites.map((city) => (
      <li key={city} className="favorite-item">
        <span onClick={() => search(city)}>
          {city}
        </span>

        <button onClick={() => removeFavorite(city)}>
          ❌
        </button>
      </li>
    ))}
  </ul>
</div>


        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='search' />
            <img src={search_icon} alt='' onClick={()=>search(inputRef.current.value)}/>
      </div>
     <img src={weatherData.icon} alt="" className='weather-icon'/>
     <div className="temperature-container">
  <p className="temperature">
    {displayTemperature}°{unit}
  </p>

  <button
    className="unit-toggle"
    onClick={toggleUnit}
  >
    Switch to °{unit === "C" ? "F" : "C"}
  </button>
</div>
     <p className='location'>{weatherData.location}</p>

     <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.Humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.WindSpeed}</p>
                <span>Wind Speed</span>
            </div>
        </div>
     </div>
    </div>
  )
}

export default Weather
