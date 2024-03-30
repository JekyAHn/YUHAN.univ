// main.js
// canvas 불러오기
var canvas = document.getElementById("gamescreen");
var ctx = canvas.getContext("2d");

var studentID = 2020304023;

function drawNum(num)
{
    num = studentID;
    ctx.beginPath();
    ctx.moveTo(0,0);
        

}


drawNum(studentID);     //화면 우측 상단에 숫자 쓰기