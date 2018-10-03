import Phaser from 'phaser';

import elephant from '../assets/elephant.png';
import giraffe from '../assets/giraffe.png';
import hippo from '../assets/hippo.png';
import monkey from '../assets/monkey.png';
import panda from '../assets/panda.png';
import parrot from '../assets/parrot.png';
import penguin from '../assets/penguin.png';
import pig from '../assets/pig.png';
import rabbit from '../assets/rabbit.png';
import snake from '../assets/snake.png';

class Preloader extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('elephant', elephant);
        this.load.image('giraffe', giraffe);
        this.load.image('hippo', hippo);
        this.load.image('monkey', monkey);
        this.load.image('panda', panda);
        this.load.image('parrot', parrot);
        this.load.image('penguin', penguin);
        this.load.image('pig', pig);
        this.load.image('rabbit', rabbit);
        this.load.image('snake', snake);
    }

    create() {
        this.scene.start('gameScene');
    }
}

export default Preloader;