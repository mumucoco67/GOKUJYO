class WaveBall {
  constructor(options) {
    this.x = 0;
    this.y = 0;
    this.size = 200;
    this.color = "rgba(55, 133, 207, .75)";
    this.waveWidth = 0.025;
    this.waveHeight = 5.6;
    this.progress = 0;
    Object.assign(this, options);
    this.ctx = null;
    this.startX = 0;
    this.offsetX = [0, 0];
    this.vx = [0.156, 0.097];
    this.bgColor = this.color;
    return this;
  }
  render(ctx) {
    this.ctx = ctx;
    const { color, size } = this;
    this.bgColor = ctx.createLinearGradient(size / 4, size / 4, size / 4, size);
    this.bgColor.addColorStop(0, color);
    this.bgColor.addColorStop(1, color);
    this.drawBall();
    this.drawWave();
    return this;
  }
  drawBall() {
    const { size, ctx, x, y, color } = this;
    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }
  drawWave(n = 0) {
    this.offsetX[n] += this.vx[n];
    const {
      startX,
      size,
      ctx,
      offsetX,
      x,
      y,
      bgColor,
      waveWidth,
      waveHeight,
      progress,
    } = this;
    let height = (-progress / 100) * size - 5;
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
    ctx.clip();
    ctx.beginPath();
    for (let i = -size / 2; i < size / 2; i++) {
      const h = waveHeight * Math.sin((startX + i) * waveWidth + offsetX[n]);
      ctx.lineTo(i, h + size / 2 + height);
    }
    ctx.lineTo(size / 2, size / 2);
    ctx.lineTo(-size / 2, size / 2);
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.drawWave(0);
    this.drawWave(1);
    this.drawBall();
  }
}

class Application {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.w = 0;
    this.h = 0;
    this.init();
  }
  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    window.addEventListener("resize", this.reset.bind(this));
    this.reset();
    this.render();
    this.step();
  }
  reset() {
    this.w = this.canvas.width = this.ctx.width = window.innerWidth;
    this.h = this.canvas.height = this.ctx.height = window.innerHeight;
    this.render();
  }
  render() {
    const { w, h, ctx } = this;
    this.waveBall = new WaveBall({
      x: w / 2,
      y: h / 2,
      size: h * 0.35,
      progress: 50,
    }).render(ctx);
  }
  step(delta) {
    const { w, h, ctx } = this;
    requestAnimationFrame(this.step.bind(this));
    ctx.clearRect(0, 0, w, h);
    this.waveBall.progress += 0.1;
    this.waveBall.progress %= 100;
    this.waveBall && this.waveBall.update();
  }
}

window.onload = new Application();
