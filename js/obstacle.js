// js/obstacle.js
import { BASE_OBSTACLE_SPEED, OBSTACLE_SIZE } from './constants.js';

export default class Obstacle {
  constructor(canvasW) {
    this.x = canvasW + Math.random() * 200;
    this.type = Math.random() > 0.7 ? 'air' : 'ground';

    const groundY = 400 - OBSTACLE_SIZE;
    const airY = 300 - OBSTACLE_SIZE; // obstáculo aéreo mais próximo do chão

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
