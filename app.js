const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

const particleCountEl = document.getElementById("particleCount");
const fpsValueEl = document.getElementById("fpsValue");

const DPR_LIMIT = 2;
const PARTICLE_COUNT = 1800;
const TAU = Math.PI * 2;

let width = 0;
let height = 0;
let dpr = 1;
let centerX = 0;
let centerY = 0;
let maxRadius = 0;
let lastTime = performance.now();
let fps = 60;

const particles = [];
const bodies = [];

const palette = [
  [82, 142, 255],
  [161, 92, 255],
  [55, 214, 255],
  [255, 75, 216],
  [255, 188, 91]
];

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;

  dpr = Math.min(window.devicePixelRatio || 1, DPR_LIMIT);

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  centerX = width * 0.59;
  centerY = height * 0.53;
  maxRadius = Math.min(width, height) * 0.44;
}

function randomPaletteColor() {
  return palette[Math.floor(Math.random() * palette.length)];
}

function createParticle() {
  const angle = Math.random() * TAU;
  const radial = Math.pow(Math.random(), 0.64) * maxRadius;

  return {
    angle,
    radius: radial,
    speed: 0.00018 + Math.random() * 0.00042,
    drift: (Math.random() - 0.5) * 0.00018,
    size: 0.5 + Math.random() * 1.7,
    alpha: 0.18 + Math.random() * 0.72,
    color: randomPaletteColor(),
    wobble: Math.random() * TAU,
    wobbleSpeed: 0.0005 + Math.random() * 0.0017,
    eccentricity: 0.76 + Math.random() * 0.38
  };
}

function createBody(index) {
  const angle = (index / 7) * TAU + Math.random() * 0.35;
  const radius = maxRadius * (0.22 + Math.random() * 0.52);

  return {
    angle,
    radius,
    speed: 0.00007 + Math.random() * 0.00012,
    size: 4 + Math.random() * 7,
    pulse: Math.random() * TAU,
    color: palette[index % palette.length]
  };
}

function seedUniverse() {
  particles.length = 0;
  bodies.length = 0;

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    particles.push(createParticle());
  }

  for (let i = 0; i < 7; i += 1) {
    bodies.push(createBody(i));
  }

  particleCountEl.textContent = PARTICLE_COUNT.toLocaleString("en-US");
}

function drawBackdrop() {
  ctx.clearRect(0, 0, width, height);

  const glow = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    maxRadius * 1.45
  );

  glow.addColorStop(0, "rgba(74, 112, 220, 0.13)");
  glow.addColorStop(0.35, "rgba(46, 76, 153, 0.06)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}

function drawOrbitGuide(radius, alpha = 0.14) {
  ctx.beginPath();
  ctx.ellipse(
    centerX,
    centerY,
    radius,
    radius * 0.48,
    -0.12,
    0,
    TAU
  );
  ctx.strokeStyle = "rgba(98, 178, 255, " + alpha + ")";
  ctx.lineWidth = 0.8;
  ctx.stroke();
}

function drawCore(time) {
  const pulse = 1 + Math.sin(time * 0.0021) * 0.06;

  for (let i = 4; i >= 0; i -= 1) {
    const radius = (24 + i * 22) * pulse;
    const alpha = 0.075 - i * 0.009;

    const glow = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius
    );

    glow.addColorStop(0, "rgba(255, 157, 92, " + alpha + ")");
    glow.addColorStop(0.25, "rgba(255, 87, 208, " + alpha * 0.7 + ")");
    glow.addColorStop(1, "rgba(90, 130, 255, 0)");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, TAU);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY, 15 * pulse, 0, TAU);
  ctx.fillStyle = "rgba(255, 227, 202, 0.9)";
  ctx.shadowColor = "rgba(255, 159, 99, 0.9)";
  ctx.shadowBlur = 24;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function drawParticle(particle, time) {
  const wobble = Math.sin(time * particle.wobbleSpeed + particle.wobble);
  const currentRadius = particle.radius + wobble * 3.5;
  const angle = particle.angle + wobble * particle.drift;

  const x =
    centerX +
    Math.cos(angle) * currentRadius +
    Math.cos(angle * 3.1) * 5;

  const y =
    centerY +
    Math.sin(angle) * currentRadius * particle.eccentricity +
    Math.sin(angle * 2.3) * 4;

  const [r, g, b] = particle.color;
  const alpha = particle.alpha * (0.75 + 0.25 * Math.sin(time * 0.0013 + particle.wobble));

  ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  ctx.shadowColor = "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  ctx.shadowBlur = particle.size * 3.5;
  ctx.beginPath();
  ctx.arc(x, y, particle.size, 0, TAU);
  ctx.fill();
}

function drawBody(body, time) {
  const pulse = 1 + Math.sin(time * 0.0018 + body.pulse) * 0.12;
  const angle = body.angle + time * body.speed;

  const x = centerX + Math.cos(angle) * body.radius;
  const y = centerY + Math.sin(angle) * body.radius * 0.48;
  const [r, g, b] = body.color;

  ctx.beginPath();
  ctx.arc(x, y, body.size * pulse, 0, TAU);
  ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",0.85)";
  ctx.shadowColor = "rgba(" + r + "," + g + "," + b + ",0.9)";
  ctx.shadowBlur = body.size * 4;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function updateAndDraw(time, delta) {
  const normalizedDelta = Math.min(delta, 40);

  for (const particle of particles) {
    particle.angle += particle.speed * normalizedDelta;
    particle.radius += Math.sin(time * 0.00024 + particle.wobble) * 0.006 * normalizedDelta;

    if (particle.radius > maxRadius) {
      particle.radius = maxRadius * (0.16 + Math.random() * 0.68);
    }
  }

  for (const body of bodies) {
    body.angle += body.speed * normalizedDelta;
  }

  for (const particle of particles) {
    drawParticle(particle, time);
  }

  for (const body of bodies) {
    drawBody(body, time);
  }
}

function render(time) {
  const delta = time - lastTime;
  lastTime = time;

  fps = fps * 0.92 + (1000 / Math.max(delta, 1)) * 0.08;
  fpsValueEl.textContent = Math.round(fps).toString().padStart(2, "0");

  drawBackdrop();

  ctx.globalCompositeOperation = "screen";

  drawOrbitGuide(maxRadius * 0.34, 0.13);
  drawOrbitGuide(maxRadius * 0.56, 0.11);
  drawOrbitGuide(maxRadius * 0.76, 0.09);

  ctx.shadowBlur = 0;
  updateAndDraw(time, delta);

  drawCore(time);

  ctx.globalCompositeOperation = "source-over";

  requestAnimationFrame(render);
}

function init() {
  resizeCanvas();
  seedUniverse();
  requestAnimationFrame(render);
}

window.addEventListener("resize", resizeCanvas);
init();
