import React, { useEffect, useMemo, useState } from 'react'
import { imgLoader } from '../Utils/imgLoader';

const PLACEHOLDER = "placeholder";

const WeatherIcon = (props) => {
  const { id, iconName, iconDisplayName, iconDescription } = props;
  const [finalImageContent, setFinalImageContent] = useState(null);

  const iconHref = useMemo(
    () => (`https://openweathermap.org/img/w/${iconName}.png`), 
    [iconName]
  );

  const iconPlaceholder = useMemo(() => (
    <>
      <label id={`${id}-label`}>{iconDescription}</label>
      <span id={`${id}-txt`} aria-describedby={`${id}-label`}>
        {iconDisplayName}
      </span>
    </>
  ), [iconDisplayName, iconDescription, id]);

  const iconDisplay = useMemo(() => {
    return (
      <>
        <label id={`${id}-label`}>{iconDescription}</label>
        <img 
          id={`${id}-img`}
          src={iconHref}
          aria-describedby={`${id}-label`}
          alt={iconDisplayName}
          className='forecast-content__icon'
        />
      </>
    )
  }, [iconDescription, iconDisplayName, iconHref, id]);

  useEffect(() => {
    if (finalImageContent === null) {
      imgLoader({ iconHref, iconPlaceholder: PLACEHOLDER }).then((iconContent) => {
        if (iconContent === PLACEHOLDER) {
          setFinalImageContent(iconPlaceholder);
        } else if (typeof iconContent === "string") {
          setFinalImageContent(iconDisplay);
        };
      });
    };
  }, [finalImageContent, iconPlaceholder, iconDisplay, iconHref]);

  return (
    <div>
      {finalImageContent === null ? <div className='placeholder'></div> : finalImageContent}
    </div>
  )
};

export default WeatherIcon;