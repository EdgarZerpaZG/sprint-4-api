import { DEFAULT_JOKE_URL, DEFAULT_WEATHER_URL } from "./config";

// Use environment variables if available, otherwise fallback to default URLs
export const JOKE_URL =
  process.env.VITE_CALLBACK_RANDOM_JOKE || DEFAULT_JOKE_URL;

export const WEATHER_URL =
  process.env.VITE_CALLBACK_WEATHER || DEFAULT_WEATHER_URL;