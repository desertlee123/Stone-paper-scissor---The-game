// OBJECT BUTTONS ARRAY
const objectButtons = [...document.getElementsByName("object-button")];

const pcInfoChoice = document.getElementById("pc-info-choice");
const userInfoChoice = document.getElementById("user-info-choice");
const resultInfo = document.getElementById("result-info");
const countInfo = document.getElementById("count-info");
const playAgainButton = document.getElementById("play-again-button");
const paragraphInstruction = document.getElementById("paragraph-instruction");

// FUNCTION TO GENERATE THE PC CHOICE
const generatePcChoice = () => {
  const objects = ["stone", "paper", "scissor"];
  const randomObject = Math.round(Math.random() * (2 - 0) + 0);
  return objects[randomObject];
};

// FUNCTION TO LOCK BUTTONS
const lockButtons = () => {
  objectButtons.forEach((button) => {
    button.setAttribute("disabled", true);
    button.classList.add("button-disabled");
  });
};

// OBJECTS BUTTONS CONFIGURATION
objectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lockButtons();
    paragraphInstruction.classList.add("paragraph-instruction-disabled");

    countInfo.textContent = "...";
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => {
        countInfo.textContent = i;
      }, i * 1000);
    }

    const pcChoice = generatePcChoice();
    setTimeout(() => {
      userInfoChoice.textContent = `You chose: ${button.value}`;
      pcInfoChoice.textContent = `PC chose: ${pcChoice}`;
      matchResult(button.value, pcChoice);
      playAgainButton.classList.add("play-again-button-able");
      countInfo.classList.add("count-info-out");
    }, 3500);
  });
});

// FUNCTION TO SHOW MATCH RESULT
const matchResult = (userChoice, pcChoice) => {
  resultInfo.textContent = "Result: ";

  if (userChoice === pcChoice) return (resultInfo.textContent += "TIE");

  if (
    (userChoice === "stone" && pcChoice === "scissor") ||
    (userChoice === "paper" && pcChoice === "stone") ||
    (userChoice === "scissor" && pcChoice === "paper")
  ) {
    return (resultInfo.textContent += "¡YOU WON!");
  }

  return (resultInfo.textContent += "¡YOU LOST!");
};

// FUNCTION TO RESET BUTTONS
const resetButtons = () => {
  objectButtons.forEach((button) => {
    button.removeAttribute("disabled");
    button.classList.remove("button-disabled");
  });
};

// FUNCTION TO PLAY AGAIN WITH BUTTON
playAgainButton.addEventListener("click", () => {
  paragraphInstruction.classList.remove("paragraph-instruction-disabled");
  countInfo.classList.remove("count-info-out");
  countInfo.textContent = "";
  resetButtons();
  playAgainButton.classList.remove("play-again-button-able");
  userInfoChoice.textContent = "";
  pcInfoChoice.textContent = "";
  resultInfo.textContent = "";
});
