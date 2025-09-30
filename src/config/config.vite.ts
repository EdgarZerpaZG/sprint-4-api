import { DEFAULT_JOKE_URL } from "./config";
import { DEFAULT_WEATHER_URL } from "./config";

export const JOKE_URL =
  import.meta.env.VITE_CALLBACK_RANDOM_JOKE || DEFAULT_JOKE_URL;

export const WEATHER_URL =
  import.meta.env.VITE_CALLBACK_WEATHER || DEFAULT_WEATHER_URL;