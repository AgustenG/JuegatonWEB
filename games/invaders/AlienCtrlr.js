import Alien from "./Alien.js";
import MovementAlien from "./MovementAlien.js";

export var deathAlien = 0;

export default class AlienCtrlr {
  //Array que contiene arrays para las distintas filas de alienigenas
  alienMap = [
    [1, 3, 1, 2, 2, 2, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  ];

  alienRows = [];

  //caracteristicas de todos los aliens, como la velocidad, movimiento y velocidad de balas.
  directionNow = MovementAlien.right;
  xSpeed = 0;
  ySpeed = 0;
  defaultXSpeed = 1;
  defaultYSpeed = 1;
  moveDownTimerDefault = 30;
  moveDownTimer = this.moveDownTimerDefault;
  shootTimerDefault = 15;
  shootTimer = this.shootTimerDefault;

  constructor(canvas, alienBulletCtrlr, rocketBulletCtrlr) {
    this.canvas = canvas;
    this.alienBulletCtrlr = alienBulletCtrlr;
    this.rocketBulletCtrlr = rocketBulletCtrlr;

    this.alienDeath = new Audio("sounds/enemy-death.wav");
    this.alienDeath.volume = 0.5;

    this.createAliens();
  }

  draw(ctx) {
    this.decrementMoveDownTimer();
    this.updateSpeedAndDirection();
    this.collisionDetect();
    this.drawAliens(ctx);
    this.resetMoveDownTimer();
    this.shoot();
  }

  collisionDetect() {
    this.alienRows.forEach((alienRow) => {
      alienRow.forEach((alien, alienIndex) => {
        if (this.rocketBulletCtrlr.collideWith(alien)) {
          //Sonidos de muerte de los aliens
          this.alienDeath.currentTime = 0;
          this.alienDeath.play();
          alienRow.splice(alienIndex, 1);
          deathAlien++;
          console.log(deathAlien);
        }
      });
    });

    this.alienRows = this.alienRows.filter((enemyRow) => enemyRow.length > 0);
  }

  shoot() {
    this.shootTimer--;
    if (this.shootTimer <= 0) {
      this.shootTimer = this.shootTimerDefault;
      const alliens = this.alienRows.flat();
      const alienIndex = Math.floor(Math.random() * alliens.length);
      const alien = alliens[alienIndex];
      this.alienBulletCtrlr.shoot(alien.x, alien.y, -3);
    }
  }

  resetMoveDownTimer() {
    if (this.moveDownTimer <= 0) {
      this.moveDownTimer = this.moveDownTimerDefault;
    }
  }

  decrementMoveDownTimer() {
    if (
      this.directionNow === MovementAlien.downLeft ||
      this.directionNow === MovementAlien.downRight
    ) {
      this.moveDownTimer--;
    }
  }

  updateSpeedAndDirection() {
    for (const alienRows of this.alienRows) {
      if (this.directionNow == MovementAlien.right) {
        this.xSpeed = this.defaultXSpeed;
        this.ySpeed = 0;
        const rightestAlien = alienRows[alienRows.length - 1];
        if (rightestAlien.x + rightestAlien.width >= this.canvas.width) {
          this.directionNow = MovementAlien.downLeft;
          break;
        }
      } else if (this.directionNow === MovementAlien.downLeft) {
        if (this.moveDown(MovementAlien.left)) {
          break;
        }
      } else if (this.directionNow == MovementAlien.left) {
        this.xSpeed = -this.defaultXSpeed;
        this.ySpeed = 0;
        const leftestAlien = alienRows[0];
        if (leftestAlien.x <= 0) {
          this.directionNow = MovementAlien.downRight;
          break;
        }
      } else if (this.directionNow === MovementAlien.downRight) {
        if (this.moveDown(MovementAlien.right)) {
          break;
        }
      }
    }
  }

  moveDown(newDirection) {
    this.xSpeed = 0;
    this.ySpeed = this.defaultYSpeed;
    if (this.moveDownTimer <= 0) {
      this.directionNow = newDirection;
      return true;
    }
    return false;
  }

  drawAliens(ctx) {
    this.alienRows.flat().forEach((alien) => {
      alien.move(this.xSpeed, this.ySpeed);
      alien.draw(ctx);
    });
  }

  //Creación de los alienigenas
  //Aquí además de generar la imagen que les corresponde
  //se los separa para que no se encuentren todos uno encima
  // de otro.
  createAliens() {
    this.alienMap.forEach((row, rowIndex) => {
      this.alienRows[rowIndex] = [];
      row.forEach((alienNum, alienInd) => {
        if (alienNum > 0) {
          this.alienRows[rowIndex].push(
            new Alien(alienInd * 50, rowIndex * 35, alienNum)
          );
        }
      });
    });
  }
  collideWith(sprite) {
    return this.alienRows.flat().some((enemy) => enemy.collideWith(sprite));
  }
}
