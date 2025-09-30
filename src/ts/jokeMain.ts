import { getRandomJoke } from "./jokeApi";

type JokeEntry = { joke: string; date: string; score?: number };
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
  const jokeBox = document.getElementById("joke-box");
  const date = new Date().toISOString();

  if (jokeData && jokeElement) {
    if (jokeBox) {
      jokeBox.classList.remove("hidden");
      jokeBox.classList.remove("opacity-0");
    }

    jokeElement.textContent = `${jokeData.value} 🤣`;
    console.log(`Joke: ${jokeData.value}`);

    const newEntry: JokeEntry = { joke: jokeData.value, date };
    jokesHistory.push(newEntry);
    saveHistory();

    console.log("Joke history:", jokesHistory);
    resetScoreIcons();
  } else {
    if (jokeElement) {
      jokeElement.textContent = "Could not retrieve a joke.";
    }
  }
}

function setupScoreListeners() {
  for (let i = 1; i <= 3; i++) {
    const scoreIcon = document.getElementById(`score-${i}`);
    if (scoreIcon) {
      scoreIcon.addEventListener("click", () => {
        if (jokesHistory.length === 0) return;

        const lastJoke = jokesHistory[jokesHistory.length - 1];
        lastJoke.score = i;
        saveHistory();

        console.log(`Score ${i} added to joke:`, lastJoke);

        highlightSelectedScore(i);
      });
    }
  }
}

function highlightSelectedScore(score: number) {
  for (let i = 1; i <= 3; i++) {
    const scoreIcon = document.getElementById(`score-${i}`);
    if (scoreIcon) {
      if (i === score) {
        scoreIcon.classList.remove("grayscale");
      } else {
        scoreIcon.classList.add("grayscale");
      }
    }
  }
}

function resetScoreIcons() {
  for (let i = 1; i <= 3; i++) {
    const scoreIcon = document.getElementById(`score-${i}`);
    if (scoreIcon) {
      scoreIcon.classList.remove("grayscale");
    }
  }
}

loadHistory();
setupScoreListeners();

const generateJokeBtn = document.getElementById("generate-joke");
if (generateJokeBtn) {
  generateJokeBtn.addEventListener("click", showJoke);
}

const cleanJokeBtn = document.getElementById("clean-jokes");
if (cleanJokeBtn) {
  cleanJokeBtn.addEventListener("click", cleanJokes);
}