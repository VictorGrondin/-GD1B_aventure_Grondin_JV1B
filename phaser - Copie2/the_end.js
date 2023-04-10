
class theend extends Phaser.Scene {

    constructor() {
      super({ key: 'theend' });
    }
  
  
    preload() {
      this.load.image('end', 'assets/theend.png');
      
      
    }
  
    create() {
      const end = this.add.image(640, 360, "end");// Ajouter l'image de l'écran d'accueil
      
      
  
       
    }
    update() { }
  
  }
  