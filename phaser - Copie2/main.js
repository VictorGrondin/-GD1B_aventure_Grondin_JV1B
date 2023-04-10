var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    input: { gamepad: true },

    scene: [Menuaccueil,Map1Scene,Map2Scene,Gameover,the_end,],

    pixelArt:false

};

new Phaser.Game(config);