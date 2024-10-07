const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];
const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
let showText = false;
let collisionHappened = false;

// Ball class
class Ball {
    constructor(x, y, radius, color, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.targetX = targetX;
        this.targetY = targetY;
        this.velocity = { x: (targetX - x) * 0.02, y: (targetY - y) * 0.02 };
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (!collisionHappened) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }

        // Stop when reaching the center
        if (Math.abs(this.x - this.targetX) < 1 && Math.abs(this.y - this.targetY) < 1) {
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.x = this.targetX;
            this.y = this.targetY;
        }
    }
}

// Create 6 balls starting from random positions, heading toward the center
function createBalls() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < 6; i++) {
        const radius = 30;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        balls.push(new Ball(x, y, radius, colors[i], centerX, centerY));
    }
}

// Detect if all balls have reached the center
function checkCollision() {
    for (let ball of balls) {
        if (ball.velocity.x !== 0 || ball.velocity.y !== 0) {
            return false;
        }
    }
    return true;
}

// Animate the text after the collision
function displayText() {
    ctx.font = '50px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText("F*** YOU ALL, MFS 🎀🔪", canvas.width / 6, canvas.height / 2);
}

// Main animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!collisionHappened) {
        balls.forEach(ball => {
            ball.update();
            ball.draw();
        });
        if (checkCollision()) {
            collisionHappened = true;
            setTimeout(() => showText = true, 500); // Delay the text display slightly
        }
    }

    if (showText) {
        displayText();
    }

    requestAnimationFrame(animate);
}

// Initialize and start the animation
createBalls();
animate();￼Enter
