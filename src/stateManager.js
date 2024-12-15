import Player from './player.js';
import Ammo from './ammo.js';
import Raid from './raid.js';

class StateManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player(this);

    // game state variables
    this.score = 0;
    this.gameOver = false;

    // Ammunition pool
    this.availableAmmoPool = [];
    this.maxAmmo = 15;

    // Enemy wave control
    this.enemySize = 80;
    this.enemyRaidGridColumns = 2;
    this.enemyRaidGridRows = 2;
    this.raids = [];
    this.raidCount = 1;
    this.newRaidSpawned = false;


    // init functions
    this.startEnemyRaid();
    this.createAmmoPool();

    // keyboard event listeners
    this.activeKeys = [];

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

      // if user presses r and the game is over, restart the game 
      if (e.key === 'r' || this.gameOver) {
        this.restartGame();
      }
    })

    // remove key from the active key list when key is no longer pressed
    window.addEventListener('keyup', (e) => {
      this.activeKeys = this.activeKeys.filter((key) => key != e.key)
    })
  }

  restartGame() {
    this.player.reset();
    this.score = 0;
    this.gameOver = false;
    this.availableAmmoPool = [];
    this.raids = [];
    this.raidCount = 1;
    this.enemyRaidGridColumns = 2;
    this.enemyRaidGridRows = 2;
    this.newRaidSpawned = false;

    this.startEnemyRaid();
    this.createAmmoPool();
  }

  createAmmoPool() {
    for (let index = 0; index < this.maxAmmo; index++) {
      this.availableAmmoPool.push(new Ammo(this));
    }
  }

  getAmmoFromPool() {
    return this.availableAmmoPool.find((ammo) => ammo.free);
  }

  startEnemyRaid() {
    this.raids.push(new Raid(this));
  }

  createNewRaid() {
    this.newRaidSpawned = true;
    if (Math.random() < 0.5) {
      this.enemyRaidGridColumns++;
    } else {
      this.enemyRaidGridRows++;
    }
    this.startEnemyRaid();
    this.raidCount++;

    // there's a small chance of player life increasing after wave finish
    if (Math.random() < 0.1) {
      this.player.lives++;
    }
    this.newRaidSpawned = false;
  }

  // check if ammo has hit enemy or enemy has hit player
  checkEnemyCollision(enemy, object) {
    // using the 2d collision check for this
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    return (object.x < enemy.enemyPosX + this.enemySize &&
      object.x + object.width > enemy.enemyPosX &&
      object.y < enemy.enemyPosY + this.enemySize &&
      object.y * object.height > enemy.enemyPosY
    );
  }

  render(context) {
    this.player.render(context);

    this.player.update();
    this.availableAmmoPool.forEach(ammo => {
      ammo.progress()
      ammo.render(context)
    })
    this.raids.forEach(raid => {
      if (raid.destroyed) {
        return;
      }
      raid.render(context);

      if (raid.enemies.length < 1 && !this.newRaidSpawned && !this.gameOver) {
        raid.destroyed = true;
        this.createNewRaid();
      }
    })

    // check for player's lives
    if (this.player.lives <= 0) {
      this.gameOver = true;
      this.player.lives = 0;
    }

    // show game stats
    context.save();
    context.fillText("Score: " + this.score, 10, 30);
    context.fillText("Raid: " + this.raidCount, 10, 60);
    context.fillText("Lives: ", 10, 90);
    for (let i = 0; i < this.player.lives; i++) {
      context.fillRect(53 + 10 * (i + 1), 75, 5, 15)
    }

    if (this.gameOver) {
      context.textAlign = "center";
      context.font = "100px Impact";
      context.fillText("Game Over", this.width * 0.5, this.height * 0.5);
      context.font = "30px Impact";
      context.fillText("Press R to restart", this.width * 0.5, this.height * 0.5 + 40);
    }
    context.restore();
  }
}

export default StateManager;
