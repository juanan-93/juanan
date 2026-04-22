import Bird from "./Bird";

export default class BirdController {
  BIRD_INTERVAL_MIN = 1500;
  BIRD_INTERVAL_MAX = 4000;
  nextBirdInterval = null;
  birds = [];

  ctx;
  canvas;
  birdImages;
  birdWidth;
  birdHeight;
  scaleRatio;
  speed;

  constructor(ctx, birdImages, birdWidth, birdHeight, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.birdImages = birdImages;
    this.birdWidth = birdWidth;
    this.birdHeight = birdHeight;
    this.scaleRatio = scaleRatio;
    this.speed = speed;
    this.setNextBirdTime();
  }

  setNextBirdTime() {
    this.nextBirdInterval = this.getRandomNumber(
      this.BIRD_INTERVAL_MIN,
      this.BIRD_INTERVAL_MAX
    );
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomBirdY() {
    const offset = this.getRandomNumber(25, 50);
    return this.canvas.height - this.birdHeight - offset;
  }

  createBird() {
    const x = this.canvas.width * 1.5;
    const y = this.getRandomBirdY();
    const bird = new Bird(
      this.ctx,
      x,
      y,
      this.birdWidth,
      this.birdHeight,
      this.birdImages
    );
    this.birds.push(bird);
  }

  update(gameSpeed, frameTimeDelta, enabled, spawnBlocked) {
    this.birds.forEach((bird) => {
      bird.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });
    this.birds = this.birds.filter((bird) => bird.x > -bird.width);

    if (!enabled) return;

    if (this.nextBirdInterval === null) {
      this.setNextBirdTime();
    }

    if (this.nextBirdInterval !== null && this.nextBirdInterval <= 0) {
      if (spawnBlocked) {
        this.nextBirdInterval = 900;
      } else {
        this.createBird();
        this.setNextBirdTime();
      }
    }

    if (this.nextBirdInterval !== null) {
      this.nextBirdInterval -= frameTimeDelta;
    }
  }

  draw() {
    this.birds.forEach((bird) => bird.draw());
  }

  collideWith(sprite) {
    return this.birds.some((bird) => bird.collideWith(sprite));
  }

  reset() {
    this.birds = [];
    this.setNextBirdTime();
  }
}
