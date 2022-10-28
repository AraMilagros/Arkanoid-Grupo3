export class ButtonRestart{
    constructor(scene){
        //Es la escena donde se agregara el button
        this.relatedScene = scene;
    }


    preload(){
    //Se carga un sprite que sera para reiniciar el button
        //es un sprite del mismo button que simula estando y no presionado
        this.relatedScene.load.spritesheet('buttonRestart',
            'img/buttonRestart.png',
            { frameWidth: 350, frameHeight: 120 }
        );
    }

    create(level){
        //Se agrega el sprite en la escena
        this.start = this.relatedScene.add.sprite(450, 450, 'buttonRestart').setInteractive().setScale(.6);

        this.start.on('pointerover', ()=>{
        //Cuando el cursor este encima del button, cambiara al siguiente frame que simula que el button fue presionado
            this.start.setFrame(1);
            // console.log("hola");
        });
        this.start.on('pointerout', ()=>{
        //Y cuando el cursor ya no este encima del button, volvera al primer frame
            this.start.setFrame(0);
            // console.log("adios");
        });

        this.start.on('pointerdown', ()=>{
            //Recien cuando se detecte un click encima del button, volvera a cargar la escena del ultimo nivel jugado.
            this.relatedScene.scene.restart(level);
            //acoto que no llegue a hacerlo.
        });
    }
}
