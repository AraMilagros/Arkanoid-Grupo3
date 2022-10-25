import React, { useEffect, useState } from 'react';
import Principal from './scenes/Principal';
// import Winner from './scenes/Winner';
import GameOver from './scenes/GameOver';
import Menu from './scenes/Menu';
import Phaser from 'phaser';
import Winner from './scenes/Winner';

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
            scene:[Menu, Principal,GameOver,Winner]
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