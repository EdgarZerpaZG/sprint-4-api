import { DEFAULT_JOKE_URL } from "./config";

export const JOKE_URL =
  import.meta.env.VITE_CALLBACK_RANDOM_JOKE || DEFAULT_JOKE_URL;