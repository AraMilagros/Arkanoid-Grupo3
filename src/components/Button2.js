export class Button2{

    constructor(scene){
        //Es la escena donde se agregara el button
        this.relatedScene = scene;
    }


    preload(){
    //Se carga el siguiente sprite
        //es un sprite del button2 que simula estando y no presionado
        this.relatedScene.load.spritesheet('button2',
            'img/N2button.png',
            { frameWidth: 242, frameHeight: 136 }
        );

    }

    create(){
        //Se agrega el sprite en la escena
        this.start = this.relatedScene.add.sprite(450, 450, 'button2').setInteractive().setScale(.6);

        this.start.on('pointerover', ()=>{
        //Cuando el cursor este encima del button, cambiara al siguiente frame que simula que el button fue presionado
            this.start.setFrame(1);
       });
        this.start.on('pointerout', ()=>{
        //Y cuando el cursor ya no este encima del button, volvera al primer frame
            this.start.setFrame(0);
       });

        this.start.on('pointerdown', ()=>{
        //Recien cuando se detecte un click encima del button, ira al nivel 2.
            this.relatedScene.scene.start('#');
        });
    }
}