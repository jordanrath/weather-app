import React from 'react';
import WeatherIcon from './WeatherIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Forecast = ({ 
    finalData, 
    initialDay, 
    lowTemp, 
    highTemp 
}) => {
    
    const firstWeatherInfo = finalData.day0.weatherTypes?.[0];

    return (
        <div className="forecast-container">
            <div className="forecast-title">
                    <FontAwesomeIcon icon="fa-regular fa-calendar-days" />
                    5-DAY FORECAST
            </div>
            {(initialDay !== finalData?.day0?.day 
            ?
            <>
                <div className="forecast-content">
                <p className="forecast-content__day">
                    Today
                </p>
                <WeatherIcon 
                    id={`${finalData?.day0?.day}-icon`.toLowerCase()}
                    iconName={finalData?.day0?.weatherTypes?.[0]?.icon} 
                    iconDisplayName={firstWeatherInfo?.iconDisplayName}
                    iconDescription=""
                />
                {/* <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData.day0.weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p> */}
                <div className="forecast-content__range">
                    <p>{lowTemp}&deg;</p>
                    <div className="forecast-content__progress-bar">
                        <div 
                            style={{
                                marginLeft: lowTemp,
                                width: `calc(100% - (100px - (${highTemp}px + 5px) + (${lowTemp}px - 5px)))`
                            }}>
                        </div>
                    </div>
                    <p>{highTemp}&deg;</p>
                </div>
                </div>
                {Object.keys(finalData).map((currentDay, key) => {
                    return (   
                        <div key={key} className="forecast-content">
                            <p className="forecast-content__day">
                                {(initialDay === finalData[currentDay]?.day ? "Today" : finalData[currentDay]?.day)}
                            </p>
                            <WeatherIcon 
                                id={`${finalData[currentDay]?.day}-icon`.toLowerCase()}
                                iconName={finalData[currentDay]?.weatherTypes?.[0]?.icon} 
                                iconDisplayName={firstWeatherInfo?.iconDisplayName}
                                iconDescription=""
                            />
                            {/* <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData[currentDay].weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p> */}
                            <div className="forecast-content__range">
                                <p>
                                {(initialDay === finalData[currentDay]?.day ? lowTemp : finalData[currentDay]?.forecastLow)}&deg;
                                </p>
                                <div className="forecast-content__progress-bar">
                                    <div 
                                        style={{
                                            marginLeft: finalData[currentDay]?.forecastLow,
                                            width: `calc(100% - (100px - (${finalData[currentDay]?.forecastHigh}px + 5px) + (${finalData[currentDay]?.forecastLow}px - 5px)))`
                                        }}>
                                    </div>
                                </div>
                                <p>
                                {(initialDay === finalData[currentDay]?.day ? highTemp : finalData[currentDay]?.forecastHigh)}&deg;
                                </p>
                            </div>
                        </div> 
                    )}
                )}
            </>
            :
            <>
                {Object.keys(finalData).map((currentDay, key) => {
                    return (
                        <div key={key} className="forecast-content">
                            <p className="forecast-content__day">
                                {(initialDay === finalData[currentDay]?.day ? "Today" : finalData[currentDay]?.day)}
                            </p>
                            <WeatherIcon 
                                id={`${finalData[currentDay]?.day}-icon`.toLowerCase()}
                                iconName={finalData[currentDay]?.weatherTypes?.[0]?.icon} 
                                iconDisplayName={firstWeatherInfo?.iconDisplayName}
                                iconDescription=""
                            />
                            {/* <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData[currentDay].weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p> */}
                            <div className="forecast-content__range">
                                <p>
                                {(initialDay === finalData[currentDay]?.day ? lowTemp : finalData[currentDay]?.forecastLow)}&deg;
                                </p>
                                <div className="forecast-content__progress-bar">
                                    <div 
                                        style={{
                                            marginLeft: finalData[currentDay]?.forecastLow,
                                            width: initialDay === finalData[currentDay]?.day 
                                            ?
                                            `calc(100% - ((100px - ${highTemp}px + 5px) + (${lowTemp}px - 5px)))`
                                            :
                                            `calc(100% - (100px - (${finalData[currentDay]?.forecastHigh}px + 5px) + (${finalData[currentDay]?.forecastLow}px - 5px)))`
                                        }}>
                                    </div>
                                </div>
                                <p>
                                {(initialDay === finalData[currentDay]?.day ? highTemp : finalData[currentDay]?.forecastHigh)}&deg;
                                </p>
                            </div>
                        </div>
                    )}
                )}
            </>
            )}
        </div>
    )
};

export default Forecast;