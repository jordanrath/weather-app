import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const WeatherDetails = ({ 
    boxClass, 
    sunriseZDT, 
    sunsetZDT, 
    humidity, 
    feelsLike, 
    speed, 
    gust, 
    visibile 
}) => {
    
  return (
    <div className='box-container'>
        <div className='box'>
            <p className='icon-text'><FontAwesomeIcon className='icon' icon="fa-solid fa-sun" /> 
                SUNRISE
            </p>
            <div className="box-content">
                <p className={boxClass}>{sunriseZDT}AM</p>
            </div>
        </div>
        <div className='box'>
            <p className='icon-text'><FontAwesomeIcon className='icon' icon="fa-solid fa-moon" /> 
                SUNSET
            </p>
            <div className="box-content">
                <p className={boxClass}>{sunsetZDT}PM</p>
            </div>
        </div>
        <div className='box'>
            <p className='icon-text'><FontAwesomeIcon icon="fa-solid fa-water" /> 
                HUMIDITY
            </p>
            <div className="box-content">
                <p className={boxClass}>{humidity}%</p>
                <p>{(humidity <= "35" ? "The air is fairly dry." : "The air humidity is high.")}</p>
            </div>    
        </div>
        <div className='box'>
            <p className='icon-text'><FontAwesomeIcon icon="fa-solid fa-temperature-high" /> 
                FEELS LIKE
            </p>
            <div className="box-content">
                <p className={boxClass}>{feelsLike}&deg;</p>    
            </div>
        </div>
        <div className='box'>
            <p  className='icon-text'><FontAwesomeIcon icon="fa-solid fa-wind" /> 
                WIND
            </p>
            <div className="box-content">
                <p className={boxClass}>{speed}mph</p>
                <p>{((speed >= 10 && gust > 0) ? `Windy with gusts up to ${gust}mph.` : "" )}</p>    
            </div>
        </div>
        <div className='box'>
            <p className='icon-text'><FontAwesomeIcon icon="fa-solid fa-eye" /> 
                VISIBILITY
            </p>
            <div className="box-content">
                <p className={boxClass}>{visibile.toFixed(1)}mi</p>
                <p>{(visibile.toFixed(1) === "10.0" ? "It's perfectly clear." : "Visibility is impaired.")}</p>
            </div>
        </div>
    </div>
  )
}

export default WeatherDetails;