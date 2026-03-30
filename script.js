const startBtn = document.querySelector(".start");
const search = document.querySelector("#inputfield");
const searchBtn = document.querySelector(".img");
const desc = document.querySelector("#desc");
const temp = document.querySelector("#temp");
const windSpeed = document.querySelector("#windSpeed");
const humidityper = document.querySelector("#humidityper");
const cityName = document.querySelector("#city");
const goHomeBtn = document.querySelector(".homeBtn");
const mainBox1 = document.querySelector(".mainBox1");
const mainBox2 = document.querySelector(".mainBox2");
const mainBox3 = document.querySelector(".mainBox3");
const loadingOverlay = document.querySelector("#loadingOverlay");

const url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "0b6db57de7118169e46fc809ec8fcb96";

//fetch weather data
async function getWeather(city) {

    let finalUrl = `${url}q=${city}&appid=${apiKey}&units=metric`;
    // Show loading overlay
    loadingOverlay.classList.remove("hidden");
    
    try {
        let response = await fetch(finalUrl);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        let data = await response.json();
        mainBox3.classList.add("inactive");
        mainBox2.classList.remove("inactive");
        displayWeather(data);
    }

    catch (error) {
        console.error("Weather API error:", error);
        mainBox2.classList.add("inactive");
        mainBox3.classList.remove("inactive");
        cityName.textContent = `....`;
        temp.textContent = `°C`;
        desc.textContent = `....`;
        windSpeed.textContent = `m/s`;
        humidityper.textContent = `%`;
    }
    finally {
        loadingOverlay.classList.add("hidden");
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temp.textContent = `${data.main.temp}°C`;
    desc.textContent = data.weather[0].description;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    humidityper.textContent = `${data.main.humidity}%`;
}

// get start button event listener
startBtn.addEventListener("click", () => {
    mainBox1.classList.add("inactive");
    mainBox2.classList.remove("inactive");
});

// search
searchBtn.addEventListener("click", inputHandler);
search.addEventListener("keypress", inputHandler);

function inputHandler(event) {
    if (event.key === "Enter" || event.type === "click") {
        let city = search.value.trim();
        search.value = "";
        console.log(city);

        if (city.length > 0) {
            getWeather(city);
        }
    }
}

// go home button event listener
goHomeBtn.addEventListener("click", () => {
    mainBox2.classList.add("inactive");
    mainBox3.classList.add("inactive");
    mainBox1.classList.remove("inactive");
});