import Phaser from "phaser";
import { Button1 } from "../components/Button1"; //para el nivel 1
import { Button2 } from "../components/Button2"; //para el nivel 2
import menuMusic from '../assets/sounds/menuMusic.mp3';
export default class Menu extends Phaser.Scene{
    musicMenu = null;
    constructor(){
       super({key : 'Menu'}); //Key para su llamado
       this.restartButton = new Button1(this); //se crea un obj de la clase Button que permitira ir a nivel 1, se pasa de parametro esta escena
       this.restartButton2 = new Button2(this); //lo mismo pero para el nivel 2
    }

    preload(){
        this.load.audio('menuMusic', menuMusic);
        this.load.image('Menu','img/menu.png'); //se carga la imagen
        this.restartButton.preload(); // se llama a la funcion preload que cargara la imagen del button1
        this.restartButton2.preload(); // se llama a la funcion preload que cargara la imagen del button2
    }

    create(){
        this.musicMenu = this.sound.add('menuMusic');
        this.musicMenu.play({loop: true, volume: 0.5});
        this.add.image(450,200,'Menu').setScale(.3); //se agrega a la imagen y se modifica el tamaño
        this.restartButton.create();//Aqui se llama la funcion para mostrar el button1 en la escena
        this.restartButton2.create();//Aqui se llama la funcion para mostrar el button2 en la escena
    }
}


