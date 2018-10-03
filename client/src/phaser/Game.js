import Phaser from 'phaser';

import config from './config';
import Preloader from './scenes/Preloader';
import GameScene from './scenes/GameScene';

class Game extends Phaser.Game {
    constructor() {
        super(config);
        
        this.scene.add('preloader', Preloader);
        this.scene.add('gameScene', GameScene);
        
        this.scene.start('preloader');
    }
}

export default Game;