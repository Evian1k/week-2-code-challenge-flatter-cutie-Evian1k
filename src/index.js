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