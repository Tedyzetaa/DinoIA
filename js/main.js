// js/main.js

import Player             from './player.js';
import Obstacle           from './obstacle.js';
import NeuralNetwork      from './neuralNetwork.js';
import EvolutionStrategy  from './evolutionStrategy.js';
import { drawNeuralNetwork }  from './drawNN.js';
import { drawBestGraph, drawAvgGraph } from './drawGraph.js';
import { randomColor }    from './utils.js';
import {
  POPULATION_SIZE,
  OBSTACLE_SPAWN_RATE,
  PLAYER_SIZE
} from './constants.js';

const ctxs = {
  game : document.getElementById('gameCanvas').getContext('2d'),
  nn   : document.getElementById('nnCanvas').getContext('2d'),
  graph: document.getElementById('graphCanvas').getContext('2d'),
  avg  : document.getElementById('avgCanvas').getContext('2d')
};

let es            = new EvolutionStrategy();
let players       = [], obstacles = [];
let frame = 0, generation = 0, bestEver = 0;
let bestBrainJson = null, paused = false, speed = 1;
let mediaRecorder, recorded = [];

function initGame() {
  players = es.population.map(g =>
    new Player(randomColor(), new NeuralNetwork(g))
  );
  obstacles = [];
  frame = 0;
  generation++;
  updateStats();
}

function updateStats() {
  document.getElementById('statGen').textContent      = generation;
  document.getElementById('statBestEver').textContent = bestEver;
}

function loop() {
  for (let i = 0; i < speed; i++) step();
  draw();
  requestAnimationFrame(loop);
}

function step() {
  if (paused) return;
  frame++;
  if (frame % OBSTACLE_SPAWN_RATE === 0) {
    obstacles.push(new Obstacle(ctxs.game.canvas.width));
  }

  const speedM = 1 + Math.floor(frame / 2000) * 0.2;
  obstacles.forEach(o => o.update(speedM));
  obstacles = obstacles.filter(o => o.x + o.size > 0);

  let alive = 0, currBest = 0, currBrain = null;

  players.forEach(p => {
    // 1) lógica de movimento/jump
    p.update(obstacles, ctxs.game.canvas.width, ctxs.game.canvas.height);

    // 2) colisão AABB com obstáculos
    if (p.alive) {
      obstacles.forEach(o => {
        if (
          p.x < o.x + o.size &&
          p.x + PLAYER_SIZE > o.x &&
          p.y < o.y + o.size &&
          p.y + PLAYER_SIZE > o.y
        ) {
          p.alive = false;
        }
      });
    }

    // 3) coleta estatísticas
    if (p.alive) alive++;
    if (p.score > currBest) {
      currBest  = p.score;
      currBrain = p.brain;
    }
  });

  // atualiza melhor de todos
  if (currBest > bestEver) {
    bestEver      = currBest;
    bestBrainJson = currBrain.save();
    updateStats();
  }

  // nova geração se todos morrerem
  if (alive === 0) {
    es.nextGeneration(players.map(p => p.score));
    initGame();
  }

  // atualiza UI de texto
  document.getElementById('info').textContent =
    `Geração ${generation} | Vivos: ${alive}/${POPULATION_SIZE}`;
  document.getElementById('statBest').textContent =
    currBest;
  document.getElementById('statAvg').textContent =
    (es.avgScores.slice(-1)[0] || 0).toFixed(1);
}

function draw() {
  // limpa tela de jogo
  ctxs.game.clearRect(0, 0, ctxs.game.canvas.width, ctxs.game.canvas.height);
  obstacles.forEach(o => o.draw(ctxs.game));
  players.forEach(p => p.draw(ctxs.game));

  // desenha a rede neural do melhor jogador atual
  if (players.length) {
    drawNeuralNetwork(ctxs.nn, players[0].brain.getGenes());
  }

  // desenha gráficos de performance
  drawBestGraph(ctxs.graph, es.bestScores);
  drawAvgGraph(ctxs.avg,   es.avgScores);
}

// — UI Handlers —
document.getElementById('restartBtn').onclick = () => {
  es        = new EvolutionStrategy();
  bestEver  = 0;
  generation = 0;
  initGame();
};
document.getElementById('pauseBtn').onclick = () => {
  paused = !paused;
  document.getElementById('pauseBtn').textContent =
    paused ? 'Continuar' : 'Pausar';
};
document.getElementById('speedSelect').onchange = e =>
  speed = +e.target.value;
document.getElementById('saveBtn').onclick = () => {
  if (bestBrainJson) {
    const blob = new Blob([bestBrainJson], { type: 'application/json' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = `best_brain_gen${generation}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
};
document.getElementById('recordBtn').onclick = async () => {
  if (!mediaRecorder) {
    const stream = document.getElementById('gameCanvas').captureStream(30);
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => {
      if (e.data.size) recorded.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recorded, { type: 'video/webm' });
      const a    = document.createElement('a');
      a.href     = URL.createObjectURL(blob);
      a.download = `gameplay_gen${generation}.webm`;
      a.click();
      URL.revokeObjectURL(a.href);
      recorded = [];
      mediaRecorder = null;
      document.getElementById('recordBtn').textContent = 'Gravar Gameplay';
    };
    mediaRecorder.start(100);
    document.getElementById('recordBtn').textContent = 'Parar Gravação';
  } else {
    mediaRecorder.stop();
  }
};

// inicialização
initGame();
requestAnimationFrame(loop);
