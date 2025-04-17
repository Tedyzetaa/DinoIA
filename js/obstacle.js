// js/obstacle.js

import { BASE_OBSTACLE_SPEED, OBSTACLE_SIZE } from './constants.js';

// Ajuste para alinhar a parte superior do obstáculo 'ground' com a base do player

export default class Obstacle {
  constructor(canvasW) {
    this.x = canvasW + Math.random() * 200;
    this.type = Math.random() > 0.7 ? 'air' : 'ground';
    // Base de Y dependendo do tipo
    const groundY = 400 - OBSTACLE_SIZE; // A base do player parece estar em torno de 400 (canvasHeight - PLAYER_SIZE)
    const airY = 200 - OBSTACLE_SIZE;
    this.y = this.type === 'ground' ? groundY : airY;
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