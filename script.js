const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-game');
let gameRunning = false;

let car = { x: 180, y: 500, width: 40, height: 70 };
let obstacles = [];
let score = 0;

function drawCar() {
    ctx.fillStyle = 'red';
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

function drawObstacles() {
    ctx.fillStyle = 'blue';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += 5;
    });
    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
    if (Math.random() < 0.03) {
        obstacles.push({ x: Math.random() * 300, y: 0, width: 50, height: 50 });
    }
}

function checkCollision() {
    for (let obstacle of obstacles) {
        if (
            car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y
        ) {
            return true;
        }
    }
    return false;
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    drawObstacles();
    updateObstacles();

    if (checkCollision()) {
        alert(`Game Over! Your score: ${score}`);
        gameRunning = false;
        return;
    }

    score++;
    requestAnimationFrame(gameLoop);
}

function moveCar(event) {
    if (event.key === 'ArrowLeft' && car.x > 0) {
        car.x -= 10;
    } else if (event.key === 'ArrowRight' && car.x < canvas.width - car.width) {
        car.x += 10;
    }
}

startButton.addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true;
        obstacles = [];
        score = 0;
        car.x = 180;
        gameLoop();
    }
});

document.addEventListener('keydown', moveCar);
