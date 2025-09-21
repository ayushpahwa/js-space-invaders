# Project structure

```
js-space-invaders/
├── src/    (JS files for managing state and the on screen components)
│   ├── ammo.js ()
│   ├── beetlemorph.js ()
│   ├── enemy.js ()
│   ├── player.js ()
│   ├── raid.js ()
│   └── stateManager.js (Handles the state of the game)
├── assets/
│   └── .... (Image assets for the game)
├── index.html
├── scripts.js
├── styles.css
└── README.md
```

## First time flow

### 1. `index.html`

- The entry point for the Project
- Imports the main JS script, styles and the image assets
- Also defines the cavas which is used by the JS to animate the components

### 2. `script.js`

- Uses the canvas defined by the index html file sets the play area
```js
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 800;
```
- Using the canvas context, also sets the UI designs like font etc.
- Imports and initiates the state manager class
- Also initiates the animation loop using a recursive function

```js
  let lastTime = 0;
  function animate(timestamp) {
    // We use the delta to control the speed of the sprite animations
    // In our case, we have set the interval to 100 ms.
    const deltaTimeForAnimation = timestamp - lastTime;
    lastTime = timestamp;
    // clear rect and paint the whole scene again
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stateManager.render(ctx, deltaTimeForAnimation);
    // recursively calls this function to re-draw the updated components
    window.requestAnimationFrame(animate);
  }

  // start the recursive loop for animation
  animate(0);
```
