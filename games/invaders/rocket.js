export default class Rocket {
  rightPress = false;
  leftPress = false;
  shootPress = false;

  constructor(canvas, speed, bulletCtrlr) {
    this.canvas = canvas;
    this.speed = speed;
    this.bulletCtrlr = bulletCtrlr;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 75;
    this.width = 50;
    this.height = 48;
    this.image = new Image();
    this.image.src = "icons/rocket.png";

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  draw(ctx) {
    if (this.shootPress) {
      this.bulletCtrlr.shoot(this.x + this.width / 2, this.y, 4, 10);
    }
    this.move();
    this.collideWalls();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collideWalls() {
    //colision izquierda
    if (this.x < 0) {
      this.x = 0;
    }

    //colision derecha
    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    }
  }

  move() {
    if (this.rightPress) {
      this.x += this.speed;
    } else if (this.leftPress) {
      this.x += -this.speed;
    }
  }

  keydown = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPress = true;
    }
    if (event.code == "ArrowLeft") {
      this.leftPress = true;
    }
    if (event.code == "Space") {
      this.shootPress = true;
    }
  };

  keyup = (event) => {
    if (event.code == "ArrowRight") {
      this.rightPress = false;
    }
    if (event.code == "ArrowLeft") {
      this.leftPress = false;
    }
    if (event.code == "Space") {
      this.shootPress = false;
    }
  };
}
