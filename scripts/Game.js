var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#4488aa',
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{y:300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);


const PlayerPositionY = 10;
const PlayerPositionX = 50;


function preload ()
{
    this.load.image('player', 'assets/Player/player.png', {frameWidth:171, frameHeight: 144});
}

function create ()
{
 
    player = this.physics.add.sprite(PlayerPositionX, PlayerPositionY, 'player');

    // player.setBounce(0.2);
    // player.setCollideWorldBounds(true);

}

function update ()
{
}