class Ammo {
  constructor(stateManager) {
    this.width = 4;
    this.height = 20;
    this.x = 0;
    this.y = 0;
    this.speed = 30;
    this.free = true;
    this.stateManager = stateManager;
  }

  render(context) {
    if (!this.free) {
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  progress() {
    if (!this.free) {
      this.y -= this.speed;
      if (this.y < 0) this.reset()
    }
  }

  // Fire a round of ammo at the position of x and y
  fire(x, y) {
    this.x = x - this.width * 0.5;
    this.y = y;
    this.free = false;
  }

  reset() {
    this.free = true;
  }

}

export default Ammo;
