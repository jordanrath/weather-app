import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input';
import { pageState } from '../pageState';
import classNames from 'classnames';
import { formatWeatherData, formatForecastData } from '../Utils/formatWeatherData';
import { useMemo } from 'react';
import Forecast from './Forecast';

const Weather = ({ weatherData = null, forecastData = null, loadingState = pageState.LOADING, setData = () => {} }) => {
    const { 
        currentTemp,
        highTemp,
        lowTemp,
        feelsLike,
        speed,
        gust,
        humidity,
        visibile,
        description,
        sunriseZDT,
        sunsetZDT,
        name,
        initialDay,
    } = useMemo(() => formatWeatherData(weatherData), [weatherData]);

    const {
        finalData
    } = useMemo(() => formatForecastData(forecastData), [forecastData]);

    const boxClass = classNames({ 
        'box-value': true, 
        placeholder: loadingState === pageState.LOADING,
        'error-state': loadingState === pageState.ERROR 
    });
    
    const appDataClass = classNames({ 
        'app-data': true, 
        placeholder: loadingState === pageState.LOADING,
        'error-state': loadingState === pageState.ERROR 
    });

    return (
        <div className='app-container' data-aos="fade-in">
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
            <div className="forecast-container">
                <div className="forecast-title">
                    <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                    5-DAY FORECAST
                </div>
                <Forecast finalData={finalData} initialDay={initialDay} lowTemp={lowTemp} highTemp={highTemp}/>
            </div>
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
        </div>
  )
}

export default Weather;