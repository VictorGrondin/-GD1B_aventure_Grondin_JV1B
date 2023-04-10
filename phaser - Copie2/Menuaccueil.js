
var cursors;
var gameOver;
var collectitem
var item
var score = 0;
var laser;
var fire;
var canFire = true;
var lasers;
var player;
var laser_evil;
var keydash;
var collide_trou;
var enemy;
gameOver = false;
sens = 1;


class Menuaccueil extends Phaser.Scene {

  constructor() {
    super({ key: 'Menuaccueil' });
  }


  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('play', 'assets/play.png');
    this.load.image('info', 'assets/info.png');
  }

  create() {
    const bg = this.add.image(640, 360, "background");// Ajouter l'image de l'écran d'accueil
    const play_bt = this.add.image(640, 400, "play").setInteractive();// Ajoute le bouton
    const info_bt = this.add.image(640, 500, "info").setInteractive();// Ajoute le bouton
     bg.setScale()

    // Ajouter des événements pour les boutons
    play_bt.on('pointerdown', () => {
      this.scene.start('Map1Scene');
    });

    info_bt.on('pointerdown', () => {
      this.scene.start('info');
    });
  }


}
