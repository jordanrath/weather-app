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
    }
};

// weather types enum(dictionary)
    const WeatherTypes = {
        CLEAR: 'Clear',
        CLOUDS: 'Clouds',
        RAIN: 'Rain',
        THUNDERSTORM: 'Thunderstorm',
        DRIZZLE: 'Drizzle',
        SNOW: 'Snow'
    }

    const getBackgroundFromWeatherType = (weatherType = "Clear") => {
            switch(weatherType) {
                case WeatherTypes.CLOUDS: return BackgroundData.CLOUDS;
                case WeatherTypes.RAIN:
                case WeatherTypes.THUNDERSTORM:
                case WeatherTypes.DRIZZLE: return BackgroundData.RAIN;
                case WeatherTypes.SNOW: return BackgroundData.SNOW;
                case WeatherTypes.CLEAR:
                default: return BackgroundData.CLEAR;
        }
    }

export { BackgroundData, getBackgroundFromWeatherType, WeatherTypes }