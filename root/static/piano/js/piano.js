const sound = {65:"http://carolinegabriel.com/demo/js-keyboard/sounds/040.wav",
                87:"http://carolinegabriel.com/demo/js-keyboard/sounds/041.wav",
                83:"http://carolinegabriel.com/demo/js-keyboard/sounds/042.wav",
                69:"http://carolinegabriel.com/demo/js-keyboard/sounds/043.wav",
                68:"http://carolinegabriel.com/demo/js-keyboard/sounds/044.wav",
                70:"http://carolinegabriel.com/demo/js-keyboard/sounds/045.wav",
                84:"http://carolinegabriel.com/demo/js-keyboard/sounds/046.wav",
                71:"http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav",
                89:"http://carolinegabriel.com/demo/js-keyboard/sounds/048.wav",
                72:"http://carolinegabriel.com/demo/js-keyboard/sounds/049.wav",
                85:"http://carolinegabriel.com/demo/js-keyboard/sounds/050.wav",
                74:"http://carolinegabriel.com/demo/js-keyboard/sounds/051.wav",
                75:"http://carolinegabriel.com/demo/js-keyboard/sounds/052.wav",
                79:"http://carolinegabriel.com/demo/js-keyboard/sounds/053.wav",
                76:"http://carolinegabriel.com/demo/js-keyboard/sounds/054.wav",
                80:"http://carolinegabriel.com/demo/js-keyboard/sounds/055.wav",
                186:"http://carolinegabriel.com/demo/js-keyboard/sounds/056.wav"
            };

const keys = document.querySelectorAll(".key");         //all the keys in piano
const pianoKeys = document.querySelector(".piano-keys");//element of piano keys div
const piano = document.querySelector(".piano");         //piano element
const greatOldOneImage = document.querySelector(".secret");//secret element
const keyIsPressed = {};           //checks if a key is pressed
const secretCode = "weseeyou";
let enteredCode = "";               //entered code by user
let hideTimeout;                    //timeout for hiding keybord letters

// Function to play a sound based on the key code
function playSound(keyCode) {
    const audio = new Audio(sound[keyCode]);
    audio.play();
}

// Function to apply a temporary style to a key when pressed
function applyTemporaryStyle(keyCode) {
    const keyElement = document.querySelector(`[key-code="${keyCode}"]`);
    if (keyElement) {
        keyElement.style.transform = "scale(0.95)";
        keyElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        keyElement.style.color = "rgba(71, 6, 6, 0.8)";
    }
}

// Function to reset the style of a key after key press
function resetKeyStyle(keyCode) {
    const keyElement = document.querySelector(`[key-code="${keyCode}"]`);
    if (keyElement) {
        keyElement.style.transform = "";
        keyElement.style.boxShadow = "";
        keyElement.style.color = "rgba(0, 0, 0)";
    }
}

//reveal keyboard letters
function revealKeyboard() {
    keys.forEach((keyElement) => {
        keyElement.textContent = keyElement.getAttribute("key-reveal");
        const keyRevealValue = keyElement.getAttribute("key-reveal");
        // Create a span element to display the key-reveal style
        const spanElement = document.createElement("span");
        spanElement.textContent = keyRevealValue;

        // Add the .key-reveal class to the span element
        spanElement.classList.add("key-reveal");

        // Clear the content of keyElement and append the span element
        keyElement.innerHTML = "";
        keyElement.appendChild(spanElement);
        
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            hideKeyboard();
        }, 3000);
    });
}

// Function to hide keyboard leterrs
function hideKeyboard() {
    keys.forEach((keyElement) => {
            keyElement.textContent = "";
    });
}

// Function to check the entered code and display the image
function checkEnteredCode() {
    if (enteredCode.includes(secretCode)) {
        // Gradually fade out the piano
        piano.style.transition = "opacity 2s";
        piano.style.opacity = 0;
        piano.style.display="none";

        greatOldOneImage.style.display="flex";

        const creepyAudio = new Audio("https://orangefreesounds.com/wp-content/uploads/2020/09/Creepy-piano-sound-effect.mp3?_=1");
        // Play the creepy audio
        creepyAudio.play();

        // Disable further key presses
        document.removeEventListener("keydown", handleKeyDown);

        // Reset entered code
        enteredCode = "";
    }
}

//handler to handle keydown event
function handleKeyDown(event){
    const keyCode = event.keyCode;
    const key = event.key.toLowerCase();
    enteredCode += key;
    checkEnteredCode();

    //to make sure sound is not played continuously when key is in press hold
    if ((keyIsPressed.hasOwnProperty(keyCode) &&  !keyIsPressed[keyCode]) || (!keyIsPressed.hasOwnProperty(keyCode)) ) {
        keyIsPressed[keyCode] = true; // Set the key as pressed
        applyTemporaryStyle(keyCode);
        playSound(keyCode);
    }
}

//handler when key is up
function handleKeyUp(event){
    const keyCode = event.keyCode;
    keyIsPressed[keyCode] = false; // Reset the key state
    resetKeyStyle(keyCode);
}

// Add keydown event listener to change style when any key is pressed
document.addEventListener("keydown", handleKeyDown);

// Add keyup event listener to reset style when any key is released
document.addEventListener("keyup", handleKeyUp);

//if mouse enters pianokeys, reveals keyboard letters
pianoKeys.addEventListener("mouseenter", () => {
    revealKeyboard();
});

// Add mouseleave event listener to hide keyboard key hints when mouse leaves "piano-keys" div
pianoKeys.addEventListener("mouseleave", () => {
    clearTimeout(hideTimeout);
    hideKeyboard();
});
