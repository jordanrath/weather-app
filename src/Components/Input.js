import React, { useState } from 'react'
import { getWeatherData } from '../pageFunctions';

//add useState location to check what is typed into the input... special characters, max length, min length, etc...
const Input = ({ setData = () => {} }) => {
  const [location, setLocation] = useState('');
  const [inputValue, setInputValue] = useState('');
  
  const handleClick = async (event) => {
    event.preventDefault();
    const data = await getWeatherData(location);
    console.log('all data', data)
    setData(data);
  }

  const handleInputChange= (event) => {
    setInputValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputValue('')
}

  return (
    <form className='zipcode-form'>
        <label>
            <input type='text' id='zipcode' name='zipcode' className='zipcode-input' value={inputValue} placeholder='Enter city & state or zipcode...' onChange={(e) => {setLocation(e.target.value); handleInputChange(e)}} />
        </label>
            <input type='submit' value='OK' className='zipcode-btn' onClick={(e) => {handleClick(e); handleSubmit(e);}} />
    </form>
  )
}

export default Input