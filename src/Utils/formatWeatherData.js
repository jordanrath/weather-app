import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core';

export const formatWeatherData = (weatherData) => {
    const { main, wind, weather = [], visibility, sys, name, dt } = (weatherData ?? {});
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
        name,
    }  
};

export const formatForecastData = (forecastData) => {
    const { list = [] } = (forecastData ?? {});
    const finalData = {
        day0: {},
        day1: {},
        day2: {},
        day3: {},
        day4: {},
        day5: {},
    };

    let currentDayValues = [];
    let dateCheck = "";
    let dayNumber = -1;

    list.forEach((value, index) => {
        const { dt_txt = "" } = value;
        const currentDateCheck = dt_txt.split(" ").slice(0, 1).toString();

        if (dateCheck !== currentDateCheck) {
            dateCheck = currentDateCheck;
            if (dayNumber >= 0) {
                finalData[`day${dayNumber}`] = formatForecastDayData(currentDayValues);
                currentDayValues = [];
            }
            dayNumber += 1;
            currentDayValues.push(value);
        } else {
            currentDayValues.push(value);
        }
    });
    console.log(finalData)
    return {finalData};
}

export const formatForecastDayData = (dayValues) => {
    let forecastHigh = undefined;
    let forecastLow = undefined;
    let weatherTypes = [];
    let epoch = 0;
    let date = "";
    let day = "";
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    dayValues.forEach((val, index) => {
        const { main, weather, dt } = val;
        const { temp_max, temp_min } = main;
        const timeSlotWeatherTypes = weather.map((weatherType) => {
            const { main, icon } = weatherType;
            return {main, icon};
        });
        weatherTypes.push(...timeSlotWeatherTypes);
        forecastHigh = Math.trunc(Math.max(temp_max, forecastHigh ?? -1000));
        forecastLow = Math.trunc(Math.min(temp_min, forecastLow ?? 1000));
        epoch = parseInt(dt * 1000);
        date = new Date(epoch);
        day = weekday[date.getDay()];
    });
    
    return {
        dayValues,
        day,
        forecastHigh,
        forecastLow,
        weatherTypes,
    }
};