# Quantum Sandbox — Product Spec

## 1. Overview

Quantum Sandbox is a small, browser-based interactive visual experiment.

The user controls a fictional particle universe through a simple sci-fi control interface. Changing a few parameters causes the simulated universe to react immediately through particle motion, orbiting bodies, bursts, attraction/repulsion, and other visual effects.

The goal is not to build a realistic physics simulator. The goal is to create a fun, beautiful, immediately understandable interactive toy that feels surprisingly sophisticated while remaining small enough to build in roughly 1–2 hours.

## 2. Core Experience

The user should be able to:

1. Open the page and immediately see a living particle universe.
2. Change parameters and instantly see the universe respond.
3. Use a few simple commands to trigger dramatic changes.
4. Experiment without worrying about breaking anything.
5. Reset the universe and try another configuration.

The central idea is:

> Small changes. Big effects.

## 3. MVP

### Visual simulation

- Full-screen dark sci-fi canvas.
- Hundreds to a few thousand lightweight particles.
- A central energy source / core.
- Several orbital paths or particle streams.
- A handful of larger glowing bodies.
- Continuous motion so the scene feels alive.
- Subtle particle trails and glow.
- Color variation across a small neon palette.

### Controls

A compact control panel containing:

- Energy
- Mass
- Entropy
- Gravity

Each parameter should have a slider and visible value.

Changing a parameter should produce a noticeable visual response.

### Quick commands

Provide a small set of buttons:

- energy
- mass
- entropy
- gravity
- repel
- orbit
- chaos
- burst
- reset

Commands should trigger obvious visual changes rather than merely changing text.

### Interaction

The mouse should interact with the simulation.

At minimum:

- Moving the cursor influences nearby particles.
- Clicking creates a short-lived disturbance / burst.
- The interaction should feel responsive and physical.

### HUD

Include lightweight sci-fi UI elements:

- Project title: QUANTUM SANDBOX
- Particle count
- Approximate FPS or a fake/stylized system status
- Current system state such as STABLE, EVOLVING, or CHAOTIC
- Small system/status readout

The HUD should support the experience without covering the simulation.

## 4. Visual Direction

Reference direction: dark cinematic sci-fi instrumentation.

### Desired characteristics

- Almost-black / deep navy background.
- Thin, understated interface lines.
- Monospaced or technical typography.
- Neon cyan, blue, purple, magenta, and occasional warm orange/gold.
- Strong particle glow.
- Lots of negative space around the central simulation.
- UI should feel like an instrument rather than a conventional dashboard.

### Avoid

- Generic SaaS dashboard styling.
- Excessive cards and rounded containers.
- Dense menus.
- Photorealistic space imagery.
- Heavy 3D rendering if it adds significant implementation complexity.
- Anything that makes the page feel like a productivity app.

The simulation itself should be the visual focus.

## 5. Technical Constraints

The project should remain deliberately simple.

- Client-side only.
- No backend.
- No database.
- No authentication.
- No persistent storage.
- No user accounts.
- No build system unless it clearly helps.
- Prefer plain HTML/CSS/JavaScript for the first version.
- Use HTML Canvas for the particle simulation.
- No external API is required.
- Must run as a static site.
- Must be suitable for free hosting, especially GitHub Pages.

## 6. Suggested Structure

For the MVP, keep the repository small:

    /
    ├── index.html
    ├── style.css
    ├── app.js
    └── SPEC.md

If the implementation becomes more complex, files can be split later.

## 7. Simulation Approach

The simulation does not need scientifically accurate physics.

Use simple rules that look good:

- Each particle has position, velocity, size, brightness, and color.
- Gravity influences velocity toward a central point.
- Repulsion pushes particles away from the cursor or core.
- Energy controls particle speed / brightness / activity.
- Mass controls attraction strength.
- Entropy controls randomness and turbulence.
- Orbit changes particles toward orbital motion.
- Chaos introduces stronger random perturbations.
- Burst temporarily adds energy and radial velocity.

Prioritize visual behavior over physical correctness.

## 8. Interaction Principles

Every interaction should have a visible consequence.

Examples:

- Increase energy → particles accelerate and brighten.
- Increase gravity → particles cluster more tightly.
- Increase entropy → motion becomes less predictable.
- Click burst → radial explosion followed by reformation.
- Move mouse near particles → particles bend toward/away from cursor.
- Click canvas → localized ripple.
- Press reset → return to a pleasing default state.

The user should be able to understand the cause-and-effect relationship without reading documentation.

## 9. MVP Success Criteria

The MVP is successful if:

- It looks interesting before the user touches anything.
- A new user understands what to do within a few seconds.
- Slider changes visibly affect the simulation.
- Buttons create satisfying visual reactions.
- Mouse interaction feels responsive.
- The page runs smoothly in a normal desktop browser.
- It can be deployed as a static GitHub Pages site.
- The implementation remains small enough to understand and modify in one sitting.

## 10. Explicit Non-Goals

Do not build these into the MVP:

- User accounts.
- Saving simulations.
- Sharing generated states through a backend.
- Real physics calculations.
- Multiplayer.
- Complex 3D rendering.
- Mobile-specific controls.
- A large settings system.
- A full command language.
- A sophisticated component framework.

These can be considered later only if the basic experiment is already fun.

## 11. Future Ideas

Only consider these after the MVP is working:

- Text commands such as "gravity 0.8".
- Preset universes.
- Procedurally generated worlds.
- Audio-reactive particles.
- Keyboard shortcuts.
- Screen capture / export.
- URL-encoded configurations for sharing.
- More elaborate particle behaviors.
- WebGL if Canvas becomes a performance limitation.

## 12. Build Order

Recommended implementation sequence:

1. Create the full-screen canvas.
2. Implement the particle system.
3. Add the central gravity/orbit behavior.
4. Add parameter sliders.
5. Add quick-command buttons.
6. Add mouse interaction.
7. Add the sci-fi HUD.
8. Tune motion, glow, colors, and responsiveness.
9. Test on a normal desktop browser.
10. Deploy to GitHub Pages.

The guiding principle throughout development:

> Make it feel magical before making it complicated.
