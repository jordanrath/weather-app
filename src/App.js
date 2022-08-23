import React, { useState, useEffect } from 'react';
import Weather from './Components/Weather';
import { pageState } from './pageState';

const App = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(pageState.LOADING);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [lat, long])

  useEffect(() => {
    const fetchData = async () => {
      if (typeof lat === 'number' && typeof long === 'number') {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`)
        const result = await response.json()
      if (result.cod === 200) {
        setData(result);
        setPage(pageState.LOADED);
      } else {
        setPage(pageState.ERROR);
      }
      }
    };
  fetchData();
  }, [lat, long]);



  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div></div>
      )}
      
    </div>
  );
}

export default App;
