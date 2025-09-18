import './style.css';
import { getRandomJoke } from "./jokeApi";

let jokesHistory: string[] = [];

function loadHistory() {
  const savedJokes = localStorage.getItem("jokesHistory");
  if (savedJokes) {
    jokesHistory = JSON.parse(savedJokes);
    console.log("Historial cargado:", jokesHistory);
  }
}

function saveHistory() {
  localStorage.setItem("jokesHistory", JSON.stringify(jokesHistory));
}

async function showJoke() {
  const jokeData = await getRandomJoke();
  const jokeElement = document.getElementById("joke");

  if (jokeData && jokeElement) {
    jokeElement.textContent = `🤣 ${jokeData.joke}`;

    jokesHistory.push(jokeData.joke);

    saveHistory();

    console.log("Historial de chistes:", jokesHistory);
  } else {
    if (jokeElement) {
      jokeElement.textContent = "No se pudo obtener un chiste.";
    }
  }
}

loadHistory();

const generateJokeBtn = document.getElementById("generate-joke");
if (generateJokeBtn) {
  generateJokeBtn.addEventListener("click", showJoke);
}