import "../styles.css";
import * as genFunc from "./generalFunctions.js"

let inputField = document.querySelector("#citySelect");
let searchBtn = document.querySelector("#weatherSearchBtn");
let selectedCity = document.querySelector("#selectedCity");
let currentDay = document.querySelector("#currentDay");
let currentTemperature = document.querySelector("#currentTemperature");


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
  selectedCity.textContent = inputField.value;
  fullUrl = baseUrlStart + dynamicPartUrl + baseUrlEnd;
  console.log(fullUrl);
};

// Event Listeners for creating the API url request
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    createUrl();
    getData();
  }
});

searchBtn.addEventListener("click", function(){
  createUrl();
  getData();
});

async function getData() {
  fetch(fullUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      currentDay.textContent = response.days[0].datetime;
      currentTemperature.textContent = Math.round(genFunc.convertTempFromFahrenheitToCelsius(response.days[0].temp)*10)/ 10;
      let weatherDataObject = {
        date: response.days[0].datetime,
        temperatureCelsius: Math.round(genFunc.convertTempFromFahrenheitToCelsius(response.days[0].temp)*10)/ 10,
      };
      console.log(weatherDataObject);
      return weatherDataObject;
      // currentTemperature.textContent = response
    });
}
