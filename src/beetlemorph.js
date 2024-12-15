import Enemy from './enemy.js';

export default class Beetlemorph extends Enemy {

  constructor(stateManager, offsetInRaidX, offsetInRaidY) {
    super(
      stateManager,
      offsetInRaidX,
      offsetInRaidY,
      4    // the sprite sheet for beetlemorph has 4 types of characters
    );
    this.image = document.getElementById("beetlemorph")

    // the sprite sheet for beetlemorph has 4 types of characters
    this.noOfSprites = 4;


    // the sprite sheet has multiple stages of how a damaged beetlemorph
    // might look like, in this case there are 3, normal, damaged and blasted
    // after all the frames are done, the enemy is removed from render
    this.maxFramesX = 2;

    this.maxHealthPoints = 1;
    this.healthPoints = 1;
  }
}
