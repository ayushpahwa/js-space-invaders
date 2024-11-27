import StateManager from './src/stateManager.js'

// once all the HTML, CSS and other assets have loaded, 
// we start with the JS init.
window.addEventListener("load", function() {

  // get reference to the canvas object defined in the html page
  const canvas = this.document.getElementById('canvas1');
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 800;
  ctx.fillStyle = "white";

  const stateManager = new StateManager(canvas);

  function animate() {
    // clear rect and paint the whole scene again
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stateManager.render(ctx);
    // recursively calls this function to re-draw the updated components
    window.requestAnimationFrame(animate);
  }

  // start the recursive loop for animation
  animate();
})
