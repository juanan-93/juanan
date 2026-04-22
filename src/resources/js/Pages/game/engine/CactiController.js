import Cactus from "./Cactus";
export default class CactiController {
    CACTUS_INTERVAL_MIN = 500;
    CACTUS_INTERVAL_MAX = 2000;
    nextCactusInterval = null;
    cacti = [];
    ctx;
    canvas;
    cactiImages;
    scaleRatio;
    speed;
    constructor(ctx, cactiImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.cactiImages = cactiImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;
        this.setNextCactusTime();
    }
    setNextCactusTime() {
        const num = this.getRandomNumber(this.CACTUS_INTERVAL_MIN, this.CACTUS_INTERVAL_MAX);
        this.nextCactusInterval = num;
    }
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    createCactus() {
        const index = this.getRandomNumber(0, this.cactiImages.length - 1);
        const cactusImage = this.cactiImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - cactusImage.height;
        const cactus = new Cactus(this.ctx, x, y, cactusImage.width, cactusImage.height, cactusImage.image);
        this.cacti.push(cactus);
    }
    update(gameSpeed, frameTimeDelta) {
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
    collideWith(sprite) {
        return this.cacti.some((cactus) => cactus.collideWith(sprite));
    }
    hasObstacleInZone(minX) {
        return this.cacti.some((c) => c.x > minX);
    }
    reset() {
        this.cacti = [];
        this.setNextCactusTime();
    }
}
