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

// Event Listeners for creating the API url request
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    executeFunctions();
  }
});

searchBtn.addEventListener("click", function () {
  executeFunctions();
});

// Functions
function createUrl() {
  dynamicPartUrl = inputField.value;
  fullUrl = baseUrlStart + dynamicPartUrl + baseUrlEnd;
}

async function getData() {
  const response = await fetch(fullUrl);
  const weatherData = await response.json();
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
        generalFunc.convertTempFromFahrenheitToCelsius(
          weatherData.days[1].temp
        ) * 10
      ) / 10,
  };
}

function displayData() {
  selectedCity.textContent = weatherDataObject.address;
  currentDay.textContent = weatherDataObject.currentDate;
  currentTemperature.textContent = weatherDataObject.temperatureCelsiusCurrent;
}

async function executeFunctions() {
  await createUrl();
  await getData();
  await displayData();
}
