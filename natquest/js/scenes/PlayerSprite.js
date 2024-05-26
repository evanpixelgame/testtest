export class PlayerSprite extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture) {
        super(scene.matter.world, x, y, texture); //if i add velocity change back, add it to the super too

        scene.add.existing(this);
        //  this.velocityChange = velocityChange;
        this.init();
    }

    init() {
      
        const playerWidth = this.width;
        const playerHeight = this.height;
        // Set up the player's physics body
        this.setBody({
            type: 'rectangle',
            width: playerWidth / 2,
            height: playerHeight / 2,
            isStatic: false,
            restitution: 0,
            friction: 0.1,
            frictionAir: 0.02,
        });

        // Set the player's scale and size
        const scaledWidth = playerWidth * 0.5;
        const scaledHeight = playerHeight * 0.5;
        this.setSize(scaledWidth, scaledHeight);
        // this.body.setVelocity(velocityX, velocityY);
        console.log(this.body);
        console.log(this.world);
        console.log('Player Body Worldfromplaysprite:', this.body.world);
        this.setScale(0.5);
    }
}
