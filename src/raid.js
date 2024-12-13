import Enemy from './enemy.js';

class Raid {
  constructor(stateManager) {
    this.stateManager = stateManager;

    this.height = this.stateManager.enemyRaidGridRows * this.stateManager.enemySize;
    this.width = this.stateManager.enemyRaidGridColumns * this.stateManager.enemySize;

    this.raidPosX = 0;
    // start the raid above the screen
    this.raidPosY = -this.height;

    this.speedX = 3;
    this.speedY = 0;

    this.enemies = [];
    this.createEnemyRaid();
  }

  createEnemyRaid() {
    for (let y = 0; y < this.stateManager.enemyRaidGridRows; y++) {
      for (let x = 0; x < this.stateManager.enemyRaidGridColumns; x++) {
        this.enemies.push(new Enemy(this.stateManager, x * this.stateManager.enemySize, y * this.stateManager.enemySize));
      }
    }
  }

  render(context) {
    if (this.raidPosY < 0) {
      // if the raid has just spawned above the screen, float it down
      this.speedY = 5;
    } else {
      // by default keep the vertical speed as 0 and update only when the horizontal limit is touched
      this.speedY = 0;
    }

    // horizontal boundary check, if true, reverse the horizontal speed and increase the vertical speed by the height of the enemy
    if (this.raidPosX > this.stateManager.width - this.width || this.raidPosX < 0) {
      this.speedX *= -1;
      this.speedY = this.stateManager.enemySize;
    }

    // udpate position of the wave
    this.raidPosX += this.speedX;
    this.raidPosY += this.speedY;

    // update the position of the enemies in the wave relative to the wave position
    this.enemies.forEach(enemy => {
      enemy.progress(this.raidPosX, this.raidPosY);
      enemy.render(context);
    })

    // check if the enemy is shot
    this.enemies = this.enemies.filter(enemy => !enemy.hitByAmmo);
  }
}
export default Raid;
