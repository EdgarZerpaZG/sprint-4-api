import { fetchWeatherApi } from 'openmeteo';

const params = {
  latitude: 0,
  longitude: 0,
  hourly: "temperature_2m",
  current: "temperature_2m",
  timezone: "auto",
};

const url = "https://api.open-meteo.com/v1/forecast";

function getUserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
}

async function setWeather() {
  try {
    const position = await getUserLocation();
    params.latitude = position.coords.latitude;
    params.longitude = position.coords.longitude;

    console.log("Latitud:", params.latitude);
    console.log("Longitud:", params.longitude);

    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
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
      latitudeData.innerHTML = `Latitude: <span class="font-bold">${latitude}°N</span>`;
    }
    if (longitudeData) {
      longitudeData.innerHTML = `Longitude: <span class="font-bold">${longitude}°E</span>`;
    }
    if (timezoneData) {
      timezoneData.innerHTML = `Timezone: <span class="font-bold">${timezone}</span>`;
    }

    const current = response.current()!;
    const weatherData = {
      current: {
        time: new Date(Number(current.time()) * 1000),
        temperature_2m: current.variables(0)!.value(),
      },
    };

    console.log(
      `\nCurrent time: ${weatherData.current.time}`,
      `\nCurrent temperature: ${weatherData.current.temperature_2m.toFixed()}°C`,
    );

    const temperatureData = document.getElementById("temperature-data");
    if (temperatureData) {
      temperatureData.innerHTML =
        `☁️ | <span class="font-bold">${weatherData.current.temperature_2m.toFixed()}°C</span>`;
    }

  } catch (error) {
    console.error("Error obteniendo ubicación o datos:", error);
  }
}
setWeather();