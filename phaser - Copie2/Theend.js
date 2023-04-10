
class The_end extends Phaser.Scene {

    constructor() {
      super({ key: 'The_end' });
    }
  
  
    preload() {
      this.load.image('end', 'assets/the_end.png');
      
      
    }
  
    create() {
      const end = this.add.image(640, 360, "end");// Ajouter l'image de l'écran d'accueil
      
      
  
       
    }
    update() { }
  
  }
  