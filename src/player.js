import {directions,anims} from "./config.js"

// GameObject Player
export class Player extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', 8);

        this.startX = x;
        this.startY = y;
        this.depth = y + 64;

        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    update() {
        if (this.keyW.isDown) {
            console.log("W")
            this.y--
        }
        if (this.keyA.isDown) {
            console.log("A")
            this.x--
        }
        if (this.keyS.isDown) {
            console.log("S")
            this.y++
        }
        if (this.keyD.isDown) {
            console.log("D")
            this.x++
        }
    }
}