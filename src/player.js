import {directions,anims} from "./config.js"
var offset = 16

// GameObject Player
export class Player extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 8);

        this.startX = x;
        this.startY = y;
        this.depth = y + 64;
    }

    update() {

    }
}