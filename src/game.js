import {Skeleton} from "./skeleton.js"
import {Player} from "./player.js"

var tileWidthHalf;
var tileHeightHalf;

var d = 0;

var scene;

let keyW
let keyA
let keyS
let keyD

class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.json('map', 'Assets/isometric-grass-and-water.json');
        this.load.spritesheet('tiles', 'Assets/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('skeleton', 'Assets/skeleton8.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('player', 'Assets/player.png', { frameWidth: 128, frameHeight: 128 })
        this.load.image('house', 'Assets/rem_0002.png');
    }

    create() {
        scene = this;

        this.buildMap();
        this.addPlayer();

        this.add.existing(new Player(this, 240, 290));

        this.cameras.main.setSize(1600, 600);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    buildMap() {
        //  Parse the data out of the map
        const data = scene.cache.json.get('map');

        const tilewidth = data.tilewidth;
        const tileheight = data.tileheight;

        tileWidthHalf = tilewidth / 2;
        tileHeightHalf = tileheight / 2;

        const layer = data.layers[0].data;

        const mapwidth = data.layers[0].width;
        const mapheight = data.layers[0].height;

        const centerX = mapwidth * tileWidthHalf;
        const centerY = 16;

        let i = 0;

        for (let y = 0; y < mapheight; y++) {
            for (let x = 0; x < mapwidth; x++) {
                const id = layer[i] - 1;

                const tx = (x - y) * tileWidthHalf;
                const ty = (x + y) * tileHeightHalf;

                const tile = scene.add.image(centerX + tx, centerY + ty, 'tiles', id);

                tile.depth = centerY + ty;

                i++;
            }
        }
    }

    addPlayer(){
        const player = scene.add.image(240, 370, 'player')
    }

    placeHouses() {
        const house_1 = scene.add.image(240, 370, 'house');
        house_1.depth = house_1.y + 86;

        const house_2 = scene.add.image(1300, 290, 'house');
        house_2.depth = house_2.y + 86;
    }

    update() {
        if (keyW.isDown) {
            console.log("W")
        }
        if (keyA.isDown) {
            console.log("A")
        }
        if (keyS.isDown) {
            console.log("S")
        }
        if (keyD.isDown) {
            console.log("D")
        }
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 800,
    backgroundColor: '#ababab',
    parent: 'phaser-example',
    scene: [Example]
};

const game = new Phaser.Game(config);
