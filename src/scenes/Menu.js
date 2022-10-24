import Phaser from "phaser";
import { Button } from '../components/Button.js';
export default class Menu extends Phaser.Scene{
    constructor(){
       super({key : 'Menu'}); //Key para su llamado
       this.restartButton = new Button(this); //se reutiliza el boton utilizado en "gameOver" para que cumpla su cometido de ir a principal 
    }

    preload(){
        this.load.image('Menu','img/menu.png'); //se carga la imagen
        this.restartButton.preload(); // se llama a la funcion preload que cargara la imagen del button
    }

    create(){
        this.add.image(450,200,'Menu').setScale(.3); //se agrega a la imagen y se modifica el tamaño
        this.restartButton.create();//Aqui se llama la funcion para mostrar el button en la escena             
    }
}


