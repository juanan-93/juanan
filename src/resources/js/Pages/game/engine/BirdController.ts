/**
 * BirdController — gestiona la generación y actualización de pájaros.
 * Los pájaros aparecen a distinto intervalo que los cactus para evitar
 * que siempre coincidan. Su altura de vuelo varía ligeramente para dar
 * variedad visual, aunque siempre en la zona que colisiona con el jugador
 * de pie pero no con el agachado.
 */
import Bird from "./Bird";

export default class BirdController {
  private readonly BIRD_INTERVAL_MIN = 1500;
  private readonly BIRD_INTERVAL_MAX = 4000;

  private nextBirdInterval: number | null = null;
  private birds: Bird[] = [];

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private birdImages: HTMLImageElement[];
  private birdWidth: number;
  private birdHeight: number;
  private scaleRatio: number;
  private speed: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    birdImages: HTMLImageElement[],
    birdWidth: number,
    birdHeight: number,
    scaleRatio: number,
    speed: number
  ) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.birdImages = birdImages;
    this.birdWidth = birdWidth;
    this.birdHeight = birdHeight;
    this.scaleRatio = scaleRatio;
    this.speed = speed;

    this.setNextBirdTime();
  }

  private setNextBirdTime() {
    this.nextBirdInterval = this.getRandomNumber(
      this.BIRD_INTERVAL_MIN,
      this.BIRD_INTERVAL_MAX
    );
  }

  private getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Calcula la Y del pájaro al vuelo.
   * Se posiciona de 25 a 50 px sobre el nivel del suelo (canvas.height).
   * Con esas coordenadas, el dino de pie colisiona pero el agachado no
   * (la gestión definitiva la hace GameEngine comprobando isDucking()).
   */
  private getRandomBirdY(): number {
    const offset = this.getRandomNumber(25, 50);
    return this.canvas.height - this.birdHeight - offset;
  }

  private createBird() {
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

  /**
   * @param enabled      - false hasta que la velocidad alcanza el umbral
   * @param spawnBlocked - true si hay un cactus en la zona derecha de pantalla
   */
  update(gameSpeed: number, frameTimeDelta: number, enabled: boolean, spawnBlocked: boolean) {
    // Mover y limpiar pájaros ya en pantalla siempre (aunque no estén habilitados nuevos)
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
        // Hay un cactus demasiado cerca — posponer 900 ms y volver a intentar
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

  collideWith(sprite: { x: number; y: number; width: number; height: number }) {
    return this.birds.some((bird) => bird.collideWith(sprite));
  }

  reset() {
    this.birds = [];
    this.setNextBirdTime();
  }
}
