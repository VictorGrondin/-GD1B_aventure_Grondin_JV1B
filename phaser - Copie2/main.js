var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    input: { gamepad: true },

    scene: [Menuaccueil,Map1Scene,Map2Scene]



};

new Phaser.Game(config);