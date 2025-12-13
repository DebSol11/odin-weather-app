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
let dynamicPartUrl = "Dubai";
let baseUrlEnd =
  "?unitGroup=us&include=days%2Ccurrent&key=SPQCWP3UPXJYLXTRTVL652LC5&contentType=json";
let fullUrl = baseUrlStart + dynamicPartUrl + baseUrlEnd;

// Functions
const handler = () => {
  dynamicPartUrl = inputField.value;
  selectedCity.textContent = inputField.value;
  console.log(fullUrl);
};

// Event Listeners for creating the API url request
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handler();
    getData();
  }
});

searchBtn.addEventListener("click", function(){
  handler();
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
      currentTemperature.textContent = response.days[0].temp;
      console.log(genFunc.convertTempFromFahrenheitToCelsius(response.days[0].temp));
      // currentTemperature.textContent = response
    });
}
