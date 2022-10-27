export default class Bloque extends Phaser.GameObjects.Sprite{
    
    scoreText = null;
    score = 0;
    emitterParticle = null;
    blockParticles = null;
    // sonido = null
    constructor(scene){
        super(scene);
        this.scenePadre = scene;
        // console.log("constructor de bloques");
    }
    create(level){
        let bloqueDistanciaHorizontal = 30;//distancia horizontal entre bloques
        let bloqueDistanciaVertical = 50;//distancia Vertical entre bloques
        this.bloque = this.scenePadre.physics.add.staticGroup();
        switch(level){
            case 1://en este caso se Crearan los Bloques para el nivel 1
                for(let i=0; i<15; i++){
                    //se crea una columna con un bloque de cada color
                    this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical, 'bloqueRojo');
                    bloqueDistanciaHorizontal = bloqueDistanciaHorizontal +60;
                }
            break;
            case 2://en este caso se crearan los bloques para el nivel 2
                for(let i=0; i<15; i++){
                    //se crea una columna con un bloque de cada color
                    this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical, 'bloqueRojo');
                    this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 50, 'bloqueRosa');
                    this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 100, 'bloqueVerde');
                    bloqueDistanciaHorizontal = bloqueDistanciaHorizontal +60;
                }
            break;
            case 3://en este caso se crearan los bloques para el nivel 3
            for(let i=0; i<15; i++){
                //se crea una columna con un bloque de cada color
                this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical, 'bloqueRojo');
                this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 50, 'bloqueRosa');
                this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 100, 'bloqueVerde');
                this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 150, 'bloqueAzul');
                this.bloque.create(bloqueDistanciaHorizontal, bloqueDistanciaVertical + 200, 'bloqueAmarillo');
                bloqueDistanciaHorizontal = bloqueDistanciaHorizontal +60;
            }
            break;
        }
        this.scenePadre.scoreText = this.scenePadre.add.text(16, 8, 'score: 0', { fontSize: '28px', fill: '#FFFFFF' }); //Esto sera el score
        
        /*//Otra forma de cargar los bloques

        //NOTA: ESTO SE COPIO TAL CUAL ESTABA EN PRINCIPAL.JS, EN CASO DE QUERER USARLO, QUIZAS SE TENGAN QUE HACER ALGUNOS CAMBIOS POR ESTAR EN UN ARCHIVO APARTE
        
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
        this.createParticles();
    }

    createParticles(){
        this.blockParticles = this.scenePadre.add.particles('particleDestruction')
        this.emitterParticle = this.blockParticles.createEmitter({
            speed: 200,
            lifespan: 200,
            blendMode: 'ADD',
            scale: { start: 0.25, end: 0 },
            on: false,
        })
    }

    detectedCollision(ball){
        //Detecta las colisiones de los bloques con ball.. y en caso de existir, se llamara una funcion 
        this.scenePadre.physics.add.collider(ball, this.bloque, this.impacto, null, this);
    }
    //cuando la pelota impacta con un bloque hace que este desaparezca
    impacto(ball, brick,){
        brick.disableBody(true, true);
        //Crea las particulas al colicionar ball con el bloque
        this.blockParticles.emitParticleAt(brick.x, brick.y, 50);
        this.score += 10; //al impactar se suma de 10 en 10
        this.scenePadre.scoreText.setText('Score: ' + this.score); //se setea el score
        //sonido al chocar con los bloques
        // Como sonido está declarado e inicalizado en Principal, se utiliza scenePadre para acceder a la variable
        this.scenePadre.sonido.play();
    }
    //este metodo devuelve la cantidad de bloques restantes para que una estructura if pueda pasar a la escena de victoria.
    countBlocks(){
        return this.bloque.countActive();
    }
}