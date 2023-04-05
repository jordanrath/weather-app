import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input';
import { pageState } from '../pageState';
import classNames from 'classnames';
import { formatWeatherData, formatForecastData } from '../Utils/formatWeatherData';
import { useMemo } from 'react';

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
    } = useMemo(() => formatWeatherData(weatherData), [weatherData]);

    const {
        finalData
    } = useMemo(() => formatForecastData(forecastData), [forecastData]);

    // console.log(finalData.day0.weatherTypes[0].icon);
    console.log(finalData.day0)

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
                <div className="forecast-content">
                    <p className="forecast-content__day">
                        Today
                        {/* {finalData?.day0?.day} */}
                    </p>
                    <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData.day0.weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p>
                    <div className="forecast-content__range">
                        <p>{lowTemp}&deg;</p>
                        <div className="forecast-content__progress-bar">
                            <div 
                                style={{
                                    marginLeft: lowTemp,
                                    width: `calc(100% - (100px - ${highTemp}px + ${lowTemp}px))`
                                }}>
                            </div>
                        </div>
                        <p>{highTemp}&deg;</p>
                    </div>
                </div>
                <div className="forecast-content">
                    <p className="forecast-content__day">
                        {finalData?.day1?.day}
                    </p>
                    <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData.day1.weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p>
                    <div className="forecast-content__range">
                        <p>{finalData?.day1?.forecastLow}&deg;</p>
                        <div className="forecast-content__progress-bar">
                            <div 
                                style={{
                                    marginLeft: finalData?.day1?.forecastLow,
                                    width: `calc(100% - (100px - ${finalData?.day1?.forecastHigh}px + ${finalData?.day1?.forecastLow}px))`
                                }}>
                            </div>
                        </div>
                        <p>{finalData?.day1?.forecastHigh}&deg;</p>
                    </div>
                </div>
                <div className="forecast-content">
                    <p className="forecast-content__day">
                        {finalData?.day2?.day}
                    </p>
                    <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData.day2.weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p>
                    <div className="forecast-content__range">
                        <p>{finalData?.day2?.forecastLow}&deg;</p>
                        <div className="forecast-content__progress-bar">
                            <div 
                                style={{
                                    marginLeft: finalData?.day2?.forecastLow,
                                    width: `calc(100% - (100px - ${finalData?.day2?.forecastHigh}px + ${finalData?.day2?.forecastLow}px))`
                                }}>
                            </div>
                        </div>
                        <p>{finalData?.day2?.forecastHigh}&deg;</p>
                    </div>
                </div>
                <div className="forecast-content">
                    <p className="forecast-content__day">
                        {finalData?.day3?.day}
                    </p>
                    <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData.day3.weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p>
                    <div className="forecast-content__range">
                        <p>{finalData?.day3?.forecastLow}&deg;</p>
                        <div className="forecast-content__progress-bar">
                            <div 
                                style={{
                                    marginLeft: finalData?.day3?.forecastLow,
                                    width: `calc(100% - (100px - ${finalData?.day3?.forecastHigh}px + ${finalData?.day3?.forecastLow}px))`
                                }}>
                            </div>
                        </div>
                        <p>{finalData?.day3?.forecastHigh}&deg;</p>
                    </div>
                </div>
                <div className="forecast-content">
                    <p className="forecast-content__day">
                        {finalData?.day4?.day}
                    </p>
                    <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData.day4.weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p>
                    <div className="forecast-content__range">
                        <p>{finalData?.day4?.forecastLow}&deg;</p>
                        <div className="forecast-content__progress-bar">
                            <div 
                                style={{
                                    marginLeft: finalData?.day4?.forecastLow,
                                    width: `calc(100% - (100px - ${finalData?.day4?.forecastHigh}px + ${finalData?.day4?.forecastLow}px))`
                                }}>
                            </div>
                        </div>
                        <p>{finalData?.day4?.forecastHigh}&deg;</p> 
                    </div>
                </div>
                {/* <div className="forecast-content">
                    <p className="forecast-content__day">
                        {finalData?.day5?.day}
                    </p>
                    <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData.day5.weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p>
                    <div className="forecast-content__range">
                        <p>{finalData?.day5?.forecastLow}&deg;</p>
                        <div className="forecast-content__progress-bar">
                            <div 
                                style={{
                                    marginLeft: finalData?.day5?.forecastLow,
                                    width: `calc(100% - (100px - ${finalData?.day5?.forecastHigh}px + ${finalData?.day5?.forecastLow}px))`
                                }}>
                            </div>
                        </div>
                        <p>{finalData?.day5?.forecastHigh}&deg;</p>
                    </div>
                </div> */}
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