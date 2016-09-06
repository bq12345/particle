let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let Z = 300;
let pause = false;
let speed = 0.05;
let dots;
let animationId;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let getRandomColor = () => {
    return ['#4285f4', '#ea4335', '#fbbc05', '#34a853'][parseInt(Math.random() * 4, 10)];
};

let easeInOutQuint = pos => {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 5);
    return 0.5 * (Math.pow(pos - 2, 5) + 2);
};

let initAnimate = () => {
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        dot.x = Math.random() * canvas.width;
        dot.y = Math.random() * canvas.height;
        dot.z = Math.random() * Z * 2 - Z;
        dot.tx = Math.random() * canvas.width;
        dot.ty = Math.random() * canvas.height;
        dot.tz = Math.random() * Z * 2 - Z;
        dot.paint();
    }
    animate();
};

let animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        // 回到最初画下时刻的位置
        if (Math.abs(dot.dx - dot.x) <= speed && Math.abs(dot.dy - dot.y) <= speed && Math.abs(dot.dz - dot.z) <= speed) {
            dot.x = dot.dx;
            dot.y = dot.dy;
            dot.z = dot.dz;
            cancelAnimationFrame(animationId);
        } else {
            // 不断移动
            dot.x = dot.x + (dot.dx - dot.x) * speed;
            dot.y = dot.y + (dot.dy - dot.y) * speed;
            dot.z = dot.z + (dot.dz - dot.z) * speed;
        }
        dot.paint();
    }
    animationId = requestAnimationFrame(animate);
};

function getTextData(text) {
    // draw text
    context.save();
    context.font = '300px 微软雅黑';
    context.fillStyle = 'rgba(168,168,168,1)';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    context.restore();

    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    let dots = [];
    for (let x = 0; x < imgData.width; x += 8) {
        for (let y = 0; y < imgData.height; y += 8) {
            let i = (y * imgData.width + x) * 4;
            if (imgData.data[i] >= 128) {
                let dot = new Dot(x - 2, y - 2, 0, 2);
                dots.push(dot);
            }
        }
    }
    return dots;
}

class Dot {
    constructor(centerX, centerY, centerZ, radius) {
        // 记下原始位置
        this.dx = centerX;
        this.dy = centerY;
        this.dz = centerZ;
        this.tx = 0;
        this.ty = 0;
        this.tz = 0;
        this.z = centerZ;
        this.x = centerX;
        this.y = centerY;
        this.radius = radius;
        this.color = getRandomColor();
    }

    paint() {
        context.save();
        context.beginPath();
        let scale = Z / (Z + this.z);
        // x,y,radius,startAngle,endAngle,anticlockwise
        context.arc(canvas.width / 2 + (this.x - canvas.width / 2) * scale, canvas.height / 2 + (this.y - canvas.height / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.restore();
    }
}

dots = getTextData('Welcome');

initAnimate(dots);

// event
let $input = document.getElementById('input');
$input.addEventListener("keyup", e => {
    if (e.keyCode !== 13) {
        return;
    }
    dots = getTextData($input.value);
    initAnimate(dots);
});

//# sourceMappingURL=index-compiled.js.map

//# sourceMappingURL=index-compiled-compiled.js.map