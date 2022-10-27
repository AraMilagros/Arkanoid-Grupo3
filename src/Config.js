import React, { useEffect, useState } from 'react';
import Principal from './scenes/Level1';
// import Winner from './scenes/Winner';
import GameOver from './scenes/GameOver';
import Menu from './scenes/Menu';
import Phaser from 'phaser';
import Winner from './scenes/Winner';
import Level3 from './scenes/Level3';
import Level2 from './scenes/Level2';
import Level1 from './scenes/Level1';

function Config() {
    const [listo, setListo] = useState(true);

    useEffect(() => {

        var config = {
            type: Phaser.AUTO,
            autoCenter:Phaser.Scale.CENTER_HORIZONTALLY,
            width: 900,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    // gravity: { y: 400 },
                    debug: false
                }
            },
            scene:[Menu, Level1,Level2,Level3,GameOver,Winner]
        };

        var game = new Phaser.Game(config);
        game.events.on("LISTO", setListo);
        return () => {
            setListo(false);
            game.destroy(true);
        }
    }, [listo]);

}    

export default Config;