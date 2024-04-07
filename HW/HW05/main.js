var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');

var sun_rot = 0;
var earth_rot = 0;
var moon_rot = 0;
var earth_or = 0;
var moon_or = 0;

// 공전 속도 변수 추가

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 태양 그리기
    ctx.save();
    ctx.fillStyle = "red";
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(sun_rot);
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();

    // 지구 그리기
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(earth_or);
    ctx.translate(200, 0);
    ctx.rotate(earth_rot);
    ctx.fillStyle = "blue";
    ctx.fillRect(-20, -20, 50, 50);

    // 달 그리기
    ctx.save();
    ctx.rotate(moon_or);
    ctx.translate(70, 0);
    ctx.rotate(moon_rot);
    ctx.fillStyle = "grey";
    ctx.fillRect(-15, -15, 30, 30);
    ctx.restore();

    ctx.restore();

    // 회전 속도 업데이트
    sun_rot += Math.PI / 100; // 태양의 자전
    earth_rot += Math.PI / 150; // 지구의 자전 속도
    moon_rot += Math.PI / 80; // 달의 자전 속도
    earth_or += Math.PI / -200
    moon_or += Math.PI / 100

    requestAnimationFrame(draw);
}

draw();
