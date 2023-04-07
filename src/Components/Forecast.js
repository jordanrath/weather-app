import React, { useMemo } from 'react'
import { formatForecastData, formatWeatherData } from '../Utils/formatWeatherData';

const Forecast = () => {
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


  return (
    <>
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
    </>
  )
}

export default Forecast