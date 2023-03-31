import React, { useCallback, useEffect, useState } from 'react';
import Weather from './Components/Weather';
import { pageState } from './pageState';
import './Components/FontAwesomeIcons';
import Background from './Components/Background';
import { getInitialWeatherData } from './pageFunctions';
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [data, setData] = useState({});
  const [loadingState, setLoadingState] = useState(pageState.INIT);
  const { weatherData = {}, forecastData = {} } = data

  const { weather = [], timeData } = weatherData;
  const [ firstWeather = {} ] = weather;
  const { main: weatherType = "Clear" } = firstWeather;

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 750,
      offset: 50,
      easing: 'ease-in-out',
    });
    AOS.refresh();
  }, []);

  const handleInitialLoad = useCallback(async () => {
      setLoadingState(pageState.LOADING);
      try {
        const newData = await getInitialWeatherData();
        setData(newData);
        setLoadingState(pageState.LOADED);
      } catch (error) {
          console.error(error);
          setLoadingState(pageState.ERROR);
      };
  }, [setData, setLoadingState]);

  //handle the state of page loads
  useEffect(() => {
    if (loadingState === pageState.INIT) {
      handleInitialLoad();
    }
  }, [handleInitialLoad, loadingState]);
  
  //render the background component with the weather component as its child
  return (
    <>
    <div className="App">
        <Background weatherType={weatherType} timeData={timeData} >
          <Weather weatherData={weatherData} forecastData={forecastData} loadingState={loadingState} setData={setData} setLoadingState={setLoadingState} />
        </Background> 
    </div>
    </>
  );
}

export default App;
