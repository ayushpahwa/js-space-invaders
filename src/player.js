class Player {

  constructor(stateManager) {
    this.stateManager = stateManager;
    this.width = 100;
    this.height = 100;
    this.x = this.stateManager.width * 0.5 - this.width * 0.5;
    this.y = this.stateManager.height - this.height;
    this.speed = 5;
  }

  render(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    // Handle intent to move left
    if (this.stateManager.activeKeys.includes('ArrowLeft')
      || this.stateManager.activeKeys.includes('h')
      || this.stateManager.activeKeys.includes('H')
    ) {
      this.x -= this.speed;
    }

    // Handle intent to move right 
    if (this.stateManager.activeKeys.includes('ArrowRight')
      || this.stateManager.activeKeys.includes('l')
      || this.stateManager.activeKeys.includes('L')
    ) {
      this.x += this.speed;
    }

    // Adding horizontal boundaries
    if (this.x < -this.width * 0.5) {
      this.x = 0 - this.width * 0.5;
    } else if (this.x > this.stateManager.width - this.width * 0.5) {
      this.x = this.stateManager.width - this.width * 0.5;
    }
  }

  fireAmmo() {
    const ammo = this.stateManager.getAmmoFromPool();
    if (ammo) {
      ammo.fire(this.x + this.width * 0.5, this.y);
    }
  }
}

export default Player;
