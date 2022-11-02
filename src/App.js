import React, { useState, useEffect } from 'react';
import Weather from './Components/Weather';
import { pageState } from './pageState';
import './Components/FontAwesomeIcons';

const App = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState(pageState.LOADING);
  console.log(loadingState)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [lat, long])

  useEffect(() => {
      setLoadingState(pageState.LOADING);
      if (typeof lat === 'number' && typeof long === 'number') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`)
        .then(response => response.json())
        .then(result => {
          setTimeout(() => { if (result.cod === 200) {
            setData(result);
            setLoadingState(pageState.LOADED);
          } else {
            setLoadingState(pageState.ERROR);
          }
          })
        }, 30000)
        }
  }, [lat, long]);



  return (
    <>
    <div className="App">
      {/* {(typeof data.main != 'undefined') ? ( */}
        <Weather weatherData={data} loadingState={loadingState} />
      {/* ): ( */}
       {/* <div></div> */}
      {/* )}   */}
    </div>
    </>
  );
}

export default App;

// https://developers.google.com/maps/documentation/geocoding/start