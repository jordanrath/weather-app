export const getWeatherData = async (location) => {
    let response = {};
    try {
        response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=92284ab1b40ad9a33e4b15e2e81f1fd1`);
    } catch (error) {
        throw new Error('Fetch API call failed', error); 
    }

    const { 
        main, 
        wind, 
        weather = [], 
        visibility = 0, 
        sys, 
        name, 
        cod: statusCode = 500 
    } = await response.json();

    if (statusCode !== 200) {
       throw new Error('Status code failure');
    }
    return {
        main,
        wind,
        weather,
        visibility,
        sys,
        name,
        statusCode,
    };
};

//getWeatherData by lat/long
//getWeatherData by zipcode