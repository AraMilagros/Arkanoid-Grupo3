import Phaser from "phaser";
import { ButtonRestart } from '../components/ButtonRestart.js';
import { ButtonMenu } from "../components/ButtonMenu.js";
import gameOver from '../assets/sounds/gameOver.mp3';
export default class GameOver extends Phaser.Scene{
    lose = null;
    nivelGuardado = 0;
    constructor(){
        //Se le da un key para facilitar su llamado
        super({key : 'GameOver'});
        //Se crea un obj de la clase Button que permitira volver a reiniciar el juego
            //se pasa de parametro esta escena que es donde se agregara el button
        this.restartButton = new ButtonRestart(this);
        this.ButtonMenu = new ButtonMenu(this);
        
    }
    preload(){
        this.load.audio('gameOver', gameOver);
        //Se carga una imagen de 'Game over'
        this.load.image('gameover', 'img/gameover.png');
        this.restartButton.preload();//se llama la funcion preload que cargara la imagen del button para volver a reiniciar el juego
        this.ButtonMenu.preload();
    }

    create(){
        this.lose = this.sound.add('gameOver');
        //Aqui se llama la funcion para mostrar el button en la escena
        this.restartButton.create(this.getLevel());
        this.ButtonMenu.create()
        //Se agrega la imagen de 'game over' modificando su tamaño para hacerlo mas pequeño
        this.add.image(450, 150,'gameover').setScale(.5);
        this.lose.play({volume: 0.5});
    }
    //Este metodo accede a una variable que compara y retorna en el caso de cada nivel.
    getLevel(){
        if(this.nivelGuardado ==1){
            return 'Level1';
        }else if(this.nivelGuardado==2){
            return 'Level2';
        }else if(this.nivelGuardado==3){
            return 'Level3';
        } 
    }
}