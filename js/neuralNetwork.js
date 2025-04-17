// js/neuralNetwork.js
import { tanh, sigmoid } from './math.js';

export default class NeuralNetwork {
  constructor({ weights = null, biases = null } = {}) {
    this.weights = weights || [
      Array(3).fill().map(() => Math.random() * 2 - 1),
      Array(2).fill().map(() => Math.random() * 2 - 1)
    ];
    this.biases = biases || [
      Array(2).fill().map(() => Math.random() * 2 - 1),
      [Math.random() * 2 - 1]
    ];
  }

  predict([dy, dx, h]) {
    const hidden = this.weights[0].map((_, i) =>
      tanh(
        dy * this.weights[0][i] +
        dx * this.weights[0][(i + 1) % 3] +
        h * this.weights[0][(i + 2) % 3] +
        this.biases[0][i]
      )
    );  
    const sum = hidden.reduce((acc, val, i) => acc + val * this.weights[1][i], 0) + this.biases[1][0];
    return sigmoid(sum);
  }

  getGenes() {
    return { weights: this.weights, biases: this.biases };
  }

  save() {
    return JSON.stringify(this.getGenes());
  }

  static load(json) {
    return new NeuralNetwork(JSON.parse(json));
  }
}