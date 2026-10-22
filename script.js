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

freedomButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    if (isDark) {
        phoneDetails.open = true;
        photoDetails.open = true;
    } else {
        phoneDetails.open = false;
        photoDetails.open = false;
    }

});