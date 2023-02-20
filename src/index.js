// This is where the game instance lives

// Loads the phaser.d.ts file (in typings) so that VSCode has autocomplete for the Phaser API
// Basically, this collection isn't available in npm yet so we have to manually import it
/** @type {import{"../typings/phaser"}} */

// Create game class and access the config through super
import "phaser";
import config from "./config/config";

class Game extends Phaser.Game {
    constructor() {
        // Add config file to the game
        super(config);

        // Placeholder where all scenes will go

        // Placeholder for the main scene / start scene
    }
}

// Create new instance of game
window.onload = function () {
    window.game = new Game();
};