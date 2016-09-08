const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

class Particle {
    constructor(x) {
        this.speed = {x: -1 + Math.random() * 3, y: -20 + Math.random() * 20};
        this.location = {x: x, y: HEIGHT - 2};
        this.x = x;
        this.radius = 10 + Math.random();
        this.life = 10 + Math.random() * 20;
        this.death = this.life;

        this.r = 255;
        this.g = Math.round(Math.random() * 155);
        this.b = 0;
    }
}

// Set Particles
let particles = [];
for (let x = 10; x < WIDTH; x += 200) {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(x));
    }
}


function ParticleAnimation() {
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "black";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    context.globalCompositeOperation = "lighter";


    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        context.beginPath();
        p.opacity = Math.round(p.death / p.life * 100) / 100;
        let gradient = context.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
        gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
        gradient.addColorStop(0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
        gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
        context.fillStyle = gradient;
        context.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
        context.fill();
        p.death--;
        p.radius++;
        p.location.x += (p.speed.x);
        p.location.y += (p.speed.y);

        //regenerate particles
        if (p.death < 0 || p.radius < 0) {
            //a brand new particle replacing the dead one
            particles[i] = new Particle(p.x);
        }
    }
    requestAnimationFrame(ParticleAnimation);
}

ParticleAnimation();

window.addEventListener('resize', ()=> {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
