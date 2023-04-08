
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
    this.load.image('credit', 'assets/credit.png');
  }

  create() {
    const bg = this.add.image(640, 360, "background");// Ajouter l'image de l'écran d'accueil
    const play_bt = this.add.image(640, 400, "play").setInteractive();// Ajouter les boutons
    const credit_bt = this.add.image(640, 500, "credit");
     bg.setScale()

    // Ajouter des événements pour les boutons
    play_bt.on('pointerdown', () => {
      this.scene.start('Map1Scene');
    });

    //credit_bt.on('pointerdown', () => {
    //  // Ajouter une scène pour les options si nécessaire
    //});
  }
  uptade() { }

}
