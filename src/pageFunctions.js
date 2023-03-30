import { DateTimeFormatter, Duration, Instant, ZonedDateTime, ZoneId, ZoneOffset } from "@js-joda/core";

    // get initial lat lon of user for first api fetch
    const getInitialLatLon = async () => {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude: lat, longitude: lon } = coords;
                    res({lat, lon});
                },
                (error) => {
                    rej(error);
                }
            );
        });
    };

export const getInitialWeatherData = async () => {
    const { lat, lon } = await getInitialLatLon();
    return getWeatherDataLatLon(lat, lon)
};

export const getWeatherData = async (query) => {
    let weatherData = {};
    let forecastData = {};
    const requests = [
        fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?${query}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`)
    ]
        const results = await Promise.allSettled(requests);
    if (results.every((result) => (result?.status === 'fulfilled'))) {
        const [weatherDataResponse, forecastDataResponse] = results;
        weatherData = await parseWeatherData(weatherDataResponse?.value?.json());
        forecastData = await parseForecastData(forecastDataResponse?.value?.json());
    }
        console.log('weatherData', weatherData, 'forecastData', forecastData)
        return {weatherData, forecastData};
}

    // get initial weather data on load by users lat and lon
export const getWeatherDataLatLon = async (lat, lon) => {
    if (typeof lat === 'number' && typeof lon === 'number') {
        return getWeatherData(`lat=${lat}&lon=${lon}`);
    };
    return {weatherData:{}, forecastData:{}}
};

    // get user weather data by search
export const getWeatherDataLocation = async (location) => {
    return getWeatherData(`q=${location}`);
};

const parseWeatherData = async (data) => {
    const {
        id, 
        main, 
        wind,
        dt, 
        weather = [], 
        visibility = 0, 
        sys, 
        name,
        coord,
        timezone: offset, 
        cod: statusCode = 500 
    } = await data;
    if (parseInt(statusCode) !== 200) {
       throw new Error('Status code failure');
    }
    const { lat, lon } = coord;
    let zoneId = null;
    try {
        zoneId = ZoneId.ofOffset("UTC", ZoneOffset.ofHours(Duration.ofSeconds(offset).toHours()));
    } catch (err) {
        console.error(err);
    };
    // get sunrise and sunset zone date times
    const  { sunrise: srEpochSeconds } = sys;
    const sunriseZDT = ZonedDateTime.ofInstant(Instant.ofEpochSecond(srEpochSeconds), zoneId);
    const  { sunset: ssEpochSeconds } = sys;
    const sunsetZDT = ZonedDateTime.ofInstant(Instant.ofEpochSecond(ssEpochSeconds), zoneId);
    
    // get current time of searched location
    const currentLocationTime = ZonedDateTime.ofInstant(Instant.ofEpochSecond(dt), zoneId);
    
    const currentLocale = (currentLocationTime instanceof ZonedDateTime)
        ? currentLocationTime.format(DateTimeFormatter.ofPattern('HH:mm'))
        : "";
    // get sunset and sunrise in the same format to compar to currentLocationTime
    const searchedSunriseTime = (sunriseZDT instanceof ZonedDateTime) 
        ? sunriseZDT.format(DateTimeFormatter.ofPattern('HH:mm')) 
        : "";
    const searchedSunsetTime = (sunsetZDT instanceof ZonedDateTime) 
        ? sunsetZDT.format(DateTimeFormatter.ofPattern('HH:mm')) 
        : "";
    
    return {
        id,
        main,
        wind,
        dt,
        weather,
        visibility,
        sys: {...sys, sunriseZDT, sunsetZDT},
        name,
        lat,
        lon,
        offset,
        statusCode,
        zoneId,
        timeData: {currentLocale, searchedSunriseTime, searchedSunsetTime}
    };
};

const parseForecastData = async (data) => {
    const {
        message = null,
        cnt: count = 0,
        list = [],
        city = {},
        cod: statusCode = 500 
    } = await data;
    if (parseInt(statusCode) !== 200) {
       throw new Error('Status code failure');
    };
   
    //destructure city and list
    const { temp, feels_like, temp_min, temp_max, humidity } = list;
    const { id, name, country, lat, lon, population, sunrise, sunset } = city;

    return {
        id,
        list,
        city,
        // name,
        // country,
        // lat,
        // lon,
        count,
        message,
        population,
        sunrise,
        sunset,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        statusCode,
        // timeData: {currentLocale, searchedSunriseTime, searchedSunsetTime}
    };
};



 // const { lat, lon } = coord;
    // let zoneId = null;
    // try {
    //     zoneId = ZoneId.ofOffset("UTC", ZoneOffset.ofHours(Duration.ofSeconds(offset).toHours()));
    // } catch (err) {
    //     console.error(err);
    // };
    // get sunrise and sunset zone date times
    // const  { sunrise: srEpochSeconds } = sys;
    // const sunriseZDT = ZonedDateTime.ofInstant(Instant.ofEpochSecond(srEpochSeconds), zoneId);
    // const  { sunset: ssEpochSeconds } = sys;
    // const sunsetZDT = ZonedDateTime.ofInstant(Instant.ofEpochSecond(ssEpochSeconds), zoneId);
    
    // // get current time of searched location
    // const currentLocationTime = ZonedDateTime.ofInstant(Instant.ofEpochSecond(dt), zoneId);
    
    // const currentLocale = (currentLocationTime instanceof ZonedDateTime)
    //     ? currentLocationTime.format(DateTimeFormatter.ofPattern('HH:mm'))
    //     : "";
    // // get sunset and sunrise in the same format to compar to currentLocationTime
    // const searchedSunriseTime = (sunriseZDT instanceof ZonedDateTime) 
    //     ? sunriseZDT.format(DateTimeFormatter.ofPattern('HH:mm')) 
    //     : "";
    // const searchedSunsetTime = (sunsetZDT instanceof ZonedDateTime) 
    //     ? sunsetZDT.format(DateTimeFormatter.ofPattern('HH:mm')) 
    //     : "";