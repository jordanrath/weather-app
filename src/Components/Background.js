import classNames from 'classnames';
import React from 'react'
import { getBackgroundFromWeatherType } from '../Data/BackgroundData';

const Background = (props) => {
    const { weatherType, children } = props;

    const { class: backgroundClass} = getBackgroundFromWeatherType(weatherType);
    const finalBackgroundClass = classNames(['background', backgroundClass])

  return (
    <div className={finalBackgroundClass}>
        {children}
    </div>
  )
}

export default Background