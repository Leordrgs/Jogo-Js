let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//Bola
let x = canvas.width / 2; // inicial horizontal
let y = canvas.height - 35; // inicial vertical
let dx = 2; // variação horizontal
let dy = -2; // variação vertical
let ballRadius = 10; // raio da bola

//Barra
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = (canvas.height - paddleHeight) - 10;
let rightPressed =  false;
let leftPressed = false;

//Pedras
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft =30;

// pontos e vidas
let score = 0;
let lives = 3;

let bricks = [];
for(let c=0; c< brickColumnCount; c++){
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x: 0, y:0, visible: true};
    }
}

function brickCollisionDetection(){
    for(let c= 0; c< brickColumnCount; c++){
        for(let r= 0; r< brickRowCount; r++){
            let brick =bricks[c][r];

            if (brick.visible) {
                if (brick.x < x && x < brick.x + brickWidth && brick.y < y && y < brick.y + brickHeight) {
                  // colidiu
                  dy = -dy;
                  brick.visible = false;
                  score++;
                  if(score==brickRowCount*brickColumnCount){
                    alert("Você Venceu, Parabéns!");
                    document.location.reload();
                    clearInterval(interval);
                  }
                }
              }
            
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Pontuação: " + score, 8, 20);
}

 function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas: " + lives, canvas.width - 65, 20);
  }

//desenhando as pedras 
function drawBrick(brickX, brickY){
    ctx.beginPath();
    ctx.rect(brickX, brickY, brickWidth, brickHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for (let c = 0; c < brickColumnCount; c++){
        for(let r = 0; r < brickRowCount; r++){
            if(bricks[c][r].visible){

                let brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                drawBrick(brickX, brickY);
            }
        }
    }
}

//Desenhando a barra
function drawPaddle(){
ctx.beginPath();
ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);  
ctx.fillStyle ="#0095DD";
ctx.fill(); 
ctx.closePath(); 
}

//Desenhando a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle ="#0095DD";
    ctx.fill();
    ctx.closePath();
}

//Desenho completo 
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    brickCollisionDetection();
    drawScore();
    drawLives();
    drawBricks();

    // verifica se a bola sai na horizontal
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
        dx = -dx; // inverte o sinal de dx
    }
    // verifica se a bola sai na vertical
    if(y + dy < ballRadius){
        dy = -dy; // inverte o sinal de dy
    }else if(x > paddleX && x < paddleX + paddleWidth && y + ballRadius >= paddleY){
        dy = -dy;
    }else if(y + dy > canvas.height-ballRadius){
        lives--; // Perde vidas
        if(lives== 0){
            alert ("Game Over!");
            document.location.reload();
            clearInterview(interval);
        }else{ // Reseta o estado da bola e da barra 
             x = canvas.width / 2; // inicial horizontal
             y = canvas.height - 35; // inicial vertical
             dx = 2; // variação horizontal
             dy = -2; // variação vertical
             paddleX = (canvas.width - paddleWidth) / 2;
        }
    }

    if(rightPressed){
        paddleX += 7;
        if(paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }else if (leftPressed){
        paddleX -= 7;
        if(paddleX < 0){
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;
}
let interval = setInterval(draw, 10);


//Comandos do teclado para jogar
function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed= true;
    }
    if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed= true
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed= false;
    }
    if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed= false
    }
}

function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2;
    }
}

//adiciona evento de controle do teclado 
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);