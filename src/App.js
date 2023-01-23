import React, { useEffect, useState } from 'react';
import Weather from './Components/Weather';
import { pageState } from './pageState';
import './Components/FontAwesomeIcons';
import Background from './Components/Background';
import { getInitialWeatherData } from './pageFunctions';

const App = () => {
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState(pageState.LOADING);

  const { weather = [], timeData } = data;
  const [ firstWeather = {} ] = weather;
  const  { main: weatherType = "Clear" } = firstWeather;

  useEffect(() => {
    const handleInitialLoad = async () => {
      setLoadingState(pageState.LOADING);
      try {
        const newData = await getInitialWeatherData();
        setData(newData);
        setLoadingState(pageState.LOADED);
      } catch (error) {
          console.error(error);
          setLoadingState(pageState.ERROR);
      };
    }
    handleInitialLoad();
  }, [setData, setLoadingState]);
  

  return (
    <>
    <div className="App">
        <Background weatherType={weatherType} timeData={timeData} >
          <Weather weatherData={data} loadingState={loadingState} setData={setData} setLoadingState={setLoadingState} />
        </Background> 
    </div>
    </>
  );
}

export default App;
