export default class Score {
    score = 0;
    globalHighScore;
    ctx;
    canvas;
    scaleRatio;
    constructor(ctx, scaleRatio, globalHighScore) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
        this.globalHighScore = globalHighScore;
    }
    update(frameTimeDelta) {
        this.score += frameTimeDelta * 0.01;
    }
    reset() {
        this.score = 0;
    }
    getScore() {
        return Math.floor(this.score);
    }
    setHighScore() {
        // No hace nada; el récord global lo gestiona el backend.
    }
    draw() {
        const highScore = Math.max(this.globalHighScore, Math.floor(this.score));
        const y = 20 * this.scaleRatio;
        const fontSize = 20 * this.scaleRatio;
        this.ctx.font = `${fontSize}px serif`;
        this.ctx.fillStyle = "#525250";
        const scoreX = this.canvas.width - 75 * this.scaleRatio;
        const highScoreX = scoreX - 125 * this.scaleRatio;
        const scorePadded = Math.floor(this.score).toString().padStart(6, "0");
        const highScorePadded = highScore.toString().padStart(6, "0");
        this.ctx.fillText(scorePadded, scoreX, y);
        this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    }
}
