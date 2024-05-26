import { Preloader } from "./scenes/Preloader.js";
//import { AuthorizationScene } from "./scenes/AuthorizationScene.js";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#FDD5D5', //could also be replaced with image
    parent: 'game-container',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.RESIZE, //this just makes it so that the game canvas always tries to automatically adjust so that it fills the available screen
    },
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 0 },
            debug: true,
        },
    },
    scene: [
        Preloader,
       //AuthorizationScene,
    ],
    interpolation: true,
};

const game = new Phaser.Game(config);

export default game;
