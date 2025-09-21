# State Management

The `stateManager.js` file is responsible for handling and rendering the current state of the game. It imports all the children components like enemy raids, the player and the ammunition. Each child is responsible for implementing it's own `render` function which the state manager will call.

## Contructor

The constructor here stores all the state variables and the keypress handlers.
