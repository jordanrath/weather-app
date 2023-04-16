import React from 'react'
import Input from './Input'

const WeatherOverview = ({ 
    name, 
    boxClass, 
    currentTemp, 
    appDataClass, 
    description, 
    lowTemp, 
    highTemp, 
    setData 
}) => {
  
    return (
    <div className='weather-container'>
        <div className='current-container'>
            <div className='name-temp'>
                <h2>{name}</h2>
                <h1 className={boxClass}>{currentTemp}&deg;</h1>
            </div>
            <div className={appDataClass}>
                    <p>{description}</p>
                <div className='high-low'>
                    <p>H: {highTemp}&deg;</p>
                    <p>L: {lowTemp}&deg;</p>
                </div>  
            </div>
            <div className='input-container'>
                <Input setData={setData} />
            </div>
        </div>
    </div>
  )
};

export default WeatherOverview;