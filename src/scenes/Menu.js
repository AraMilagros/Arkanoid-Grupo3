import Phaser from "phaser";
import { Button } from '../components/Button.js';

import menuMusic from '../assets/sounds/menuMusic.mp3';
export default class Menu extends Phaser.Scene{
    musicMenu = null;
    constructor(){
       super({key : 'Menu'}); //Key para su llamado
       this.restartButton = new Button(this); //se reutiliza el boton utilizado en "gameOver" para que cumpla su cometido de ir a principal 
    }

    preload(){
        this.load.audio('menuMusic', menuMusic);
        this.load.image('Menu','img/menu.png'); //se carga la imagen
        this.restartButton.preload(); // se llama a la funcion preload que cargara la imagen del button
    }

    create(){
        this.musicMenu = this.sound.add('menuMusic');
        this.musicMenu.play({loop: true, volume: 0.5});
        this.add.image(450,200,'Menu').setScale(.3); //se agrega a la imagen y se modifica el tamaño
        this.restartButton.create();//Aqui se llama la funcion para mostrar el button en la escena
    }
}


