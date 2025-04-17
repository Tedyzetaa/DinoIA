// js/evolutionStrategy.js
import { POPULATION_SIZE } from './constants.js';

export default class EvolutionStrategy {
  constructor(popSize = POPULATION_SIZE) {
    this.population = Array.from({ length: popSize }, () => this._randGenes());
    this.bestScores = [];
    this.avgScores = [];
  }

  _randGenes() {
    return {
      weights: [
        Array(3).fill().map(() => Math.random() * 2 - 1),
        Array(2).fill().map(() => Math.random() * 2 - 1)
      ],
      biases: [
        Array(2).fill().map(() => Math.random() * 2 - 1),
        [Math.random() * 2 - 1]
      ]
    };
  }

  _mutate(value) {
    const mutationRate = 0.2;
    const mutationStrength = 0.5;
    if (Math.random() < mutationRate) {
      return value + (Math.random() - 0.5) * mutationStrength;
    }
    return value;
  }

  nextGeneration(fitnesses) {
    const sorted = this.population
      .map((g, i) => ({ genes: g, fitness: fitnesses[i] }))
      .sort((a, b) => b.fitness - a.fitness);

    const elites = sorted.slice(0, Math.floor(POPULATION_SIZE * 0.3)).map(e => e.genes);
    const newPop = [...elites];

    while (newPop.length < POPULATION_SIZE) {
      const parent = elites[Math.floor(Math.random() * elites.length)];
      const child = JSON.parse(JSON.stringify(parent));

      // Mutate weights
      child.weights = child.weights.map(layer =>
        layer.map(w => this._mutate(w))
      );

      // Mutate biases
      child.biases = child.biases.map(layer =>
        layer.map(b => this._mutate(b))
      );

      newPop.push(child);
    }

    this.population = newPop;
    this.bestScores.push(sorted[0].fitness);
    this.avgScores.push(fitnesses.reduce((a, b) => a + b, 0) / fitnesses.length);

    return sorted[0].genes;
  }
}
