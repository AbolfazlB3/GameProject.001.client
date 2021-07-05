import UIElement from "../UI/Containers/UIElement.js";
import GameLoop from "./GameLoop.js"
import Entity from "./Entity.js";
import HorizontalContainer from "../UI/Containers/HorizontalContainer.js";
import VerticalContainer from "../UI/Containers/VerticalContainer.js";
import Player from "./Entities/Player.js";
import Camera from "./Camera.js";


const GAME_POSITIONS = {
  lobby: 0,
  connecting: 1,
  ingame: 2,
};


class Core {

  W = 800
  H = 600

  constructor(vp = null) {
    this.position = GAME_POSITIONS.lobby;
    this.time = 0;

    this.pages = {
      0: {
        UI: [ new HorizontalContainer(this.W, this.H, true, 0, null, [
          new VerticalContainer(120, this.H, true, 10, null, [
            new UIElement(0, 0, 120, 30, "Connect", null, core => { core.connect() }),
            new UIElement(0, 0, 120, 30, "Play", null, core => { core.play() }),
            new UIElement(0, 0, 120, 30, "Quit", null, core => { core.quit() }),
          ]),
        ]) ],
        GameEntities: [],
      },

      1: {
        UI: [
          new UIElement(15, 15, 140, 30, "Main Menu", null, core => { core.mainmenu() }),
          new UIElement(15, 60, 140, 30, "Reset Player", null, core => { core.resetPlayer() }),
          new UIElement(15, 105, 30, 30, "+", null, core => { core.zoom(2.0) }),
          new UIElement(15, 150, 30, 30, "-", null, core => { core.zoom(0.5) }),
        ],
        GameEntities: [
          new Entity(0, 0, 800, 800),
          new Player(200, 400, "Me!"),
        ],
      },
      2: {

      },
    }

    this.gameLoop = new GameLoop(this);
    this.setViewport(vp);

    
    this.controls = { w: 0, a: 0, s: 0, d: 0, keys: {} }
    this.mouse = {
      loc: {
        x: 0,
        y: 0,
      },
      clicked: false,
    }

    this.updateMouse();
    
    this.camera = new Camera(this, 0, 0, this.W, this.H, 1);
  }

  start() {
    this.gameLoop.start();
  }

  setViewport(vp) {
    this.vp = vp;
    if(!vp) return;
    const canvas = vp.cnv;
    canvas.addEventListener("mousedown", e => { this.mouse.clicked = true; this.updateMouse(e); })
    canvas.addEventListener("mouseup", e => { this.mouse.clicked = false; this.updateMouse(e); })
    canvas.addEventListener("mousemove", e => { this.updateMouse(e); })

    document.addEventListener("keydown", e => { this.keydown(e); });
    document.addEventListener("keyup", e => { this.keyup(e); });

  }

  keydown(e) {
    this.controls.keys[e.keyCode] = 1;
    switch (e.code) {
      case "KeyW":
        this.controls.w = 1;
        break;
      case "KeyA":
        this.controls.a = 1;
        break;
      case "KeyS":
        this.controls.s = 1;
        break;
      case "KeyD":
        this.controls.d = 1;
        break;
    }
  }
  
  keyup(e) {
    this.controls.keys[e.keyCode] = null;
    switch (e.code) {
      case "KeyW":
        this.controls.w = 0;
        break;
      case "KeyA":
        this.controls.a = 0;
        break;
      case "KeyS":
        this.controls.s = 0;
        break;
      case "KeyD":
        this.controls.d = 0;
        break;
    }
  }

  updateMouse(e) {
    if(!this.vp) return;
    const scl = this.vp.scl;
    const cnvscl = this.vp.canvasScale;
    const loc = {
      x: e.offsetX * cnvscl / scl,
      y: e.offsetY * cnvscl / scl,
    }
    this.mouse.loc = loc;
  }

  tick() {
    this.time++;

    const cre = this
    const upack = {
      mouse: this.mouse,
      core: cre,
      controls: this.controls,
    };

    for(const ui of this.pages[this.position].UI)
      ui.update(upack);

    for(const ui of this.pages[this.position].GameEntities)
      ui.update(upack);

    this.camera.update(upack);
    
    this.mouse.clicked = false
  }

  render() {
    if(this.vp)
      this.vp.draw()
  }

  setFps(fps) {
    //console.log(fps);
  }


  connect() {
    ;
  }

  play() {
    this.position = 1;
  }

  quit() {
    ;
  }

  mainmenu() {
    this.position = 0;
  }

  resetPlayer() {
    this.pages[this.position].GameEntities[1].loc = {x:0, y:0}
  }

  zoom(x) {
    this.camera.z *= x;
  }

}

export default Core












