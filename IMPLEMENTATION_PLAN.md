# Quantum Sandbox — Implementation Plan

This plan breaks the MVP into small, resumable milestones.

## How to use this plan

- Complete milestones in order unless there is a good reason to change direction.
- Keep each milestone small enough to finish in one focused session.
- Mark a milestone complete only when it works in the browser.
- If development stops, the next unchecked milestone is the resume point.
- Keep the MVP scope aligned with SPEC.md.

---

## Phase 0 — Repository & Skeleton

### 0.1 Create the page structure
- [x] Create `index.html`
- [x] Create `style.css`
- [x] Create `app.js`
- [x] Link CSS and JS correctly
- [x] Add a minimal page title

**Done when:** opening `index.html` shows the basic page with no console errors.

### 0.2 Create the visual shell
- [x] Full viewport dark background
- [x] Fullscreen canvas
- [x] Basic HUD/header area
- [x] Basic left control panel container
- [x] Basic bottom/system status area

**Done when:** the page already resembles the rough structure of the concept image, even before the simulation exists.

---

## Phase 1 — Particle Engine

### 1.1 Canvas setup
- [x] Create and size the canvas to the viewport
- [x] Handle browser resize
- [x] Create the animation loop

**Done when:** the canvas renders continuously without errors.

### 1.2 Basic particles
- [x] Create a particle data structure
- [x] Spawn an initial particle field
- [x] Give particles position, velocity, size, brightness, and color
- [x] Draw particles with a soft glow

**Done when:** a living field of particles is visible and moving.

### 1.3 Central system
- [x] Add a central energy/core point
- [x] Add an orbital/tangential motion model
- [x] Keep particles distributed across a stable orbital field

**Note:** the first pass uses a visually controlled orbital model rather than full physical gravity. Actual gravity/attraction becomes parameterized in Phase 2.

**Done when:** the simulation looks like a dynamic orbital system rather than random dots.

---

## Phase 2 — Parameters

### 2.1 Simulation state
Create a single central state object containing at least:

- [ ] energy
- [ ] mass
- [ ] entropy
- [ ] gravity

**Done when:** all simulation behavior can read from this shared state.

### 2.2 Energy
- [ ] Connect Energy slider
- [ ] Make energy visibly affect particle speed and/or brightness

**Done when:** moving the slider creates an obvious change.

### 2.3 Mass
- [ ] Connect Mass slider
- [ ] Make mass affect central attraction

**Done when:** higher/lower mass produces clearly different clustering/orbit behavior.

### 2.4 Entropy
- [ ] Connect Entropy slider
- [ ] Add controlled turbulence/randomness

**Done when:** increasing entropy makes the system visibly less orderly.

### 2.5 Gravity
- [ ] Connect Gravity slider
- [ ] Tune attraction behavior for satisfying visual results

**Done when:** gravity changes the shape and density of the system in an obvious way.

---

## Phase 3 — Quick Commands

### 3.1 Command buttons
- [ ] Add buttons for:
  - [ ] energy
  - [ ] mass
  - [ ] entropy
  - [ ] gravity
  - [ ] repel
  - [ ] orbit
  - [ ] chaos
  - [ ] burst
  - [ ] reset

### 3.2 Command behavior
- [ ] energy → temporary energy boost
- [ ] mass → temporary attraction change
- [ ] entropy → temporary turbulence increase
- [ ] gravity → temporary gravity change
- [ ] repel → particles pushed outward
- [ ] orbit → stronger orbital organization
- [ ] chaos → stronger random motion
- [ ] burst → radial particle explosion
- [ ] reset → restore pleasing default state

**Done when:** every button causes an immediate, visible response.

---

## Phase 4 — Mouse Interaction

### 4.1 Cursor tracking
- [x] Track mouse position
- [x] Convert coordinates correctly for the canvas

### 4.2 Particle influence
- [x] Add a radius around the cursor
- [x] Apply attraction influence around the cursor
- [x] Fall off smoothly with distance

**Done when:** moving the cursor through the field visibly bends the particle flow.

### 4.3 Click disturbance
- [x] Detect canvas clicks
- [x] Create a local ripple/burst
- [x] Give the effect a short lifetime

**Done when:** clicking feels like physically disturbing the universe.

---

## Phase 5 — Sci-Fi Interface

### 5.1 Typography and styling
- [ ] Add technical/monospaced typography
- [ ] Establish consistent spacing and line treatments
- [ ] Style sliders
- [ ] Style command buttons
- [ ] Add subtle glow without overwhelming the simulation

### 5.2 System readouts
- [ ] Show particle count
- [ ] Show a simple system status
- [ ] Show a small live status message such as `SYSTEM: EVOLVING...`

### 5.3 Status logic
System status can be derived from the current simulation rather than being physically meaningful.

Example states:

- [ ] STABLE
- [ ] EVOLVING
- [ ] CHAOTIC
- [ ] CRITICAL

**Done when:** the UI feels like an instrument controlling the simulation rather than a normal web dashboard.

---

## Phase 6 — Visual Polish

### 6.1 Composition
- [ ] Keep the central simulation dominant
- [ ] Reduce UI clutter
- [ ] Ensure controls do not obscure important particles

### 6.2 Particle polish
- [ ] Tune particle sizes
- [ ] Tune glow strength
- [ ] Tune trails
- [ ] Tune color distribution
- [ ] Add a few larger glowing bodies

### 6.3 Motion polish
- [ ] Tune acceleration/deceleration
- [ ] Smooth parameter transitions where useful
- [ ] Make bursts and disturbances feel energetic
- [ ] Remove visually noisy behavior

### 6.4 Performance
- [ ] Test particle count
- [ ] Avoid unnecessary allocations inside the animation loop
- [ ] Verify acceptable frame rate on a normal desktop

**Done when:** the experience feels polished without increasing architectural complexity.

---

## Phase 7 — Usability Pass

- [ ] Load page with a pleasing default simulation
- [ ] Make the first interaction obvious
- [ ] Ensure all controls have visible labels
- [ ] Ensure sliders have sensible ranges
- [ ] Ensure reset always returns to a good state
- [ ] Check that mouse interaction still works after resize
- [ ] Check browser console for errors

**Done when:** someone unfamiliar with the project can open it and start experimenting immediately.

---

## Phase 8 — Deployment

### 8.1 GitHub Pages
- [ ] Push working MVP to `main`
- [ ] Enable GitHub Pages
- [ ] Configure deployment from the repository
- [ ] Open the public URL

### 8.2 Final smoke test
- [ ] Load public site
- [ ] Test sliders
- [ ] Test every quick command
- [ ] Test mouse movement
- [ ] Test clicks
- [ ] Test reset
- [ ] Check desktop layout
- [ ] Verify no missing assets or console errors

**Done when:** the public URL works as expected.

---

# MVP Exit Criteria

The MVP is complete when Phases 0–8 are complete and:

- [ ] The simulation is continuously alive.
- [ ] Parameters visibly change its behavior.
- [ ] Commands produce satisfying effects.
- [ ] Mouse movement influences particles.
- [ ] Clicking creates a disturbance.
- [ ] The interface matches the intended dark sci-fi direction.
- [ ] The page runs as a static site.
- [ ] The public GitHub Pages URL works.

Anything beyond this should be treated as an optional enhancement rather than part of the MVP.

---

# Optional Post-MVP Ideas

Only start these after the MVP is complete:

- [ ] Text command input
- [ ] Preset universes
- [ ] Procedural world generation
- [ ] Audio-reactive mode
- [ ] Keyboard shortcuts
- [ ] Screenshot/export
- [ ] Shareable URL configurations
- [ ] WebGL implementation if needed for scale

---

# Current Progress

**Current milestone:** Phase 2.1 — Simulation state

**Next action:** Introduce the shared simulation state for Energy, Mass, Entropy, and Gravity before wiring the controls.
