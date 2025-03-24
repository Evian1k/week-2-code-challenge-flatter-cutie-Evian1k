// Your code here

const BASE_URL = "http://localhost:3000/characters";

// DOM Elements
const characterBar = document.getElementById("character-bar");
const detailedInfo = document.getElementById("detailed-info");
const votesForm = document.getElementById("votes-form");
const votesInput = document.getElementById("votes");
const resetButton = document.getElementById("reset-btn");
const characterForm = document.getElementById("character-form");

/ Fetch all characters and populate the character bar
function fetchCharacters() {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((characters) => {
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => displayCharacterDetails(character));
        characterBar.appendChild(span);
      });
    });
}

// Display character details in the detailed-info div
function displayCharacterDetails(character) {
    detailedInfo.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}">
      <p>Votes: <span id="vote-count">${character.votes}</span></p>
    `;
    detailedInfo.dataset.characterId = character.id;
    detailedInfo.dataset.currentVotes = character.votes;
  }

  // Handle votes form submission
votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const voteCountElement = document.getElementById("vote-count");
    const currentVotes = parseInt(detailedInfo.dataset.currentVotes || "0");
    const additionalVotes = parseInt(votesInput.value || "0");
    const newVotes = currentVotes + additionalVotes;
  
    voteCountElement.textContent = newVotes;
    detailedInfo.dataset.currentVotes = newVotes;
  
    votesInput.value = ""; // Clear the input field
  });

  // Handle reset votes button click
resetButton.addEventListener("click", () => {
    const voteCountElement = document.getElementById("vote-count");
    voteCountElement.textContent = "0";
    detailedInfo.dataset.currentVotes = "0";
  });

  // Add character to the server
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCharacter),
  })
    .then((response) => response.json())
    .then((character) => {
      // Add character to the character bar
      const span = document.createElement("span");
      span.textContent = character.name;
      span.addEventListener("click", () => displayCharacterDetails(character));
      characterBar.appendChild(span);

      // Display character details immediately
      displayCharacterDetails(character);
    });
