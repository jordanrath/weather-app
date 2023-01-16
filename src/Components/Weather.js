import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from './Input';
import { pageState } from '../pageState';
import classNames from 'classnames';

const Weather = ({ weatherData = null, loadingState = pageState.LOADING, setData = () => {} }) => {
    const { main, wind, weather = [], visibility, sys } = (weatherData ?? {});
    const { 
        temp: currentTempRaw = 0, 
        temp_max: highTempRaw = 0, 
        temp_min: lowTempRaw = 0, 
        feels_like: feelsLikeRaw = 0,
        humidity: humidityRaw = 0 
    } = (main ?? {});
    const { speed: speedRaw = 0 } = (wind ?? {});
    const { sunrise: sunriseRaw = 0, sunset: sunsetRaw = 0 } = (sys ?? {})
    const { description = '' } = ((weather[0]) ?? {})
    const currentTemp = parseInt(currentTempRaw);
    const highTemp = parseInt(highTempRaw);
    const lowTemp = parseInt(lowTempRaw);
    const feelsLike = parseInt(feelsLikeRaw);
    const speed = parseInt(speedRaw);
    const humidity = parseInt(humidityRaw);
    const visibile = (visibility / 1000);
    const sunrise = (new Date(sunriseRaw * 1000)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const sunset = (new Date(sunsetRaw * 1000)).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    /////////////
    //const sunrise = new Date(sunriseRaw * 1000);
    //const sunriseMins = sunrise.getHours() + ":" + sunrise.getMinutes();
    //////////////
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

    // const refresh = () => {
    //     window.location.reload(false);
    // }

  return (
        <div className='app-container'>
            <div className='weather-container'>
            <div className='current-container'>
                <div className='name-temp'>
                    <h2>{weatherData.name}</h2>
                    <h1 className={boxClass}>{currentTemp}&deg;</h1>
                    {/* <FontAwesomeIcon className='svgIcon' icon="fa-solid fa-arrow-rotate-right" onClick={refresh}/> */}
                </div>
                <div className={appDataClass}>
                        <p>{description}</p>
                    <div className='high-low'>
                        <p>H: {highTemp}&deg;</p>
                        <p>L: {lowTemp}&deg;</p>
                    </div>  
                </div>
                <div className='zipcode-container'>
                    {/* <p className='zipcode'>Enter a city and state or zipcode:</p> */}
                    <Input setData={setData} />
                </div>
                {/* <p className='date'>{new Date().getMonth() + 1}/{new Date().getDate()}/{new Date().getFullYear()}</p> */}
            </div>
            </div>
            <div className='box-container'>
                <div className='box sun'>
                    <p className='icon-text'><FontAwesomeIcon className='icon' icon="fa-solid fa-sun" /> Sunrise</p>
                    <p className={boxClass}>{sunrise}</p>
                </div>
                <div className='box sun'>
                    <p className='icon-text'><FontAwesomeIcon className='icon' icon="fa-solid fa-moon" /> Sunset</p>
                    <p className={boxClass}>{sunset}</p>
                </div>
                <div className='box humidity'>
                    <p className='icon-text'><FontAwesomeIcon icon="fa-solid fa-water" /> Humidity</p>
                    <p className={boxClass}>{humidity}%</p>    
                </div>
                <div className='box feels-like'>
                    <p className='icon-text'><FontAwesomeIcon icon="fa-solid fa-temperature-high" /> Feels Like</p>
                    <p className={boxClass}>{feelsLike}&deg;</p>    
                </div>
                <div className='box wind'>
                    <p  className='icon-text'><FontAwesomeIcon icon="fa-solid fa-wind" /> Wind</p>
                    <p className={boxClass}>{speed}mph</p>    
                </div>
                <div className='box wind'>
                    <p className='icon-text'><FontAwesomeIcon icon="fa-solid fa-eye" /> Visibility</p>
                    <p className={boxClass}>{visibile.toFixed(1)}mi</p>    
                </div>
            </div>
        </div>
  )
}

export default Weather