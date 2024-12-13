class Enemy {

  constructor(stateManager, offsetInRaidX, offsetInRaidY) {
    this.stateManager = stateManager;
    this.enemyPosX = 0;
    this.enemyPosY = 0;

    // enemy hits and health
    this.hitCounter = 0;
    this.healthPoints = 1;

    // the raid moves in a grid, the offset defines where the enemy is in the raid relative 
    // to the raid's x and y position
    this.offsetInRaidX = offsetInRaidX;
    this.offsetInRaidY = offsetInRaidY;
  }

  render(context) {
    context.strokeRect(this.enemyPosX, this.enemyPosY, this.stateManager.enemySize, this.stateManager.enemySize);
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

    // if the game is still going, check for enemy collisions active ammunitions
    if (!this.stateManager.gameOver) {
      // check for collisions
      this.stateManager.availableAmmoPool.forEach(ammo => {
        if (!ammo.free && this.stateManager.checkEnemyCollision(this, ammo)) {
          this.hitCounter++;
          ammo.reset();
          if (!this.stateManager.gameOver)
            this.stateManager.score++;
        }
      })

    }

    // check if enemy hit the player
    if (this.stateManager.checkEnemyCollision(this, this.stateManager.player)) {
      this.stateManager.player.lives--;
      this.hitCounter++;
    }
  }
}

export default Enemy;
