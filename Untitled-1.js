var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
palloR = 10,
x = canvas.width / 2,
y = canvas.height - 30,
sx = 3,
sy = -3,
pongH = 15,
pongW = 80,
pongX = (canvas.width - pongW) / 2,
oikeaAvain = false,
vasenAvain = false,
tiilinRows = 3,
tiilinCol = 9,
tiilinW = 75,
tiilinH = 20,
tiilinPadding = 10,
tiiliOffsetTop = 30,
tiiliOffsetLeft = 30;

var tiilit = [];
for (c = 0; c < tiilinCol; c++) {
for (r = 0; r < tiilinRows; r++) {
    tiilit.push({
  x: (c * (tiilinW + tiilinPadding)) + tiiliOffsetLeft,
  y: (r * (tiilinH + tiilinPadding)) + tiiliOffsetTop,
  status: 1
});
}
}

function piirraPallo() {
ctx.beginPath();
ctx.arc(x, y, palloR, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();
}

function piirraPong() {
ctx.beginPath();
ctx.rect(pongX, canvas.height - pongH, pongW, pongH);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();
}

function piirraTiilit() {
    tiilit.forEach(function(tiili) {
if (!tiili.status) return;
ctx.beginPath();
ctx.rect(tiili.x, tiili.y, tiilinW, tiilinH);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();
});
}

function torHavaitseminen() {
    tiilit.forEach(function(t) {
if (!t.status) return;

var inBricksColumn = x > t.x && x < t.x + tiilinW,
    inBricksRow = y > t.y && y < t.y + tiilinH;

if (inBricksColumn && inBricksRow) {
    sy = -sy;
  t.status = 0;
}
});
}

function piirra() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
piirraTiilit();
piirraPallo();
piirraPong();
torHavaitseminen();

if (lyoSeinanSivu())
sx = -sx;
if (lyoYlos() || lyoPong())
sy = -sy;
if (peliOhi())
document.location.reload();

var oikea_Suunta = 39,
  vasen_Suunta= 37;

function lyoPong() { return lyoPohjaan() && palloPonginYli() }
function palloPonginYli() { return x > pongX && x < pongX + pongW }
function lyoPohjaan() { return y + sy > canvas.height - palloR }
function peliOhi() { return lyoPohjaan() && !palloPonginYli() }
function lyoSeinanSivu() { return x + sx > canvas.width - palloR || x + sx < palloR }
function lyoYlos() { return y + sy < palloR }
function oikeaKlikka(e) { return e.keyCode == oikea_Suunta }
function vasenKlikka(e) { return e.keyCode == vasen_Suunta }

function avainAlas(e) {
    oikeaAvain = oikeaKlikka(e); 
    vasenAvain = vasenKlikka(e);
}

function avainYlos(e) {
    oikeaAvain = oikeaKlikka(e) ? false : oikeaAvain;
    vasenAvain = vasenKlikka(e) ? false : vasenAvain;
}


document.addEventListener("keydown", avainAlas, false);
document.addEventListener("keyup", avainYlos, false);


var maxX = canvas.width - pongW,
  minX = 0,
  pongDelta = oikeaAvain ? 7 : vasenAvain ? -7 : 0;

pongX = pongX + pongDelta;
pongX = Math.min(pongX, maxX);
pongX = Math.max(pongX, minX);

x += sx;
y += sy;
}

setInterval(piirra, 10);