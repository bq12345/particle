const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = WIDTH;
canvas.height = HEIGHT;

const COORDINATE_LENGTH = 5000;

let offsetLeft = canvas.offsetLeft;
let offsetTop = canvas.offsetTop;

class Star {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    mapXYToCanvasCoordinates(canvasWidth, canvasHeight) {
        let canvasX = Math.round((this.x / COORDINATE_LENGTH) * canvasWidth);
        let canvasY = Math.round((this.y / COORDINATE_LENGTH) * canvasHeight);
        return {
            x: canvasX,
            y: canvasY
        }
    }
}

let StarFactory = {
    /**
     * Generates all random values to create a random star
     * @return {Star} a star with random X/Y, size and color
     */
    getRandomStar: function () {
        let x = Math.floor(Math.random() * (COORDINATE_LENGTH + 1));
        let y = Math.floor(Math.random() * (COORDINATE_LENGTH + 1));
        let size = this._getWeightedRandomSize();
        let color = this._getWeightedRandomColor();
        let tintedColor = this._applyRandomShade(color);
        return new Star(x, y, size, this._getRGBColorString(tintedColor));
    },

    _getWeightedRandomSize: function () {
        let list = [1, 1.5, 2];
        let weight = [0.8, 0.15, 0.05];
        return this._getWeightedRandom(list, weight);
    },

    _getWeightedRandomColor: function () {
        let list = [
            {'r': 255, 'g': 189, 'b': 111},
            {'r': 255, 'g': 221, 'b': 180},
            {'r': 255, 'g': 244, 'b': 232},
            {'r': 251, 'g': 248, 'b': 255},
            {'r': 202, 'g': 216, 'b': 255},
            {'r': 170, 'g': 191, 'b': 255},
            {'r': 155, 'g': 176, 'b': 255}
        ];
        let weight = [0.05, 0.05, 0.05, 0.7, 0.05, 0.05, 0.05];
        return this._getWeightedRandom(list, weight);
    },

    _getRandomShade: function () {
        let list = [0.4, 0.6, 1];
        let weight = [0.5, 0.3, 0.2];
        return this._getWeightedRandom(list, weight);
    },

    _applyRandomShade: function (color) {
        let shade = this._getRandomShade();
        if (shade !== 1) { // skip processing full brightness stars
            color['r'] = Math.floor(color['r'] * shade);
            color['g'] = Math.floor(color['g'] * shade);
            color['b'] = Math.floor(color['b'] * shade);
        }
        return color;
    },

    _getRGBColorString: function (color) {
        return 'rgb(' + color['r'] + ',' + color['g'] + ',' + color['b'] + ')';
    },

    // http://codetheory.in/weighted-biased-random-number-generation-with-javascript-based-on-probability/
    _getWeightedRandom: function (list, weight) {

        let rand = function (min, max) {
            return Math.random() * (max - min) + min;
        };

        let total_weight = weight.reduce(function (prev, cur) {
            return prev + cur;
        });

        let random_num = rand(0, total_weight);
        let weight_sum = 0;

        for (let i = 0; i < list.length; i++) {
            weight_sum += weight[i];
            weight_sum = +weight_sum.toFixed(2);

            if (random_num <= weight_sum) {
                return list[i];
            }
        }
    }
};

let stars = [];


let settings = {
    starDensity: 2.0,
    mouseScale: 0.5,
    seedMovement: true
};

let totalPixels = WIDTH * HEIGHT;
let starRatio = 0.002 * settings.starDensity;
let numStars = Math.floor(totalPixels * starRatio);

let deltaX = 2;
let deltaY = 2;

for (let i = 0; i < numStars; i++) {
    stars.push(StarFactory.getRandomStar());
}

// ANIMATION HANDLER
let recalcMovement = ()=> {
    stars.forEach(function (star) {
        let newX = star.x - deltaX;
        let newY = star.y - deltaY;

        if (newX < 0) {
            newX += COORDINATE_LENGTH
        }
        if (newY < 0) {
            newY += COORDINATE_LENGTH
        }
        if (newX > COORDINATE_LENGTH) {
            newX -= COORDINATE_LENGTH
        }
        if (newY > COORDINATE_LENGTH) {
            newY -= COORDINATE_LENGTH
        }

        star.x = newX;
        star.y = newY;
    });
};

let draw = ()=> {

    context.clearRect(0, 0, WIDTH, HEIGHT);
    // iterate stars and draw them
    stars.forEach((star)=> {
        let offset = star.mapXYToCanvasCoordinates(WIDTH, HEIGHT);

        context.fillStyle = star.color;
        context.fillRect(offset.x, offset.y, star.size, star.size);
    });
};

canvas.addEventListener('mousemove', (e)=> {

        let centerX = WIDTH / 2;
        let centerY = HEIGHT / 2;
        let distanceX = ((e.pageX - offsetLeft) - centerX);
        let distanceY = ((e.pageY - offsetTop) - centerY);

        deltaX = Math.round(settings.mouseScale * (distanceX / 100));
        deltaY = Math.round(settings.mouseScale * (distanceY / 100));
    }
);

(function loop() {
    requestAnimationFrame(loop);
    recalcMovement();
    draw();
})();
