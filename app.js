const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d", { alpha: false });

const particleCountEl = document.getElementById("particleCount");
const fpsValueEl = document.getElementById("fpsValue");
const coreValueEl = document.getElementById("coreValue");
const systemStateEl = document.getElementById("systemState");
const systemMessageEl = document.getElementById("systemMessage");

const controls = {
  energy: document.getElementById("energy"),
  mass: document.getElementById("mass"),
  entropy: document.getElementById("entropy"),
  gravity: document.getElementById("gravity")
};

const values = {
  energy: document.getElementById("energyValue"),
  mass: document.getElementById("massValue"),
  entropy: document.getElementById("entropyValue"),
  gravity: document.getElementById("gravityValue")
};

const DPR_LIMIT = 1.5;
const PARTICLE_COUNT = 800;
const TAU = Math.PI * 2;
const DEFAULTS = {
  energy: 42,
  mass: 900,
  entropy: 1.5,
  gravity: 0.6
};

let width = 0;
let height = 0;
let dpr = 1;
let centerX = 0;
let centerY = 0;
let maxRadius = 0;
let lastTime = performance.now();
let fps = 60;
let interactionMode = "attract";

const particles = [];
const bodies = [];
const bursts = [];

const state = {
  energy: DEFAULTS.energy,
  mass: DEFAULTS.mass,
  entropy: DEFAULTS.entropy,
  gravity: DEFAULTS.gravity,
  energyBoost: 0,
  chaosBoost: 0,
  repelBoost: 0,
  orbitBoost: 0
};

const pointer = {
  x: 0,
  y: 0,
  active: false
};

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
  ctx.imageSmoothingEnabled = false;

  centerX = width * 0.59;
  centerY = height * 0.53;
  maxRadius = Math.min(width, height) * 0.44;
}

function updateValueLabels() {
  values.energy.textContent = Math.round(state.energy);
  values.mass.textContent = Math.round(state.mass);
  values.entropy.textContent = state.entropy.toFixed(1);
  values.gravity.textContent = state.gravity.toFixed(1);
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
  return {
    angle: (index / 7) * TAU + Math.random() * 0.35,
    radius: maxRadius * (0.22 + Math.random() * 0.52),
    speed: 0.00007 + Math.random() * 0.00012,
    size: 4 + Math.random() * 7,
    pulse: Math.random() * TAU,
    color: palette[index % palette.length]
  };
}

function seedUniverse() {
  particles.length = 0;
  bodies.length = 0;
  bursts.length = 0;

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
  const coreEnergy = Math.min(1.3, state.energy / 70 + state.energyBoost * 0.6);

  for (let i = 2; i >= 0; i -= 1) {
    const radius = (24 + i * 28) * pulse * (0.88 + coreEnergy * 0.18);
    const glow = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius
    );

    glow.addColorStop(0, "rgba(255, 157, 92, " + (0.075 - i * 0.015) * coreEnergy + ")");
    glow.addColorStop(0.28, "rgba(255, 87, 208, " + (0.05 - i * 0.01) * coreEnergy + ")");
    glow.addColorStop(1, "rgba(90, 130, 255, 0)");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, TAU);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY, 15 * pulse, 0, TAU);
  ctx.fillStyle = "rgba(255, 227, 202, 0.92)";
  ctx.shadowColor = "rgba(255, 159, 99, 0.85)";
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function particlePosition(particle, time) {
  const wobble = Math.sin(
    time * particle.wobbleSpeed + particle.wobble
  );
  const radius = particle.radius + wobble * 3.5;
  const angle = particle.angle + wobble * particle.drift;

  return {
    x:
      centerX +
      Math.cos(angle) * radius +
      Math.cos(angle * 3.1) * 5,
    y:
      centerY +
      Math.sin(angle) * radius * particle.eccentricity +
      Math.sin(angle * 2.3) * 4
  };
}

function drawParticle(particle, time) {
  const position = particlePosition(particle, time);
  const [r, g, b] = particle.color;
  const alpha =
    particle.alpha *
    (0.75 + 0.25 * Math.sin(time * 0.0013 + particle.wobble));

  ctx.fillStyle =
    "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  ctx.fillRect(
    position.x,
    position.y,
    particle.size,
    particle.size
  );
}

function drawBody(body, time) {
  const pulse = 1 + Math.sin(time * 0.0018 + body.pulse) * 0.12;
  const angle = body.angle;
  const x = centerX + Math.cos(angle) * body.radius;
  const y = centerY + Math.sin(angle) * body.radius * 0.48;
  const [r, g, b] = body.color;

  ctx.beginPath();
  ctx.arc(x, y, body.size * pulse, 0, TAU);
  ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ",0.88)";
  ctx.shadowColor = "rgba(" + r + "," + g + "," + b + ",0.9)";
  ctx.shadowBlur = body.size * 3;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function spawnBurst(x, y, strength = 24) {
  bursts.push({
    x,
    y,
    life: 1,
    strength,
    radius: 22,
    hue: Math.floor(Math.random() * 360)
  });

  if (bursts.length > 5) {
    bursts.shift();
  }

  state.energyBoost = Math.min(1, state.energyBoost + 0.18);
  systemMessageEl.textContent = "Local energy pulse injected.";
}

function setCommandMessage(message) {
  systemMessageEl.textContent = message;
}

function runCommand(command) {
  if (command === "energy") {
    state.energyBoost = 1;
    setCommandMessage("Energy surge online.");
  }

  if (command === "mass") {
    controls.mass.value = "1100";
    state.mass = 1100;
    setCommandMessage("Core mass increased.");
  }

  if (command === "entropy") {
    state.entropy = Math.min(5, state.entropy + 1.8);
    controls.entropy.value = state.entropy.toFixed(1);
    setCommandMessage("Entropy spike detected.");
  }

  if (command === "gravity") {
    state.gravity = Math.min(1.5, state.gravity + 0.4);
    controls.gravity.value = state.gravity.toFixed(1);
    setCommandMessage("Gravitational field intensified.");
  }

  if (command === "repel") {
    interactionMode = "repel";
    state.repelBoost = 1;
    setCommandMessage("Repulsion mode armed. Move through the field.");
  }

  if (command === "orbit") {
    state.orbitBoost = 1;
    setCommandMessage("Orbital coherence increased.");
  }

  if (command === "chaos") {
    state.chaosBoost = 1;
    setCommandMessage("Chaos field released.");
  }

  if (command === "burst") {
    spawnBurst(centerX, centerY, 38);
    setCommandMessage("Core burst initiated.");
  }

  if (command === "reset") {
    Object.assign(state, DEFAULTS, {
      energyBoost: 0,
      chaosBoost: 0,
      repelBoost: 0,
      orbitBoost: 0
    });

    Object.entries(controls).forEach(([key, input]) => {
      input.value = DEFAULTS[key];
    });

    interactionMode = "attract";
    seedUniverse();
    setCommandMessage("System reset to baseline.");
  }

  updateValueLabels();
}

function updateStatus() {
  if (state.chaosBoost > 0.45 || state.entropy > 3.7) {
    systemStateEl.innerHTML = "CHAOTIC<span class='pulse'>...</span>";
    coreValueEl.textContent = "UNSTABLE";
    return;
  }

  if (state.energyBoost > 0.45 || state.orbitBoost > 0.45 || state.repelBoost > 0.45) {
    systemStateEl.innerHTML = "CRITICAL<span class='pulse'>...</span>";
    coreValueEl.textContent = "ACTIVE";
    return;
  }

  systemStateEl.innerHTML = "EVOLVING<span class='pulse'>...</span>";
  coreValueEl.textContent = "STABLE";
}

function updateParticle(particle, time, delta) {
  const entropyFactor =
    1 +
    state.entropy * 0.08 +
    state.chaosBoost * 0.8;

  const energyFactor =
    0.55 +
    state.energy / 55 +
    state.energyBoost * 0.7;

  particle.angle +=
    particle.speed *
    delta *
    energyFactor *
    entropyFactor;

  const wobble = Math.sin(time * particle.wobbleSpeed + particle.wobble);
  const radius = particle.radius + wobble * 3.5;
  const angle = particle.angle + wobble * particle.drift;

  let x =
    centerX +
    Math.cos(angle) * radius +
    Math.cos(angle * 3.1) * 5;
  let y =
    centerY +
    Math.sin(angle) * radius * particle.eccentricity +
    Math.sin(angle * 2.3) * 4;

  const gravityFactor = state.gravity * (0.25 + state.mass / 1400);
  const gravityPull = Math.max(
    -0.045,
    Math.min(0.045, gravityFactor * 0.0035 * delta)
  );

  if (particle.radius > 30) {
    particle.radius -=
      gravityPull *
      (1 + state.orbitBoost * 0.4) *
      particle.radius;
  }

  if (state.orbitBoost > 0) {
    particle.eccentricity +=
      (0.96 - particle.eccentricity) *
      0.02 *
      delta;
  } else {
    particle.eccentricity +=
      (0.9 + state.entropy * 0.01 - particle.eccentricity) *
      0.004 *
      delta;
  }

  if (pointer.active) {
    const dx = pointer.x - x;
    const dy = pointer.y - y;
    const distanceSquared = dx * dx + dy * dy;
    const range = 190;

    if (distanceSquared < range * range) {
      const distance = Math.sqrt(distanceSquared);
      const falloff = 1 - distance / range;
      const direction = interactionMode === "repel" ? -1 : 1;
      const influence =
        falloff *
        direction *
        (0.55 + state.gravity * 0.8) *
        delta *
        0.0026;

      particle.radius += influence * 55;
      particle.angle -=
        influence *
        (dx * Math.sin(angle) - dy * Math.cos(angle)) /
        (distance + 8);
    }
  }

  for (const burst of bursts) {
    const dx = x - burst.x;
    const dy = y - burst.y;
    const distanceSquared = dx * dx + dy * dy;
    const range = burst.radius + 140;

    if (distanceSquared < range * range) {
      const distance = Math.sqrt(distanceSquared);
      const falloff = 1 - distance / range;
      const impulse =
        falloff *
        burst.strength *
        delta *
        0.0013;

      particle.radius += impulse * 16;

      if (distance > 1) {
        particle.angle +=
          impulse *
          (dx * Math.sin(angle) - dy * Math.cos(angle)) /
          (distance + 1);
      }
    }
  }

  if (state.chaosBoost > 0) {
    particle.angle +=
      (Math.random() - 0.5) *
      state.chaosBoost *
      state.entropy *
      0.0007 *
      delta;
    particle.radius +=
      (Math.random() - 0.5) *
      state.chaosBoost *
      0.04 *
      delta;
  }

  if (particle.radius > maxRadius) {
    particle.radius = maxRadius * (0.16 + Math.random() * 0.68);
  }

  if (particle.radius < 10) {
    particle.radius = 10;
  }
}

function updateBodies(delta) {
  const orbitFactor = state.orbitBoost > 0 ? 1.7 : 1;

  for (const body of bodies) {
    body.angle += body.speed * delta * orbitFactor;

    if (state.chaosBoost > 0) {
      body.angle +=
        (Math.random() - 0.5) *
        state.chaosBoost *
        0.002;
    }
  }
}

function updateBursts(delta) {
  for (const burst of bursts) {
    burst.radius += 9 * delta;
    burst.life -= 0.018 * delta;
  }

  for (let i = bursts.length - 1; i >= 0; i -= 1) {
    if (bursts[i].life <= 0) {
      bursts.splice(i, 1);
    }
  }

  state.energyBoost = Math.max(0, state.energyBoost - 0.01 * delta);
  state.chaosBoost = Math.max(0, state.chaosBoost - 0.008 * delta);
  state.repelBoost = Math.max(0, state.repelBoost - 0.009 * delta);
  state.orbitBoost = Math.max(0, state.orbitBoost - 0.007 * delta);
}

function renderBursts() {
  for (const burst of bursts) {
    ctx.beginPath();
    ctx.arc(burst.x, burst.y, burst.radius, 0, TAU);
    ctx.strokeStyle =
      "rgba(116, 207, 255, " +
      burst.life * 0.25 +
      ")";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
}

function render(time) {
  const delta = Math.min(time - lastTime, 40);
  lastTime = time;

  fps =
    fps * 0.92 +
    (1000 / Math.max(delta, 1)) * 0.08;

  fpsValueEl.textContent = Math.round(fps)
    .toString()
    .padStart(2, "0");

  drawBackdrop();

  ctx.globalCompositeOperation = "screen";

  drawOrbitGuide(maxRadius * 0.34, 0.13);
  drawOrbitGuide(maxRadius * 0.56, 0.11);
  drawOrbitGuide(maxRadius * 0.76, 0.09);

  for (const particle of particles) {
    updateParticle(particle, time, delta);
    drawParticle(particle, time);
  }

  updateBodies(delta);

  for (const body of bodies) {
    drawBody(body, time);
  }

  renderBursts();
  drawCore(time);

  ctx.globalCompositeOperation = "source-over";

  updateBursts(delta);
  updateStatus();

  requestAnimationFrame(render);
}

function bindControls() {
  Object.entries(controls).forEach(([key, input]) => {
    input.addEventListener("input", () => {
      state[key] =
        key === "mass"
          ? Number(input.value)
          : Number(input.value);

      if (key === "energy") {
        state.energyBoost = Math.abs(state.energy - DEFAULTS.energy) / 100;
        setCommandMessage("Energy parameter adjusted.");
      }

      if (key === "mass") {
        setCommandMessage("Core mass parameter adjusted.");
      }

      if (key === "entropy") {
        setCommandMessage("Entropy parameter adjusted.");
      }

      if (key === "gravity") {
        setCommandMessage("Gravity parameter adjusted.");
      }

      updateValueLabels();
    });
  });

  document.querySelectorAll("[data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      runCommand(button.dataset.command);
    });
  });
}

canvas.addEventListener("pointermove", (event) => {
  const rect = canvas.getBoundingClientRect();
  pointer.x = event.clientX - rect.left;
  pointer.y = event.clientY - rect.top;
  pointer.active = true;
});

canvas.addEventListener("pointerleave", () => {
  pointer.active = false;
});

canvas.addEventListener("pointerdown", (event) => {
  const rect = canvas.getBoundingClientRect();
  spawnBurst(
    event.clientX - rect.left,
    event.clientY - rect.top,
    24
  );
});

window.addEventListener("resize", resizeCanvas);

function init() {
  resizeCanvas();
  seedUniverse();
  bindControls();
  updateValueLabels();
  requestAnimationFrame(render);
}

init();
