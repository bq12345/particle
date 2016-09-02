let image = {};
let particles = [];
//获取canvas元素
let canvas = document.getElementById('canvas');

//获取渲染上下文
canvas.ctx = canvas.getContext('2d');

//设置画布大小为屏幕宽高
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

//新建一个image对象
let img = new Image();

//图像加载完后
img.onload = function () {
    //把图像信息保存在image里面
    image.w = img.width;
    image.h = img.height;
    image.x = 300;
    image.y = 200;

    //把图像绘制到画布坐标为(300,100)的地方
    canvas.ctx.drawImage(img, image.x, image.y, image.w, image.h);

    image.imageData = canvas.ctx.getImageData(image.x, image.y, image.w, image.h);

    //计算出符合要求的像素
    calculate(image.imageData);

    //计算后绘到画布上
    draw();
};
//设置image的source
img.src = 'canvas.png';

let getRandomColor = () => {
    return ["#4285f4", "#ea4335", "#fbbc05", "#34a853"][parseInt(Math.random() * 4, 10)];
};

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//计算并保存坐标
function calculate(imageData) {

    // 每一行和每一列要显示的粒子
    let cols = 150,
        rows = 100;
    // 每个粒子的实际占位宽高
    let pw = parseInt(image.w / cols);
    let ph = parseInt(image.h / rows);
    let pos = 0;
    let data = imageData.data;
    // 划分格子
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // 二维数组位置
            pos = (j * ph * image.w + i * pw) * 4;
            //判断像素透明度值是否符合要求

            if (data[pos + 1] < 20) {
                let particle = new Particle(image.x + i * pw + (Math.random() - 0.5) * 10, image.y + j * ph + (Math.random() - 0.5) * 10);
                // 根据图像不同的色值来设定粒子色值
                // particle.fillStyle = getRandomColor();
                particle.fillStyle = getRandomColor();

                if (i % 3 == 0 && j % 3 == 0) {
                    particle.flotage = true;
                    //保存开始坐标
                    particle.startX = particle.x;
                    particle.startY = particle.y;
                    //动画执行时间和结束时间
                    particle.startTime = Date.now() + Math.random() * 20 * 1000;
                    particle.killTime = Date.now() + Math.random() * 35 * 1000;
                    //x,y方向的移动速度
                    particle.speedX = (Math.random() - 0.5) * 0.9;
                    particle.speedY = (Math.random() - 0.5) * 0.9;
                }

                //符合要求的粒子保存到数组里
                particles.push(particle);
            }
        }
    }
}

//绘图案
function draw() {
    //清空画布
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

    let len = particles.length;
    //当前时间毫秒值
    let time = Date.now();
    for (let i = 0; i < len; i++) {

        let p = particles[i];
        //开始漂浮
        if (p.flotage && p.startTime < time) {
            //改变粒子位置
            p.x += p.speedX;
            p.y += p.speedY;
        }
        //结束时间到了
        if (p.killTime < time) {
            //粒子位置复原
            p.x = p.startX;
            p.y = p.startY;
            //重新计算开始时间和结束时间
            p.startTime = time + parseInt(Math.random() * 20) * 1000;
            p.killTime = time + parseInt(Math.random() * 35) * 1000;
        }
        //设置填充颜色
        canvas.ctx.fillStyle = p.fillStyle;
        //绘粒子到画布上
        canvas.ctx.fillRect(p.x, p.y, 1, 1);
    }

    //重复绘制
    requestAnimationFrame(draw);
}

//# sourceMappingURL=index-compiled.js.map