import { SCENE_KEYS } from "./Constants.js";
import BossSelectText from "./UI/BossSelectText.js";

export default class TitleScene extends Phaser.Scene {
  wrappedYet = false;

  constructor() {
    super({ key: SCENE_KEYS.TITLE });
    if(this.wrappedYet == false) {
      this.lineWrapCredits();
      this.wrappedYet = true;
    }
  }

  creditsList = [
"Developed by -",
"Rodrigo Bonzerr Lopez: Project lead, core gameplay, game soundtrack, story, animated player sprite, tile collision, level design, cutscene illustrations, music, collision handling, enemies and obstacles (bat, killer bee, boss worm, bombs, rockets), hoverboard, clouds, environment art (van, additional buildings, drums, light posts, subway scene, bridge), parallax support and related layer authoring, chase camera, sounds (laser, explosion variations), powerups",
"Michael Monty: Better input handling, in-game UI (art and code), spike collision, pause functionality, scene debug switch, title screen, game over handling, boss selection scene, crisper image loading, framing css",
"Dan Dela Rosa: Moving platform (art and related code), level loading fix, score/health UI update, debug hitboxes, music switching, solved a few crashes",
"Randy Tan Shaoxian: Player facing sprite flip, jump updated, falling animation improvement, Linux support fix",
"Christer \"McFunkypants\" Kaitila: Particle effects for jetpack, keyboard input fix, scrolling background cloud effect",
"Cooper Willis: Broken building art",
"Jared Rigby: Jump sound, initial sound manager",
"Sergio Ferrer: Rocket and spike sprites",
"Michael Boal: Pause screen background",
" ",
"Controls: HOLD W FOR JETPACK, A/D OR ARROWS TO WALK, SPACEBAR TO FIRE"
  ];

  create() {
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.scrollY+20,
        "ROBO EXPLORER 2",
        {
          fontSize: "32px",
          fill: "#FFF",
          textAlign: "center",
        }
      )
      .setOrigin(0.5, 0);
    this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.scrollY + this.cameras.main.height-30,
        "PRESS ENTER TO PLAY",
        {
          fontSize: "16px",
          fill: "#FFF",
          textAlign: "center",
        }
      )
      .setOrigin(0.5, 0.5);

    var lineX = 40;
    var lineY = 57;
    var creditsSize = 16;
    var lineSkip = creditsSize+4;
    for(var i=0;i<this.creditsList.length;i++) {
        this.add
          .text(
            lineX,
            lineY+=lineSkip,
            this.creditsList[i],
            {
              fontSize: creditsSize+"px",
              fill: "#FFF",
              textAlign: "left",
            }
          )
    }
    

    this.keyEnter = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }

  update() {
    if (this.keyEnter.isDown) {
      this.scene.start(SCENE_KEYS.LEVEL_1);
    }
  }

  lineWrapCredits() {
    const newCut = [];
    var maxLineChar = 75;
    var findEnd;

    for(let i = 0; i < this.creditsList.length; i++) {
      const currentLine = this.creditsList[i];
      for(let j = 0; j < currentLine.length; j++) {
        /*const aChar = currentLine[j];
        if(aChar === ":") {
          if(i !== 0) {
            newCut.push("\n");
          }

          newCut.push(currentLine.substring(0, j + 1));
          newCut.push(currentLine.substring(j + 2, currentLine.length));
          break;
        } else*/ if(j === currentLine.length - 1) {
          if((i === 0) || (i >= this.creditsList.length - 2)) {
            newCut.push(currentLine);
          } else {
            newCut.push(currentLine.substring(0, currentLine.length));
          }
        }
      }
    }

    const newerCut = [];
    for(var i=0;i<newCut.length;i++) {
      while(newCut[i].length > 0) {
        findEnd = maxLineChar;
        if(newCut[i].length > maxLineChar) {
          for(var ii=findEnd;ii>0;ii--) {
            if(newCut[i].charAt(ii) == " ") {
              findEnd=ii;
              break;
            }
          }
        }
        newerCut.push(newCut[i].substring(0, findEnd));
        newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
      }
    }

    this.creditsList = newerCut;
  }

}
