import Phaser from "phaser";

export default class Principal extends Phaser.Scene{
    barra = null;
    ball = null;
    cursors = null;

    constructor(){
    //Esto servira para que en caso de perder, y se quiera volver a jugar, pueda ser llamado por su key, en este caso 'Principal'
        super({key: 'Principal'});
    }

    preload(){
        //se carga la imagen de barra
        this.load.image('barra', 'img/barra.png');
        //se carga la imagen de ball
        this.load.image('ball', 'img/ball.png');
    }

    create(){
        //Esto permite que detecte las colisiones en los limites del lienzo, menos en el limite de abajo, es decir bajo la barra
        this.physics.world.setBoundsCollision(true, true, true, false);
        //se agrega la barra dandole fsicas y seteando su tamaño y que sea inamovible, es decir que al detectar una colision no reaccione al impacto
        this.barra = this.physics.add.image(400, 550, 'barra').setScale(.3).setImmovable();
        this.barra.body.allowGravity = false;//Esto permite que no le afecte la gravedad
        this.barra.setCollideWorldBounds(true);//esto permite que no se salga del lienzo en sus laterales

        //se agrega la pelota dandole fisicas y pasandole como posicion x un random entre 0-800, posicion y 230 y seteando su tamaño
        this.ball = this.physics.add.image(Phaser.Math.Between(0, 800), 230, 'ball').setScale(.3);
        //permite que ball rebote al colisionar con otro elemento
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);//permite que no se salga del lienzo
        
        let velocity = 100 * Phaser.Math.Between(1.3,2);//esto permitira variar la direccion entre rebotes
        if(Phaser.Math.Between(0,10)>5){
            velocity = 0 -velocity;
        }
        this.ball.setVelocity(velocity, 10);//Aqui se setea la velocidad de ball, velocity es x, 10 es y
        //Detecta una colicion entre los elementos pasados como argumentos
        this.physics.add.collider(this.ball, this.barra);

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
        if(this.cursors.left.isDown){
            this.barra.setVelocityX(-300);
        //Al detectar que se presiona la tecla right, se movera la barra en x hacia la der
        }else if(this.cursors.right.isDown){
            this.barra.setVelocityX(300);
        }else{
        //En caso de que no se presione ninguna de las teclase, la barra permanecera quieta
            this.barra.setVelocityX(0);
        }
    }    

    gameOver(){
        //Se llama la siguiente escena que muestra que se perdio
        this.scene.start('GameOver');
    }
}