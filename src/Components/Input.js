import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import functions from '../Data/CityData';
import { getWeatherDataLocation } from '../pageFunctions';
import { Popper } from 'react-popper';

const { findByCityName } = functions;

// add useState location to check what is typed into the input... special characters, max length, min length, etc...
const Input = ({ setData = () => {} }) => {
  const [inputValue, setInputValue] = useState('');
  const [matches, setMatches] = useState([]);

  // handle user typed input
  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  // handle the submit event on the form
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setInputValue('');
  }, []);

  const handlePopperClick = useCallback(async (event, itemData) => {
    event.preventDefault();
    
    const newLocation = `${itemData.name},${itemData.state},${itemData.country}`;
    setInputValue(`${itemData.name}, ${itemData.state} ${itemData.country}`);
    
    const data = await getWeatherDataLocation(newLocation);
    setData(data);
  }, [setData]);

  // create debounced callback to call findByCityName on input change
  const [rateLimitedInputValue] = useDebounce(inputValue, 300);

  useEffect(() => {
    findByCityName(rateLimitedInputValue).then((newMatches) => {
      setMatches(newMatches);
    });
  }, [rateLimitedInputValue]);

  const matchesJSX = useMemo(() => {
    return matches.map((cityInfo) => {
      const { id, name, state = "", country } = cityInfo;
      const props = {
        id: `city-opt-${id}`,
        key: `co-${id}`,
        className:"city-entry",
        children:(state !== "" ? `${name}, ${state} ${country}` : `${name}, ${country}`),
        onClick: (e) => {
          handlePopperClick(e, cityInfo);
          handleSubmit(e);
        },
      };
      return (
        <span {...props}/>
      );
    });
  }, [matches, handlePopperClick, handleSubmit]);
  
  const popperRenderFunc = useCallback(() => (
      <div className="popper">
        {matchesJSX} 
      </div>
  ), [matchesJSX]);

  return (
    <form className='input-form'>
            <span className="material-symbols-outlined">search</span>
            <input
              type='text' 
              id='input' 
              name='input' 
              className='input' 
              value={inputValue} 
              placeholder='Search for a city...'
              autoComplete='off' 
              onChange={handleInputChange}
            />
            <Popper
              placement="bottom"
              modifiers={[{ name: 'preventOverflow', enabled: false, }]}
              strategy="absolute"
            >
              {popperRenderFunc}
            </Popper>
    </form>
  )
}

export default Input