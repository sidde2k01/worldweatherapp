document.addEventListener("DOMContentLoaded", function () {
  const countrySelect = document.getElementById("countrySelect");
  const getWeatherButton = document.getElementById("getWeatherButton");
  const weatherInfo = document.getElementById("weatherInfo");

  fetch("https://countriesnow.space/api/v0.1/countries")
    .then((response) => response.json())
    .then((data) => {
      const countries = data.data;
      for (const country of countries) {
        const option = document.createElement("option");
        option.value = country.country;
        option.textContent = country.country;
        countrySelect.appendChild(option);
      }
    })
    .catch((error) => console.error("Error fetching countries:", error));

  getWeatherButton.addEventListener("click", () => {
    const selectedCountry = countrySelect.value;
    if (!selectedCountry) {
      alert("Please select a country.");
      return;
    }

    fetchWeatherData(selectedCountry);
  });

  function fetchWeatherData(selectedCountry) {
    const apiKey = "794ee95e63c5a32aaf88cd813fa2e425";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry}&APPID=${apiKey}`
    )
      .then((response) => response.json())
      .then((weatherData) => {
        const temperature = (weatherData.main.temp - 273.15).toFixed(2); // Convert temperature to Celsius
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed;

        weatherInfo.innerHTML = `
                  <h2>Weather in ${selectedCountry}</h2>
                  <p>Temperature: ${temperature}°C</p>
                  <p>Humidity: ${humidity}%</p>
                  <p>Wind Speed: ${windSpeed} m/s</p>
              `;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Please try again.");
      });
  }
});
