// Game constrants and variable
let inputdir = { x: 0, y: 0 };
let gameOver = new Audio("Game Over.wav");
let EatingFood = new Audio("Eating Food.mp3");
let ChangeDirection = new Audio("change direction.wav");
let SnakeBackgroundMusic = new Audio("Snake Music.mp3");
let speed = 2;
let changePaintTime = 0;
let snakeArr = [{ x: 12, y: 15 }];
let score = 0;
food = { x: 6, y: 7 };
// Game functions
// SnakeBackgroundMusic.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem('hiscoreval', JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse('hiscore');
    hiscoreBox.innerHTML = "Hiscore" + hiscore;
}
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(main);
    if ((ctime - changePaintTime) / 1000 < 1 / speed) {
        return;
    }
    changePaintTime = ctime;
    gameEngine();
}

function gameEngine() {
    // part 1 : updating the snak arrayke
    function snakeCollid(snak) {
        // if you bump yourself
        for (let i = 1; i < snakeArr.length; i++) {
            if (snak[i].x === snak[0].x && snak[i].y === snak[0].y) {
                scoreBox.innerHTML = "Scroe" + '0';

                return true;
            }
        }
        // if you bump into the wall

        if (snak[0].x >= 18 || snak[0].x <= 0 || snak[0].y >= 18 || snak[0].y <= 0) {
            // gameOver.play();
            scoreBox.innerHTML = "Scroe" + '0';

            return true;
        }

    }
    if (snakeCollid(snakeArr)) {
        gameOver.play();
        SnakeBackgroundMusic.pause();
        // ChangeDirection.pause();
        inputdir = { x: 0, y: 0 }
        alert('Game over press any key to play again !');
        snakeArr = [{ x: 12, y: 15 }];
        SnakeBackgroundMusic.play();

        score = 0;
    }
    // if you have eaten the food increment the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        EatingFood.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscoreval', JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hiscore" + hiscoreval;

        }
        scoreBox.innerHTML = "Scroe" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

    }
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;

    // part 2 : Display snake and food
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        snakElement = document.createElement('div');
        snakElement.style.gridRowStart = e.y;
        snakElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakElement.classList.add('head');

        }
        else {
            snakElement.classList.add('snake');
        }
        board.appendChild(snakElement);
    });
    // displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


// main logic of Game
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }
    ChangeDirection.play();
    switch (e.key) {
        case "ArrowUp":
            console.log('Arrowup is clicked');
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            console.log('ArrowDown is clicked');
            inputdir.x = 0;
            inputdir.y = 1;

            break;
        case "ArrowLeft":
            console.log('ArrowLeft is clicked');
            inputdir.x = -1;
            inputdir.y = 0;

            break;
        case "ArrowRight":
            console.log('ArrowRight is clicked');
            inputdir.x = 1;
            inputdir.y = 0;

            break;
        default:
            break;
    }
})