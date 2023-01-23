const timeOfDay = (current, sunrise, sunset) => {
    return (current > sunrise && current < sunset);
}

export { timeOfDay };
