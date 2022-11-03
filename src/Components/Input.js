import React, { useState } from 'react'
import { getWeatherData } from '../pageFunctions';

//add useState location to check what is typed into the input... special characters, max length, min length, etc...
const Input = ({ setData = () => {} }) => {
  const [location, setLocation] = useState('');
  
  const handleClick = async (event) => {
    event.preventDefault();
    const data = await getWeatherData(location);
    setData(data);
  }

  return (
    <form className='zipcode-form'>
        <label>
            <input type='text' id='zipcode' name='zipcode' className='zipcode-input' onChange={(e) => {setLocation(e.target.value)}} />
        </label>
            <input type='submit' value='OK' className='zipcode-btn' onClick={handleClick} />
    </form>
  )
}

export default Input