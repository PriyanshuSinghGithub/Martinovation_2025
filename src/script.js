const canvas = document.getElementById('portalCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const numParticles = 200;

// Set canvas size and handle responsiveness
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(angle) {
        this.angle = angle || Math.random() * 2 * Math.PI;
        this.radius = 50; // Starting radius from center
        this.speed = 0.05 + Math.random() * 0.05; // Speed of rotation
        this.decay = 0.98; // Slows down radius growth
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 50%)`; // Blue/Purple range
    }

    update() {
        this.angle += this.speed;
        this.radius *= 1.02; // Expands outward
        this.alpha *= this.decay; // Fades out
        this.speed *= 0.999; // Slowly stops rotation
    }

    draw() {
        const x = canvas.width / 2 + Math.cos(this.angle) * this.radius;
        const y = canvas.height / 2 + Math.sin(this.angle) * this.radius;

        ctx.fillStyle = `rgba(100, 100, 255, ${this.alpha})`; // Adjust color for better glow
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2); // Small circle particle
        ctx.fill();
    }
}

// Initialization: Create particles
for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(i * (2 * Math.PI / numParticles)));
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Fade effect: draw a semi-transparent black layer over the last frame
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.update();
        p.draw();

        // If particle fades out or goes too far, reset it
        if (p.alpha < 0.02 || p.radius > Math.max(canvas.width, canvas.height)) {
            particles[i] = new Particle();
        }
    }
}

// Start the animation and pre-loader timing
animate();

// --- PRE-LOADER LOGIC ---
const animationDuration = 5000; // 5 seconds for the portal to open
setTimeout(() => {
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 1s ease';
    
    // After fading the canvas, show the main content
    setTimeout(() => {
        document.getElementById('main-content').style.display = 'block';
    }, 1000); // Wait for the 1s fade to complete
    
}, animationDuration);