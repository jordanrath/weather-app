import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Weather = ({ weatherData }) => {
    const currentTemp = parseInt(weatherData.main.temp);
    const highTemp = parseInt(weatherData.main.temp_max);
    const lowTemp = parseInt(weatherData.main.temp_min);
    
    const refresh = () => {
        window.location.reload();
    }
    console.log(weatherData)
  return (
    <div className='app-container'>
        <div className='name-temp'>
            <h2>{weatherData.name}</h2>
            <h1>{currentTemp}&deg;</h1>
            <FontAwesomeIcon className='svgIcon' icon="fa-solid fa-arrow-rotate-right" onClick={refresh}/>
        </div>
        <div className='app-data'>
                <p>{weatherData.weather[0].description}</p>
            <div className='high-low'>
                <p>H: {highTemp}&deg;</p>
                <p>L: {lowTemp}&deg;</p>
            </div>
        </div>
        <p className='date'>{new Date().getMonth() + 1}/{new Date().getDate()}/{new Date().getFullYear()}</p>
    </div>
  )
}

export default Weather