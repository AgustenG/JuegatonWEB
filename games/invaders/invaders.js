import AlienCtrlr from "./AlienCtrlr.js";
import Rocket from "./rocket.js";
import BulletCtrlr from "./BulletCtrlr.js";
import { deathAlien } from "./AlienCtrlr.js";

var puntuacion = 0;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "icons/spacebkg.png";

const rocketBulletCtrlr = new BulletCtrlr(canvas, 7, "aliceblue", true);
const alienBulletCtrlr = new BulletCtrlr(canvas, 7, "red", false);
const alienCtrlr = new AlienCtrlr(canvas, alienBulletCtrlr, rocketBulletCtrlr);
const rocket = new Rocket(canvas, 3, rocketBulletCtrlr);

let GameOver = false;
let uWin = false;

function game() {
  checkGameOver();
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  showOver();
  if (!GameOver) {
    alienCtrlr.draw(ctx);
    rocket.draw(ctx);
    rocketBulletCtrlr.draw(ctx);
    alienBulletCtrlr.draw(ctx);
  }
}

function showOver() {
  if (GameOver) {
    let text = uWin ? "Ganaste!!" : "Has perdido...";
    let textOffset = uWin ? 3.5 : 5;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);

    var button = document.getElementById("btn");
    button.style.display = "block";
  }
}

function checkGameOver() {
  if (GameOver) {
    return;
  }

  if (alienBulletCtrlr.collideWith(rocket)) {
    GameOver = true;
  }

  if (alienCtrlr.collideWith(rocket)) {
    GameOver = true;
  }

  if (alienCtrlr.alienRows.length === 0) {
    uWin = true;
    GameOver = true;
  }

  puntuacion = 5 * deathAlien;
  console.log(puntuacion);
}

setInterval(game, 1000 / 60);