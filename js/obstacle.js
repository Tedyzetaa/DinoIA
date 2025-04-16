// js/obstacle.js

import { BASE_OBSTACLE_SPEED, OBSTACLE_SIZE } from './constants.js';

// Ajuste: abaixa obstáculos em 10px
const OBSTACLE_OFFSET = 10;

export default class Obstacle {
  constructor(canvasW) {
    this.x = canvasW + Math.random() * 200;
    this.type = Math.random() > 0.7 ? 'air' : 'ground';
    // Base de Y dependendo do tipo, agora com offset
    const baseY = this.type === 'ground' ? 300 : 200;
    this.y = baseY + OBSTACLE_OFFSET;
    this.size = OBSTACLE_SIZE;
  }

  update(speedMult) {
    this.x -= BASE_OBSTACLE_SPEED * speedMult;
  }

  draw(ctx) {
    ctx.fillStyle = this.type === 'ground' ? 'darkred' : 'darkblue';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
