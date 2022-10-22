import Phaser from "phaser";

export default class Principal extends Phaser.Scene{
    barra = null;
    barraLeft = null;
    ball = null;
    cursors = null;
    //bloque = null;
    /*bloqueRed = null;
    bloqueGreen = null;
    bloqueYellow = null;
    bloqueRosa = null;
    bloqueBlue = null;*/

    constructor(){
    //Esto servira para que en caso de perder, y se quiera volver a jugar, pueda ser llamado por su key, en este caso 'Principal'
        super({key: 'Principal'});
    }

    preload(){
        //se carga la imagen de barra
        this.load.image('barra', 'img/barra.png');
        //se carga la imagen de ball
        this.load.image('ball', 'img/ball.png');
        this.load.image('bloqueRojo', 'img/bloqueRojo.png');
        this.load.image('bloqueVerde', 'img/bloqueVerde.png');
        this.load.image('bloqueAmarillo', 'img/bloqueAmarillo.png');
        this.load.image('bloqueAzul', 'img/bloqueAzul.png');
        this.load.image('bloqueRosa', 'img/bloqueRosa.png');
    }

    create(){
        //Esto permite que detecte las colisiones en los limites del lienzo, menos en el limite de abajo, es decir bajo la barra
        this.physics.world.setBoundsCollision(true, true, true, false);

        /*this.bloques = this.physics.add.staticGroup();
        this.bricks = this.physics.add.staticGroup({
            key: ['bloqueRojo', 'bloqueAmarillo', 'bloqueVerde', 'bloqueAzul', 'bloqueRosa'],
            frameQuantity: 15,
            gridAlign:{
                width: 15,
                height: 5,
                cellHeight: 50,
                cellWidth: 60,
                x: 30,
                y: 50
            }
        });*/

        let bloqueDistanciaHorizontal = 30;
        let bloqueDistanciaVertical = 50;
        this.bloque = this.physics.add.staticGroup();
        for(let i=0; i<15; i++){
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical, 'bloqueRojo');
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 50, 'bloqueRosa');
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 100, 'bloqueVerde');
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 150, 'bloqueAzul');
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 200, 'bloqueAmarillo');

            bloqueDistanciaHorizontal = bloqueDistanciaHorizontal +60;
            /*this.bloque = this.physics.add.image(bloqueDistanciaHorizontal, bloqueDistanciaVertical, 'bloqueRojo').setScale(1).setImmovable();
            this.bloque.body.allowGravity = false;
            this.bloque = this.physics.add.image(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 50, 'bloqueRosa').setScale(1).setImmovable();
            this.bloque.body.allowGravity = false;
            this.bloque = this.physics.add.image(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 100, 'bloqueVerde').setScale(1).setImmovable();
            this.bloque.body.allowGravity = false;
            this.bloque = this.physics.add.image(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 150, 'bloqueAzul').setScale(1).setImmovable();
            this.bloque.body.allowGravity = false;
            this.bloque = this.physics.add.image(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 200, 'bloqueAmarillo').setScale(1).setImmovable();
            bloqueDistanciaHorizontal = bloqueDistanciaHorizontal +60;
            this.bloque.body.allowGravity = false;*/
        }
        

        //se agrega la barra dandole fsicas y seteando su tamaño y que sea inamovible, es decir que al detectar una colision no reaccione al impacto
        this.barra = this.physics.add.image(400, 550, 'barra').setScale(.15).setImmovable();
        this.barra.body.allowGravity = false;//Esto permite que no le afecte la gravedad
        //this.barra.setCollideWorldBounds(true);//esto permite que no se salga del lienzo en sus laterales

        this.barraLeft = this.physics.add.image(321, 550, 'barra').setScale(.15).setImmovable();
        this.barraLeft.body.allowGravity = false;//Esto permite que no le afecte la gravedad
        //this.barraLeft.setCollideWorldBounds(true);//esto permite que no se salga del lienzo en sus laterales

        //se agrega la pelota dandole fisicas y pasandole como posicion x un random entre 0-800, posicion y 230 y seteando su tamaño
        this.ball = this.physics.add.image(Phaser.Math.Between(0, 800), 300, 'ball').setScale(.3);
        //permite que ball rebote al colisionar con otro elemento
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);//permite que no se salga del lienzo
        
        let velocity = 100 * Phaser.Math.Between(1.3,2);//esto permitira variar la direccion entre rebotes
        if(Phaser.Math.Between(0,10)>5){
            velocity = 0 -velocity;
        }
        this.ball.setVelocity(velocity, 10);//Aqui se setea la velocidad de ball, velocity es x, 10 es y
        //Detecta una colicion entre los elementos pasados como argumentos
        this.physics.add.collider(this.ball, this.barra, this.reboteR, null, this);
        this.physics.add.collider(this.ball, this.barraLeft, this.reboteL, null, this);
        //this.physics.add.collider(this.ball, this.bloques);
        //this.physics.add.collider(this.ball, this.bricks, this.impacto, null, this);
        this.physics.add.collider(this.ball, this.bloque, this.impacto, null, this);
        //Permite detectar las teclas para poder añadirle movimiento al player
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update(){
        this.moveBarra();

        //En caso de que no se logre alcazar ball y caiga, se terminara el jeugo
        if(this.ball.y > 600){
            console.log("fin");
            this.gameOver();
        }
    }

    moveBarra(){
        //Al detectar que se presiona la tecla left, se movera la barra en x hacia la izq
        if(this.cursors.left.isDown && this.barra.x >50 ){
            this.barra.setVelocityX(-600);
            this.barraLeft.setVelocityX(-600);
        //Al detectar que se presiona la tecla right, se movera la barra en x hacia la der
        }else if(this.cursors.right.isDown && this.barraLeft.x <850 ){
            this.barra.setVelocityX(600);
            this.barraLeft.setVelocityX(600);
        }else{
        //En caso de que no se presione ninguna de las teclase, la barra permanecera quieta
            this.barra.setVelocityX(0);
            this.barraLeft.setVelocityX(0);
        }
    }    
    reboteL(){
        this.ball.setVelocity(-200,-700);
    }
    reboteR(){
        this.ball.setVelocity(200,-700);
    }
    impacto(ball, brick){
        brick.disableBody(true, true);
    }

    gameOver(){
        //Se llama la siguiente escena que muestra que se perdio
        this.scene.start('GameOver');
    }
}