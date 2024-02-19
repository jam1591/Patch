# Game Rendering and Functionality Documentation

## Rendering Functions:

### `renderMonsters()`

- **Description**: Renders all active monsters on the canvas.
- **Sub-functions**:
  - `monsterAnimation(monster)`: Animates the monster.
  - `monsterOffset(monster)`: Handles monster offsets.
  - `monsterCollision(monster)`: Manages collision detection for monsters.
  - `monsterSkillUse(monster)`: Controls the usage of monster skills.
  - `monsterDraw(monster)`: Draws the monster on the canvas. Keeps track of kills by the monster

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
  - `PLAYER.playerMovement()`: Manages player movement.
  - `PLAYER.playerMovementTeleport()`: Handles player teleportation movement.
  - `PLAYER.animation()`: Animates the player.
  - `PLAYER.updateHealth()`: Updates player health status.
  - `PLAYER.draw()`: Draws the player on the canvas.

### `renderCanvas()`

- **Description**: Renders the canvas with the map background.

### `renderUserInterface()`

- **Description**: Renders the user interface elements.
- **Sub-functions**:
  - `USERINTERFACE.instructions()`: Displays game instructions.
  - `USERINTERFACE.rounds()`: Displays current round information.
  - `USERINTERFACE.kills()`: Displays kill count.
  - `USERINTERFACE.skills()`: Displays available skills.
  - `USERINTERFACE.healthbar()`: Displays player health bar.

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
  - `W`: Moves a player upwards.
  - `S`: Moves a player downwards.
  - `A`: Moves a player the left.
  - `D`: Moves a player to the right.
  - `Space`: Teleport a player in a certain direction.
