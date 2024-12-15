import Enemy from './enemy.js';

export default class Beetlemorph extends Enemy {

  constructor(stateManager, offsetInRaidX, offsetInRaidY) {
    super(stateManager, offsetInRaidX, offsetInRaidY);
    this.image = document.getElementById("beetlemorph")

    // the sprite sheet for beetlemorph has 4 types of characters
    // hence we are choosing one type in random
    this.frameY = Math.floor(Math.random() * 4)

    // the sprite sheet has multiple stages of how a damaged beetlemorph
    // might look like, in this case there are 3, normal, damaged and blasted
    // after all the frames are done, the enemy is removed from render
    this.maxFramesX = 2;

    this.maxHealthPoints = 1;
    this.healthPoints = 1;
    this.hitCounter = 0;
  }
}
