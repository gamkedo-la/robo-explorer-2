const platform = function platform() {
    var platforms;
    platforms = this.physics.add.staticGroup(); 
    platforms.create(800, 100 , "roadsand").setScale(1).refreshBody();
    console.log("Test if platform function is working");
}

export default platform;
