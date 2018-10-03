import Phaser from 'phaser';

class Block extends Phaser.GameObjects.Sprite {
    constructor(scene, fieldX, fieldY, dimension, scale, texture) {
        super(scene, fieldX, fieldY, texture);

        this._tag = texture;
        this._location = { x: fieldX, y: fieldY };

        this.setPosition(fieldX * dimension, fieldY * dimension);
        this.setOrigin(0);
        this.setScale(scale);

        this._checked = false;
    }

    get tag() {
        return this._tag;
    }

    get fieldLocation() {
        return this._location;
    }

    get checked() {
        return this._checked;
    }

    set checked(val) {
        this._checked = val;
    }

    updateSelf = (tag) => {
        this._tag = tag;
        this.setTexture(tag);
    }

    toString() {
        return `${this.tag} (x: ${this.fieldLocation.x}, y: ${this.fieldLocation.y})`;
    }
}

export default Block;