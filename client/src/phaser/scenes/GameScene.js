import Phaser from 'phaser';

import config from '../config';
import Block from '../gameObjects/Block';
import InteractiveBlock from '../gameObjects/InteractiveBlock';

class GameScene extends Phaser.Scene {
    constructor() {
        super();

        this.config = config.gameScene;
    }
    
    init() {
        this.config.scalingFactor = (this.config.gameSize.x / this.config.animalSize) / this.config.animalsPerDimension;
        this.config.blockSize = this.config.animalSize * this.config.scalingFactor;
        this.config.clickAnimalSize.scale = this.config.scalingFactor * 1.1;
        this.config.clickAnimalSize.blockSize = this.config.clickAnimalSize.scale * this.config.animalSize;

        this.playfield = [];
    }

    create() {
        this.createField();
        this.createButtons();
    }

    createField = () => {
        const cfg = this.config;
        for(let y = 0; y < cfg.animalsPerDimension; y++) {
            let row = [];

            for(let x = 0; x < cfg.animalsPerDimension; x++) {
                const animalChoice = this.getAnimal(Phaser.Math.RND.between(0, 8));
                const animal = new Block(this, x, y, cfg.blockSize, cfg.scalingFactor, animalChoice);
                this.add.existing(animal);

                row.push(animal);
            }

            this.playfield.push(row);
        }
    }

    createButtons = () => {
        for (let y = 0; y <= 8; y++) {
            const animalChoice = this.getAnimal(y);
            
            const animal = new InteractiveBlock(
                this, 
                40 + this.config.gameSize.x, 
                35 + (this.config.clickAnimalSize.blockSize + 5) * y, 
                this.config.clickAnimalSize.blockSize, 
                this.config.clickAnimalSize.scale, 
                animalChoice,
                this.makeMove
            );

            this.add.existing(animal);
        }
    }

    getAnimal = (num) => {
        switch(num) {
            case 0:
                return 'rabbit';
            case 1:
                return 'giraffe';
            case 2:
                return 'hippo';
            case 3:
                return 'monkey';
            case 4:
                return 'panda';
            case 5:
                return 'parrot';
            case 6:
                return 'penguin';
            case 7:
                return 'pig';
            // case 8:
            //     return 'elephant';
            case 8:
                return 'snake';
            default:
                throw 'undefined number';
        }
    }

    makeMove = (transformIntoTag) => {
        const field = this.playfield;
        const firstBlock = field[0][field[0].length - 1];
        firstBlock.checked = true;
        const tagsToTransform = [firstBlock];

        const neighbours = this.checkBlockAndNeighbours(firstBlock);
        neighbours.forEach(n => {
            tagsToTransform.push(n);
        });
        
        tagsToTransform.forEach(t => {
            t.updateSelf(transformIntoTag);
        });

        this.resetField();
    }

    checkBlockAndNeighbours(firstBlock) {
        const neighbours = this.getNeighboursWithTag(firstBlock);
        
        neighbours.forEach(n => {
            const deepNeighbours = this.checkBlockAndNeighbours(n);
            deepNeighbours.forEach(dn => {
                neighbours.push(dn);
            });
        });

        return neighbours;
    }

    getNeighboursWithTag = (block) => {
        const field = this.playfield;
        const neighbours = [];

        const location = block.fieldLocation;
        const tag = block.tag;
        
        //get top
        if(location.y > 0) {
            const neighbourtop = field[location.y - 1][location.x];
            if(!neighbourtop.checked) {
                neighbourtop.checked = true;
                if(neighbourtop.tag === tag) {
                    neighbours.push(neighbourtop);
                }
            }
        }

        //get bottom
        if(location.y < this.config.animalsPerDimension - 1) {
            const neighbourbottom = field[location.y + 1][location.x];
            if(!neighbourbottom.checked) {
                neighbourbottom.checked = true;
                if(neighbourbottom.tag === tag) {
                    neighbours.push(neighbourbottom);
                }
            }
        }

        //get left
        if(location.x > 0) {
            const neighbourleft = field[location.y][location.x - 1];
            if(!neighbourleft.checked) {
                neighbourleft.checked = true;
                if(neighbourleft.tag === tag) {
                    neighbours.push(neighbourleft);
                }
            }
        }

        if(location.x < this.config.animalsPerDimension -1) {
            const neighbourright = field[location.y][location.x + 1];
            if(!neighbourright.checked) {
                neighbourright.checked = true;
                if(neighbourright.tag === tag) {
                    neighbours.push(neighbourright);
                }
            }
        }

        return neighbours;
    }

    resetField = () => {
        for(let y = 0; y < this.config.animalsPerDimension; y++) {
            for(let x = 0; x < this.config.animalsPerDimension; x++) {
                this.playfield[y][x].checked = false;
            }
        }
    }
}

export default GameScene;