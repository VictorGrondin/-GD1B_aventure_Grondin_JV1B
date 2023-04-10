gameOver = false;
sens = 1;






class Gameover extends Phaser.Scene {

  constructor() {
    super({ key: 'Gameover' });
  }


  preload() {
    this.load.image('go', 'assets/gameover.png');
    this.load.image('restart', 'assets/restart.png');
    
  }

  create() {
    const go = this.add.image(640, 360, "go");// Ajouter l'image de l'écran d'accueil
    const restart_bt = this.add.image(640, 400, "restart").setInteractive();// Ajouter les boutons
    

     //Ajouter des événements pour les boutons
    restart_bt.on('pointerdown', () => {
      this.scene.start('Menuaccueil');
    });

  }
  update() { }

}
