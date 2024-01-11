// fx.js = particle effects

// example: 
// fx.explosion(100,100);

// a singleton shared by many classes such as game and player
let fx = {

    init:function(scn) {
        console.log("fx.init");
        this.scene = scn;
        this.ps_smoke = this.scene.add.particles(0,0,"particles",
        {
            frame: [0],
            angle: { min: 270-30, max: 270+30 }, // mostly down
            speed: { min: 50, max: 200 },
            frequency: -1, // -1 means don't start yet
            gravityY: 600,
            scale: { start: 0.5, end: 2 },
            alpha: { start: 1, end: 0 },
            lifespan: { min: 250, max: 500 },
            blendMode: "ADD",
        });
        this.ps_smoke.setDepth(0)
    },
    smoke:function(x,y,scn) {
        console.log("fx.smoke at "+x.toFixed(1)+","+y.toFixed(1));
        if (!this.scene) this.init(scn);
        this.ps_smoke.emitParticleAt(x-20,y+12); // offset for backpack location FIXME
    },
};

export default fx;