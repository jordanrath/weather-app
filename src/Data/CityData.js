const findByCityName = (cityNameRaw) => {
    

    //validate and clean user input
    const cityName = (typeof cityNameRaw === "string" ? cityNameRaw.trim() : "");
    if (cityName === "") {
        return [];
    }

    // load contents of json file into memory
    const cityData = import('../Data/CityDataStored.json');

    //filter json data based off user input
    const matches = cityData.filter(({ cityInfo }) => {
        const name = cityInfo?.name ?? "";
        return new RegExp(cityName).test(name); 
    });

    //apply sorts to results
     

    //return results
    console.log(matches.name)

};

const functions = {
    findByCityName,
};

export default functions;