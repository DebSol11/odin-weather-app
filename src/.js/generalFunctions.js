export function convertTempFromFahrenheitToCelsius(tempFahrenheit) {
    let tempCelsius = (tempFahrenheit - 32) * 5/9;
    return tempCelsius;
}

// Formats a date form the format YYYY-MM-DD to (e.g. "de-DE" DD Month Year)
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('de-DE', options);
}