import Phaser from "phaser";
import { Button } from '../components/Button.js';
import gameOver from '../assets/sounds/gameOver.mp3';
export default class GameOver extends Phaser.Scene{
    lose = null;
    constructor(){
        //Se le da un key para facilitar su llamado
        super({key : 'GameOver'});
        //Se crea un obj de la clase Button que permitira volver a reiniciar el juego
            //se pasa de parametro esta escena que es donde se agregara el button
        this.restartButton = new Button(this);
    }

    preload(){
        this.load.audio('gameOver', gameOver);
        //Se carga una imagen de 'Game over'
        this.load.image('gameover', 'img/gameover.png');
        this.restartButton.preload();//se llama la funcion preload que cargara la imagen del button para volver a reiniciar el juego
    }

    create(){
        this.lose = this.sound.add('gameOver');
        //Aqui se llama la funcion para mostrar el button en la escena
        this.restartButton.create();
        //Se agrega la imagen de 'game over' modificando su tamaño para hacerlo mas pequeño
        this.add.image(450, 150,'gameover').setScale(.5);
        this.lose.play({volume: 0.5});
    }

}