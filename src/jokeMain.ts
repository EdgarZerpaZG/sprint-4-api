import './style.css';
import { getRandomJoke } from "./jokeApi";

type JokeEntry = { joke: string; date: string };
let jokesHistory: JokeEntry[] = [];

function loadHistory() {
  const savedJokes = localStorage.getItem("jokesHistory");
  if (savedJokes) {
    jokesHistory = JSON.parse(savedJokes);
    console.log("History loaded:", jokesHistory);
  }
}

function saveHistory() {
  localStorage.setItem("jokesHistory", JSON.stringify(jokesHistory));
}

function cleanJokes() {
  jokesHistory = [];
  saveHistory();
  console.log("History cleaned");
}

async function showJoke() {
  const jokeData = await getRandomJoke();
  const jokeElement = document.getElementById("joke");
  const date = new Date().toISOString();

  if (jokeData && jokeElement) {
    jokeElement.textContent = `${jokeData.joke} 🤣`;

    console.log(`ID: ${jokeData.id}`);
    console.log(`Joke: ${jokeData.joke}`);
    console.log(`Status: ${jokeData.status}`);

    const newEntry: JokeEntry = { joke: jokeData.joke, date };
    jokesHistory.push(newEntry);

    saveHistory();

    console.log("Joke history:", jokesHistory);
  } else {
    if (jokeElement) {
      jokeElement.textContent = "Could not retrieve a joke.";
    }
  }
}

loadHistory();

const generateJokeBtn = document.getElementById("generate-joke");
if (generateJokeBtn) {
  generateJokeBtn.addEventListener("click", showJoke);
}

const cleanJokeBtn = document.getElementById("clean-jokes");
if (cleanJokeBtn) {
  cleanJokeBtn.addEventListener("click", cleanJokes);
}
