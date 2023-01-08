import {directions,anims} from "./config.js"

const offset = 8
const up = offset + 0
const left = offset + 6
const down = offset + 4
const right = offset + 2

// GameObject Player
export class Player extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'player', offset);

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
            this.frame = this.texture.get(up)
            console.log("W")
            this.y--
        }
        if (this.keyA.isDown) {
            this.frame = this.texture.get(left)
            console.log("A")
            this.x--
        }
        if (this.keyS.isDown) {
            this.frame = this.texture.get(down)
            console.log("S")
            this.y++
        }
        if (this.keyD.isDown) {
            this.frame = this.texture.get(right)
            console.log("D")
            this.x++
        }
    }
}