function displayCurrent(event) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let timeHours = now.getHours();
  let timeMinutes = now.getMinutes();
  let display = document.querySelector("#current-day-time");

  display.innerHTML = `${day} ${timeHours}:${timeMinutes}`;
}

displayCurrent();

function displayCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#current-temperature");
  celsiusTemp.innerHTML = `11 `;
}

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", displayCelsius);

function displayFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `52 `;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

function showUserTemperature(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )} `;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function search(city) {
  let units = `metric`;
  let apiKey = `a1883d0f6fa94fa6344abefdeb52a423`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showUserTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#user-city").value;
  search(city);
}

let searchEngine = document.querySelector("#city-search");
searchEngine.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let units = `metric`;
  let apiKey = `a1883d0f6fa94fa6344abefdeb52a423`;
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlLocation).then(showUserTemperature);
}

function showCurrentInformation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentInformation);

search("London");
