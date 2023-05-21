import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react'
import { getBackgroundFromWeatherType } from '../Data/BackgroundData';
import { timeOfDay } from '../Utils/backgroundUtils.js'

const Background = (props) => {
  const { weatherType, children, timeData = {} } = props;
  const [isDay, setIsDay] = useState(true);
    
  const setBackground = useCallback(
    () => {
      const { 
        currentLocale: current = "", 
        searchedSunriseTime: sunrise = "", 
        searchedSunsetTime: sunset = "" 
      } = timeData;

    setIsDay(timeOfDay(current, sunrise, sunset));
  }, [timeData]);

  useEffect(() => {
    setBackground();
  }, [setBackground, timeData]);
  
  const { class: backgroundClass } = getBackgroundFromWeatherType(weatherType, isDay);
  const finalBackgroundClass = classNames(['background', backgroundClass]);

// destructure name and use popper to add title={name} to show the name on hover
  return (
    <div className={finalBackgroundClass}>
        {children}
    </div>
  )
};

export default Background;
