import Skeleton from Skeleton

var skeletons = [];

var tileWidthHalf;
var tileHeightHalf;

var d = 0;

var scene;

class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.json('map', 'assets/tests/iso/isometric-grass-and-water.json');
        this.load.spritesheet('tiles', 'assets/tests/iso/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('skeleton', 'assets/tests/iso/skeleton8.png', { frameWidth: 128, frameHeight: 128 });
        this.load.image('house', 'assets/tests/iso/rem_0002.png');
    }

    create() {
        scene = this;

        this.buildMap();
        this.placeHouses();

        skeletons.push(this.add.existing(new Skeleton(this, 240, 290, 'walk', 'southEast', 100)));
        skeletons.push(this.add.existing(new Skeleton(this, 100, 380, 'walk', 'southEast', 230)));
        skeletons.push(this.add.existing(new Skeleton(this, 620, 140, 'walk', 'south', 380)));
        skeletons.push(this.add.existing(new Skeleton(this, 460, 180, 'idle', 'south', 0)));

        skeletons.push(this.add.existing(new Skeleton(this, 760, 100, 'attack', 'southEast', 0)));
        skeletons.push(this.add.existing(new Skeleton(this, 800, 140, 'attack', 'northWest', 0)));

        skeletons.push(this.add.existing(new Skeleton(this, 750, 480, 'walk', 'east', 200)));

        skeletons.push(this.add.existing(new Skeleton(this, 1030, 300, 'die', 'west', 0)));

        skeletons.push(this.add.existing(new Skeleton(this, 1180, 340, 'attack', 'northEast', 0)));

        skeletons.push(this.add.existing(new Skeleton(this, 1180, 180, 'walk', 'southEast', 160)));

        skeletons.push(this.add.existing(new Skeleton(this, 1450, 320, 'walk', 'southWest', 320)));
        skeletons.push(this.add.existing(new Skeleton(this, 1500, 340, 'walk', 'southWest', 340)));
        skeletons.push(this.add.existing(new Skeleton(this, 1550, 360, 'walk', 'southWest', 330)));

        this.cameras.main.setSize(1600, 600);

        // this.cameras.main.scrollX = 800;
    }

    update() {
        skeletons.forEach(function (skeleton) {
            skeleton.update();
        });

        // return;

        if (d) {
            this.cameras.main.scrollX -= 0.5;

            if (this.cameras.main.scrollX <= 0) {
                d = 0;
            }
        }
        else {
            this.cameras.main.scrollX += 0.5;

            if (this.cameras.main.scrollX >= 800) {
                d = 1;
            }
        }
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

    placeHouses() {
        const house_1 = scene.add.image(240, 370, 'house');
        house_1.depth = house_1.y + 86;

        const house_2 = scene.add.image(1300, 290, 'house');
        house_2.depth = house_2.y + 86;
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#ababab',
    parent: 'phaser-example',
    scene: [Example]
};

const game = new Phaser.Game(config);
