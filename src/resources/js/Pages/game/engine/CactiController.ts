import Cactus from "./Cactus";

type CactusImageConfig = {
  image: HTMLImageElement;
  width: number;
  height: number;
};

export default class CactiController {
  private readonly CACTUS_INTERVAL_MIN = 500;
  private readonly CACTUS_INTERVAL_MAX = 2000;

  private nextCactusInterval: number | null = null;
  private cacti: Cactus[] = [];

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private cactiImages: CactusImageConfig[];
  private scaleRatio: number;
  private speed: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    cactiImages: CactusImageConfig[],
    scaleRatio: number,
    speed: number
  ) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.cactiImages = cactiImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextCactusTime();
  }

  private setNextCactusTime() {
    const num = this.getRandomNumber(this.CACTUS_INTERVAL_MIN, this.CACTUS_INTERVAL_MAX);
    this.nextCactusInterval = num;
  }

  private getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private createCactus() {
    const index = this.getRandomNumber(0, this.cactiImages.length - 1);
    const cactusImage = this.cactiImages[index];
    const x = this.canvas.width * 1.5;
    const y = this.canvas.height - cactusImage.height;

    const cactus = new Cactus(
      this.ctx,
      x,
      y,
      cactusImage.width,
      cactusImage.height,
      cactusImage.image
    );

    this.cacti.push(cactus);
  }

  update(gameSpeed: number, frameTimeDelta: number) {
    if (this.nextCactusInterval === null) {
      this.setNextCactusTime();
    }

    if (this.nextCactusInterval !== null && this.nextCactusInterval <= 0) {
      this.createCactus();
      this.setNextCactusTime();
    }

    if (this.nextCactusInterval !== null) {
      this.nextCactusInterval -= frameTimeDelta;
    }

    this.cacti.forEach((cactus) => {
      cactus.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
    });

    this.cacti = this.cacti.filter((cactus) => cactus.x > -cactus.width);
  }

  draw() {
    this.cacti.forEach((cactus) => cactus.draw());
  }

  collideWith(sprite: { x: number; y: number; width: number; height: number }) {
    return this.cacti.some((cactus) => cactus.collideWith(sprite));
  }

  /** Devuelve true si hay algún cactus con x > minX (zona derecha o fuera de pantalla). */
  hasObstacleInZone(minX: number): boolean {
    return this.cacti.some((c) => c.x > minX);
  }

  reset() {
    this.cacti = [];
    this.setNextCactusTime();
  }
}
