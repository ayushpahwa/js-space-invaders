class Enemy {

  constructor(stateManager, offsetInRaidX, offsetInRaidY) {
    this.stateManager = stateManager;
    this.enemyPosX = 0;
    this.enemyPosY = 0;

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
  }
}

export default Enemy;
