const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 300;

let dinoImg1 = new Image();
dinoImg1.src = 'img/dino1.png';
let dinoImg2 = new Image();
dinoImg2.src = 'img/dino2.png';
let dinoImg3 = new Image();
dinoImg3.src = 'img/dino3.png';
let cactusImg1 = new Image();
cactusImg1.src = 'img/cactus1.png';
let cactusImg2 = new Image();
cactusImg2.src = 'img/cactus2.png';

// 공룡 정보
let dino={
    x: 50,
    y: 200,
    width: 50,
    height: 53,
    draw(type){
        ctx.beginPath();
        // ctx.fillStyle = 'green';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        if(type == 1){
            ctx.drawImage(dinoImg1,this.x,this.y);
        }
        if(type == 2){
            ctx.drawImage(dinoImg2,this.x,this.y);
        }
        if(type == 3){
            ctx.drawImage(dinoImg3,this.x,this.y);
        }
    }
}

// 장애물 배열
let cactusPacktory = [];

// 장애물 정보
class Cactus{
    constructor(){
        this.x = 1000;
        this.y = 210;
        this.width = 40;
        this.height = 42;
    }
    draw(){
        ctx.beginPath();
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(cactusImg1,this.x,this.y);
    }
}
let timer = 0;
let jumpTimer = 0;
let jumpAction = false;
let animation;
let dinoImgType = 1;

const scoreBox = document.querySelector('.score');

function frameAction(){
    animation = requestAnimationFrame(frameAction);
    timer++;
    scoreBox.innerHTML = timer + '점';
    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(timer % 100 === 0){
        let cactus = new Cactus();
        cactusPacktory.push(cactus);
    }
    cactusPacktory.forEach((item, idx, arr)=>{
        if(item.x < -50){
            arr.splice(idx,1);
        }
        item.x -= 5;
        clashCheck( dino, item );
        item.draw();
    })
    // 공룡 발 바꾸기
    if(timer % 6 == 0){
        if(dinoImgType == 2){
            dinoImgType = 1;
        }else{
            dinoImgType = 2;
        }
    }    
    
    if(jumpAction == true){
        dinoImgType = 3;
        dino.y -= 3;
        jumpTimer += 1;
    }
    if(jumpTimer > 40){
        jumpAction = false;
        jumpTimer = 0;
    }
    if(jumpAction == false){
        if(dino.y < 200){
            dinoImgType = 3;
            dino.y += 3;
        }
    }
    dino.draw(dinoImgType);
}
frameAction();

document.addEventListener('keydown', (e)=>{
    // console.log(e.keyCode);
    if(e.keyCode == 32){
        if(dino.y == 200){
            jumpAction = true;      
        }
    }
});

// 충돌감지
function clashCheck( dino, cactus ){
    let xDifference = cactus.x - (dino.x + dino.width);
    let yDifference = cactus.y - (dino.y + dino.height); 
    if(xDifference < 0 && yDifference < -10){

        console.log(xDifference);
        console.log(yDifference);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation);
    }
}
