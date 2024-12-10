// Pong Game Script
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

// Draw the ball
function drawBall() {
    ctx.drawImage(ballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

// Update ball position and render
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy *= -1;
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1;

    // Clear canvas and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
}

// Wait for the ball image to load before starting
ballImage.onload = function () {
    setInterval(updateBall, 10); // Update the game every 10ms
};
