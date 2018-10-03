import Phaser from 'phaser';

import Block from './Block';

class InteractiveBlock extends Block {
    constructor(scene, posx, posy, dimension, scale, texture, callback) {
        super(scene, posx, posy, dimension, scale, texture);

        this.setPosition(posx, posy);
        this.setOrigin(.5);

        this._initialScale = scale;
        this._zoomedScale = scale * 1.5;

        this.setInteractive( { useHandCursor: true });
        this.on('pointerdown', () => {
            callback(this.tag);
        });

        this.on('pointerover', () => {
            this.setScale(this._zoomedScale);
            this.setDepth(99);
        });

        this.on('pointerout', () => {
            this.setScale(this._initialScale);
            this.setDepth(0);
        });
    }
}

export default InteractiveBlock;