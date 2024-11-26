import Player from './player.js';
import Ammo from './ammo.js';

class StateManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player(this);

    this.availableAmmoPool = [];
    this.maxAmmo = 15;
    this.createAmmoPool();

    this.activeKeys = [];

    // keyboard event listeners

    // when key is pushed down and it is not already present in the active key list
    // it is added to active key list
    // This is done because if you hold down the key, then it will keep firing the 
    // same keydown event for the key which we don't want
    window.addEventListener('keydown', (e) => {
      if (!this.activeKeys.includes(e.key)) {
        this.activeKeys.push(e.key);
      }

      // Shoot ammo if available
      if (e.key === 'w') {
        this.player.fireAmmo();
      }
    })

    // remove key from the active key list when key is no longer pressed
    window.addEventListener('keyup', (e) => {
      this.activeKeys = this.activeKeys.filter((key) => key != e.key)
    })
  }

  createAmmoPool() {
    for (let index = 0; index < this.maxAmmo; index++) {
      this.availableAmmoPool.push(new Ammo(this));
    }
  }

  getAmmoFromPool() {
    return this.availableAmmoPool.find((ammo) => ammo.free);
  }

  render(context) {
    this.player.render(context);
    this.player.update();
    this.availableAmmoPool.forEach(ammo => {
      ammo.progress()
      ammo.render(context)
    })
  }
}

export default StateManager;
