/*
const slides = document.querySelectorAll(".slide");

let current = 0;

setInterval(() => {

    slides[current].classList.remove("active");

    current++;

    if (current >= slides.length) {
        current = 0;
    }

    slides[current].classList.add("active");

}, 6000); // 60 seconds

*/ 

window.addEventListener("wheel", function(e) {

    e.preventDefault();

    window.scrollBy({
        left: e.deltaY
    });

}, { passive: false });

let lastInteraction = Date.now();

window.addEventListener("wheel", () => {
    lastInteraction = Date.now();
});

window.addEventListener("mousedown", () => {
    lastInteraction = Date.now();
});

function slowDrift() {
    let idleTime = Date.now() - lastInteraction;

    if (idleTime > 200) {
        window.scrollBy(0.21, 0);
    }

    requestAnimationFrame(slowDrift);
}

slowDrift();



const freedomButton = document.getElementById("freedomButton");

const phoneDetails = document.getElementById("phoneDetails");
const photoDetails = document.getElementById("photoDetails");

const poemCursor = document.createElement("div");
poemCursor.id = "poemCursor";
poemCursor.setAttribute("aria-hidden", "true");
document.body.appendChild(poemCursor);

// YOUR POEM — one entry = one click
const poemLines = [
    "let me have this dream whilst you sit next to me",
    "ill dabble and scheme",
    "only wishing to succeed",

    "bring on this life and this coded prophecy",
    "who am i supposed to be?",
    "i shant to live out your dreams…",

    "talking to me",
    "the one lost somewhere --",
    "dancing under the pōhutukawa tree",

    "i question how far can we walk this land?",
    "knowing that my ancestors had a greater plan.",

    "sailing away, finding corners to stay",
    "but not too long i need to confront a face",

    "somewhere warm to get me away… from my isolating phase"
];


let poemIndex = 0;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Display the current line beside the cursor
function updatePoemCursor() {
    const isDark = document.body.classList.contains("dark-mode");

    if (!isDark || poemIndex >= poemLines.length) {
        poemCursor.style.display = "none";
        return;
    }

    poemCursor.textContent = poemLines[poemIndex];
    poemCursor.style.display = "block";

    poemCursor.style.left = mouseX + "px";
    poemCursor.style.top = mouseY + "px";
}

// Track mouse movement
document.addEventListener("pointermove", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    updatePoemCursor();
});

// Leave a line behind when clicking
document.addEventListener("click", function(event) {
    const isDark = document.body.classList.contains("dark-mode");

    if (!isDark || poemIndex >= poemLines.length) {
        return;
    }

    // Don't place a line when clicking the dark-mode toggle
    if (event.target.closest("#freedomButton")) {
        return;
    }

    const placedLine = document.createElement("div");
    placedLine.className = "poem-placed";
    placedLine.textContent = poemLines[poemIndex];

    placedLine.style.left = (event.clientX + window.scrollX) + "px";
    placedLine.style.top = (event.clientY + window.scrollY) + "px";

    document.body.appendChild(placedLine);

    poemIndex++;

    updatePoemCursor();
});

// Existing dark-mode button, now connected to the poem
freedomButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    if (isDark) {
        phoneDetails.open = true;
        photoDetails.open = true;

        // Start poem from beginning
        poemIndex = 0;

    } else {
        phoneDetails.open = false;
        photoDetails.open = false;

        // Clear poem when returning to light mode
        poemIndex = 0;

        document.querySelectorAll(".poem-placed")
            .forEach(line => line.remove());
    }

    updatePoemCursor();
});
