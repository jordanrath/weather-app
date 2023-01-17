import { Duration, Instant, ZonedDateTime, ZoneId, ZoneOffset } from "@js-joda/core";

// Promisification of getCurrentPosition
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

export const getInitialWeatherData = async () => {
      const { lat, lon } = await getInitialLatLon();
      let initialWeatherData = {};
    if (typeof lat === 'number' && typeof lon === 'number') {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`)
        initialWeatherData = await parseWeatherData(response.json());
        console.log(initialWeatherData)
      } catch (error) {
            throw new Error('Fetch API call failed', error);
      }
    };
    return initialWeatherData;
};

export const getWeatherData = async (location) => {
    let weatherData = {};
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`);
        weatherData = await parseWeatherData(response.json());
    } catch (error) {
        throw new Error('Fetch API call failed', error); 
    } 
    return weatherData;
};


    const parseWeatherData = async (data) => {
        const { 
            main, 
            wind, 
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
            console.log("offset:", offset)
            zoneId = ZoneId.ofOffset("UTC", ZoneOffset.ofHours(Duration.ofSeconds(offset).toHours()));
        } catch (err) {
            console.error(err);
        };

        const  { sunrise: srEpochSeconds } = sys;
        const sunriseZDT = ZonedDateTime.ofInstant(Instant.ofEpochSecond(srEpochSeconds), zoneId);
        const  { sunset: ssEpochSeconds } = sys;
        const sunsetZDT = ZonedDateTime.ofInstant(Instant.ofEpochSecond(ssEpochSeconds), zoneId);

        return {
            main,
            wind,
            weather,
            visibility,
            sys: {...sys, sunriseZDT, sunsetZDT},
            name,
            lat,
            lon,
            offset,
            statusCode,
            zoneId
        };
    };
