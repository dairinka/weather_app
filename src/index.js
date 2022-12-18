const searchForm = document.querySelector("#search-city");
const currentLocationBtn = document.querySelector(".current-btn");
const userCity = document.querySelector("#user-city");
const placeCity = document.querySelector(".city-name");
const placeCurrentTemp = document.querySelector(".temperature-today");
const humidity = document.querySelector(".humidity-value");
const wind = document.querySelector(".wind-value");
const apiKey = "4a89b8ef6ac77d65a1o7btb04c63f7df";
const icon = document.querySelector(".icon-today");
const days = document.querySelectorAll(".day-name");

searchForm.addEventListener("submit", showUserCity);
currentLocationBtn.addEventListener("click", getCurrentData);

function showUserCity(event) {
  event.preventDefault();
  //placeCity.textContent = userCity.value;
  getTemperature(userCity.value);
}

function getTemperature(city) {
  const apiWeatherForCity = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiWeatherForCity).then(showDataCity);
}

function getCurrentData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  let apiWeatherUserLocate = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiWeatherUserLocate).then(showDataCity);
}

function showDataCity(response) {
  console.log(response)
  let currTemp = Math.round(response.data.temperature.current);
  let currHumidity = response.data.temperature.humidity;
  let currWind = Math.round(response.data.wind.speed);
  let currentCity = response.data.city;
  let currentIcon = response.data.condition.icon_url;
  placeCurrentTemp.textContent = currTemp;
  humidity.textContent = `${currHumidity}%`;
  wind.textContent = `${currWind}m/s`;
  placeCity.textContent = currentCity;
  icon.setAttribute('src', currentIcon )
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
  let sequenceDay = now.getDay();
  let currentDay = days[sequenceDay];
  let hours = now.getHours();
  let hoursStr = hours.toString().padStart(2, "0");
  let minutes = now.getMinutes();
  let minutesStr = minutes.toString().padStart(2, "0");
  today.innerHTML = `<div class="col-8"><span>${currentDay}</span></div>
<div class="col-4 text-end"><span class="time">${hoursStr}:${minutesStr}</span></div>`;
  getWeekDays(sequenceDay, days);
}
function getWeekDays(currentDay, daysWeek){
  let nextDay = currentDay + 1;
  console.log("nextDay", nextDay)
  for(let i = 0; i < 7; i += 1, nextDay += 1){
    if (daysWeek.length - 1 < nextDay){
      nextDay = 0;
    }
    days[i].textContent = daysWeek[nextDay].slice(0, 3);
  }
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
