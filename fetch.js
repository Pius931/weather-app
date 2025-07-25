// 1. Get HTML elements
const button = document.getElementById("Btn");
const input = document.getElementById("city");
const resultDiv = document.querySelector(".results");

// 2. Add click event listener
button.addEventListener("click", function () {
  const city = input.value.trim(); // Get the input value

  if (city === "") {
    resultDiv.textContent = "Please enter a city name.";
    return;
  }

  // 3. API key & URL
  const apiKey = "a6385a035c045a987c6029da2bbf5746";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // 4. Fetch weather data
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // 5. Display data
      if (data.cod === "404") {
        resultDiv.textContent = "City not found.";
      } else {
        const temp = data.main.temp;
        const weather = data.weather[0].description;
        const cityName = data.name;

        resultDiv.innerHTML = `
          <h3>Weather in ${cityName}</h3>
          <p>🌡️ Temperature: ${temp}°C</p>
          <p>🌥️ Condition: ${weather}</p>
        `;
      }
    })
    .catch(function (error) {
      resultDiv.textContent = "Error fetching data.";
      console.log("Fetch error:", error);
    });
});
