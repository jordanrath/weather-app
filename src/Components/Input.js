import React, { useState } from 'react'
import functions from '../Data/CityData';
import { getWeatherData } from '../pageFunctions';

// add dropdown to display options for locations with same name
// add useState location to check what is typed into the input... special characters, max length, min length, etc...
const Input = ({ setData = () => {} }) => {
  const [location, setLocation] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { findByCityName } = functions;

  // handle weather fetch
  const handleClick = async (event) => {
    event.preventDefault();
    const data = await getWeatherData(location);
    setData(data);
  }

  // handle user typed input
  const handleInputChange= (event) => {
    setInputValue(event.target.value);
    console.log(functions);
  }

  // handle the submit event on the form
  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue('');
  }

  return (
    <form className='zipcode-form'>
        <label>
            <input type='text' id='zipcode' name='zipcode' className='zipcode-input' value={inputValue} placeholder='Enter city & state or zipcode...' onChange={(e) => {setLocation(e.target.value); handleInputChange(e);}} />
        </label>
            <input type='submit' value='OK' className='zipcode-btn' onClick={(e) => {handleClick(e); handleSubmit(e);}} />
    </form>
  )
}

export default Input