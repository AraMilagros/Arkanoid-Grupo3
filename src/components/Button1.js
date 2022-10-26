export class Button1 {

    constructor(scene) {
        //Es la escena donde se agregara el button
        this.relatedScene = scene;
    }


    preload() {
        //Se carga el siguiente sprite 
        //es un sprite del mismo button1 que simula estando y no presionado
        this.relatedScene.load.spritesheet('button1',
            'img/N1button.png',
            { frameWidth: 240, frameHeight: 120 }
        );

    }

    create() {
        //Se agrega el sprite en la escena
        this.start = this.relatedScene.add.sprite(450, 350, 'button1').setInteractive().setScale(.6);

        this.start.on('pointerover', () => {
            //Cuando el cursor este encima del button, cambiara al siguiente frame que simula que el button fue presionado
            this.start.setFrame(1);
        });
        this.start.on('pointerout', () => {
            //Y cuando el cursor ya no este encima del button, volvera al primer frame
            this.start.setFrame(0);       
        });

        this.start.on('pointerdown', () => {
            //Recien cuando se detecte un click encima del button, volvera a cargar la escena del juego
            this.relatedScene.scene.start('Principal');
        });
    }
}