let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//começar a desenhar
ctx.beginPath();
ctx.rect(20, 40, 50, 50); // na posição (20, 40) desenhe um quadro 
ctx.fillStyle ="#ff0000";
ctx.fill(); // pinte o quadrado
ctx.closePath(); // termine o quadrado

ctx.beginPath();
// no ponto (2040, 160), com raio 20, ângulo incial 0
// desenhe um circulo de 2PI radianos, sentido horario
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle= "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle ="rgba(0, 0, 255, 0.5)"
ctx.strokeStyle();
ctx.closePath();