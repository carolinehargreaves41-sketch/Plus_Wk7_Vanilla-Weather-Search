// This function validates the city input
function validateCity(city) {
  city = city.trim().toLowerCase();
  if (city.length <= 1) {
    showError("Please enter a city name with at least 2 characters.");
    return null;
  }
  return city;
}

// This function displays error messages to the user
function showError(message) {
  let errorElement = document.querySelector("#error-message");
  errorElement.innerHTML = message;
  errorElement.style.display = "block";
}

// This function hides error messages
function hideError() {
  let errorElement = document.querySelector("#error-message");
  errorElement.style.display = "none";
}

//This function fetches the weather data for a specific city from the API
function getWeatherCity(city) {
  let apiKey = "o9f9ab326ef453b45bfe0f44453a6b2t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather).catch(handleError);
}

//This function updates the page HTML with the fetched weather
function refreshWeather(response) {
  hideError();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

// This function handles API errors
function handleError(error) {
  if (error.response || error.response.status === 404) {
    showError("City not found. Please check the spelling and try again.");
  } else {
    showError("Unable to fetch weather data. Please try again.");
  }
}

//This function handles the form submission
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let validatedCity = validateCity(searchInput.value);

  if (validatedCity) {
    getWeatherCity(validatedCity);
    searchInput.value = "";
  }
}

//Add event listener for the search form
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

//This function formats the current date and time
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

//Load the weather for a default city on page load
getWeatherCity("London");

//This function adds the Dark Theme
function changeTheme() {
  let body = document.querySelector("body");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}

let themeButton = document.querySelector(".dark-theme-button");
themeButton.addEventListener("click", changeTheme);
