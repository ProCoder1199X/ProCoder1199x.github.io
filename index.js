// Dark/Light Mode Toggle
document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Game Logic
document.getElementById('start-game').addEventListener('click', function () {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const guess = prompt('Guess a number between 1 and 10:');
    const result = document.getElementById('game-result');
    if (parseInt(guess) === randomNumber) {
        result.textContent = 'You guessed it right!';
    } else {
        result.textContent = `Wrong! The correct number was ${randomNumber}.`;
    }
});

// Loader Removal
window.addEventListener('load', function () {
    document.getElementById('loader-wrapper').style.display = 'none';
});
