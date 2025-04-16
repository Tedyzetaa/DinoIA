import { GRAVITY, JUMP_FORCE, PLAYER_SIZE } from './constants.js';

export default class Player {
  static nextId = 0;

  constructor(color, brain) {
    this.id = Player.nextId++;
    this.x = 100;
    this.y = 300;
    this.vy = 0;
    this.color = color;
    this.alive = true;
    this.score = 0;
    this.rewards = 0;     // contador de recompensas
    this.brain = brain;
  }

  update(obstacles, canvasW, canvasH) {
    if (!this.alive) return;

    // gravidade e limite no chão (y = 300)
    this.vy += GRAVITY;
    this.y  = Math.min(this.y + this.vy, 300);

    // obstáculo mais próximo
    const nearest = obstacles.find(o => o.x + o.size > this.x);
    if (nearest) {
      const input = [
        (nearest.x - this.x) / canvasW,
        (this.y - nearest.y) / canvasH,
        nearest.type === 'air' ? 1 : 0
      ];
      const action = this.brain.predict(input);

      // se decidir pular e estiver "no chão" (vy ≈ 0), executa salto + recompensa
      if (action > 0.5 && Math.abs(this.vy) < 0.001) {
        this.vy = JUMP_FORCE;
        this.rewards++;      // incrementa contador de recompensas
        this.score += 50;    // bônus de 50 pontos no score
      }
    }

    // pontuação por tempo vivo
    this.score++;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, PLAYER_SIZE, PLAYER_SIZE);
  }
}
