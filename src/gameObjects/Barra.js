import Phaser from "phaser";

export default class Barra extends Phaser.GameObjects.Sprite{
    barraIzq = null;
    constructor(scene){
        super(scene);
        this.scenePadre = scene;
        // console.log("constructor de barra");
    }

    create(){
        //Se agrega la barra dandole fisicas, seteando su tamaño y que sea inamovible
        this.barraIzq = this.scenePadre.physics.add.image(450, 550, 'barra').setScale(.3).setImmovable();
        // this.barraIzq.body.allowGravity =false;
    }

    detectedCollider(ball){
        //Detecta las colisiones con ball, y tiene una funcion que definira el comportamiento cuando exista una colision
        this.scenePadre.physics.add.collider(ball, this.barraIzq, this.impactoBarra, null, this);
    }

    impactoBarra(ball){
        if(!ball.getData('pegada')) this.scenePadre.impactoBar.play();
        //variable que sirve para saber si la pelota toca el lado izq o der de la barra
        let impacto = ball.x-this.barraIzq.x;
        // se verifica que la posicion relativa no se mayor a 60 ni menor a -60 para que la pelota no tome mucha velocidad
        if(impacto > 60){
            impacto = 60;
        }
        if(impacto < -60){
            impacto = -60;
        }
        ball.setVelocityX(8*impacto);
    }

    move(ball){
        this.cursors = this.scenePadre.input.keyboard.createCursorKeys(); 
        //Al detectar que se presiona la tecla left, se movera la barra en x hacia la izq, mientras no pase el límite indicado
        if(this.cursors.left.isDown && this.barraIzq.x > 90 ){
            this.barraIzq.setVelocityX(-600);
            if(ball.getData('pegada')){
                ball.setVelocityX(-600);
            }
        //Al detectar que se presiona la tecla right, se movera la barra en x hacia la der, mientras no pase el límite indicado
        }else if(this.cursors.right.isDown && this.barraIzq.x < 810 ){
            this.barraIzq.setVelocityX(600);
            if(ball.getData('pegada')){
                ball.setVelocityX(600);
            }
        }else{
        //En caso de que no se presione ninguna de las teclase, la barra permanecera quieta
            this.barraIzq.setVelocityX(0);
            if(ball.getData('pegada')){
                ball.setVelocityX(0);
            }
        }

        if(this.cursors.space.isDown || this.cursors.up.isDown && ball.getData('pegada') ){
            //se lanza la pelota hacia arriba
            ball.setVelocity(Phaser.Math.Between(-80,80),-450);
            ball.setData('pegada',false);
            // console.log("entro por barra para ball");
        }



    }
}