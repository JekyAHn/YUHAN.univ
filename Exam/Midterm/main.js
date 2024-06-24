var canvas = document.getElementById("Midterm Game");
var ctx = canvas.getContext("2d");

// 게임시작
document.getElementById('start-button').addEventListener('click', function() 
{
    startGame();
    var playButton = document.querySelector('.playbutton');
    playButton.style.display = 'none';
});

document.getElementById('restart-button').addEventListener('click', function() 
{
    restartGame();
    var dieScreen = document.querySelector('.die');
    dieScreen.style.display = 'none';
});

var canvasCenterX = canvas.width / 2;
var canvasCenterY = canvas.height / 2;
var score = 0;
var circleActive = false;
var circleRadius = 100;
var circleDuration = 5000; // 5 seconds
var attackEnabled = false;

class Hexagon 
{
    constructor(posX, posY, rot, rotSpeed, size, color, moveDirX, moveDirY, speed) 
    {
        this.position_X = posX;
        this.position_Y = posY;
        this.rotation = rot;
        this.rotation_Speed = rotSpeed;
        this.color = color;
        this.size = size;

        this.moveDirectionX = moveDirX;
        this.moveDirectionY = moveDirY;
        this.moveSpeed = speed;

        this.lifeTextOffsetX = -250; //life 텍스트위치
        this.lifeTextOffsetY = -350;
        this.life = 3;
    }

    activateCircle() 
    {
        if (!attackEnabled) return; // 공격 활성화 여부 확인
        circleActive = true;
        attackEnabled = false; // 공격 후 비활성화
        setTimeout(() => {
            circleActive = false;
        }, circleDuration);
    }

    drawCircle() 
    {
        if (circleActive) 
        {
            ctx.beginPath();
            ctx.arc(this.position_X, this.position_Y, circleRadius, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fill();
            ctx.closePath();
        }
    }

    update() 
    {
        this.position_X += (this.moveDirectionX * this.moveSpeed);
        this.position_Y += (this.moveDirectionY * this.moveSpeed);
        this.rotation += this.rotation_Speed;

        for (var i = 0; i < monsters.length; i++) 
        {
            let monster = monsters[i];
            let deltaX = this.position_X - monster.position_X;
            let deltaY = this.position_Y - monster.position_Y;
            let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < this.size + monster.size) 
            {
                this.life--;
                monsters.splice(i, 1); // 닿으면 몬스터삭제
                i--;
                setTimeout(createMonster, 2000); // 2초 후에 새로운 몬스터 생성
            }
        }

        // 아이템 충돌 체크
        let deltaX = this.position_X - b.position_X;
        let deltaY = this.position_Y - b.position_Y;
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < this.size + b.size) 
        {
            attackEnabled = true;
            randomizeItemPosition(); // 아이템 위치 랜덤화
        }

        if (circleActive) 
        {
            for (var i = 0; i < monsters.length; i++) 
            {
                let monster = monsters[i];
                let deltaX = this.position_X - monster.position_X;
                let deltaY = this.position_Y - monster.position_Y;
                let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (distance < circleRadius) 
                {
                    monsters.splice(i, 1); // 몬스터 삭제
                    score++;
                    i--;
                    setTimeout(createMonster, 2000); // 2초 후에 새로운 몬스터 생성
                }
            }
        }

        if (this.life <= 0) 
        {
            endGame();
        }
    }

    draw() 
    {
        ctx.beginPath();
        for (var i = this.rotation; i <= 360 + this.rotation; i += 72) 
        {
            ctx.lineTo((Math.cos(Math.PI / 180 * i)) * this.size + this.position_X, (Math.sin(Math.PI / 180 * i)) * this.size + this.position_Y); //플레이어 그리기
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        var lifeText = "Lifes: " + this.life;
        var textWidth = ctx.measureText(lifeText).width;
        ctx.fillText(lifeText, this.position_X - textWidth / 2 + this.lifeTextOffsetX, this.position_Y - this.size + this.lifeTextOffsetY); //텍스트위치 고정
        this.drawCircle();
    }
}

class Item
{
    constructor(posX, posY, rot, rotSpeed, size, color, moveDirX, moveDirY, speed)
    {
        this.position_X = posX;
        this.position_Y = posY;
        this.rotation = rot;
        this.rotation_Speed = rotSpeed;
        this.color = color;
        this.size = size;

        this.moveDirectionX = moveDirX;
        this.moveDirectionY = moveDirY;
        this.moveSpeed = speed;
    }

    update()
    {
        this.position_X += (this.moveDirectionX * this.moveSpeed);
        this.position_Y += (this.moveDirectionY * this.moveSpeed);
        this.rotation += this.rotation_Speed;
    }

    draw()
    {
        ctx.beginPath();
        ctx.moveTo
        (
            this.position_X + this.size * Math.cos(Math.PI / 180 * this.rotation), 
            this.position_Y + this.size * Math.sin(Math.PI / 180 * this.rotation)
        );
    
        for (let i = 1; i <= 5; i++) 
        {
            ctx.lineTo
            (
                this.position_X + this.size * Math.cos(Math.PI / 180 * (this.rotation + i * 144)), 
                this.position_Y + this.size * Math.sin(Math.PI / 180 * (this.rotation + i * 144))
            );
        }

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Item2 {
    constructor(posX, posY, rot, rotSpeed, size, color, moveDirX, moveDirY, speed) {
        this.position_X = posX;
        this.position_Y = posY;
        this.rotation = rot;
        this.rotation_Speed = rotSpeed;
        this.color = color;
        this.size = size;

        this.moveDirectionX = moveDirX;
        this.moveDirectionY = moveDirY;
        this.moveSpeed = speed;
    }

    update() {
        this.position_X += this.moveDirectionX * this.moveSpeed;
        this.position_Y += this.moveDirectionY * this.moveSpeed;
        this.rotation += this.rotation_Speed;
        let deltaX = this.position_X - a.position_X;
        let deltaY = this.position_Y - a.position_Y;
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < this.size + a.size) 
        {
            a.life++; // 플레이어 라이프 증가
            randomizeItem2Position(); // 아이템 2의 위치 랜덤화
        }

    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.position_X, this.position_Y);
        ctx.rotate((this.rotation - 45) * Math.PI / 180); // 하트가 각도를 고려한 회전
        ctx.fillStyle = this.color;

        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(0, -this.size * 0.8, this.size * 0.7, -this.size * 0.8);
        ctx.quadraticCurveTo(this.size, -this.size * 0.8, this.size, -this.size * 0.4);
        ctx.quadraticCurveTo(this.size, -this.size * 0.1, this.size * 0.5, this.size * 0.8);
        ctx.quadraticCurveTo(0, this.size * 1.5, -this.size * 0.5, this.size * 0.7);
        ctx.quadraticCurveTo(-this.size, -this.size * 0.1, -this.size, -this.size * 0.4);
        ctx.quadraticCurveTo(-this.size, -this.size * 0.8, -this.size * 0.7, -this.size * 0.8);
        ctx.quadraticCurveTo(0, -this.size * 0.8, 0, 0);

        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}



var a = new Hexagon(100.0, 0.0, -90.0, 2.0, 30.0, "green", 1.0, 1.0, 0.0);
var b = new Item(100.0, 0.0, 10.0, 2.0, 25.0, "yellow", 1.0, 1.0, 0.0);
var c = new Item2(100.0, 0.0, 10.0, 1.5, 20.0, "red", 1.0, 1.0, 0.0);

class Monster 
{
    constructor(posX, posY, rot, rotSpeed, size, color, moveDirX, moveDirY, speed) 
    {
        this.position_X = posX;
        this.position_Y = posY;
        this.rotation = rot;
        this.rotation_Speed = rotSpeed;
        this.color = colors[color];
        this.size = size;

        this.moveDirectionX = moveDirX;
        this.moveDirectionY = moveDirY;
        this.moveSpeed = speed;
    }

    update(hexagon) 
    {
        let deltaX = hexagon.position_X - this.position_X;
        let deltaY = hexagon.position_Y - this.position_Y;

        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        let directionX = deltaX / distance;
        let directionY = deltaY / distance;

        //이동
        this.moveDirectionX = directionX;
        this.moveDirectionY = directionY;

        //이동속도
        this.moveSpeed = 1.0;

        //이동방향
        this.position_X += this.moveDirectionX * this.moveSpeed;
        this.position_Y += this.moveDirectionY * this.moveSpeed;

        //회전
        this.rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    }

    draw() 
    {
        ctx.beginPath();
        for (var i = 0; i <= 360; i += 10) 
        {
            ctx.lineTo(
                Math.cos((Math.PI / 180) * i) * this.size + this.position_X,
                Math.sin((Math.PI / 180) * i) * this.size + this.position_Y
            );
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

function drawScore() 
{
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, canvas.width - 100, 30);
}

var colors = ["#C7C5FF", "black", "blue", "magenta", "pink", "cyan", "orange"];
var a;
var monsters;
var gameActive = false;
var randomX = Math.random() * canvas.width;
var randomY = Math.random() * canvas.height;

function randomizeItemPosition() 
{
    b.position_X = Math.random() * canvas.width;
    b.position_Y = Math.random() * canvas.height;
}
function randomizeItem2Position() 
{
    c.position_X = Math.random() * canvas.width;
    c.position_Y = Math.random() * canvas.height;
}

function createMonster() 
{
    let directions = ['left', 'right', 'top', 'bottom'];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    let posX, posY, moveDirX, moveDirY;

    switch(direction) {
        case 'left':
            posX = -50;
            posY = Math.random() * canvas.height;
            moveDirX = 1.0;
            moveDirY = 0;
            break;
        case 'right':
            posX = canvas.width + 50;
            posY = Math.random() * canvas.height;
            moveDirX = -1.0;
            moveDirY = 0;
            break;
        case 'top':
            posX = Math.random() * canvas.width;
            posY = -50;
            moveDirX = 0;
            moveDirY = 1.0;
            break;
        case 'bottom':
            posX = Math.random() * canvas.width;
            posY = canvas.height + 50;
            moveDirX = 0;
            moveDirY = -1.0;
            break;
    }

    let monster = new Monster(posX, posY, -90.0, 2.0, 10.0, Math.round(Math.random() * 6), moveDirX, moveDirY, 0.0);
    monsters.push(monster);
}

function startGame() 
{
    a = new Hexagon(canvasCenterX, canvasCenterY, -90.0, 2.0, 30.0, "green", 1.0, 1.0, 0.0);
    randomizeItemPosition();
    randomizeItem2Position();
    attackEnabled = false; // 공격 비활성화 상태로 시작
    monsters = [];

    for (var i = 0; i < 20; i++) { // 총 20개의 몬스터 생성
        createMonster();
    }

    gameActive = true;
    draw();
}

function endGame() 
{
    gameActive = false;
    var dieScreen = document.querySelector('.die');
    dieScreen.style.display = 'block';
    score = 0; // 점수 초기화
}

function restartGame() //리스타트
{
    startGame();
    randomizeItem2Position();
    var playButton = document.querySelector('.playbutton');
    playButton.style.display = 'none';
    var dieScreen = document.querySelector('.die');
    dieScreen.style.display = 'none';
}

function draw() 
{
    if (!gameActive) 
    {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    a.update();
    b.update();
    c.update();
    for (var i = 0; i < monsters.length; i++) 
    {
        monsters[i].update(a);
    }

    ctx.save();
    ctx.translate(canvasCenterX - a.position_X, canvasCenterY - a.position_Y);

    a.draw();
    b.draw();
    c.draw();
    for (var i = 0; i < monsters.length; i++) 
    {
        monsters[i].draw();
    }

    ctx.restore();

    drawScore(); // 점수 그리기

    requestAnimationFrame(draw);
}

function GetKey(event) 
{
    if (!gameActive) return; // 게임 오버 상태에서는 키 입력을 무시

    if (event.key === 'ArrowRight') 
    {
        a.position_X += 5;
    }
    if (event.key === 'ArrowLeft') 
    {
        a.position_X -= 5;
    }
    if (event.key === 'ArrowUp') 
    {
        a.position_Y -= 5;
    }
    if (event.key === 'ArrowDown') 
    {
        a.position_Y += 5;
    }
    if (event.key === ' ') 
    {
        a.activateCircle();
    }
}

document.addEventListener('keydown', GetKey);