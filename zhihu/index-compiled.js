const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const POINT = 18;

let canvas = document.getElementById('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let context = canvas.getContext('2d');
context.strokeStyle = 'rgba(33,33,33,0.8)';
context.strokeWidth = 1;
let circleArr;

let getRandomColor = () => {
    return ["#4285f4", "#ea4335", "#fbbc05", "#34a853"][parseInt(Math.random() * 4, 10)];
};

class Line {
    constructor(x, y, _x, _y, o) {
        this.beginX = x;
        this.beginY = y;
        this.closeX = _x;
        this.closeY = _y;
        this.o = o;
    }

    render() {
        context.beginPath();
        context.strokeStyle = 'rgba(0,0,0,' + this.o + ')';
        context.moveTo(this.beginX, this.beginY);
        context.lineTo(this.closeX, this.closeY);
        context.closePath();
        context.stroke();
    }
}
class Circle {
    constructor(x, y, r, moveX, moveY, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.moveX = moveX;
        this.moveY = moveY;
        this.color = color;
    }

    render() {
        context.save();
        context.fillStyle = getRandomColor();
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.restore();
    }
}

let random = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

let initCircle = (x, y, r, moveX, moveY, color) => {
    let circle = new Circle(x, y, r, moveX, moveY, color);
    circle.render();
    return circle;
};

function draw() {

    for (let i = 0; i < POINT; i++) {
        let cir = circleArr[i];
        cir.x += cir.moveX;
        cir.y += cir.moveY;
        if (cir.x > WIDTH || cir.x < 0) cir.moveX = -cir.moveX;
        if (cir.y > HEIGHT || cir.y < 0) cir.moveY = -cir.moveY;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < POINT; i++) {
        circleArr[i].render();
    }
    for (let i = 0; i < POINT; i++) {
        for (let j = 0; j < POINT; j++) {
            if (i + j < POINT) {
                let A = Math.abs(circleArr[i + j].x - circleArr[i].x),
                    B = Math.abs(circleArr[i + j].y - circleArr[i].y);
                let lineLength = Math.sqrt(A * A + B * B);
                let C = 1 / lineLength * 7 - 0.009;
                let lineOpacity = C > 0.03 ? 0.03 : C;
                if (lineOpacity > 0 && lineLength < 260) {
                    new Line(circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity).render();
                }
            }
        }
    }
    requestAnimationFrame(draw);
}
//初始化生成原点
(function init() {
    circleArr = [];
    for (let i = 0; i < POINT; i++) {
        circleArr.push(initCircle(random(WIDTH), random(HEIGHT), random(5, 4), random(10, -10) / 40, random(10, -10) / 40, getRandomColor()));
    }
    draw();
})();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

//# sourceMappingURL=index-compiled.js.map