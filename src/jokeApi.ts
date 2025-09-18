import type { JokeResponse } from "./types";

const JOKE_URL = import.meta.env.VITE_CALLBACK_RANDOM_JOKE;


export async function getRandomJoke(): Promise<JokeResponse | null> {
  try {
    const response = await fetch(JOKE_URL, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data: JokeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la información:", error);
    return null;
  }
}
