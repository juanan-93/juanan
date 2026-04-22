export default class Ground {
    ctx;
    canvas;
    width;
    height;
    speed;
    scaleRatio;
    x = 0;
    y;
    groundImage;
    constructor(ctx, width, height, speed, scaleRatio) {
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
    update(gameSpeed, frameTimeDelta) {
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
