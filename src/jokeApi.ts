import type { JokeResponse } from "./types";

let JOKE_URL: string | null = null;

async function resolveConfig() {
  if (JOKE_URL) return JOKE_URL;

  if (typeof process !== "undefined" && process.env.JEST_WORKER_ID !== undefined) {
    const { JOKE_URL: url } = await import("./config.node");
    JOKE_URL = url;
  } else {
    const { JOKE_URL: url } = await import("./config.vite");
    JOKE_URL = url;
  }
  return JOKE_URL;
}

export async function getRandomJoke(): Promise<JokeResponse | null> {
  try {
    const url = await resolveConfig();

    if (!url) {
      throw new Error("JOKE_URL is not defined.");
    }

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data: JokeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error retrieving information:", error);
    return null;
  }
}