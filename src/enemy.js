class Enemy {

  constructor(stateManager, offsetInRaidX, offsetInRaidY, noOfSprites) {
    this.stateManager = stateManager;
    this.enemyPosX = 0;
    this.enemyPosY = 0;
    this.noOfSprites = noOfSprites;

    // enemy health
    this.healthPoints = 1;
    this.maxHealthPoints = 1;


    // the source image is a sheet of sprites, we only show a single frame at a time
    // the below variables control which frame is to be shown
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * noOfSprites)

    // the raid moves in a grid, the offset defines where the enemy is in the raid relative 
    // to the raid's x and y position
    this.offsetInRaidX = offsetInRaidX;
    this.offsetInRaidY = offsetInRaidY;
  }

  render(context) {
    context.drawImage(
      this.image,
      this.frameX * this.stateManager.enemySize,
      this.frameY * this.stateManager.enemySize,
      this.stateManager.enemySize,
      this.stateManager.enemySize,
      this.enemyPosX,
      this.enemyPosY,
      this.stateManager.enemySize,
      this.stateManager.enemySize
    );
  }

  // as the raid moves, add the offset to the enemy position and move it to
  progress(raidPosX, raidPosY) {
    this.enemyPosX = raidPosX + this.offsetInRaidX;
    this.enemyPosY = raidPosY + this.offsetInRaidY;

    // check if an enemy has crossed the lower bounds of the game
    // if yes, finish the game
    if (this.enemyPosY + this.stateManager.enemySize > this.stateManager.height) {
      this.stateManager.gameOver = true;
    }

    if (this.healthPoints == 0 && this.stateManager.progressSpriteAnimation) {
      this.frameX++;
    }

    // if the game is still going, check for enemy collisions active ammunitions
    if (!this.stateManager.gameOver) {
      // check for collisions
      this.stateManager.availableAmmoPool.forEach(ammo => {
        if (!ammo.free && this.stateManager.checkEnemyCollision(this, ammo) && this.healthPoints > 0) {
          this.onCollission(ammo.damage);
          ammo.reset();
          if (!this.stateManager.gameOver)
            this.stateManager.score += this.maxHealthPoints;
        }
      })

    }

    // check if enemy hit the player
    if (this.stateManager.checkEnemyCollision(this, this.stateManager.player) && this.healthPoints > 0) {
      this.onCollission(1);
      this.stateManager.player.lives--;
    }
  }

  onCollission(damage) {
    this.healthPoints -= damage;
  }
}

export default Enemy;
