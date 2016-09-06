let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let RADIUS = 7; //球半径
let NUMBER_GAP = 10; //数字之间的间隙
let u = 0.65; //碰撞能量损耗系数
let balls = []; //存储彩色的小球
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]; //彩色小球的颜色
let currentNums = []; //屏幕显示的8个字符
let digit = [[[0, 0, 1, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 0, 1, 1, 0], [0, 0, 1, 1, 1, 0, 0]], //0
[[0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [1, 1, 1, 1, 1, 1, 1]], //1
[[0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1]], //2
[[1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], //3
[[0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 0], [0, 1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 1, 1]], //4
[[1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], //5
[[0, 0, 0, 0, 1, 1, 0], [0, 0, 1, 1, 0, 0, 0], [0, 1, 1, 0, 0, 0, 0], [1, 1, 0, 0, 0, 0, 0], [1, 1, 0, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], //6
[[1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0]], //7
[[0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 1, 1, 0]], //8
[[0, 1, 1, 1, 1, 1, 0], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [1, 1, 0, 0, 0, 1, 1], [0, 1, 1, 1, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 0, 1, 1], [0, 0, 0, 0, 1, 1, 0], [0, 0, 0, 1, 1, 0, 0], [0, 1, 1, 0, 0, 0, 0]], //9
[[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]] //:
];

function drawDatetime() {

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    let nums = [];

    context.fillStyle = "#005eac";
    let date = new Date();
    let offsetX = 70,
        offsetY = 30;
    let hours = date.getHours();
    let h1 = Math.floor(hours / 10);
    let h2 = hours % 10;
    nums.push({ num: h1 });
    nums.push({ num: h2 });
    nums.push({ num: 10 }); //冒号
    let minutes = date.getMinutes();
    let m1 = Math.floor(minutes / 10);
    let m2 = minutes % 10;
    nums.push({ num: m1 });
    nums.push({ num: m2 });
    nums.push({ num: 10 }); //冒号
    let seconds = date.getSeconds();
    let s1 = Math.floor(seconds / 10);
    let s2 = seconds % 10;
    nums.push({ num: s1 });
    nums.push({ num: s2 });

    for (let x = 0; x < nums.length; x++) {
        nums[x].offsetX = offsetX;
        offsetX = drawSingleNumber(offsetX, offsetY, nums[x].num, context);
        //两个数字连一块，应该间隔一些距离
        if (x < nums.length - 1) {
            if (nums[x].num != 10 && nums[x + 1].num != 10) {
                offsetX += NUMBER_GAP;
            }
        }
    }

    //说明这是初始化
    if (currentNums.length == 0) {
        currentNums = nums;
    } else {
        //进行比较
        for (let index = 0; index < currentNums.length; index++) {
            if (currentNums[index].num != nums[index].num) {
                //不一样时，添加彩色小球
                addBalls(nums[index]);
                currentNums[index].num = nums[index].num;
            }
        }
    }
    renderBalls(context);
    updateBalls();
    requestAnimationFrame(drawDatetime);
    return date;
}

function addBalls(item) {
    let num = item.num;
    let numMatrix = digit[num];
    for (let y = 0; y < numMatrix.length; y++) {
        for (let x = 0; x < numMatrix[y].length; x++) {
            if (numMatrix[y][x] == 1) {
                let ball = {
                    offsetX: item.offsetX + RADIUS + RADIUS * 2 * x,
                    offsetY: 30 + RADIUS + RADIUS * 2 * y,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 10)) * 4 + Math.random(),
                    vy: -5
                };
                balls.push(ball);
            }
        }
    }
}

function renderBalls(cxt) {
    for (let index = 0; index < balls.length; index++) {
        cxt.beginPath();
        cxt.fillStyle = balls[index].color;
        cxt.arc(balls[index].offsetX, balls[index].offsetY, RADIUS, 0, 2 * Math.PI);
        cxt.fill();
    }
}

function updateBalls() {
    let i = 0;
    for (let index = 0; index < balls.length; index++) {
        let ball = balls[index];
        ball.offsetX += ball.vx;
        ball.offsetY += ball.vy;
        ball.vy += ball.g;
        if (ball.offsetY > WINDOW_HEIGHT - RADIUS) {
            ball.offsetY = WINDOW_HEIGHT - RADIUS;
            ball.vy = -ball.vy * u;
        }
        if (ball.offsetX > RADIUS && ball.offsetX < WINDOW_WIDTH - RADIUS) {

            balls[i] = balls[index];
            i++;
        }
    }
    //去除出边界的球
    for (; i < balls.length; i++) {
        balls.pop();
    }
}
function drawSingleNumber(offsetX, offsetY, num, cxt) {
    let numMatrix = digit[num];
    for (let y = 0; y < numMatrix.length; y++) {
        for (let x = 0; x < numMatrix[y].length; x++) {
            if (numMatrix[y][x] == 1) {
                cxt.beginPath();
                cxt.arc(offsetX + RADIUS + RADIUS * 2 * x, offsetY + RADIUS + RADIUS * 2 * y, RADIUS, 0, 2 * Math.PI);
                cxt.fill();
            }
        }
    }
    cxt.beginPath();
    offsetX += numMatrix[0].length * RADIUS * 2;
    return offsetX;
}

drawDatetime();

//# sourceMappingURL=index-compiled.js.map