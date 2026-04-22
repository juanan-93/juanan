export default class Player {
  private readonly WALK_ANIMATION_TIMER = 200;
  private walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  private dinoRunImages: HTMLImageElement[] = [];

  private jumpPressed = false;
  private jumpInProgress = false;
  private falling = false;
  private readonly JUMP_SPEED = 0.6;
  private readonly GRAVITY = 0.4;

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  width: number;
  height: number;
  private minJumpHeight: number;
  private maxJumpHeight: number;
  private scaleRatio: number;

  x: number;
  y: number;
  private yStandingPosition: number;

  private standingStillImage: HTMLImageElement;
  private image: HTMLImageElement;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    minJumpHeight: number,
    maxJumpHeight: number,
    scaleRatio: number
  ) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;

    this.x = 10 * scaleRatio;
    this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
    this.yStandingPosition = this.y;

    this.standingStillImage = new Image();
    this.standingStillImage.src = "/img/game/standing_still.png";
    this.image = this.standingStillImage;

    const dinoRunImage1 = new Image();
    dinoRunImage1.src = "/img/game/dino_run1.png";

    const dinoRunImage2 = new Image();
    dinoRunImage2.src = "/img/game/dino_run2.png";

    this.dinoRunImages.push(dinoRunImage1);
    this.dinoRunImages.push(dinoRunImage2);
  }

  setJumpPressed(value: boolean) {
    this.jumpPressed = value;
  }

  update(gameSpeed: number, frameTimeDelta: number) {
    this.run(gameSpeed, frameTimeDelta);

    if (this.jumpInProgress) {
      this.image = this.standingStillImage;
    }

    this.jump(frameTimeDelta);
  }

  private jump(frameTimeDelta: number) {
    if (this.jumpPressed) {
      this.jumpInProgress = true;
    }

    if (this.jumpInProgress && !this.falling) {
      if (
        this.y > this.canvas.height - this.minJumpHeight ||
        (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)
      ) {
        this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
      } else {
        this.falling = true;
      }
    } else if (this.y < this.yStandingPosition) {
      this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
      if (this.y + this.height > this.canvas.height) {
        this.y = this.yStandingPosition;
      }
    } else {
      this.falling = false;
      this.jumpInProgress = false;
    }
  }

  private run(gameSpeed: number, frameTimeDelta: number) {
    if (this.walkAnimationTimer <= 0) {
      if (this.image === this.dinoRunImages[0]) {
        this.image = this.dinoRunImages[1];
      } else {
        this.image = this.dinoRunImages[0];
      }
      this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    }

    this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  reset() {
    this.y = this.yStandingPosition;
    this.jumpPressed = false;
    this.jumpInProgress = false;
    this.falling = false;
    this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    this.image = this.standingStillImage;
  }
}
