import StateManager from './src/stateManager.js'

window.addEventListener("load", function() {
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 800;

  const stateManager = new StateManager(canvas);


  // clear rect and paint the whole scene again
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stateManager.render(ctx);
    window.requestAnimationFrame(animate);
  }

  animate();
}
)
