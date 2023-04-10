class info extends Phaser.Scene {

    constructor() {
      super({ key: 'info' });
    }
  
  
    preload() {
      this.load.image('texte', 'assets/texte');
      
      
    }
  
    create() {
      const text = this.add.image(640, 360, "texte");// Ajoute le texte 
      
      
  
       
    }
    update() { }
  
  }
  