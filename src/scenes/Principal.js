import Phaser from "phaser";

export default class Principal extends Phaser.Scene{
    barra = null;
    ball = null;
    cursors = null;
    // particles = null;
    // emitter = null;

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
        //se carga la imagen de particulas
        this.load.image("particle", "img/particle.png");
    }

    create(){
        this.add.image(450,300,'background' );
        // se crea el sistema de particulas usando la imagen particle. Se crea antes para que esté detras de la pelota
        var particles = this.add.particles("particle");
        //se configura la emision en forma de cola
        this.emitter = particles.createEmitter({
            // la particula no se mueve
            speed: 0, 
            // escala: del 0.25 a 0.
            scale: {
                start: 0.25,
                end: 0
            },
            // opacidad: de opaco a transparente
            alpha: {
                start: 1,
                end: 0
            },
            // frecuencia: una particula cada 100 milisegundos
            frequency: 100,
            // tiempo de vida: 1 segundo
            lifespan: 500
        });

        //Esto permite que detecte las colisiones en los limites del lienzo, menos en el limite de abajo, es decir bajo la barra
        this.physics.world.setBoundsCollision(true, true, true, false);
        //se agrega la barra dandole fsicas y seteando su tamaño y que sea inamovible, es decir que al detectar una colision no reaccione al impacto
        this.barra = this.physics.add.image(460, 550, 'barra').setScale(.3).setImmovable();
        this.barra.body.allowGravity = false;//Esto permite que no le afecte la gravedad
        this.barra.setCollideWorldBounds(true);//esto permite que no se salga del lienzo en sus laterales

        //se agrega la pelota dandole fisicas ,la posicion arriba de la barra y seteando su tamaño
        this.ball = this.physics.add.image(460, 510, 'ball').setScale(.3);
        //se agrega un estado a la pelota que permite saber si esta "pegada" a la barra al iniciar el juego
        this.ball.setData('pegada',true);
        //permite que ball rebote al colisionar con otro elemento
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);//permite que no se salga del lienzo
        //Define que objetos pueden colisionar
        this.physics.add.collider(this.ball,this.barra,this.impactoBarra,null,this);
        
        //Detecta una colicion entre los elementos pasados como argumentos
        this.physics.add.collider(this.ball, this.barra);

        //Permite detectar las teclas para poder añadirle movimiento al player
        this.cursors = this.input.keyboard.createCursorKeys();

        
        // hace que siga a la pelota
        this.emitter.startFollow(this.ball);
    }

    // funcion donde interacturan la barra y la pelota
    impactoBarra(ball,barra){
        //variable que sirve para saber si la pelota toca el lado izq o der de la barra
        let impactoRelativo=ball.x-barra.x;
        // se verifica que la posicion relativa no se mayor a 60 ni menor a -60 para que la pelota no tome mucha velocidad
        if(impactoRelativo>60){
            impactoRelativo=60;
        }
        if(impactoRelativo<-60){
            impactoRelativo=-60;
        }
        ball.setVelocityX(8*impactoRelativo);
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
            if(this.ball.getData('pegada')){
                this.ball.setVelocityX(-300);
            }
        //Al detectar que se presiona la tecla right, se movera la barra en x hacia la der
        }else if(this.cursors.right.isDown){
            this.barra.setVelocityX(300);
            if(this.ball.getData('pegada')){
                this.ball.setVelocityX(300);
            }
        }else{
        //En caso de que no se presione ninguna de las teclase, la barra permanecera quieta
            this.barra.setVelocityX(0);
            if(this.ball.getData('pegada')){
                this.ball.setVelocityX(0);
            }
        }
        //Si se presiona la barra espaciadora o la tecla para arriba la pelota se lanza hacia arriba
        if(this.cursors.space.isDown || this.cursors.up.isDown ){
            if(this.ball.getData('pegada')){
                this.ball.setVelocity(Phaser.Math.Between(-80,80),-300);
            }
            this.ball.setData('pegada',false);
        }
    }    

    gameOver(){
        //Se llama la siguiente escena que muestra que se perdio
        this.scene.start('GameOver');
    }
}