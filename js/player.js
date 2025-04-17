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

    // física simples
    this.vy += GRAVITY;
    this.y += this.vy;

    // chão
    if (this.y > canvasHeight - PLAYER_SIZE) {
      this.y = canvasHeight - PLAYER_SIZE;
      this.vy = 0;
    }

    // inputs: [y, distância até obstáculo, altura do obstáculo]
    const nextObstacle = obstacles.find(o => o.x + o.size > this.x);
    const inputs = [
      this.y,
      nextObstacle ? nextObstacle.x - this.x : canvasWidth,
      nextObstacle ? nextObstacle.size : 0
    ];

    // decisão da IA
    const output = this.brain.predict(inputs);

    // força pulo na geração 1 ou se IA quiser pular
    if (output > 0.5 || window.generation === 1) {
      this.jump();
    }

    // pontuação simples
    this.score++;
  }

  jump() {
    if (this.y >= 390) { // chão fixo (ajuste se necessário)
      this.vy = -JUMP_FORCE;
    }
  }

  draw(ctx) {
    if (!this.alive) return;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, PLAYER_SIZE, PLAYER_SIZE);
  }
}
