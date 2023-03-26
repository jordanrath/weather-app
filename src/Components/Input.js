import React, { useEffect, useState } from 'react'
import functions from '../Data/CityData';
import { getWeatherData } from '../pageFunctions';

// add dropdown to display options for locations with same name
// add useState location to check what is typed into the input... special characters, max length, min length, etc...
const Input = ({ setData = () => {} }) => {
  const [location, setLocation] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { findByCityName, matches, cityData } = functions;
  // const [cityData, setCityData] = useState("");

  // handle weather fetch
  const handleClick = async (event) => {
    event.preventDefault();
    const data = await getWeatherData(location);
    setData(data);
  };

  // handle user typed input
  const handleInputChange= (event) => {
    setInputValue(event.target.value);
    // console.log(inputValue);
  };

  // handle the submit event on the form
  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue('');
  };

  return (
    <form className='zipcode-form'>
        <label>
          <input 
            type='text' 
            id='zipcode' 
            name='zipcode' 
            className='zipcode-input' 
            value={inputValue} 
            placeholder='Enter city & state or zipcode...'
            autoComplete='off' 
            onChange={
              (e) => {
                setLocation(e.target.value)
                handleInputChange(e); 
                // setCityData(e.currentTarget.value); 
                // findByCityName(e.currentTarget.value); 
                console.log(location)
            }}
            // onKeyUp={
            //   (e) => {
            //   setLocation(e.target.value); 
            //   findByCityName(location);
            //   console.log(e.target.value);
            // }} 
          />
        </label>
          <input 
            type='submit' 
            value='OK' 
            className='zipcode-btn' 
            onClick={
              (e) => {
                handleClick(e); 
                handleSubmit(e);
            }} 
          />
          <div>
            {/* {findByCityName} */}
          </div>
          {/* {cityData.map((city) => (
            <div>
              <p>{city.name}</p>
            </div>
          ))} */}
    </form>
  )
}

export default Input