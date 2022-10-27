import Phaser from "phaser";
import { Button1 } from "../components/Button1"; //para el nivel 1
import { Button2 } from "../components/Button2"; //para el nivel 2
import { Button3 } from "../components/Button3"; //para el nivel 3
import menuMusic from '../assets/sounds/menuMusic.mp3';
export default class Menu extends Phaser.Scene{
    musicMenu = null;
    constructor(){
       super({key : 'Menu'}); //Key para su llamado
       this.lvl1Button = new Button1(this); //se crea un obj de la clase Button que permitira ir a nivel 1, se pasa de parametro esta escena
       this.lvl2Button2 = new Button2(this); //lo mismo pero para el nivel 2
       this.lvl3Button3 = new Button3(this); //lo mismo pero para el nivel 2
    }

    preload(){
        this.load.audio('menuMusic', menuMusic);
        this.load.image('Menu','img/menu.png'); //se carga la imagen
        this.lvl1Button.preload(); // se llama a la funcion preload que cargara la imagen del button1
        this.lvl2Button2.preload(); // se llama a la funcion preload que cargara la imagen del button2
        this.lvl3Button3.preload();
    }

    create(){
        this.sound.stopAll(); //Detiene todo sonido que haya para que no se sobrepongan entre ellos
        this.musicMenu = this.sound.add('menuMusic');
        this.musicMenu.play({loop: true, volume: 0.5});
        //*** Este codigo solucionaba el warning del audio, pero con el boton "Iniciar Juego" ya no hace faltat/
        // if (!this.sound.locked) {
        //     this.musicMenu.play({loop: true, volume: 0.4})
        // }
        // else {
        //     this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        //         this.musicMenu.play({loop: true, volume: 0.5})
        //     })
        // }
        this.add.image(450,150,'Menu').setScale(.3); //se agrega a la imagen y se modifica el tamaño
        this.lvl1Button.create();//Aqui se llama la funcion para mostrar el button1 en la escena
        this.lvl2Button2.create();//Aqui se llama la funcion para mostrar el button2 en la escena
        this.lvl3Button3.create();//Aqui se llama la funcion para mostrar el button3 en la escena
    }
}


