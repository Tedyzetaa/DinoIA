export function drawBestGraph(ctx, bestScores) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const max = Math.max(...bestScores, 1);
    bestScores.forEach((s, i) => {
      const h = (s / max) * ctx.canvas.height;
      ctx.fillStyle = 'rgba(0,0,255,0.7)';
      ctx.fillRect(i * 5, ctx.canvas.height - h, 4, h);
    });
  }
  
  export function drawAvgGraph(ctx, avgScores) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const max = Math.max(...avgScores, 1);
    avgScores.forEach((s, i) => {
      const h = (s / max) * ctx.canvas.height;
      ctx.fillStyle = 'rgba(0,128,0,0.7)';
      ctx.fillRect(i * 5, ctx.canvas.height - h, 4, h);
    });
  }
  