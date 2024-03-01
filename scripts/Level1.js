import audioManager from "./AudioManager.js";
import BaseScene from "./BaseScene.js";
  
export default class Level1 extends BaseScene { 
      constructor() 
      {
        super("Level1", "Level2");
        
      }
    
      create()
      {
        const level = [
          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
          [ 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
          [ 0, 1, 2, 0, 0, 0, 0, 1, 2, 0, 0,0,1,2,0,0,0,0,1,2,0,0,0,0,1,2,0,0,0,0,1,2,0,0,0,0,1,2,0,0,0,0,1,2,0,0,0,0,1,2,0,0,0,0,1,2,0,0,0 ],
          [ 0, 5, 6, 0, 7, 7, 0, 5, 6, 7, 7,0,5,6,0,7,7,0,5,6,0,7,7,0,5,6,0,7,7,0,5,6,0,7,7,0,5,6,0,7,7,0,5,6,0,7,7,0,5,6,0,7,7,0,5,6,0,7,7 ],
          [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
      ];
    
      this.building();
      const map = this.make.tilemap({ data: level, tileWidth: 64, tileHeight: 64 });
      const tiles = map.addTilesetImage('tileArt');
      const layer = map.createLayer(0, tiles, 0, 0);
      map.setCollision([ 1, 2,3,4,5,6,8,9,10]);
      this.damageTiles = map.filterTiles(tile => tile.index === 7);
      this.armorPowerUp = map.filterTiles(tile => tile.index === 12);
      
      // Store the map as property of the class
      this.map = map;
      this.layer = layer;

      this.cameras.main.setBounds(0, 0, 4000, 600);
      this.physics.world.bounds.width = 4000;
      this.physics.world.bounds.height = 600;
    
      
      // this.powerupArmor();
      this.lightPostAnimation();

      function playerGridCollision(playerSprite, tile){
        playerSprite.isInAir = false;
      }

      super.create();
      this.physics.add.collider(this.player, layer,playerGridCollision);
      this.cameras.main.startFollow(this.player);

      // let particleOptions = {
      //   frame: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      //   angle: { min: 180, max: 360 },
      //   speed: { min: 50, max: 200 },
      //   frequency: 50,
      //   gravityY: 200,
      //   scale: { start: 1, end: 1 },
      //   alpha: { start: 1, end: 0 },
      //   lifespan: { min: 500, max: 2500 },
      //   blendMode: "ADD", // lighten
      // };
      // let particles = this.add.particles(10, 550, "particles", particleOptions);
      // particles.setDepth(999);

      audioManager.switchToMusicTrack("track1");
    }

      update(){
        super.update();
        this.physics.world.overlapTiles(this.player, this.damageTiles,this.hitDamage, null, this);
        this.physics.world.overlapTiles(this.player, this.armorPowerUp,this.hitPowerUp, null, this);
        
      }

      hitDamage (player, damageTiles)
        {
            this.player.takeDamage(1);
        }

        
        hitPowerUp(player, tile) {
          this.map.removeTile(tile, 29, false); 
          this.armorPowerUp = this.map.filterTiles(tile => tile.index === 12);
      
          console.log("Hitting powerup");
      }
  }
