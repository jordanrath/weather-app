import { DateTimeFormatter, Duration, Instant, ZonedDateTime, ZoneId, ZoneOffset } from "@js-joda/core";

    // get initial lat lon of user for first api fetch
    const getInitialLatLon = async () => {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude: lat, longitude: lon } = coords;
                    res({lat, lon})
                },
                (error) => {
                    rej(error);
                }
            );
        });
    };

    // get initial weather data on load by users lat and lon
export const getInitialWeatherData = async () => {
      const { lat, lon } = await getInitialLatLon();
      let initialWeatherData = {};
    if (typeof lat === 'number' && typeof lon === 'number') {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`)
        initialWeatherData = await parseWeatherData(response.json());
        console.log('initialWeatherData', initialWeatherData)
      } catch (error) {
            throw new Error('Fetch API call failed', error);
      }
    };
    return initialWeatherData;
};

    // get user weather data by search
export const getWeatherData = async (location) => {
    let weatherData = {};
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`);
        weatherData = await parseWeatherData(response.json());
        console.log('weatherData', weatherData)
    } catch (error) {
        throw new Error('Fetch API call failed', error); 
    } 
    return weatherData;
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

        if (statusCode !== 200) {
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
