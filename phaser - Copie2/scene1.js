var trou_debloque = false; // LE METTRE EN TRUE QUAND LE R EST DEBLOQUE
var trouu = false;
var dash = false;
var toucheE;
var cursors;
var gameOver;
var collectitem;
var item;
var score = 0;
var laser;
var fire;
var tirelaser_evil = true;
var fireDelay = 200;
var lastFired = 0;
var player;
var laser_evil;
var keydash;
var collide_trou;
var enemy;
gameOver = false;
sens = 1;


class Map1Scene extends Phaser.Scene {

    constructor() {
        super({ key: 'Map1Scene' });
    }

    preload() {
        this.load.spritesheet('perso', 'assets/persozelda2.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.image('laser', 'assets/laser.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('item', 'assets/item.png');
        this.load.image('laser_evil', 'assets/laser_evil.png');
        this.load.image('tilesetzelda', 'assets/tilesetzelda.png');
        this.load.tilemapTiledJSON("carte", "assets/mapzelda.json");
        

    }



    create() {


        const carteDuNiveau = this.add.tilemap("carte");

        const tileset = carteDuNiveau.addTilesetImage(
            "tilesetzelda",
            "tilesetzelda"
        );

        const teleporterZone1 = carteDuNiveau.createLayer(
            "teleporterZone1",
            tileset
        );
        const marche = carteDuNiveau.createLayer(
            "marche",
            tileset
        );

        const trou = carteDuNiveau.createLayer(
            "trou",
            tileset
        );


        const murs_terra = carteDuNiveau.createLayer(
            "murs_terra",
            tileset
        );


        const murs_déco = carteDuNiveau.createLayer(
            "murs_déco",
            tileset
        );
        player = this.physics.add.sprite(2800, 2200, 'perso');
        const tunel = carteDuNiveau.createLayer(
            "tunel",
            tileset
        );


        murs_déco.setCollisionByProperty({ solide: true });
        murs_terra.setCollisionByProperty({ solide: true });
        trou.setCollisionByProperty({ solide: true });
        teleporterZone1.setCollisionByProperty({ solide: true });
        player.setCollideWorldBounds(false);

        laser = this.physics.add.sprite(1600, 800, 'laser')
        laser_evil = this.physics.add.sprite(1600, 800, 'laser_evil')
      
        
     
        toucheE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keydash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.physics.add.collider(laser, murs_terra,);
        this.physics.add.collider(laser_evil, murs_terra);
        this.physics.add.collider(player, murs_déco);
        this.physics.add.collider(player, murs_terra);


        collide_trou = this.physics.add.collider(player, trou, Contacte_trou);
        function Contacte_trou() {
            trouu = true
        }

        // redimentionnement du monde avec les dimensions calculées via tiled
        this.physics.world.setBounds(0, 0, 91204, 91204);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 91204, 91204);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(player);
        this.cameras.main.zoom = 1.5;

        this.engrenage= this.physics.add.group({immovable : true ,allowGravity : false});

        this.calque_engrenage = carteDuNiveau.getObjectLayer("engrenage");
        this.calque_engrenage.objects.forEach(calque_engrenage => {
            this.inutile = this.engrenage.create(calque_engrenage.x+15,calque_engrenage.y-16,"item"); 
        });

        // Lorsque le joueur entre dans la zone de téléportation, téléportez-le à la première carte
        this.physics.add.collider(player, teleporterZone1, () => {
            this.scene.start('Map2Scene', { x: 2100, y: 1100 });
        });


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('perso', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'perso', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('perso', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('perso', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('perso', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });


        cursors = this.input.keyboard.createCursorKeys();



        enemy = this.physics.add.sprite(2600, 1200, 'enemy');
        this.physics.add.collider(enemy, murs_terra,);



        this.physics.add.collider(player, laser_evil, function () {
            player.setTint(0xff0000);
            setTimeout(() => {
                player.clearTint()
            }, 500);
            player.health -= 10;
        }, null, this);

        // lorsque l'ennemi est tué, il laisse tomber un objet
        this.physics.add.collider(laser, enemy, function () {
            enemy.disableBody(true, true);
            laser_evil.setVelocityX(0);
            laser_evil.setVelocityY(0);
            canFire = false;
            item = this.engrenage.create(enemy.x , enemy.y,"item");
        }, null, this);

       



        
        this.physics.add.overlap(player, this.engrenage, collectengrenage, null, this);// récupération de l'item engrenage 
        

        function collectengrenage(player, engrenage) {
            engrenage.disableBody(true, true); // 
            score += 1; //augmente le score de 1
          
        }
    }





update() {
    if (gameOver) { return; }

    if (score == 1) {
        trou_debloque = true
    }
    if (trou_debloque == true) {
        if (trouu == true) {
            if (keydash.isDown) {
                dash = true;
                collide_trou.active = false;
                setTimeout(() => {
                    collide_trou.active = true;
                    dash = false
                }, 500);
            }
        }
    }
    if (cursors.left.isDown) { //si la touche gauche est appuyée
        player.setVelocityX(-160); //alors vitesse négative en X 
        player.anims.play('left', true); //et animation => gauche
        if (dash == true) {
            player.setVelocityX(-300)
        }
    }
    else if (cursors.right.isDown) { //sinon si la touche droite est appuyée
        player.setVelocityX(160); //alors vitesse positive en X
        player.anims.play('right', true); //et animation => droite
        if (dash == true) {
            player.setVelocityX(300)
        }


    }
    else if (cursors.down.isDown) {
        player.setVelocityY(160);
        player.anims.play('down', true); //et animation => descend
        if (dash == true) {
            player.setVelocityY(300)
        }


    }
    else if (cursors.up.isDown) {
        player.setVelocityY(-160);
        player.anims.play('up', true); //et animation => haut
        if (dash == true) {
            player.setVelocityY(-300)
        }


    }
    else { // sinon
        player.setVelocityX(0); //vitesse nulle
        player.setVelocityY(0)
        player.anims.play('turn'); //animation fait face caméra
    }



   
  









    // faire s'approcher l'ennemi du joueur si le joueur est à moins de 150 pixels de l'ennemi


    if (Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y) < 150) {

        var angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
        enemy.setVelocityX(Math.cos(angle) * 150);
        enemy.setVelocityY(Math.sin(angle) * 150);


        if (canFire) {
            laser_evil.setVisible(true);
            laser_evil.x = enemy.x;
            laser_evil.y = enemy.y;
            laser_evil.rotation = angle;
            laser_evil.setVelocityX(Math.cos(angle) * 200);
            laser_evil.setVelocityY(Math.sin(angle) * 200);
            tirelaser_evil = false;
            this.time.delayedCall(3000, function () { tirelaser_evil = true; }, [], this);
        }
    } else {

        enemy.setVelocityX(0);
        enemy.setVelocityY(0);
        laser_evil.setVelocityX(0);
        laser_evil.setVelocityY(0);
        laser_evil.setVisible(false);

    }
    var time = this.time.now;

    if (toucheE.isDown && time > lastFired && ( cursors.left.isdown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown )) {
        laser.x = player.x;
        laser.y = player.y;
        laser.setActive(true);
        laser.setVisible(true);
    
        if (cursors.left.isDown) {
          laser.body.velocity.x = -500;
          laser.angle = 180;
        } else if (cursors.right.isDown) {
          laser.body.velocity.x = 500;
          laser.angle = 0;
        } else if (cursors.up.isDown) {
          laser.body.velocity.y = -500;
          laser.angle = -90;
        } else if (cursors.down.isDown) {
          laser.body.velocity.y = 500;
          laser.angle = 90;
        }
    
        lastFired = time + fireDelay;
      }
    }
}



