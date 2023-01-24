// created data
const BackgroundData = {
    CLEAR: {
        name: 'Clear',
        class: 'clear',
        image: './Images/Sun.svg'
    },
    CLOUDS: {
        name: 'Clouds',
        class: 'clouds',
        image: './Images/Clouds.svg'
    },
    RAIN: {
        name: 'Rain',
        class: 'rain',
        image: './Images/Rain.svg'
    },
    SNOW: {
        name: 'Snow',
        class: 'snow',
        image: './Images/Snow.svg'
    },
    CLEARNIGHT: {
        name: 'ClearNight',
        class: 'clear-night',
        image: './Images/SunNight.svg'
    },
    CLOUDSNIGHT: {
        name: 'CloudsNight',
        class: 'clouds-night',
        image: './Images/CloudsNight.svg'
    },
    RAINNIGHT: {
        name: 'RainNight',
        class: 'rain-night',
        image: './Images/RainNight.svg'
    },
    SNOWNIGHT: {
        name: 'SnowNight',
        class: 'snow-night',
        image: './Images/SnowNight.svg'
    }
};

// weather types enum(dictionary)
    const WeatherTypes = {
        CLEAR: 'Clear',
        CLOUDS: 'Clouds',
        RAIN: 'Rain',
        THUNDERSTORM: 'Thunderstorm',
        DRIZZLE: 'Drizzle',
        SNOW: 'Snow',
    };  
    const getBackgroundFromWeatherType = (weatherType = "Clear", isDay) => {
       if (isDay) {
                switch(weatherType) {
                    case WeatherTypes.CLOUDS: return BackgroundData.CLOUDS;
                    case WeatherTypes.RAIN:
                    case WeatherTypes.THUNDERSTORM:
                    case WeatherTypes.DRIZZLE: return BackgroundData.RAIN;
                    case WeatherTypes.SNOW: return BackgroundData.SNOW;
                    case WeatherTypes.CLEAR:
                    default: return BackgroundData.CLEAR;
                };
        } else {
                switch(weatherType) {
                    case WeatherTypes.CLOUDS: return BackgroundData.CLOUDSNIGHT;
                    case WeatherTypes.RAIN:
                    case WeatherTypes.THUNDERSTORM:
                    case WeatherTypes.DRIZZLE: return BackgroundData.RAINNIGHT;
                    case WeatherTypes.SNOW: return BackgroundData.SNOWNIGHT;
                    case WeatherTypes.CLEAR:
                    default: return BackgroundData.CLEARNIGHT;
            };
        };
    };

export { BackgroundData, getBackgroundFromWeatherType, WeatherTypes };
