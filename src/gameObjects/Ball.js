export default class Ball extends Phaser.GameObjects.Sprite{
    part = null;
    emitter = null;
    constructor(scene){
        super(scene);
        this.scenePadre = scene;
        // console.log("constructor de ball");
    }

    create(){
        //Funcion que creara y agregara particulas a ball
        this.particulas();
        //se agrega la pelota dandole fisicas, seteando su tamaño
        this.ball = this.scenePadre.physics.add.image(450, 520, 'ball').setScale(.3);
        //permite que ball rebote al colisionar con otro elemento
        this.ball.setBounce(1);
        //permite que no se salga del lienzo
        this.ball.setCollideWorldBounds(true);
        
        this.ball.setData('pegada', true);
        this.emitter.startFollow(this.ball);
    }

    particulas(){
        this.part = this.scenePadre.add.particles("particle");
        // //se configura la emision en forma de cola
        this.emitter = this.part.createEmitter({
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

    }

    directionY(){
        return this.ball.y;
    }

    returnBall(){
        return this.ball;
    }

}
