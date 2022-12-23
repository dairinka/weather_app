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
const weatherDescription = document.querySelector("#weather-desk");
const celsius = document.querySelector(".celsius");
const temperatureNow = document.querySelector(".temperature-today");
let now = new Date();

searchForm.addEventListener("submit", showUserCity);
currentLocationBtn.addEventListener("click", getCurrentData);

function showUserCity(event) {
  event.preventDefault();
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

function getForecast(coords) {
  const apiWeatherForecast = `https://api.shecodes.io/weather/v1/forecast?lon=${coords.longitude}&lat=${coords.latitude}&key=${apiKey}`;
  axios.get(apiWeatherForecast).then(showForecast);
}

function showDataCity(response) {
  console.log(response)
  let currentData = response.data;
  CelsiusTemperature = currentData.temperature.current;
  let currTemp = Math.round(CelsiusTemperature);  
  let currHumidity = currentData.temperature.humidity;
  let currWind = Math.round(currentData.wind.speed);
  let currentCity = currentData.city;
  let currentIcon = currentData.condition.icon_url;
  let currentDescription = currentData.condition.description;
  placeCurrentTemp.textContent = currTemp;
  humidity.textContent = `${currHumidity} %`;
  wind.textContent = `${currWind} m/s`;
  placeCity.textContent = currentCity;
  weatherDescription.textContent = currentDescription;
  icon.setAttribute('src', currentIcon );
  let coords = response.data.coordinates;
  userCity.value = '';
  showDay();
  getTime();
  getForecast(coords);
}

function getTime(){
  let now = new Date();
  let currentTime = now.toLocaleTimeString('en-Us', {hour: '2-digit', minute:'2-digit', hour12: false});
  console.log("currentTime", currentTime);
  setTimeout(showTime, 1000);
  return currentTime;
}

function showTime() {
  const timeElement = document.querySelector(".time");
  timeElement.textContent = getTime();
}

function showDay() {
  const currentDayElement = document.querySelector(".current-day");
  currentDayElement.textContent = now.toLocaleDateString('en-Us', {weekday: 'long'});
}

function getDay(timestamp) {
  let day = new Date(timestamp * 1000).getDay();
  let daysWeek = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  return daysWeek[day];
}

function showForecast(response){
  console.log("forecast",response)
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector(".forecast");
  let forecast = "";
  
  forecastData.forEach(function(forecastDay) {
    let temp = Math.round(forecastDay.temperature.day);
    let icon = forecastDay.condition.icon_url;
    let day = getDay(forecastDay.time);
    console.log("forecastDay.time", forecastDay.time)
    console.log("day", day)
    forecast += `<div class="col day-block">
        <span class="day day-name">
          ${day}
        </span>

        <span class="day day-icon-weather">
          <img src="${icon}" alt="" />
        </span>

        <span class="day day-temperature">
          ${temp}°С
        </span>
      </div>`
    
  })
  forecastElement.innerHTML = forecast;
}





let CelsiusTemperature = null; 
let defaultCity = "New York";
getTemperature(defaultCity);

