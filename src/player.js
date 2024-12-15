class Player {

  constructor(stateManager) {
    this.stateManager = stateManager;
    this.width = 140;
    this.height = 120;
    this.speed = 5;

    // variables
    this.lives = 3; // starting player with 3 lives
    this.x = this.stateManager.width * 0.5 - this.width * 0.5;
    this.y = this.stateManager.height - this.height;

    // sprites
    this.playerSprite = document.getElementById("player");
    this.playerJetsSprite = document.getElementById("player_jets");
    this.playerSpriteFrameX = 0;
    this.playerJetsSpriteFrameX = 1;
  }

  render(context) {
    if (this.stateManager.activeKeys.indexOf("w") > -1
    ) {
      this.playerSpriteFrameX = 1;
    } else {
      this.playerSpriteFrameX = 0;
    }

    context.drawImage(
      this.playerSprite,
      this.playerSpriteFrameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
    context.drawImage(
      this.playerJetsSprite,
      this.playerJetsSpriteFrameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  reset() {
    this.lives = 3; // starting player with 3 lives
    this.x = this.stateManager.width * 0.5 - this.width * 0.5;
    this.y = this.stateManager.height - this.height;
  }

  update() {
    this.playerJetsSpriteFrameX = 1;
    // Handle intent to move left
    if (this.stateManager.activeKeys.includes('ArrowLeft')
      || this.stateManager.activeKeys.includes('h')
      || this.stateManager.activeKeys.includes('H')
    ) {
      this.x -= this.speed;
      this.playerJetsSpriteFrameX = 0;
    }

    // Handle intent to move right 
    if (this.stateManager.activeKeys.includes('ArrowRight')
      || this.stateManager.activeKeys.includes('l')
      || this.stateManager.activeKeys.includes('L')
    ) {
      this.x += this.speed;
      this.playerJetsSpriteFrameX = 2;
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
