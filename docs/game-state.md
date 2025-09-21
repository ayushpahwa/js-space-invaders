# State Management

The `stateManager.js` file is responsible for handling and rendering the current state of the game. It imports all the children components like enemy raids, the player and the ammunition. Each child is responsible for implementing it's own `render` function which the state manager will call.

## Contructor

The constructor here stores all the state variables and the keypress handlers.

### Enemy waves

- We don't directly import the enemy model, instead we import a raid of enemies
- The Raids are defined by `raid.js` class.
- The state manager class holds the size of the raids. Basically the number of enemy rows and columns.
```js
    this.enemyRaidGridColumns = 2;
    this.enemyRaidGridRows = 2;
    this.raids = [];
    this.raidCount = 1;
    this.newRaidSpawning = false;
```
- Once a raid is wiped by the player the size of either the rows or columns is increased by 1 on random.
```js
  // Create a new instance of the raid class and push to raids array
  // Also increase the raid count
  // The raid will be created using the state variables for number of
  // enemy rows and columns
  startEnemyRaid() {
    this.raids.push(new Raid(this));
    this.raidCount++;
  }

  // Spawn a new raid
  createNewRaid() {
    this.newRaidSpawning = true;

    // A 50-50 probability to increment either the column or row of enemies in the
    // upcoming raid. Before increment, there is an upper limit check.
    //
    // Before increasing a column of enemies, check if the total width 
    // of the raid (size of one enemy * total number of enemy columns) is less than 
    // the 80% of the width of the screen
    //
    // Before increasing a row of enemies, check if the total height 
    // of the raid (size of one enemy * total number of enemy rows) is less than 
    // the 60% of the height of the screen
    if (Math.random() < 0.5 && this.enemyRaidGridColumns * this.enemySize <= 0.8 * this.width) {
      this.enemyRaidGridColumns++;
    } else if (this.enemyRaidGridRows * this.enemySize <= 0.6 * this.height) {
      this.enemyRaidGridRows++;
    }
    this.startEnemyRaid();

    // there's a small chance of player life increasing after wave finish
    if (Math.random() < 0.1) {
      this.player.lives++;
    }
    this.newRaidSpawning = false;
  }
```
-  

