const cleanCityName = (cityNameRaw) => (
    (typeof cityNameRaw === "string" ? cityNameRaw.trim().toLowerLocaleCase() : "")
);

const joinCityName = (cityName) => (
    cityName.split(" ").join()
);

const filterCityName = ((cityInfo, cityName) => {
    const { name = "", state = "", country = "" } = cityInfo;

    const dataValue = `${name}${state}${country}`.toLocaleLowerCase();    

    return dataValue.startsWith(cityName);
});

const sortCityName = ((cityDataA, cityDataB) => {
    const { name: nameA = "", country: countryA = "", state: stateA = "" } = cityDataA;
    const { name: nameB = "", country: countryB = "", state: stateB = "" } = cityDataB;

    //look up correct locale of string and compare them... returns -1, 0, or 1
    const nameComp = nameA.toLocaleLowerCase().localeCompare(nameB.toLocaleLowerCase());

    if (nameComp === 0) {
        const countryComp = countryA.toLocaleLowerCase().localeCompare(countryB.toLocaleLowerCase());
        if (countryComp === 0) {
            return stateA.toLocaleLowerCase().localeCompare(stateB.toLocaleLowerCase());
        } 
        return countryComp;
    }   
    return nameComp;
 });

const findByCityName = (cityNameRaw) => {

    //validate and clean user input
    const cityName = joinCityName(cleanCityName(cityNameRaw));
    
    if (cityName === "") {
        return [];
    };

    // load contents of json file into memory
    const cityData = import('./CityDataStored.json');

    //filter json data based off user input
    const matches = cityData.filter((cityInfo) => filterCityName(cityInfo, cityName));

    //apply sorts to results
    const sortedMatches = matches.sort(sortCityName);

    //return results
    return sortedMatches.map((cityInfo) => {
        const { id, name, country, state } = cityInfo;
        return { id, name, country, state };
    });

};

const functions = {
    findByCityName,
};

export default functions;