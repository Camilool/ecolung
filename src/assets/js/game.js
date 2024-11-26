const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
resizeCanvas();

let score = 0;
const particles = [];
const purifier = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    color: '#00c853',
    speed: 5
};

// Adjust canvas size to container size
function resizeCanvas() {
    canvas.width = document.getElementById('game-container').clientWidth;
    canvas.height = document.getElementById('game-container').clientHeight;
}

// Create Particle Class
class Particle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dy = (Math.random() + 0.5) * 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.dy;

        // Re-generate particle if it falls off the screen
        if (this.y - this.radius > canvas.height) {
            this.y = -this.radius;
            this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        }

        this.draw();
    }
}

// Initialize Particles
function init() {
    for (let i = 0; i < 10; i++) {
        const radius = 10;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * canvas.height - radius;
        const color = '#ff4500';
        particles.push(new Particle(x, y, radius, color));
    }
}

// Animate Particles and Purifier
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update particles
    particles.forEach(particle => {
        particle.update();
    });

    // Draw purifier
    ctx.fillStyle = purifier.color;
    ctx.fillRect(purifier.x, purifier.y, purifier.width, purifier.height);

    // Check for collisions
    particles.forEach((particle, index) => {
        const distX = Math.abs(particle.x - (purifier.x + purifier.width / 2));
        const distY = Math.abs(particle.y - (purifier.y + purifier.height / 2));

        if (distX < purifier.width / 2 && distY < purifier.height / 2) {
            particles.splice(index, 1);
            score++;
            document.getElementById('score').innerText = `Puntuación: ${score}`;
        }
    });

    // Regenerate particles if fewer than 10
    if (particles.length < 10) {
        const radius = 10;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = -radius;
        const color = '#ff4500';
        particles.push(new Particle(x, y, radius, color));
    }
}

// Event Listener for Keyboard Control
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === 'ArrowLeft' && purifier.x > 0) {
        purifier.x -= purifier.speed;
    } else if (key === 'ArrowRight' && purifier.x + purifier.width < canvas.width) {
        purifier.x += purifier.speed;
    }
});

// Event Listener for Touch Control
canvas.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    purifier.x = touchX - purifier.width / 2;

    // Ensure purifier stays within bounds
    if (purifier.x < 0) {
        purifier.x = 0;
    } else if (purifier.x + purifier.width > canvas.width) {
        purifier.x = canvas.width - purifier.width;
    }
});

// Adjust canvas size on window resize
window.addEventListener('resize', resizeCanvas);

// Initialize and Animate Game
init();
animate();
