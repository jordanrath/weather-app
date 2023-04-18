import { useMemo } from 'react';
import { pageState } from '../pageState';
import classNames from 'classnames';
import { formatWeatherData, formatForecastData } from '../Utils/formatWeatherData';
import WeatherForecast from './WeatherForecast';
import WeatherOverview from './WeatherOverview';
import WeatherDetails from './WeatherDetails';

const Weather = ({ weatherData = null, forecastData = null, loadingState = pageState.LOADING, setData = () => {} }) => {
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
        initialDay,
    } = useMemo(() => formatWeatherData(weatherData), [weatherData]);

    const {
        finalData
    } = useMemo(() => formatForecastData(forecastData), [forecastData]);

    const boxClass = classNames({ 
        'box-value': true, 
        placeholder: loadingState === pageState.LOADING,
        'error-state': loadingState === pageState.ERROR 
    });
    
    const appDataClass = classNames({ 
        'app-data': true, 
        placeholder: loadingState === pageState.LOADING,
        'error-state': loadingState === pageState.ERROR 
    });

    return (
        <div className='app-container'>
            <WeatherOverview 
                name={name} 
                boxClass={boxClass} 
                currentTemp={currentTemp} 
                appDataClass={appDataClass}
                description={description}
                highTemp={highTemp}
                lowTemp={lowTemp}
                setData={setData}    
            />
            <WeatherForecast 
                finalData={finalData} 
                initialDay={initialDay} 
                lowTemp={lowTemp} 
                highTemp={highTemp}
            />
            <WeatherDetails 
                boxClass={boxClass} 
                sunriseZDT={sunriseZDT} 
                sunsetZDT={sunsetZDT} 
                humidity={humidity} 
                feelsLike={feelsLike} 
                speed={speed} 
                gust={gust} 
                visibile={visibile} 
            />
        </div>
    )
};

export default Weather;