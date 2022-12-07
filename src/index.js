const searchForm = document.querySelector("#search-city");
const currentLocationBtn = document.querySelector(".current-btn");
const userCity = document.querySelector("#user-city");
const placeCity = document.querySelector(".city-name");
const placeCurrentTemp = document.querySelector(".temperature-today");
const humidity = document.querySelector(".humidity-value");
const wind = document.querySelector(".wind-value");
const apiKey = "bfc3eec068721b629e01cf23b6a382b0";

searchForm.addEventListener("submit", showUserCity);
currentLocationBtn.addEventListener("click", getCurrentData);

function showUserCity(event) {
  event.preventDefault();
  placeCity.textContent = userCity.value;
  getTemperature(userCity.value);
}

function getTemperature(city) {
  const apiWeatherForCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiWeatherForCity).then(showDataCity);
}

function getCurrentData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  let apiWeatherUserLocate = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiWeatherUserLocate).then(showDataCity);
}

function showDataCity(response) {
  let currTemp = Math.round(response.data.main.temp);
  let currHumidity = response.data.main.humidity;
  let currWind = Math.round(response.data.wind.speed);
  let currentCity = response.data.name;
  placeCurrentTemp.textContent = currTemp;
  humidity.textContent = `${currHumidity}%`;
  wind.textContent = `${currWind}m/s`;
  placeCity.textContent = currentCity;
}

// Filling days data
function showDay() {
  let today = document.querySelector(".date-today");
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[now.getDay()];
  let hours = now.getHours();
  let hoursStr = hours.toString().padStart(2, "0");
  let minutes = now.getMinutes();
  let minutesStr = minutes.toString().padStart(2, "0");
  today.innerHTML = `<div class="col-8"><span>${currentDay}</span></div>
<div class="col-4 text-end"><span class="time">${hoursStr}:${minutesStr}</span></div>`;
}
getTemperature("New York");
showDay();

// let celsius = document.querySelector(".celsius");
// let fahrenheit = document.querySelector(".fahrenheit");
// let temperatureNow = document.querySelector(".temperature-today");
// let currentTemperature = temperatureNow.textContent;

// function showCelsius() {
//   celsius.classList.add("active");
//   fahrenheit.classList.remove("active");
//   temperatureNow.textContent = currentTemperature;
// }
// celsius.addEventListener("click", showCelsius);

// function showFahrenheit() {
//   celsius.classList.remove("active");
//   fahrenheit.classList.add("active");
//   temperatureNow.textContent = Math.round(currentTemperature * 1.8 + 32);
// }
// fahrenheit.addEventListener("click", showFahrenheit);
