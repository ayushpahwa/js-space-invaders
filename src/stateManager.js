import Player from './player.js';

class StateManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player(this);
    this.activeKeys = [];

    // keyboard event listeners

    // when key is pushed down, it is added to active key list 
    // we also need to make sure no duplicate keys are present
    window.addEventListener('keydown', (e) => {
      if (!this.activeKeys.includes(e.key)) {
        this.activeKeys.push(e.key);
      }
    })

    // remove key from the active key list when key is no longer pressed
    window.addEventListener('keyup', (e) => {
      this.activeKeys = this.activeKeys.filter((key) => key != e.key)
    })
  }

  render(context) {
    this.player.render(context);
    this.player.update();
  }
}

export default StateManager;
