var trou_debloque = false; // LE METTRE EN TRUE QUAND LE R EST DEBLOQUE
var trouu = false;
var dash = false;
var toucheE;
var cursors;
var gameOver;
var collectitem;
var nombrelaser = 0;
var item;
var score = 0;
var invincible = false;
var laser;
var player_health = 30;
var fire;
var time;
var fireDelay = 200;
var lastFired = 0;
var player;
var scoreText
var keydash;
var collide_trou;
var enemy;
gameOver = false;
sens = 1;

class Map2Scene extends Phaser.Scene {

    constructor() {
        super({ key: 'Map2Scene' });
    }



    preload() {

        this.load.spritesheet('perso', 'assets/persozelda.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.image('tilesetzelda', 'assets/tilesetzelda.png');
        this.load.tilemapTiledJSON('dunjon', 'assets/dunjon.json');
    }



    create() {


        const carteDuNiveau2 = this.add.tilemap("dunjon");

        const tileset = carteDuNiveau2.addTilesetImage(
            "dunjon",
            "tilesetzelda"
        );

        const chemin = carteDuNiveau2.createLayer(
            "chemin",
            tileset
        );

        const vaisseau = carteDuNiveau2.createLayer(
            "vaisseau",
            tileset
        );

        const murs = carteDuNiveau2.createLayer(
            "murs",
            tileset
        );

        const teleporterZone2 = carteDuNiveau2.createLayer(
            "teleporterZone2",
            tileset
        );

        player = this.physics.add.sprite(1000, 3000, 'perso');
        teleporterZone2.setCollisionByProperty({ solide: true });
        murs.setCollisionByProperty({ solide: true });
        player.setCollideWorldBounds(false);
        this.physics.add.collider(player, murs);

        laser = this.physics.add.sprite(1600, 800, 'laser')
        laser_evil = this.physics.add.sprite(1600, 800, 'laser_evil')
      
        
     
        toucheE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keydash = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.physics.add.collider(laser, murs,);
        this.physics.add.collider(laser_evil, murs);






        // redimentionnement du monde avec les dimensions calculées via tiled
        this.physics.world.setBounds(0, 0, 91204, 91204);
        // ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, 91204, 91204);
        // ancrage de la caméra sur le joueur
        this.cameras.main.startFollow(player);
        this.cameras.main.zoom = 1.5;
//----------------------------------------------------------------------------------------------------------------
        this.engrenage = this.physics.add.group({ immovable: true, allowGravity: false });
        this.calque_engrenage = carteDuNiveau.getObjectLayer("engrenage");
        this.calque_engrenage.objects.forEach(calque_engrenage => {
            this.inutile = this.engrenage.create(calque_engrenage.x + 15, calque_engrenage.y - 16, "item");
        });



        this.champi = this.physics.add.group({ immovable: true, allowGravity: false });
        this.calque_champi = carteDuNiveau.getObjectLayer("champi");
        this.calque_champi.objects.forEach(calque_champi => {
            this.evil = this.champi.create(calque_champi.x + 15, calque_champi.y - 16, "enemy");
        });
//--------------------------------------------------------------------------------------------------------------

        // Lorsque le joueur entre dans la zone de téléportation, téléportez-le à la première carte
        this.physics.add.collider(player, teleporterZone2, () => {
            this.scene.start('Map1Scene', { x: 300, y: 300 });
        });

        this.physics.add.collider(player, vaisseau, () => {
            this.scene.start('The_end')
        });


       

        player.setCollideWorldBounds(true);

        // Configurer les touches de déplacement pour le joueur
        cursors = this.input.keyboard.createCursorKeys();

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

        
        this.anims.create({
            key: 'vie_3',
            frames: this.anims.generateFrameNumbers('boulon', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
        key: 'vie_2',
        frames: this.anims.generateFrameNumbers('boulon', { start: 1, end: 1 }),
        frameRate: 1,
        repeat: -1
        });

        this.anims.create({
        key: 'vie_1',
        frames: this.anims.generateFrameNumbers('boulon', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
        });

    //------------------------------------------------------------------------------------------------------


        this.physics.add.collider(this.champi, murs,);
        this.physics.add.collider(player, this.champi, function () {
            if (invincible == false) {
                player.setTint("#ff0000")
                invincible = true
                player_health -= 10
                setTimeout(() => {
                    player.clearTint()
                    invincible = false
                }, 1000);
            }
        }, null, this);

        // lorsque l'ennemi est tué, il laisse tomber un objet
        this.physics.add.overlap(this.lasergroup, this.champi, killchampi, null, this);
        function killchampi(player, champi) {

            champi.disableBody(true, true);

            this.lasergroup.getChildren()[nombrelaser - 1].destroy()
            nombrelaser -= 1
            canFire = false;
            item = this.engrenage.create(champi.x, champi.y, "item");
        }

        this.physics.add.overlap(player, this.engrenage, collectengrenage, null, this); // récupération de l'item engrenage 

        function collectengrenage(player, engrenage) {
            engrenage.disableBody(true, true);
            score += 1; //augmente le score de 1
            scoreText.setText('Score: ' + score); //met à jour l’affichage du score

        }

        this.physics.add.collider(this.lasergroup, murs_terra, function () {

            this.lasergroup.getChildren()[nombrelaser - 1].destroy()
            nombrelaser -= 1


        }, null, this);

    //---------------------------------------------------------------------------------------------------------------------------------


    this.physics.add.overlap(player, this.engrenage, collectengrenage, null, this); // récupération de l'item engrenage 

    function collectengrenage(player, engrenage) {
        engrenage.disableBody(true, true);
        score += 1; //augmente le score de 1
        scoreText.setText('Score: ' + score); //met à jour l’affichage du score

    }
    scoreText=this.add.text(365, 190,'score: 0',{fontSize:'32px',fill:'#000'});
    //affiche un texte à l’écran, pour le score
}

//----------------------------------------------------------------------------------------------------------------------------------


    update() {
      
        if (player_health == 30) {
            this.vie.anims.play("vie_3", true);
        }
        if (player_health == 20) {
            this.vie.anims.play("vie_2", true);
        }
        if (player_health == 10) {
            this.vie.anims.play("vie_1", true);
        }
        if (player_health == 0) {
            this.scene.start('Gameover')
        }

        if (gameOver) { return; }

        if (score == 15) {
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




        if (player_health == 0 || player_health <= 0) {
            this.physics.pause()
            this.scene.start('gameover');
        }









        // faire s'approcher l'ennemi du joueur si le joueur est à moins de 150 pixels de l'ennemi


        this.champi.getChildren().forEach(champi => {
            const distance = Phaser.Math.Distance.Between(champi.x, champi.y, player.x, player.y);
            if (distance < 150) {
                champi.setVelocity(player.x - champi.x, player.y - champi.y);
            } else {
                champi.setVelocity(0);
            }
        });


        //le joueur tire des lasers dans toutes les directions 
        var time = this.time.now;

        if (toucheE.isDown && time > lastFired && (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown)) {

            nombrelaser += 1
            if (cursors.left.isDown) {
                this.lasergroup.create(player.x, player.y, "laser").body.velocity.x = -500;

            } else if (cursors.right.isDown) {
                this.lasergroup.create(player.x, player.y, "laser").body.velocity.x = 500;

            } else if (cursors.up.isDown) {
                this.lasergroup.create(player.x, player.y, "laser").setVelocityY(-500).angle = -90;


            } else if (cursors.down.isDown) {
                this.lasergroup.create(player.x, player.y, "laser").setVelocityY(500).angle = -90;


            }

            lastFired = time + fireDelay;
        }

    }



}



