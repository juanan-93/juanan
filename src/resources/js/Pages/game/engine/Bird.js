export default class Bird {
  ctx;
  x;
  y;
  width;
  height;
  images;
  currentImageIndex = 0;
  animationTimer = 0;
  ANIMATION_INTERVAL = 180;

  constructor(ctx, x, y, width, height, images) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.images = images;
  }

  update(speed, gameSpeed, frameTimeDelta, scaleRatio) {
    this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;

    this.animationTimer += frameTimeDelta;
    if (this.animationTimer >= this.ANIMATION_INTERVAL) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.animationTimer = 0;
    }
  }

  draw() {
    this.ctx.drawImage(
      this.images[this.currentImageIndex],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  collideWith(sprite) {
    const adjustBy = 1.4;

    if (
      sprite.x < this.x + this.width / adjustBy &&
      sprite.x + sprite.width / adjustBy > this.x &&
      sprite.y < this.y + this.height / adjustBy &&
      sprite.height + sprite.y / adjustBy > this.y
    ) {
      return true;
    }

    return false;
  }
}
