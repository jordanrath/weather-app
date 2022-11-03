import React, { useEffect, useState } from 'react'

const FetchInput = (input) => {
    const [location, setLocation] = useState("Ken Caryl")
  
    useEffect(() => {
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`)
          .then(response => response.json())
          .then(result => {
            console.log('Data:', result.name)
            setTimeout(() => { if (result.cod === 200) {
              setLocation(result);
              console.log('result:', result, 'data', location)
            }
            })
          }, 300)
    }, []);

  return (
    <div>FetchInput</div>
  )
}

export default FetchInput