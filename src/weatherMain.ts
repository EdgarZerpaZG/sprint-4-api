import './style.css';
import { fetchWeatherApi } from 'openmeteo';

const params = {
	"latitude": 41.3888,
	"longitude": 2.159,
	"hourly": "temperature_2m",
	"current": "temperature_2m",
	"timezone": "auto",
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const timezone = response.timezone();

console.log(
	`\nCoordinates: ${latitude}°N ${longitude}°E`,
	`\nTimezone: ${timezone}`,
);

const latitudeData = document.getElementById("latitude-data");
const longitudeData = document.getElementById("longitude-data");
const timezoneData = document.getElementById("timezone-data");

if (latitudeData) {
    latitudeData.innerHTML = `Latitude: ${latitude}°N`;
}
if (longitudeData) {
    longitudeData.innerHTML = `Longitude: ${longitude}°E`;
}
if (timezoneData) {
    timezoneData.innerHTML = `Timezone: ${timezone}`;
}

const current = response.current()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	current: {
		time: new Date((Number(current.time())) * 1000),
		temperature_2m: current.variables(0)!.value(),
	},
};

// 'weatherData' now contains a simple structure with arrays with datetime and weather data
console.log(
	`\nCurrent time: ${weatherData.current.time}`,
	weatherData.current.temperature_2m,
);

const temperatureData = document.getElementById("temperature-data");
if (temperatureData) {
    temperatureData.innerHTML = `Current Temperature: ${weatherData.current.temperature_2m}°C`;
}