import "../styles.css";
import * as generalFunc from "./generalFunctions.js";

let inputField = document.querySelector("#citySelect");
let searchBtn = document.querySelector("#weatherSearchBtn");
let selectedCity = document.querySelector("#selectedCity");
let currentDay = document.querySelector("#currentDay");
let currentTemperature = document.querySelector("#currentTemperature");
let weatherDataObject = {};

// API Url creation variables
let baseUrlStart =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
let dynamicPartUrl;
let baseUrlEnd =
  "?unitGroup=us&include=days%2Ccurrent&key=SPQCWP3UPXJYLXTRTVL652LC5&contentType=json";
let fullUrl;

// Functions
function createUrl() {
  dynamicPartUrl = inputField.value;
  console.log(dynamicPartUrl);
  fullUrl = baseUrlStart + dynamicPartUrl + baseUrlEnd;
  console.log(fullUrl);
}

// Event Listeners for creating the API url request
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    createUrl();
    getData();
    displayData();
  }
});

searchBtn.addEventListener("click", function () {
  createUrl();
  getData();
  displayData();
});

async function getData() {
  const response = await fetch(fullUrl);
  const weatherData = await response.json();
    console.log(weatherData);
    weatherDataObject = {
      address: weatherData.address,
      currentDate: weatherData.days[0].datetime,
      temperatureCelsiusCurrent:
        Math.round(
          generalFunc.convertTempFromFahrenheitToCelsius(
            weatherData.currentConditions.temp
          ) * 10
        ) / 10,
      tomorrowDate: weatherData.days[1].datetime,
      temperatureCelsiusTomorrow:
        Math.round(
          generalFunc.convertTempFromFahrenheitToCelsius(weatherData.days[1].temp) * 10
        ) / 10,
    };
    console.log(weatherDataObject);
  };


function displayData() {
  selectedCity.textContent = getData().address;
  currentDay.textContent = weatherDataObject.currentDate;
  // currentTemperature.textContent = ;
}
