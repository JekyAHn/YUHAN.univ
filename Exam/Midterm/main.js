window.onload = function() {
    const canvas = document.getElementById('maincanvas');
    const ctx = canvas.getContext('2d');

    // 캔버스의 중앙으로 원점 이동
    ctx.translate(canvas.width / 2, canvas.height / 2);

    let playerX = canvas.width / 2; // 플레이어의 초기 x 좌표
    let playerY = canvas.height / 2; // 플레이어의 초기 y 좌표
    const playerSize = 50; // 플레이어 크기
    const moveSpeed = 10; // 플레이어 이동 속도

    function drawHeart(x, y, size, rgbColor) {
        const color = `rgb(${rgbColor.join(',')})`;
        ctx.fillStyle = color;
        ctx.beginPath();

        ctx.moveTo(x, y + size / 4); // 시작점

        // 곡선 좌표 계산
        for (let i = 0; i < 360; i++) {
            const t = i * Math.PI / 180;
            const heartX = 16 * Math.pow(Math.sin(t), 3);
            const heartY = - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            ctx.lineTo(x + heartX * size / 32, y + heartY * size / 32);
        }

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    function drawStar(centerX, centerY, arms, innerRadius, outerRadius, startAngle, fillStyle, strokeStyle, lineWidth) {
        startAngle = startAngle * Math.PI / 180 || 0;
        var step = Math.PI / arms,
            angle = startAngle,
            hyp, x, y;
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        for (var i = 0, len = 2 * arms; i < len; i++) {
            hyp = i & 1 ? innerRadius : outerRadius;
            x = centerX + Math.cos(angle) * hyp;
            y = centerY + Math.sin(angle) * hyp;

            // 캔버스를 벗어나지 않도록 위치 제한
            x = Math.max(-canvas.width / 2, Math.min(canvas.width / 2, x));
            y = Math.max(-canvas.height / 2, Math.min(canvas.height / 2, y));

            angle += step;
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        fillStyle && ctx.fill();
        strokeStyle && ctx.stroke();
    }

    // 별의 크기를 줄이고 위치를 랜덤하게 설정
    const starX = Math.random() * canvas.width - canvas.width / 2;
    const starY = Math.random() * canvas.height - canvas.height / 2;

    

    let rotationAngle = 0; // 회전 각도 초기값

    function animate() {
        ctx.save(); // 현재 캔버스 상태 저장
    
        // 회전
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height); // 캔버스 초기화
        ctx.rotate(rotationAngle * Math.PI / 180); // 회전 각도 적용
        drawHeart(0, 0, 50, [196, 0, 0]); // 하트 그리기
        
    
        ctx.restore(); // 회전 전 캔버스 상태 복원
        drawStar(starX, starY, 5, 20, 40, -18, 'yellow', 'black', 1); // 별 그리기
    }

    // 키보드 이벤트 리스너
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowUp':
                playerY -= moveSpeed;
                break;
            case 'ArrowDown':
                playerY += moveSpeed;
                break;
            case 'ArrowLeft':
                playerX -= moveSpeed;
                break;
            case 'ArrowRight':
                playerX += moveSpeed;
                break;
        }
        // 별의 좌표 재설정
        starX = Math.random() * canvas.width - canvas.width / 2;
        starY = Math.random() * canvas.height - canvas.height / 2;
    });

    // 60프레임으로 애니메이션 실행
    setInterval(() => {
        rotationAngle += 1; // 회전 각도 업데이트
        animate(); // 애니메이션 함수 호출
    }, 20); // 

};
