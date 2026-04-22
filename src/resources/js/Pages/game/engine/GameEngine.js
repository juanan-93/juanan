import Player from "./Player";
import Ground from "./Ground";
import CactiController from "./CactiController";
import Score from "./Score";
const GAME_SPEED_START = 1;
const GAME_SPEED_INCREMENT = 0.00001;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5;
const PLAYER_HEIGHT = 94 / 1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;
const CACTI_CONFIG = [
    { width: 48 / 1.5, height: 100 / 1.5, image: "/img/game/cactus_1.png" },
    { width: 98 / 1.5, height: 100 / 1.5, image: "/img/game/cactus_2.png" },
    { width: 68 / 1.5, height: 70 / 1.5, image: "/img/game/cactus_3.png" },
];
export default class GameEngine {
    canvas;
    ctx;
    onGameOver;
    player = null;
    ground = null;
    cactiController = null;
    score = null;
    scaleRatio = 1;
    previousTime = null;
    gameSpeed = GAME_SPEED_START;
    gameOver = false;
    waitingToStart = true;
    gameOverTime = null;
    constructor({ canvas, onGameOver }) {
        this.canvas = canvas;
        const context = this.canvas.getContext("2d");
        if (!context) {
            throw new Error("No se pudo obtener el contexto 2D del canvas");
        }
        this.ctx = context;
        this.onGameOver = onGameOver;
        this.setScreen();
    }
    isWaitingToStart() {
        return this.waitingToStart;
    }
    isGameOver() {
        return this.gameOver;
    }
    start() {
        this.waitingToStart = false;
        this.gameOver = false;
        this.gameOverTime = null;
        this.gameSpeed = GAME_SPEED_START;
        this.ground?.reset();
        this.cactiController?.reset();
        this.score?.reset();
        this.player?.reset();
    }
    resize() {
        this.setScreen();
    }
    setJumpPressed(value) {
        this.player?.setJumpPressed(value);
    }
    update(currentTime) {
        if (this.previousTime === null) {
            this.previousTime = currentTime;
            this.drawFrame();
            return;
        }
        const frameTimeDelta = currentTime - this.previousTime;
        this.previousTime = currentTime;
        this.clearScreen();
        if (!this.gameOver && !this.waitingToStart) {
            this.ground?.update(this.gameSpeed, frameTimeDelta);
            this.cactiController?.update(this.gameSpeed, frameTimeDelta);
            this.player?.update(this.gameSpeed, frameTimeDelta);
            this.score?.update(frameTimeDelta);
            this.updateGameSpeed(frameTimeDelta);
        }
        if (!this.gameOver && this.player && this.cactiController?.collideWith(this.player)) {
            this.gameOver = true;
            this.gameOverTime = currentTime;
            this.score?.setHighScore();
            if (this.onGameOver && this.score) {
                this.onGameOver(this.score.getScore());
            }
        }
        this.drawFrame();
    }
    canRestart(currentTime) {
        if (!this.gameOver || this.gameOverTime === null) {
            return false;
        }
        return currentTime - this.gameOverTime >= 1000;
    }
    createSprites() {
        const playerWidthInGame = PLAYER_WIDTH * this.scaleRatio;
        const playerHeightInGame = PLAYER_HEIGHT * this.scaleRatio;
        const minJumpHeightInGame = MIN_JUMP_HEIGHT * this.scaleRatio;
        const maxJumpHeightInGame = MAX_JUMP_HEIGHT * this.scaleRatio;
        const groundWidthInGame = GROUND_WIDTH * this.scaleRatio;
        const groundHeightInGame = GROUND_HEIGHT * this.scaleRatio;
        this.player = new Player(this.ctx, playerWidthInGame, playerHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, this.scaleRatio);
        this.ground = new Ground(this.ctx, groundWidthInGame, groundHeightInGame, GROUND_AND_CACTUS_SPEED, this.scaleRatio);
        const cactiImages = CACTI_CONFIG.map((cactus) => {
            const image = new Image();
            image.src = cactus.image;
            return {
                image,
                width: cactus.width * this.scaleRatio,
                height: cactus.height * this.scaleRatio,
            };
        });
        this.cactiController = new CactiController(this.ctx, cactiImages, this.scaleRatio, GROUND_AND_CACTUS_SPEED);
        this.score = new Score(this.ctx, this.scaleRatio);
    }
    setScreen() {
        const containerWidth =
            this.canvas.parentElement?.getBoundingClientRect().width ||
            this.canvas.getBoundingClientRect().width ||
            window.innerWidth;
        this.scaleRatio = 1;
        this.canvas.width = Math.round(containerWidth);
        this.canvas.height = GAME_HEIGHT;
        this.createSprites();
    }
    clearScreen() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    updateGameSpeed(frameTimeDelta) {
        this.gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
    }
    showGameOverText() {
        const fontSize = 70 * this.scaleRatio;
        this.ctx.font = `${fontSize}px Verdana`;
        this.ctx.fillStyle = "grey";
        const x = this.canvas.width / 4.5;
        const y = this.canvas.height / 2;
        this.ctx.fillText("GAME OVER", x, y);
    }
    showStartGameText() {
        const fontSize = 40 * this.scaleRatio;
        this.ctx.font = `${fontSize}px Verdana`;
        this.ctx.fillStyle = "grey";
        this.ctx.textAlign = "center";
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2;
        this.ctx.fillText("Toca la pantalla o pulsa Espacio para empezar", x, y);
        this.ctx.textAlign = "left";
    }
    drawFrame() {
        this.ground?.draw();
        this.cactiController?.draw();
        this.player?.draw();
        this.score?.draw();
        if (this.gameOver) {
            this.showGameOverText();
        }
        if (this.waitingToStart) {
            this.showStartGameText();
        }
    }
}
