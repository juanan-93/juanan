/**
 * Bird — obstáculo aéreo.
 * Alterna entre dos fotogramas (alas arriba / alas abajo) para simular vuelo.
 * La colisión usa el mismo factor adjustBy 1.4 que los cactus.
 */
export default class Bird {
  private ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;

  private images: HTMLImageElement[];
  private currentImageIndex = 0;
  private animationTimer = 0;
  private readonly ANIMATION_INTERVAL = 180; // ms entre fotogramas

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    images: HTMLImageElement[]
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.images = images;
  }

  update(speed: number, gameSpeed: number, frameTimeDelta: number, scaleRatio: number) {
    // Desplazamiento horizontal
    this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;

    // Animación de alas
    this.animationTimer += frameTimeDelta;
    if (this.animationTimer >= this.ANIMATION_INTERVAL) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.animationTimer = 0;
    }
  }

  draw() {
    this.ctx.drawImage(
      this.images[this.currentImageIndex],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  /**
   * Colisión AABB con factor adjustBy = 1.4 (idéntico a Cactus).
   * La colisión con el jugador agachado se gestiona fuera (GameEngine).
   */
  collideWith(sprite: { x: number; y: number; width: number; height: number }) {
    const adjustBy = 1.4;

    if (
      sprite.x < this.x + this.width / adjustBy &&
      sprite.x + sprite.width / adjustBy > this.x &&
      sprite.y < this.y + this.height / adjustBy &&
      sprite.height + sprite.y / adjustBy > this.y
    ) {
      return true;
    }

    return false;
  }
}
