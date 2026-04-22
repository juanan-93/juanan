export default class Ground {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  private speed: number;
  private scaleRatio: number;

  private x = 0;
  private y: number;
  private groundImage: HTMLImageElement;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    speed: number,
    scaleRatio: number
  ) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scaleRatio = scaleRatio;

    this.y = this.canvas.height - this.height;

    this.groundImage = new Image();
    this.groundImage.src = "/img/game/ground.png";
  }

  update(gameSpeed: number, frameTimeDelta: number) {
    this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
  }

  draw() {
    this.ctx.drawImage(this.groundImage, this.x, this.y, this.width, this.height);

    this.ctx.drawImage(this.groundImage, this.x + this.width, this.y, this.width, this.height);

    if (this.x < -this.width) {
      this.x = 0;
    }
  }

  reset() {
    this.x = 0;
  }
}
