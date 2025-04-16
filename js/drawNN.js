export function drawNeuralNetwork(ctx, { weights, biases }) {
    const nodes = [
      [{x:50,y:100},{x:50,y:200},{x:50,y:300}],
      [{x:200,y:150},{x:200,y:250}],
      [{x:350,y:200}]
    ];
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 1;
  
    // ligações camada input → hidden
    nodes[0].forEach((ni, i) =>
      nodes[1].forEach(nj => {
        const w = weights[0][i];
        ctx.strokeStyle = w>0
          ? `rgba(0,0,255,${Math.abs(w)})`
          : `rgba(255,0,0,${Math.abs(w)})`;
        ctx.beginPath();
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.stroke();
      })
    );
  
    // ligações camada hidden → output
    nodes[1].forEach((ni, i) =>
      nodes[2].forEach(nj => {
        const w = weights[1][i];
        ctx.strokeStyle = w>0
          ? `rgba(0,0,255,${Math.abs(w)})`
          : `rgba(255,0,0,${Math.abs(w)})`;
        ctx.beginPath();
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.stroke();
      })
    );
  
    // nós
    ctx.font = "12px Arial";
    nodes.flat().forEach(n => {
      ctx.fillStyle = "#2196F3";
      ctx.beginPath();
      ctx.arc(n.x, n.y, 20, 0, 2*Math.PI);
      ctx.fill();
    });
  
    // biases
    ctx.fillStyle = "black";
    ctx.fillText(
      `Bias Oculta: [${biases[0].map(b => b.toFixed(2)).join(", ")}]`,
      10, 380
    );
    ctx.fillText(
      `Bias Saída: ${biases[1][0].toFixed(2)}`,
      10, 395
    );
  }
  