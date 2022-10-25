import Phaser from "phaser";
import { Button } from '../components/Button.js';
import Config from "../Config.js";

import winGame from '../assets/sounds/winGame.mp3';
export default class Winner extends Phaser.Scene{
    win = null;
    constructor(){
        super({key: 'Winner'});
        this.restartButton = new Button(this);
    }
    preload(){
        this.load.audio('winGame', winGame);
        //Se carga una imagen de 'winner'
        this.load.image('winner', 'img/winner.png');
        this.restartButton.preload();//se llama la funcion preload que cargara la imagen del button para volver a reiniciar el juego
    }
    
    create(){
        this.win = this.sound.add('winGame');
        //Se agrega la imagen de 'game over' modificando su tamaño para hacerlo mas pequeño
        this.add.image(450, 230,'winner').setScale(2.0);
        //Se llama la funcion para mostrar el button en la escena
        this.restartButton.create();
        this.win.play();
    }
}