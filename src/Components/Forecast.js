import React from 'react';

const Forecast = ({ finalData, initialDay, lowTemp, highTemp }) => {
console.log(finalData.day0)

   

    return (
        <>
            {(initialDay !== finalData?.day0.day 
            ?
            <>
                <div className="forecast-content">
                <p className="forecast-content__day">
                    Today
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
                {Object.keys(finalData).map((currentDay, key) => {
                    return (   
                        <div key={key} className="forecast-content">
                            <p className="forecast-content__day">
                                {(initialDay === finalData[currentDay]?.day ? "Today" : finalData[currentDay]?.day)}
                            </p>
                            <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData[currentDay].weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p>
                            <div className="forecast-content__range">
                                <p>
                                {(initialDay === finalData[currentDay]?.day ? lowTemp : finalData[currentDay]?.forecastLow)}&deg;
                                </p>
                                <div className="forecast-content__progress-bar">
                                    <div 
                                        style={{
                                            marginLeft: finalData[currentDay]?.forecastLow,
                                            width: `calc(100% - (100px - ${finalData[currentDay]?.forecastHigh}px + ${finalData[currentDay]?.forecastLow}px))`
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
                            <p className='forecast-content__icon icon-text'><img src={`http://openweathermap.org/img/w/${finalData[currentDay].weatherTypes?.[0].icon}.png`} alt="Weather Icon" /></p>
                            <div className="forecast-content__range">
                                <p>
                                {(initialDay === finalData[currentDay]?.day ? lowTemp : finalData[currentDay]?.forecastLow)}&deg;
                                </p>
                                <div className="forecast-content__progress-bar">
                                    <div 
                                        style={{
                                            marginLeft: finalData[currentDay]?.forecastLow,
                                            width: `calc(100% - (100px - ${finalData[currentDay]?.forecastHigh}px + ${finalData[currentDay]?.forecastLow}px))`
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
        </>
    )
};

export default Forecast;