export function convertTempFromFahrenheitToCelsius(tempFahrenheit) {
    let tempCelsius = (tempFahrenheit - 32) * 5/9;
    return tempCelsius;
}