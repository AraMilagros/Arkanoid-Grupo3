import Phaser from "phaser";

export default class Principal extends Phaser.Scene{
    barra = null;
    barraLeft = null;
    ball = null;
    cursors = null;
    // particles = null;
    // emitter = null;
    scoreText= null; //se definieron las variables para el score
    score = 0; //se inicializa en 0
    
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
        //this.load.image("particle", "img/particle.png");

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
           
        //se crean los bloques
        let bloqueDistanciaHorizontal = 30;//distancia horizontal entre bloques
        let bloqueDistanciaVertical = 50;//distancia Vertical entre bloques
        this.bloque = this.physics.add.staticGroup();
        for(let i=0; i<15; i++){
            //se crea una columna con un bloque de cada color
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical, 'bloqueRojo');
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 50, 'bloqueRosa');
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 100, 'bloqueVerde');
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 150, 'bloqueAzul');
            this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 200, 'bloqueAmarillo');
            bloqueDistanciaHorizontal = bloqueDistanciaHorizontal +60;
        }
        
        /*//Otra forma de cargar los bloques
        this.bloques = this.physics.add.staticGroup();
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

        //se agrega la barra dandole fsicas y seteando su tamaño y que sea inamovible, es decir que al detectar una colision no reaccione al impacto

        this.barra = this.physics.add.image(400, 550, 'barra').setScale(.15).setImmovable();

        //this.barra = this.physics.add.image(460, 550, 'barra').setScale(.3).setImmovable();

        this.barra.body.allowGravity = false;//Esto permite que no le afecte la gravedad
        //this.barra.setCollideWorldBounds(true);//esto permite que no se salga del lienzo en sus laterales

        this.barraLeft = this.physics.add.image(321, 550, 'barra').setScale(.15).setImmovable();
        this.barraLeft.body.allowGravity = false;//Esto permite que no le afecte la gravedad
        //this.barraLeft.setCollideWorldBounds(true);//esto permite que no se salga del lienzo en sus laterales


        //se agrega la pelota dandole fisicas y pasandole como posicion x un random entre 0-800, posicion y 230 y seteando su tamaño
        this.ball = this.physics.add.image(Phaser.Math.Between(0, 800), 300, 'ball').setScale(.3);
//conflicto comentado
        //se agrega la pelota dandole fisicas ,la posicion arriba de la barra y seteando su tamaño
        //this.ball = this.physics.add.image(460, 510, 'ball').setScale(.3);
        //se agrega un estado a la pelota que permite saber si esta "pegada" a la barra al iniciar el juego
        //this.ball.setData('pegada',true);

        //permite que ball rebote al colisionar con otro elemento
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);//permite que no se salga del lienzo
        //Define que objetos pueden colisionar
        this.physics.add.collider(this.ball,this.barra,this.impactoBarra,null,this);
        

        let velocity = 100 * Phaser.Math.Between(1.3,2);//esto permitira variar la direccion entre rebotes
        if(Phaser.Math.Between(0,10)>5){
            velocity = 0 -velocity;
        }
        this.ball.setVelocity(velocity, 10);//Aqui se setea la velocidad de ball, velocity es x, 10 es y
        //Detecta una colicion entre los elementos pasados como argumentos y realiza el rebote correspondientes
        this.physics.add.collider(this.ball, this.barra, this.reboteR, null, this);
        this.physics.add.collider(this.ball, this.barraLeft, this.reboteL, null, this);
        //this.physics.add.collider(this.ball, this.bloques);
        //this.physics.add.collider(this.ball, this.bricks, this.impacto, null, this);
       //Detecta una colicion entre los elementos pasados como argumentos
        this.physics.add.collider(this.ball, this.bloque, this.impacto, null, this);//impacto tiene la colision con los bloques y tambien el score
       //Permite detectar las teclas para poder añadirle movimiento al player
        this.cursors = this.input.keyboard.createCursorKeys(); 
        this.scoreText = this.add.text(16, 8, 'score: 0', { fontSize: '28px', fill: '#FFFFFF' }); //Esto sera el score
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

        //Al detectar que se presiona la tecla left, se movera la barra en x hacia la izq, mientras no pase el límite indicado
        if(this.cursors.left.isDown && this.barra.x >50 ){
            this.barra.setVelocityX(-600);
            this.barraLeft.setVelocityX(-600);
        //Al detectar que se presiona la tecla right, se movera la barra en x hacia la der, mientras no pase el límite indicado
        }else if(this.cursors.right.isDown && this.barraLeft.x <850 ){
            this.barra.setVelocityX(600);
            this.barraLeft.setVelocityX(600);
        }else{
        //En caso de que no se presione ninguna de las teclase, la barra permanecera quieta
            this.barra.setVelocityX(0);
            this.barraLeft.setVelocityX(0);
//conflicto comentado
       /* //Al detectar que se presiona la tecla left, se movera la barra en x hacia la izq
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
            this.ball.setData('pegada',false);*/

        }
    }    
    //hace que la pelota siempre rebote hacia la izquierda
    reboteL(){
        this.ball.setVelocity(-200,-700);
    }
    //hace que la pelota siempre rebote hacia la derecha
    reboteR(){
        this.ball.setVelocity(200,-700);
    }
    //cuando la pelota impacta con un bloque hace que este desaparezca
    impacto(ball, brick){
        brick.disableBody(true, true);
        this.score += 10; //al impactar se suma de 10 en 10
        this.scoreText.setText('Score: ' + this.score); //se setea el score
        
    }

    gameOver(){
        //Se llama la siguiente escena que muestra que se perdio
        if(this.scene.start('GameOver')){ //con esto el score al perder se reinicia y se pone en 0, porque se acumulaba al perder.
            this.score = 0;
        }
    }
}