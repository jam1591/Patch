# Game Rendering and Functionality Documentation

## Rendering Functions:

### `renderMonsters()`

- **Description**: Renders all active monsters on the canvas.
- **Sub-functions**:
  - `monsterAnimation(monster)`: Animates the monster.
  - `monsterKillCounter(monster)`: Keeps track of kills by the monster.
  - `monsterOffset(monster)`: Handles monster offsets.
  - `monsterCollision(monster)`: Manages collision detection for monsters.
  - `monsterSkillUse(monster)`: Controls the usage of monster skills.
  - `monsterDraw(monster)`: Draws the monster on the canvas.

### `renderBullets()`

- **Description**: Renders all active bullets on the canvas.
- **Sub-functions**:
  - `bullet.animation()`: Animates the bullet.
  - `bullet.movement()`: Manages bullet movement.
  - `bullet.outOfBounds()`: Checks if the bullet is out of bounds.
  - `bullet.draw()`: Draws the bullet on the canvas.

### `renderPlayer()`

- **Description**: Renders the player on the canvas.
- **Sub-functions**:
  - `player.playerMovement()`: Manages player movement.
  - `player.playerMovementTeleport()`: Handles player teleportation movement.
  - `player.animation()`: Animates the player.
  - `player.updateHealth()`: Updates player health status.
  - `player.draw()`: Draws the player on the canvas.

### `renderCanvas()`

- **Description**: Renders the canvas with the map background.

### `renderUserInterface()`

- **Description**: Renders the user interface elements.
- **Sub-functions**:
  - `userInterface.instructions()`: Displays game instructions.
  - `userInterface.rounds()`: Displays current round information.
  - `userInterface.kills()`: Displays kill count.
  - `userInterface.skills()`: Displays available skills.
  - `userInterface.healthbar()`: Displays player health bar.

## Other Functions:

### `animate()`

- **Description**: Handles the animation loop for the game.

### `monsterGenerate()`

- **Description**: Starts generating monsters at regular intervals.

### `monsterStopGenerate()`

- **Description**: Stops generating monsters.

## Event Listeners:

### Keydown Event Listener

- **Description**: Listens for keydown events to trigger player movement and bullet firing.
- **Keys**:
  - `ArrowUp`: Fires a bullet upwards.
  - `ArrowDown`: Fires a bullet downwards.
  - `ArrowLeft`: Fires a bullet to the left.
  - `ArrowRight`: Fires a bullet to the right.

### Keyup Event Listener

- **Description**: Listens for keyup events to stop player movement.
