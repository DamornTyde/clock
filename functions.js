var canvas = document.getElementById("clock"),
    canvas2 = document.createElement("canvas"),
    ctx = canvas.getContext("2d"),
    ctx2 = canvas2.getContext("2d"),
    grad,
    tday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	tmonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

canvas.width = 800;
canvas.height = 800;
canvas2.width = canvas.width;
canvas2.height = canvas.height;
ctx.fillStyle = "#FFF";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var radius = canvas.width / 2;
ctx.translate(radius, radius);
radius = radius * 0.9;

// draw face
ctx.beginPath();
ctx.arc(0, 0, radius, 0, 2*Math.PI);
ctx.fillStyle =  "white";
ctx.fill();

grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
grad.addColorStop(0, "#FFF");
grad.addColorStop(0.75, "#000");
grad.addColorStop(1, "#FFF");
ctx.strokeStyle = grad;
ctx.lineWidth = radius * 0.1;
ctx.stroke();

ctx.beginPath();
ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
ctx.fillStyle = "#000";
ctx.fill();

// draw numbers
ctx.font = radius * 0.15 + "px arial";
ctx.textBaseline = "middle";
ctx.textAlign = "center";
for (var num = 1; num < 13; num++) {
    var ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.70);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.17);
    ctx.fillText("|", 0, 0);
    ctx.translate(0, radius * 0.87);
    ctx.rotate(-ang);
    for (var num2 = 1; num2 < 5; num2++) {
        var ang2 = (num2 * Math.PI / 30) + ang;
        ctx.rotate(ang2);
        ctx.translate(0, -radius * 0.90);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("-", radius * 0.01, -radius * 0.006);
        ctx.rotate(Math.PI / 2);
        ctx.translate(0, radius * 0.90);
        ctx.rotate(-ang2);
    }
}

//backup
ctx2.drawImage(canvas, 0, 0);

// draw time
window.requestAnimationFrame(drawTime);

function drawTime(){
    window.requestAnimationFrame(drawTime);
    ctx.drawImage(canvas2, -canvas.width / 2, -canvas.width / 2);
    var now = new Date(),
	    hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds(),
        milisecond = now.getMilliseconds(),
	    day = tday[now.getDay()],
	    date = now.getDate(),
	    month = tmonth[now.getMonth()],
	    year = now.getFullYear(),
        time = (Math.floor(now.getTime() / 1000)).toLocaleString(),
        part;
    
    if (hour < 12) {
		part = "AM";
	} else {
		part = "PM";
    }
    
    //hour
	hour = hour % 12;
	hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60)) + (milisecond * Math.PI / (21600 * 1000));
	drawHand(hour, radius * 0.5, radius * 0.04);
    
    //minute
	minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60)) + (milisecond * Math.PI / (1800 * 1000));
	drawHand(minute, radius * 0.8, radius * 0.04);
    
    //second
	second = (second * Math.PI / 30) + (milisecond * Math.PI / (30 * 1000));
    drawHand(second, radius * 0.9, radius * 0.02);
    
    ctx.font = radius * 0.05 + "px arial";
	ctx.fillStyle = "#fff";
    ctx.fillText(part, 0, 0);
    document.getElementsByTagName("header")[0].innerHTML = day + ", " + date + " " + month + " " + year + " (" + time + ")";
}

function drawHand(pos, lenght, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -lenght);
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.rotate(-pos);
}