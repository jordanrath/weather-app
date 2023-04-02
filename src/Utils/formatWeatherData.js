import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core';

export const formatWeatherData = (weatherData) => {
    const { main, wind, weather = [], visibility, sys, name } = (weatherData ?? {});
    const { 
        temp: currentTempRaw = 0, 
        temp_max: highTempRaw = 0, 
        temp_min: lowTempRaw = 0, 
        feels_like: feelsLikeRaw = 0,
        humidity: humidityRaw = 0 
    } = (main ?? {});
    const { speed: speedRaw = 0, gust: gustRaw = 0 } = (wind ?? {});
    const { sunriseZDT: sunriseRaw = null, sunsetZDT: sunsetRaw = null } = (sys ?? {})
    const { description = '' } = ((weather[0]) ?? {})
    const currentTemp = parseInt(currentTempRaw);
    const highTemp = parseInt(highTempRaw);
    const lowTemp = parseInt(lowTempRaw);
    const feelsLike = parseInt(feelsLikeRaw);
    const speed = parseInt(speedRaw);
    const gust = parseInt(gustRaw);
    const humidity = parseInt(humidityRaw);
    const visibile = (visibility / 1000);
    const sunriseZDT = (sunriseRaw instanceof ZonedDateTime) 
        ? sunriseRaw.format(DateTimeFormatter.ofPattern('hh:mm')) 
        : "";
    const sunsetZDT = (sunsetRaw instanceof ZonedDateTime) 
        ? sunsetRaw.format(DateTimeFormatter.ofPattern('hh:mm')) 
        : "";
        
    return {
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
        name
    }  
};

export const formatForecastData = (forecastData) => {
    //todo ^
    return {...forecastData}
}