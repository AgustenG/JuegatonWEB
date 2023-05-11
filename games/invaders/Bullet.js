export default class Bullet {
  constructor(canvas, x, y, speed, bulletClr) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.bulletClr = bulletClr;

    this.width = 5;
    this.height = 20;
  }

  draw(ctx) {
    this.y -= this.speed;
    ctx.fillStyle = this.bulletClr;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  collideWith(sprite) {
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}