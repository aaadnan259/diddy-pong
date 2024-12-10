const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Ball setup
const ballImage = new Image();
ballImage.src = 'assets/ball.png'; // Path to your image

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    dx: 3, // Ball speed in x
    dy: 3, // Ball speed in y
};

// Paddle setup
const paddleWidth = 10;
const paddleHeight = 100;
const player1 = { x: 0, y: canvas.height / 2 - paddleHeight / 2, score: 0 };
const player2 = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, score: 0 };

// Draw paddles
function drawPaddles() {
    ctx.fillStyle = 'white';
    ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);
    ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);
}

// Draw ball
function drawBall() {
    ctx.drawImage(ballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

// Draw scores
function drawScores() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Player 1: ${player1.score}`, 20, 30);
    ctx.fillText(`Player 2: ${player2.score}`, canvas.width - 140, 30);
}

// Update ball position and handle collisions
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy *= -1;

    // Check for paddle collisions
    if (
        ball.x - ball.radius < player1.x + paddleWidth && 
        ball.y > player1.y && 
        ball.y < player1.y + paddleHeight
    ) {
        ball.dx *= -1;
        ball.x = player1.x + paddleWidth + ball.radius; // Prevent sticking
    }

    if (
        ball.x + ball.radius > player2.x && 
        ball.y > player2.y && 
        ball.y < player2.y + paddleHeight
    ) {
        ball.dx *= -1;
        ball.x = player2.x - ball.radius; // Prevent sticking
    }

    // Check for scoring
    if (ball.x - ball.radius < 0) {
        player2.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player1.score++;
        resetBall();
    }
}

// Reset ball to the center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1; // Reverse direction
}

// Handle paddle movement
document.addEventListener('keydown', function (event) {
    // Player 1 controls (W/S)
    if (event.key === 'w' && player1.y > 0) player1.y -= 10;
    if (event.key === 's' && player1.y + paddleHeight < canvas.height) player1.y += 10;

    // Player 2 controls (Arrow keys)
    if (event.key === 'ArrowUp' && player2.y > 0) player2.y -= 10;
    if (event.key === 'ArrowDown' && player2.y + paddleHeight < canvas.height) player2.y += 10;
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawPaddles();
    drawBall();
    drawScores();
    updateBall();
}

// Start the game once the ball image loads
ballImage.onload = function () {
    setInterval(gameLoop, 10); // Run the game loop every 10ms
};
