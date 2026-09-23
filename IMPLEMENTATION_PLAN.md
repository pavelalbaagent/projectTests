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
- [x] energy
- [x] mass
- [x] entropy
- [x] gravity

**Done when:** all simulation behavior can read from the shared state.

### 2.2 Energy
- [x] Connect Energy slider
- [x] Make energy visibly affect particle speed and core activity

### 2.3 Mass
- [x] Connect Mass slider
- [x] Make mass affect central attraction

### 2.4 Entropy
- [x] Connect Entropy slider
- [x] Add controlled turbulence/randomness

### 2.5 Gravity
- [x] Connect Gravity slider
- [x] Tune attraction behavior

---

## Phase 3 — Quick Commands

### 3.1 Command buttons
- [x] energy
- [x] mass
- [x] entropy
- [x] gravity
- [x] repel
- [x] orbit
- [x] chaos
- [x] burst
- [x] reset

### 3.2 Command behavior
- [x] Each command creates an immediate visual response.
- [x] Reset restores a pleasing baseline state.

---

## Phase 4 — Mouse Interaction

### 4.1 Cursor tracking
- [x] Track mouse position
- [x] Convert coordinates correctly for the canvas

### 4.2 Particle influence
- [x] Add a radius around the cursor
- [x] Apply attraction/repulsion influence
- [x] Fall off smoothly with distance

### 4.3 Click disturbance
- [x] Detect canvas clicks
- [x] Create a local ripple/burst
- [x] Give the effect a short lifetime

---

## Phase 5 — Sci-Fi Interface

### 5.1 Typography and styling
- [x] Technical/monospaced typography
- [x] Consistent spacing and line treatments
- [x] Interactive slider styling
- [x] Command button styling
- [x] Subtle HUD glow

### 5.2 System readouts
- [x] Show particle count
- [x] Show live FPS
- [x] Show system status
- [x] Show live system message

### 5.3 Status logic
- [x] STABLE
- [x] EVOLVING
- [x] CHAOTIC
- [x] CRITICAL

---

## Phase 6 — Visual Polish

### 6.1 Composition
- [x] Keep the central simulation dominant
- [x] Reduce UI clutter
- [x] Ensure controls do not obscure the main field

### 6.2 Particle polish
- [x] Tune particle sizes
- [x] Tune glow strength
- [x] Tune orbital guides
- [x] Tune color distribution
- [x] Add larger glowing bodies

### 6.3 Motion polish
- [x] Tune orbital motion
- [x] Add satisfying bursts and disturbances
- [x] Keep effects visually controlled

### 6.4 Performance
- [x] Reduce particle count from the initial prototype
- [x] Cap device pixel ratio
- [x] Remove per-particle blur/shadow rendering
- [x] Use lightweight particle rectangles

**Done when:** the experience feels polished without increasing architectural complexity.

---

## Phase 7 — Usability Pass

Implementation complete; final human smoke test remains.

- [x] Load with a pleasing default simulation
- [x] Make the first interaction obvious
- [x] Ensure controls have visible labels
- [x] Ensure sliders have sensible ranges
- [x] Ensure reset returns to a good state
- [x] Handle browser resize
- [ ] Confirm browser console is error-free in a real browser session

**Done when:** someone unfamiliar with the project can open it and start experimenting immediately.

---

## Phase 8 — Deployment


### 8.1 GitHub Pages
- [x] Add GitHub Pages deployment workflow
- [x] Configure deployment to publish the repository root
- [ ] Enable GitHub Pages in repository settings
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

**Current milestone:** Phase 8.1 — Enable GitHub Pages

**Next action:** In repository Settings → Pages, select GitHub Actions as the source, then verify the public site and complete the final smoke test.
