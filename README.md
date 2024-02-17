# JavaScript Canvas Game

This project is a simple game developed using HTML5 Canvas and JavaScript. It features a player character controlled by the WASD keys, shooting bullets to defeat monsters spawning on the screen.

## Table of Contents

- [Usage](#usage)
- [Documentation](#documentation)
- [Functions](#functions)
- [License](#license)

## Usage

To use the game, simply open the `index.html` file in a web browser that supports HTML5 Canvas. Use the WASD keys to move the player character, and press the arrow keys to shoot bullets towards the monsters, press space to releport. The game ends when the player character loses all health or when all monsters are defeated.

## Documentation

### Functions

#### `renderMonsters()`

This function renders the monsters on the canvas. It updates their positions, animations, and health bars.

#### `renderBullets()`

This function renders the bullets shot by the player character. It updates their positions and checks for collisions with monsters.

#### `renderPlayer()`

This function renders the player character on the canvas. It handles player movement, animations, and health updates.

#### `renderCanvas()`

This function clears the canvas and renders the game background.

#### `renderUserInterface()`

This function renders the user interface elements such as round count, kill count, and health bar.

#### `animate()`

This function serves as the main animation loop for the game. It repeatedly calls other rendering functions to update the game state and draw everything on the canvas.
