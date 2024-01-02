var wordOfTheDay="";
var wordsArray = [
    "apple",
    "mystery",
    "joyful",
    "wander",
    "quantum",
    "harmony",
    "zodiac",
    "virtual",
    "unique",
    "trivia",
    "spring",
    "rocket",
    "puzzle",
    "orange",
    "nature",
    "mobile",
    "lyrics",
    "keenly",
    "island",
    "genius",
    "frozen",
    "echoes",
    "dreams",
    "canvas",
    "breeze",
    "anchor"
];

var number_of_letters = 0;
var currentWord="";
var currentCell;
const keyboardButtons = document.querySelectorAll('.kb-button');

//initialize the Wordle game board
document.addEventListener('DOMContentLoaded', function() {
    setWord();
    initializeWordle();
});

function setWord() {
    var randomIndex = Math.floor(Math.random() * wordsArray.length);
    wordOfTheDay= wordsArray[randomIndex];
    number_of_letters=wordOfTheDay.length;
}

// Function to handle virtual keyboard button click
function handleButtonClick(key) {
    const virtualEvent = new KeyboardEvent('keydown', { key: key });
    document.dispatchEvent(virtualEvent);
}

// Event listener for virtual keyboard button click
keyboardButtons.forEach(button => {
    button.addEventListener('click', function () {
        const key = this.innerHTML;
        handleButtonClick(key);
    });
});

function initializeWordle() {
    var wordleGame = document.getElementById('wordleGame');

    //create n x n grid
    for (var i = 0; i < number_of_letters; i++) {
        var row = document.createElement('div');
        row.classList.add('row');

        for (var j = 0; j < number_of_letters; j++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = 'cell_' + i + '_' + j;

            row.appendChild(cell);
        }

        wordleGame.appendChild(row);
    }
    currentCell = document.getElementById('cell_0_0');
}

// Add event listener for keydown events
document.addEventListener('keydown', function (event) {

    var wordleGameElement = document.getElementById("wordleGame");
    var wordleGameStyle = window.getComputedStyle(wordleGameElement);

    //if game is initialized and game is being displayed
    //keyboard doesnt need to be active during leaderboard display
    if (currentCell && wordleGameStyle.display !== "none") {
        guessLetter(event);
    }
});

// Function to handle user's letter guesses
function guessLetter(event) {

    // Check if the pressed key is a letter (A-Z)
    if (event.key.match(/^[a-zA-Z]$/)) {

        // Update the content of the current cell
        currentCell.innerHTML = event.key.toUpperCase();

        // Move to the next cell
        var nextCell = getNextCell(currentCell);
        if (nextCell) {
            currentCell = nextCell;
        }
    } 
    else if (event.key === 'Backspace' || event.key === 'Delete') {
        if (currentCell.innerHTML != ''){
            // Delete the letter in the current cell
            currentCell.innerHTML = '';
        }
        else{
            // Move to the previous cell
            var previousCell = getPreviousCell(currentCell);
            if (previousCell) {
                previousCell.innerHTML = '';
                currentCell=previousCell;
            }
        }
    }
    else if (event.key === 'Enter') {
        // If the current row is valid, move to the first cell in the next row
        if (checkCurrentRowValid(currentCell)) {

            var cellColors = compareWithWordOfDay(currentWord);
            updateCellColors(currentCell, cellColors);
            
            var gameStatusElement = document.getElementById("gameStatus");
            //if all cell colors green i.e. or used all guesses
            if (currentWord===wordOfTheDay){
                gameStatusElement.textContent = "You Won! Worlde's word of the day is...";
                processGameOver("Won");
            }
            else if (goToNextRow(currentCell)===null){
                gameStatusElement.textContent = "You lost! Worlde's word of the day is...";
                processGameOver("Lost");
            }
            var nextRowCell = goToNextRow(currentCell);
            if (nextRowCell) {
                currentCell = nextRowCell;
            }
        }
    }
}

// Function to get the next cell
function getNextCell(currentCell) {
    var nextCell = currentCell.nextElementSibling;
    // If next cell exists in the same row, return it
    if (nextCell) {
        return nextCell;
    }
    else{
        return null;
    }
}
// Function to get the previous cell
function getPreviousCell(currentCell) {
    var previousCell = currentCell.previousElementSibling;

    // If previous cell exists in the same row, return it
    if (previousCell) {
        return previousCell;
    }
    return null;
}
// Function to go to the first cell in the next row
function goToNextRow(currentCell) {
    var nextRow = currentCell.parentElement.nextElementSibling;

    // If next row exists, return the first cell in that row
    return nextRow ? nextRow.querySelector('.cell') : null;
}

function checkCurrentRowValid(currentCell){
    //1: Check if the current row is valid (all cells have letters)
    var currentRow = currentCell.parentElement;
    var allCellsFilled = Array.from(currentRow.children).every(function (cell) {
        return cell.innerHTML.trim() !== '';
    });
    if (allCellsFilled) {
        currentWord = Array.from(currentRow.children).map(function (cell) {
            return cell.innerHTML;
        }).join('').toLowerCase(); // Concatenate cell content and convert to lowercase
        
        return true;
    }

    return false;
}



// Function to compare the user's guess with the hidden word
function compareWithWordOfDay(word) {
    var cellColorResult = [];

    for (var i = 0; i < wordOfTheDay.length; i++) {
        var guessedChar = word[i];
        var actualChar = wordOfTheDay[i];

        if (guessedChar === actualChar) {
            // Correct character in correct location (green)
            cellColorResult.push('green');
        } else if (wordOfTheDay.includes(guessedChar)) {
            // Correct character in incorrect location (yellow)
            cellColorResult.push('yellow');
        } else {
            // Character does not show up anywhere in the hidden word (grey)
            cellColorResult.push('grey');
        }
    }
    return cellColorResult;
}

// Update the cell colors in the current row based on the result array
function updateCellColors(currentCell, colors) {
    var cells = currentCell.parentElement.querySelectorAll('.cell');

    for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = colors[i];
    }
}

function processGameOver(gameStatus) {
    // Hide the wordleGame
    var wordOfDataElement = document.getElementById("wordOfDay");
    wordOfDataElement.textContent = wordOfTheDay;
    var wordleGame = document.getElementById('wordleGame');
    wordleGame.style.display="none";

    var leaderboard = document.getElementById('leaderboard');
    leaderboard.style.display = 'block';

}

function howToPlayClick(){
    var instructionsCOntent = document.getElementById('instructionsPopup');
    instructionsCOntent.style.display = 'flex';
}

function closeInstructionsPopup(){
    var instructionsContent = document.getElementById('instructionsPopup');
    instructionsContent.style.display = 'none';
}