import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,
    width: 650,
    height: 568,

    gameScene: {
        gameSize: {
            x: 568,
            y: 568
        },
        animalSize: 284,
        animalsPerDimension: 11,
        scalingFactor: 1,
        blockSize: 1,

        clickAnimalSize: {
            scale: 1,
            blockSize: 1
        }
    }
};