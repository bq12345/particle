let canvas = document.getElementById("cas");
let context = canvas.getContext('2d');
let dots;
let focallength = 250;
let pause = false;

let getRandomColor = () => {
    return ["#4285f4", "#ea4335", "#fbbc05", "#34a853"][parseInt(Math.random() * 4, 10)];
};

function initAnimate() {

    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        dot.x = Math.random() * canvas.width;
        dot.y = Math.random() * canvas.height;
        dot.z = Math.random() * focallength * 2 - focallength;
        dot.tx = Math.random() * canvas.width;
        dot.ty = Math.random() * canvas.height;
        dot.tz = Math.random() * focallength * 2 - focallength;
        dot.paint();
    }

    animate();
}

//计算帧速率
let lastTime;
let derection = true;

function animate() {
    animateRunning = true;
    let thisTime = +new Date();
    context.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(function (dot) {
        if (derection) {
            if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z) < 0.1) {
                dot.x = dot.dx;
                dot.y = dot.dy;
                dot.z = dot.dz;
                if (thisTime - lastTime > 300) {
                    derection = false;
                }
            } else {
                dot.x = dot.x + (dot.dx - dot.x) * 0.1;
                dot.y = dot.y + (dot.dy - dot.y) * 0.1;
                dot.z = dot.z + (dot.dz - dot.z) * 0.1;
                lastTime = +new Date();
            }
        } else {
            if (Math.abs(dot.tx - dot.x) < 0.1 && Math.abs(dot.ty - dot.y) < 0.1 && Math.abs(dot.tz - dot.z) < 0.1) {
                dot.x = dot.tx;
                dot.y = dot.ty;
                dot.z = dot.tz;
                pause = true;
            } else {
                dot.x = dot.x + (dot.tx - dot.x) * 0.1;
                dot.y = dot.y + (dot.ty - dot.y) * 0.1;
                dot.z = dot.z + (dot.tz - dot.z) * 0.1;
                pause = false;
            }
        }
        dot.paint();
    });
    if (!pause) {
        requestAnimationFrame(animate);
    }
}

document.getElementById('startBtn').onclick = function () {
    if (!pause) return;
    dots = getimgData(document.getElementById('name').value);
    derection = true;
    pause = false;
    initAnimate();
};

function getimgData(text) {
    // draw text
    context.save();
    context.font = "200px 微软雅黑 bold";
    context.fillStyle = "rgba(168,168,168,1)";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    context.restore();

    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    let dots = [];
    for (let x = 0; x < imgData.width; x += 6) {
        for (let y = 0; y < imgData.height; y += 6) {
            let i = (y * imgData.width + x) * 4;
            if (imgData.data[i] >= 128) {
                let dot = new Dot(x - 2, y - 2, 0, 2);
                dots.push(dot);
            }
        }
    }
    return dots;
}

let Dot = function (centerX, centerY, centerZ, radius) {
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
};

Dot.prototype.paint = function () {
    context.save();
    context.beginPath();
    let scale = focallength / (focallength + this.z);
    context.arc(canvas.width / 2 + (this.x - canvas.width / 2) * scale, canvas.height / 2 + (this.y - canvas.height / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
    context.restore();
};

dots = getimgData(document.getElementById('name').value);

// initAnimate();

dots.forEach(dot => {
    dot.paint();
});

//# sourceMappingURL=index-compiled.js.map

//# sourceMappingURL=index-compiled-compiled.js.map

//# sourceMappingURL=index-compiled-compiled-compiled.js.map