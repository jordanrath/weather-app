import React, { useEffect, useMemo, useState } from 'react'
import { imgLoader } from '../Utils/imgLoader';

const PLACEHOLDER = "placeholder";

const WeatherIcon = (props) => {
  const { id, iconName, iconDisplayName, iconDescription } = props;
  const [finalImageContent, setFinalImageContent] = useState(null);

  const iconHref = useMemo(
    () => (`http://openweathermap.org/img/w/${iconName}.png`), 
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
    <>
      <label id={`${id}-label`}>{iconDescription}</label>
      <img 
        id={`${id}-img`}
        src={iconHref}
        aria-describedby={`${id}-label`}
        alt={iconDisplayName}
      />
    </>
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
    <>
      ({finalImageContent === null ? <div className='placeholder'></div> : finalImageContent})
    </>
  )
};

export default WeatherIcon;