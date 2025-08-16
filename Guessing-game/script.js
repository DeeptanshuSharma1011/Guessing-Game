let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");
const gameContainer = document.querySelector(".game-container");

function updateAttempts() {
  attemptsDisplay.textContent = `Attempts: ${attempts}`;
}

guessBtn.addEventListener("click", () => {
  const guess = Number(guessInput.value);
  attempts++;
  updateAttempts();

  if (!guess || guess < 1 || guess > 100) {
    feedback.textContent = "⚠️ Please enter a number between 1 and 100!";
    feedback.className = "wrong";
    shake();
    return;
  }

  if (guess === randomNumber) {
    feedback.textContent = `🎉 Correct! The number was ${randomNumber}`;
    feedback.className = "correct";
    attemptsDisplay.textContent += ` ✅ You won in ${attempts} attempts!`;
    guessBtn.disabled = true;
    restartBtn.classList.remove("hidden");
  } else {
    let message = guess < randomNumber ? "📉 Low!" : "📈 High!";

    if (Math.abs(guess - randomNumber) <= 5) {
      message = message.replace("!", "") + " but close! 🔥";
    }

    feedback.textContent = message;
    feedback.className = "wrong";
    shake();
  }

  guessInput.value = "";
  guessInput.focus();
});

restartBtn.addEventListener("click", () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  feedback.textContent = "";
  attemptsDisplay.textContent = "";
  guessBtn.disabled = false;
  restartBtn.classList.add("hidden");
});

function shake() {
  gameContainer.classList.add("shake");
  setTimeout(() => {
    gameContainer.classList.remove("shake");
  }, 400);
}
