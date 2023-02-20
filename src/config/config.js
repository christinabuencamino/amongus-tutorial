// Intialize Phaser game settings
export default {
    type: Phaser.AUTO, // rendering engine (AUTO, WEBGL, CANVAS)
    width: 800, // game width 
    height: 600, // game height
    render: {
        pixelArt: true,
    },
    scale: {
        parent: "mygame",
        autoCenter: true,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0}, // depending on the number, game objects will be pulled up/down
            debug: false,
        },
    },
    dom: {
        createContainer: true,
    },
    scene: [],
};