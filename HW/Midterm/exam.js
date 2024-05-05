const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Canvas의 크기를 600x800으로 설정
const width = 600;
const height = 800;
canvas.width = width;
canvas.height = height;

// 시작 버튼을 가져옵니다.
const startButton = document.getElementById('start');

// 시작 버튼을 클릭할 때 게임을 시작합니다.
startButton.addEventListener('click', function() {
    // 타이틀 화면을 숨깁니다.
    const titleScreen = document.getElementById('main');
    titleScreen.style.display = 'none';

    // 캔버스를 표시합니다.
    const canvas = document.getElementById('myCanvas');
    canvas.style.display = 'block';

    // 1초 후에 게임을 시작합니다.
    setTimeout(startGame, 1000);
});

// 원을 그리는 함수 수정
function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);   // x+radius로 가장 오른쪽 끝점
    for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {  //360도가 될 때까지 0.01씩 쭉 돌리기
        const circleX = x + radius * Math.cos(angle); // 코사인으로 x좌표 변화
        const circleY = y + radius * Math.sin(angle); // 사인으로 y좌표 변화
        ctx.lineTo(circleX, circleY);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

// 적 생성 
function createEnemies() {
    const minEnemies = 4; // 최소 4마리
    const maxEnemies = 15; // 최대 15마리
    const numEnemies = Math.floor(Math.random() * (maxEnemies - minEnemies + 1)) + minEnemies;
    // 저 둘 빼서 랜덤 정수 생성하고 최종적으로 최소값 더해서 랜덤 정수 생성

    //반복문으로 적 생성
    for (let i = 0; i < numEnemies; i++) {
        // 적이 생성될 위치를 화면 바깥에서부터 랜덤하게 설정
        let enemyX, enemyY; // 적 X좌표, Y좌표 변수
        const side = Math.floor(Math.random() * 4); // 상하좌우 중 랜덤

        switch(side) {
            case 0: // 위쪽
                enemyX = Math.random() * window.innerWidth; // 브라우저창 수평에서 랜덤 위치
                enemyY = -20 - Math.random() * 3; // 화면 위쪽 바깥에서부터 생성
                break;
            case 1: // 오른쪽
                enemyX = window.innerWidth + 20 + Math.random() * 3; // 화면 오른쪽 바깥에서부터 생성
                enemyY = Math.random() * window.innerHeight; // 브라우저창 수직 랜덤
                break;
            case 2: // 아래쪽
                enemyX = Math.random() * window.innerWidth; // 브라우저창 수평 랜덤
                enemyY = window.innerHeight + 20 + Math.random() * 3; // 화면 아래쪽 바깥에서부터 생성
                break;
            case 3: // 왼쪽
                enemyX = -20 - Math.random() * 3; //  화면 왼쪽 바깥에서부터 생성
                enemyY = Math.random() * window.innerHeight; // 브라우저창 수직 랜덤
                break;
        }

        const enemySpeedX = Math.random() * 4 - 2; // -2 ~ 2 범위 랜덤 속도
        const enemySpeedY = Math.random() * 4 - 2; // -2 ~ 2 범위 랜덤 속도

        // 랜덤한 색상
        const red = Math.floor(Math.random() * 256); 
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        const color = `rgb(${red}, ${green}, ${blue})`; //0~255 사이 RGB값 랜덤 부여

        // 적 정보 배열 저장
        enemies.push({ x: enemyX, y: enemyY, speedX: enemySpeedX, speedY: enemySpeedY, color: color });
    }
}

// 적 그리기 함수
function drawEnemies() {
    for (const enemy of enemies) {
        drawCircle(enemy.x, enemy.y, 10, enemy.color); // 반지름이 10인 적 그리기
    }
}

// 적 이동 함수
function moveEnemies() {
    const enemySpeed = 0.8; // 적의 이동 속도

    for (const enemy of enemies) {
        // 플레이어와 적 사이의 거리를 계산합니다.
        const dx = playerX - enemy.x; // 플레이어 X - 적 X좌표 양수면 적이 오른쪽
        const dy = playerY - enemy.y; // 플레이어 Y - 적 Y좌표 양수면 적이 아래쪽
        const distance = Math.sqrt(dx * dx + dy * dy); // 적과 플레이어 사이 직선 거리 루트계산

        // 플레이어를 향해 일정 속도로 이동합니다.
        const speedX = dx / distance * enemySpeed; // x 방향 속도 계산, 음수 양수에 따라 왼오른 방향을 바꿈
        const speedY = dy / distance * enemySpeed; // y 방향 속도 계산, 음수 양수에 따라 위아래 방향을 바꿈

        // 적의 새로운 위치를 계산합니다.
        enemy.x += speedX; // 적 X좌표에 X좌표 속도 더해주기
        enemy.y += speedY; // 적 Y좌표에 Y좌표 속도 더해주기
    }
}

// 게임을 시작하는 함수
function startGame() {
    // 하트와 별을 그리는 기존 코드...

    // 적 생성
    createEnemies();

    // 애니메이션 프레임 요청
    requestAnimationFrame(animate);
}

// 하트 그리기 함수
function drawHeart(x, y, size, color, rotationAngle) {  
    ctx.save(); // 현재 변환 상태를 저장
    ctx.translate(x, y); // 좌표 원점을 하트의 중심으로 이동
    ctx.rotate(rotationAngle * Math.PI / 180); // 회전 변환 적용
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, size / 4); // 시작점

    // 곡선 좌표 계산
    for (let i = 0; i < 360; i++) {
        const t = i * Math.PI / 180;
        const heartX = 16 * Math.pow(Math.sin(t), 3);
        const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        ctx.lineTo(heartX * size, heartY * size); // 크기에 따라 좌표를 조정하여 하트를 그립니다.
    }

    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.restore(); // 이전 변환 상태로 복원
}

// 별 그리기 함수
function drawStar(x, y, size) {
    const starPoints = [
        { x: 12.5, y: 0 },
        { x: 15.25, y: 7 },
        { x: 24.5, y: 7 },
        { x: 17, y: 11.4 },
        { x: 19.75, y: 18.2 },
        { x: 12.5, y: 14 },
        { x: 5.25, y: 18.2 },
        { x: 8, y: 11.4 },
        { x: 0.5, y: 7 },
        { x: 9.75, y: 7 }
    ];

    ctx.beginPath();
    for (const point of starPoints) {
        ctx.lineTo(x + point.x * size, y + point.y * size); // 크기에 따라 좌표를 조정하여 별을 그립니다.
    }
    ctx.closePath();
    ctx.fillStyle = 'rgb(250, 202, 15)'; // 색상을 RGB 값 (250, 202, 15)로 고정
    ctx.fill();

    // 테두리 그리기
    ctx.strokeStyle = 'black'; // 검은색 테두리
    ctx.lineWidth = 2; // 테두리 두께 설정
    ctx.stroke();
}

// 초기 별의 위치를 랜덤하게 설정합니다.
let starX = Math.random() * (width - 30);
let starY = Math.random() * (height - 30);
let starSpeed = 8;

// 플레이어의 초기 위치를 화면 중앙으로 설정합니다.
let playerX = width / 2;
let playerY = height / 2;

// 적들을 저장할 배열
let enemies = [];

// 플레이어의 이동 속도를 정의합니다.
const playerSpeed = 8;

// 화면 갱신을 위한 함수
function update() {
    // 플레이어를 그립니다.
    drawHeart(playerX, playerY, 1, 'blue', 0);
}

// 키보드 이벤트 처리
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft': // 왼쪽 화살표
            starX += starSpeed;
            break;
        case 'ArrowUp': // 위쪽 화살표
            starY += starSpeed;
            break;
        case 'ArrowRight': // 오른쪽 화살표
            starX -= starSpeed;
            break;
        case 'ArrowDown': // 아래쪽 화살표
            starY -= starSpeed;
            break;
    }
});

// 애니메이션 프레임 함수
function animate(currentTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas를 clear하여 이전 프레임의 그림을 지웁니다.
    const heartX = width / 2; // 중앙에 그릴 하트의 x 좌표
    const heartY = height / 2; // 중앙에 그릴 하트의 y 좌표
    const rotationAngle = (currentTime / 5000) * 360 % 360; // 5초에 1바퀴 회전하는 각도
    drawHeart(heartX, heartY, 2, 'red', rotationAngle); // 회전 각도를 적용하여 하트 그리기 함수 호출
    drawStar(starX, starY, 2); // 별 그리기 함수 호출

    // 적 그리기 및 이동
    drawEnemies();
    moveEnemies();

    // 다음 프레임 요청
    requestAnimationFrame(animate);
}

// 애니메이션 시작
requestAnimationFrame(animate);