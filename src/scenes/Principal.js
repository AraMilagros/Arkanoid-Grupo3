import Phaser from "phaser";
import Barra from '../gameObjects/Barra';
import Ball from '../gameObjects/Ball';
import Bloque from '../gameObjects/Bloque';

export default class Principal extends Phaser.Scene{
    barra = null;
    ball = null;
    bloque = null;
    constructor(){
    //Esto servira para que en caso de perder, y se quiera volver a jugar, pueda ser llamado por su key, en este caso 'Principal'
        super({key: 'Principal'});
    }

    preload(){
        // se carga la imagen de fondo
        this.load.image('background','img/background.png')
        //se carga la imagen de barra
        this.load.image('barra', 'img/barra.png');
        //se carga la imagen de ball
        this.load.image('ball', 'img/ball.png');

        //se carga las imagenes de cada bloque
        this.load.image('bloqueRojo', 'img/bloqueRojo.png');
        this.load.image('bloqueVerde', 'img/bloqueVerde.png');
        this.load.image('bloqueAmarillo', 'img/bloqueAmarillo.png');
        this.load.image('bloqueAzul', 'img/bloqueAzul.png');
        this.load.image('bloqueRosa', 'img/bloqueRosa.png');
        //se carga la imagen de particulas
        this.load.image("particle", "img/particle.png");
        this.load.image('particleDestruction', 'img/particleDestruction.png');
    }

    create(){
        //Se agrega una imagen para fondo
        this.add.image(450,300,'background' );
        //Esto permite que detecte las colisiones en los limites del lienzo, menos abajo
        // es decir que si la barra no alcanza la ball, éste desaparecera del lienzo
        this.physics.world.setBoundsCollision(true, true, true, false);
        
        //----creacion de ball
        this.ball = new Ball(this);//se crea una instancia de la clase Ball, pasandole de parametro esta escena
        this.ball.create();//se llama la funcion que creara el ball

        //----Creacion de las barras
        this.barra = new Barra(this);//Se instancia la clase Barra y se pasa esta escena
        this.barra.create();//funcion que creara la barra y se añadira a esta escena
        //Esto permitira que la barra pueda detectar la colision con ball
        //la cual se la pasa de parametro, mediante una funcion que retorna la ball
        this.barra.detectedCollider(this.ball.returnBall());
        
        //----Creacion de los bloques
        this.bloque = new Bloque(this);//se instancia los bloques, pasando esta escena
        this.bloque.create();//funcion para crear los bloques y ser visibles en esta escena
        //Es igual que en barra, permitira detectar la colision entre los bloques y ball
        this.bloque.detectedCollision(this.ball.returnBall());
    }

    update(){
        //Funcion de la clase Barra que permite su movimiento mediante el teclado
        //y se pasa ball para detectar el comienzo del juego. Ball comienza pegada a la barra  y recien al presionar space, el juego comenzara
        this.barra.move(this.ball.returnBall());
        //En caso de que no se logre alcazar ball y caiga, se terminara el jeugo
        if(this.ball.directionY() > 600){
            // console.log("fin");
            this.gameOver();
        }
    }

    gameOver(){
        //Se llama la siguiente escena que muestra que se perdio
        if(this.scene.start('GameOver')){ //con esto el score al perder se reinicia y se pone en 0, porque se acumulaba al perder.
            this.score = 0;
        }
    }
}