import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 41.3888,
  longitude: 2.159,
};

const url = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherData(): Promise<{ latitude: number; longitude: number }> {
  try {
    const weatherData = await fetchWeatherApi(url, params);
    const data = weatherData[0];

    if (data) {
      return {
        latitude: data.latitude(),
        longitude: data.longitude(),
      };
    }

    throw new Error("No weather data received");
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
