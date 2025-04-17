// js/player.js
import { PLAYER_SIZE, GRAVITY, JUMP_FORCE } from './constants.js';

export default class Player {
  constructor(color, brain) {
    this.x = 50;
    this.y = 0;
    this.vy = 0;
    this.color = color;
    this.alive = true;
    this.score = 0;
    this.brain = brain;
  }

  update(obstacles, canvasWidth, canvasHeight) {
    if (!this.alive) return;

    // Aplica gravidade
    this.vy += GRAVITY;
    this.y += this.vy;

    // Reseta no chão
    const groundY = canvasHeight - PLAYER_SIZE;
    if (this.y > groundY) {
      this.y = groundY;
      this.vy = 0;
    }

    // Procura próximo obstáculo
    const nextObstacle = obstacles.find(o => o.x + o.size > this.x);
    if (!nextObstacle) {
      this.score++;
      return;
    }

    // Calcula distância
    const distance = nextObstacle.x - this.x;

    // Threshold de distância
    const DIST_THRESHOLD = 0.25 * canvasWidth;

    // HACK: sempre pula quando obstáculo estiver próximo, em todas as gerações
    if (
      this.y >= groundY &&
      distance <= DIST_THRESHOLD
    ) {
      this.jump();
    }

    this.score++;
  }

  jump() {
    this.vy = JUMP_FORCE;
  }

  draw(ctx) {
    if (!this.alive) return;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, PLAYER_SIZE, PLAYER_SIZE);
  }
}
