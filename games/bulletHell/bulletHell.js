var launchers = [
    [240, 100], [160, 680], [440, 500], [940, 200], [860, 680], [1140, 500], [1640, 200], [1560, 680]]
var bullets = [];
var shipX = 440;
var preShipX = 440;
var shipY = 100;
var preShipY = 95;
var shipR = 25;
var rotation = 0;
var launcheR = 20;
var fireballR = 5;
var interFire = 30;
var count = 0;
var lifespan = 250;
var score = 0;
var alive = true;

window.onload = function () {
    let canvas = document.getElementById("canvas-box");
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        var img = document.getElementById("fondo");
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                ctx.drawImage(img, window.innerWidth / 4*i, window.innerHeight / 4*j, window.innerWidth / 4, window.innerHeight / 4);
            }
        }
        var img2 = document.getElementById("ship0");
        ctx.drawImage(img2, 440, 10, shipR * 2, shipR * 2);
        var img3 = document.getElementById("launcher");
        for (let i = 0; i < launchers.length; i++) {
            ctx.drawImage(img3, launchers[i][0], launchers[i][1], launcheR * 2, launcheR * 2)
        }
    }
}

function moveShip(even) {

    preShipX = shipX;
    preShipY = shipY;
    shipX = even.clientX - shipR;
    shipY = even.clientY - shipR;
    //arctan(y/x)
    let y = shipY - preShipY;
    let x = shipX - preShipX;
    let ang = Math.atan(x / y) * 180 / Math.PI;


    if (ang > -22.5 && ang < 22.5 && y < 0) rotation = 0;
    else if (ang > -67.5 && ang < -22.5 && x>0) rotation = 7;
    else if (ang < 67.5 && ang > 22.5 && x > 0) rotation = 5;
    else if (ang < -67.5 && ang > -122.5) rotation = 2;
    else if (ang > -22.5 && ang < 22.5 && y > 0) rotation = 4;
    else if (ang > -67.5 && ang < -22.5 && x < 0) rotation = 3;
    else if (ang < 67.5 && ang > 22.5 && x < 0) rotation = 1;
    else if (ang < 112.5 && ang > 67.5) rotation = 6;




    


}
function shootBullets(launcherID) {
    let bullet = [launchers[launcherID][0]+launcheR, launchers[launcherID][1]+launcheR, Math.random() * 10 - 5, Math.random() * 10 - 5,0]
    bullets.push(bullet);
}
function updateBullets(ctx) {

    var img4 = document.getElementById("bullet");
    for (let i = 0; i < bullets.length; i++) {
        bullets[i][0] += bullets[i][2];
        bullets[i][1] += bullets[i][3];
        bullets[i][4]++;
        if (bullets[i][4] > lifespan) {
            bullets.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < bullets.length; i++) {
        ctx.drawImage(img4, bullets[i][0], bullets[i][1], fireballR * 2, fireballR * 2);
    }
}

function checkCollision() {
    for (let i = 0; i < bullets.length; i++) {
        let x = bullets[i][0]+fireballR - shipX-shipR;
        let y = bullets[i][1]+fireballR - shipY;
        let d = Math.sqrt(x * x + y * y);
        //console.log(d - (fireballR + shipR));
        if (d < (fireballR + shipR)) {
            console.log("you lost");
            alive = false;
            returnPrincipal()
        }
    }
    for (let i = 0; i < launchers.length; i++) {
        let x = launchers[i][0] + launcheR - shipX-shipR;
        let y = launchers[i][1] + launcheR - shipY;
        let d = Math.sqrt(x * x + y * y);
        //console.log(d - (launcheR + shipR));
        if (d < (launcheR + shipR)) {
            console.log(score);
            alive = false;
            returnPrincipal()
        }
    }
}
function setScore() {
    var puntosFinales;
    var nickName= localStorage.getItem("jugador");
    fetch(`https://apipost.azurewebsites.net/Jugador/${nickName}`)
        .then((response) => response.json())
        .then((json) => {
            this.posts = json;
            puntosFinales =
                parseInt(this.posts.puntuacion) + parseInt(score);
            let url = `https://apipost.azurewebsites.net/Jugador/${puntosFinales} ${nickName}`;
            let put = {
                method: "PUT",
                // body: JSON.stringify(text),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            fetch(url, put)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
        })
        .catch((error) => console.log(error));
}

function everyTime() {
    if (alive) {
        count++;
        score++;
        let canvas = document.getElementById("canvas-box");
        if (canvas.getContext) {
            let ctx = canvas.getContext("2d");
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            var img = document.getElementById("fondo");
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    ctx.drawImage(img, window.innerWidth / 4 * i, window.innerHeight / 4 * j, window.innerWidth / 4, window.innerHeight / 4);
                }
            }
            var img3 = document.getElementById("launcher");
            for (let i = 0; i < launchers.length; i++) {
                launchers[i][0] += Math.random() * 4 - 2;
                if (launchers[i][0] > 1900) launchers[i][0] = 1700;
                if (launchers[i][1] > 900) launchers[i][0] = 1700;
                if (launchers[i][0] < 50) launchers[i][0] = 1700;
                if (launchers[i][0] < 50) launchers[i][0] = 1700;
                launchers[i][1] += Math.random() * 4 - 2;
                ctx.drawImage(img3, launchers[i][0], launchers[i][1], launcheR * 2, launcheR * 2);
                if (count > interFire) shootBullets(i);
            }
            if (count > interFire) {
                if (interFire > 5) interFire--;
                count = 0;
            }
            var img2 = document.getElementById("ship" + rotation);
            ctx.drawImage(img2, shipX, shipY - shipR, shipR * 2, shipR * 2);
            updateBullets(ctx);
            checkCollision();
        }
    }
}

function returnPrincipal() {
    document.getElementById("return").style.display = "block";
  };

var myInterval = setInterval(everyTime, 30);


document.getElementById("return").addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("puntos", score);
    let actualizarPuntos = localStorage.getItem("puntos");
    let nickName = localStorage.getItem("Jugador");

    setScore(nickName, actualizarPuntos);
    setTimeout(function () {
      localStorage.setItem("Jugado", true);
      window.location.href = "../../PaginaPrincipal/principal.html";
    }, 2000);
    localStorage.removeItem("puntos");
  });