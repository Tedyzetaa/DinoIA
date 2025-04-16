
# 🧠 Jogo de Sobrevivência com Redes Neurais (Perceptron + ES)

Este é um jogo 2D onde jogadores (círculos) precisam sobreviver pulando obstáculos. Cada jogador é controlado por uma **rede neural Perceptron** treinada com **estratégia evolutiva (ES)**. O jogo roda diretamente no navegador usando **HTML, CSS e JavaScript**.

---

## 📦 Estrutura dos Arquivos

- `index.html` – Estrutura da página e canvas do jogo.
- `style.css` – Estilização básica da página.
- `main.js` – Lógica principal do jogo, atualização do loop e renderização.
- `player.js` – Classe `Player` com perceptron, lógica de salto, física e aprendizado.
- `graph.js` – Exibe o gráfico de pontuação por geração.
- `networkView.js` – Visualiza a arquitetura da rede neural em tempo real.

---

## 🧠 Como Funciona

Cada jogador possui uma rede neural com 3 entradas e 1 saída:

### Entradas:
1. Posição vertical do jogador.
2. Distância até o próximo obstáculo.
3. Altura do próximo obstáculo.

### Saída:
- Se a saída for > 0, o jogador pula.

---

## 🚀 Treinamento

O algoritmo de **Estratégia Evolutiva (ES)**:
- Mantém uma população de jogadores.
- Após cada geração, seleciona os melhores com base na pontuação.
- Os melhores geram novos jogadores com pequenas mutações nos pesos da rede.

---

## 🧱 Obstáculos

- Obstáculos aparecem aleatoriamente.
- Jogadores ganham **recompensa** ao pular com sucesso sobre um obstáculo.

---

## 📊 Visualização

### Pontuação por Geração

Um gráfico mostra a média e a melhor pontuação a cada geração para acompanhar o progresso do aprendizado.

### Rede Neural

As redes dos melhores jogadores são renderizadas visualmente em tempo real:
- **Nós** representam entradas, camadas ocultas e saída.
- **Conexões** mostram os pesos com cores: azul (positivo), vermelho (negativo).

---

## 🕹️ Controles

- Clique em "Start" para iniciar o jogo.
- Clique em "Stop" para pausar.

---

## 📈 Tecnologias Usadas

- HTML5 `<canvas>`
- JavaScript puro (sem bibliotecas externas)
- Redes neurais Perceptron
- Algoritmo Evolutivo simples
- Gráficos com canvas

---

## 📁 Como Rodar

1. Clone ou baixe os arquivos.
2. Abra `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge).
3. Divirta-se observando as redes evoluindo!

---

Desenvolvido com 💻 + 🧠
