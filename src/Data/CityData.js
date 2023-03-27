let initialData = undefined;

const getInitialData = async () => {
    if (initialData === undefined) {
        initialData = await import('./CityDataStored.json').then(module => module.default);
    }
    return initialData;
};

const cleanCityName = (cityNameRaw) => (
    (typeof cityNameRaw === "string" ? cityNameRaw.trim().toLowerCase() : "")
);

const joinCityName = (cityName) => (
    cityName.split(" ").join()
);

const filterCityName = ((cityInfo, cityName) => {
    const { name = "", state = "", country = "" } = cityInfo;

    const dataValue = `${name}${state}${country}`.toLowerCase();    

    return dataValue.startsWith(cityName);
});

const sortCityName = ((cityDataA, cityDataB) => {
    const { name: nameA = "", country: countryA = "", state: stateA = "" } = cityDataA;
    const { name: nameB = "", country: countryB = "", state: stateB = "" } = cityDataB;

    //look up correct locale of string and compare them... returns -1, 0, or 1
    const nameComp = nameA.toLowerCase().localeCompare(nameB.toLowerCase());

    if (nameComp === 0) {
        const countryComp = countryA.toLowerCase().localeCompare(countryB.toLowerCase());
        if (countryComp === 0) {
            return stateA.toLowerCase().localeCompare(stateB.toLowerCase());
        } 
        return countryComp;
    }   
    return nameComp;
 });

const findByCityName = async (cityNameRaw) => {

    //validate and clean user input
    const cityName = joinCityName(cleanCityName(cityNameRaw));
    
    if (cityName === "") {
        return [];
    };

    // load contents of json file into memory
    const cityData = await getInitialData();

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