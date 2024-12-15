class Ammo {
  constructor(stateManager) {
    this.width = 3;
    this.height = 40;
    this.x = 0;
    this.y = 0;
    this.speed = 30;
    this.free = true;
    this.stateManager = stateManager;
    this.damage = 1;
  }

  render(context) {
    if (!this.free) {
      context.save();
      context.fillStyle = "cyan";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.restore();
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
