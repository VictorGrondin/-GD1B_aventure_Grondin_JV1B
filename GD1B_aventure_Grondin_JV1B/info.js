class info extends Phaser.Scene {

    constructor() {
      super({ key: 'info' });
    }
  
  
    preload() {
      this.load.image('text', 'assets/texte.png');
      
      
    }
  
    create() {
      const text = this.add.image(640, 360, "text");// Ajoute le texte 
      text.setScale()
      
  
       
    }
    update() { }
  
  }
  