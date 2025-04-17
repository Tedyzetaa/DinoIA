import { POPULATION_SIZE } from './constants.js';

export default class EvolutionStrategy {
    // Construtor da classe EvolutionStrategy
    constructor(popSize = POPULATION_SIZE) {
        // Inicializa a população com um array de tamanho POPULATION_SIZE,
        // onde cada elemento é o resultado da função _randGenes(), que cria genes aleatórios.
        this.population = Array.from({ length: popSize }, () => this._randGenes());
        // Array para armazenar a melhor pontuação de cada geração.
        this.bestScores = [];
        // Array para armazenar a pontuação média de cada geração.
        this.avgScores = [];
    }

    // Método privado para gerar genes (pesos e biases) aleatórios para uma nova rede neural.
    _randGenes() {
        return {
            // Pesos da rede neural. É um array de duas camadas.
            weights: [
                // Primeira camada de pesos: conecta a camada de entrada (3 nós) à camada oculta (2 nós).
                Array(3).fill().map(() => Math.random() * 2 - 1),
                // Segunda camada de pesos: conecta a camada oculta (2 nós) à camada de saída (1 nó).
                Array(2).fill().map(() => Math.random() * 2 - 1)
            ],
            // Biases da rede neural. É um array de duas camadas.
            biases: [
                // Biases para os nós da camada oculta (2 nós).
                Array(2).fill().map(() => Math.random() * 2 - 1),
                // Bias para o nó da camada de saída (1 nó).
                [Math.random() * 2 - 1]
            ]
        };
    }

    // Método para gerar a próxima geração da população com base nas fitnesses (pontuações) da geração atual.
    nextGeneration(fitnesses) {
        // Combina a população atual com suas respectivas fitnesses e as ordena em ordem decrescente de fitness.
        const sorted = this.population
            .map((g, i) => ({ genes: g, fitness: fitnesses[i] }))
            .sort((a, b) => b.fitness - a.fitness);

        // Seleciona a elite da população (os melhores indivíduos) para a próxima geração.
        // A quantidade de elites é determinada por uma porcentagem de POPULATION_SIZE (atualmente 30%).
        const elites = sorted
            .slice(0, Math.floor(POPULATION_SIZE * 0.3))
            .map(e => e.genes);

        // Cria a nova população, começando com os indivíduos de elite.
        const newPop = [...elites];
        // Preenche o restante da nova população através da reprodução com mutação dos elites.
        while (newPop.length < POPULATION_SIZE) {
            // Seleciona um pai aleatório da elite.
            const parentGenes = elites[Math.floor(Math.random() * elites.length)];
            // Cria um filho copiando os genes do pai.
            const child = JSON.parse(JSON.stringify(parentGenes));
            // Aplica uma pequena mutação aleatória aos pesos do filho.
            child.weights = child.weights.map(layer =>
                layer.map(w => w + (Math.random() - 0.5) * 0.2)
            );
            // Aplica uma pequena mutação aleatória aos biases do filho.
            child.biases = child.biases.map(layer =>
                layer.map(b => b + (Math.random() - 0.5) * 0.2)
            );
            // Adiciona o filho mutado à nova população.
            newPop.push(child);
        }

        // Substitui a população atual pela nova população gerada.
        this.population = newPop;
        // Armazena a fitness do melhor indivíduo da geração atual.
        this.bestScores.push(sorted[0].fitness);
        // Calcula e armazena a fitness média da geração atual.
        this.avgScores.push(fitnesses.reduce((a, b) => a + b, 0) / fitnesses.length);
        // Retorna os genes do melhor indivíduo da geração atual.
        return sorted[0].genes;
    }
}