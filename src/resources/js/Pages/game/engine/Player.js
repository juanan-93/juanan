export default class Player {
    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    duckAnimationTimer = this.WALK_ANIMATION_TIMER;
    dinoRunImages = [];
    dinoDuckImages = [];
    jumpPressed = false;
    duckPressed = false;
    jumpInProgress = false;
    falling = false;
    wasDucking = false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;
    ctx;
    canvas;
    standingWidth;
    standingHeight;
    duckWidth;
    duckHeight;
    width;
    height;
    minJumpHeight;
    maxJumpHeight;
    scaleRatio;
    x;
    y;
    yStandingPosition;
    yDuckingPosition;
    standingStillImage;
    image;

    constructor(ctx, width, height, duckWidth, duckHeight, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.standingWidth = width;
        this.standingHeight = height;
        this.duckWidth = duckWidth;
        this.duckHeight = duckHeight;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;
        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
        this.yStandingPosition = this.y;
        this.yDuckingPosition = this.canvas.height - this.duckHeight - 1.5 * scaleRatio;
        this.standingStillImage = new Image();
        this.standingStillImage.src = "/img/game/standing_still.png";
        this.image = this.standingStillImage;
        const dinoRunImage1 = new Image();
        dinoRunImage1.src = "/img/game/dino_run1.png";
        const dinoRunImage2 = new Image();
        dinoRunImage2.src = "/img/game/dino_run2.png";
        this.dinoRunImages.push(dinoRunImage1);
        this.dinoRunImages.push(dinoRunImage2);
        const dinoDuckImage1 = new Image();
        dinoDuckImage1.src = "/img/game/dinoDown1.png";
        const dinoDuckImage2 = new Image();
        dinoDuckImage2.src = "/img/game/dinoDown2.png";
        this.dinoDuckImages.push(dinoDuckImage1);
        this.dinoDuckImages.push(dinoDuckImage2);
    }

    setJumpPressed(value) {
        this.jumpPressed = value;
    }

    setDuckPressed(value) {
        this.duckPressed = value;
    }

    isDucking() {
        return this.duckPressed && !this.jumpInProgress && !this.jumpPressed;
    }

    update(gameSpeed, frameTimeDelta) {
        const ducking = this.isDucking();

        if (ducking) {
            if (!this.wasDucking) {
                this.image = this.dinoDuckImages[0];
                this.duckAnimationTimer = this.WALK_ANIMATION_TIMER;
            }
            this.wasDucking = true;

            this.width = this.duckWidth;
            this.height = this.duckHeight;
            this.y = this.yDuckingPosition;
            this.duckRun(gameSpeed, frameTimeDelta);
        } else {
            if (this.wasDucking) {
                this.image = this.dinoRunImages[0];
                this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
            }
            this.wasDucking = false;

            this.width = this.standingWidth;
            this.height = this.standingHeight;

            if (!this.jumpInProgress && this.y > this.yStandingPosition) {
                this.y = this.yStandingPosition;
            }

            if (!this.jumpInProgress) {
                this.run(gameSpeed, frameTimeDelta);
            } else {
                this.image = this.standingStillImage;
            }
            this.jump(frameTimeDelta);
        }
    }

    jump(frameTimeDelta) {
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }
        if (this.jumpInProgress && !this.falling) {
            if (this.y > this.canvas.height - this.minJumpHeight ||
                (this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed)) {
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

    run(gameSpeed, frameTimeDelta) {
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

    duckRun(gameSpeed, frameTimeDelta) {
        if (this.duckAnimationTimer <= 0) {
            if (this.image === this.dinoDuckImages[0]) {
                this.image = this.dinoDuckImages[1];
            } else {
                this.image = this.dinoDuckImages[0];
            }
            this.duckAnimationTimer = this.WALK_ANIMATION_TIMER;
        }
        this.duckAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    reset() {
        this.y = this.yStandingPosition;
        this.width = this.standingWidth;
        this.height = this.standingHeight;
        this.jumpPressed = false;
        this.duckPressed = false;
        this.jumpInProgress = false;
        this.falling = false;
        this.wasDucking = false;
        this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        this.duckAnimationTimer = this.WALK_ANIMATION_TIMER;
        this.image = this.standingStillImage;
    }
}
