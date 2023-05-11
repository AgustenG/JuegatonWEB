export default class Alien {
  constructor(x, y, imgNum) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;

    this.image = new Image();
    this.image.src = `icons/alien${imgNum}.png`;
    this.alive = 0;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(xSpeed, ySpeed) {
    this.x += xSpeed;
    this.y += ySpeed;
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
