import Bullet from "./Bullet.js";
export default class BulletCtrlr {
  bullets = [];
  timeTillNextShoot = 0;

  constructor(canvas, maxBulletsAtTime, bulletClr, soundEnabled) {
    this.canvas = canvas;
    this.maxBulletsAtTime = maxBulletsAtTime;
    this.bulletClr = bulletClr;
    this.soundEnabled = soundEnabled;

    this.bulletSound = new Audio("sounds/shoot.wav");
    this.bulletSound.volume = 0.5;
  }

  draw(ctx) {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );

    this.bullets.forEach((bullet) => bullet.draw(ctx));
    if (this.timeTillNextShoot > 0) {
      this.timeTillNextShoot--;
    }
  }

  collideWith(sprite) {
    const bulletHitIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );
    if (bulletHitIndex >= 0) {
      this.bullets.splice(bulletHitIndex, 1);
      return true;
    }
    return false;
  }

  shoot(x, y, speed, timeTillNextShoot = 0) {
    if (
      this.timeTillNextShoot <= 0 &&
      this.bullets.length < this.maxBulletsAtTime
    ) {
      const bullet = new Bullet(this.canvas, x, y, speed, this.bulletClr);
      this.bullets.push(bullet);
      if (this.soundEnabled) {
        this.bulletSound.currentTime = 0;
        this.bulletSound.play();
      }
      this.timeTillNextShoot = timeTillNextShoot;
    }
  }
}
