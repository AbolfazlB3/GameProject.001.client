import Entity from "../Entity.js";
import { Point } from "./Utilities.js";


class Player extends Entity{

  static SPEED = 12;

  constructor(x, y, name = "Name") {
    super(x, y, 50, 50);
    this.name = name
  }

  update(upack) {
    if(!upack.controls) return;
    const mx = upack.controls.d - upack.controls.a;
    const my = upack.controls.s - upack.controls.w;
    const p = new Point(mx, my);
    p.normalize();
    
    const p1 = new Point(1, -1); p1.normalize(); p1.rescale(p.x);
    const p2 = new Point(1,  1); p2.normalize(); p2.rescale(p.y);
    this.loc.x += (p1.x + p2.x) * Player.SPEED;
    this.loc.y += (p1.y + p2.y) * Player.SPEED;

    /*
    if(!upack.controls) return;
    const {keys} = upack.controls;
    const mx = (keys[39] ? 1:0) - (keys[37] ? 1:0);
    const my = (keys[40] ? 1:0) - (keys[38] ? 1:0);
    const p = new Point(mx, my);
    p.normalize();
    const p1 = new Point(1, -1); p1.normalize(); p1.rescale(p.x);
    const p2 = new Point(1,  1); p2.normalize(); p2.rescale(p.y);
    this.x += (p1.x + p2.x) * Camera.SPEED / this.z;
    this.y += (p1.y + p2.y) * Camera.SPEED / this.z;
    console.log(this.x, this.y)*/
  }

  draw(dpack) {
    const ctx = dpack.ctx
    const s = dpack.scl
    const cam = dpack.camera;

    const rect = this.getRect();
    rect.rescale(cam.z);
    const fontsize = 10;

    const p = cam.getEntityLocOnCamera(this.loc);
    const r = this.dim.x/2;
    
    /*
    ctx.beginPath();
    ctx.fillStyle = "#595564";
    ctx.arc(p.x*s, p.y*s, r*s, 0, 2*Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    */
    
    ctx.beginPath();
    ctx.fillStyle = "#393544";
    ctx.ellipse(p.x*s, p.y*s, r*s * cam.z, r/2*s * cam.z, 0, 2*Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = "#494554";
    ctx.ellipse(p.x*s, (p.y - (5) * cam.z )*s, r*s * cam.z, r/2*s * cam.z, 0, 2*Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = `#F8F8F8`;
    ctx.font = `${Math.floor(fontsize * s * cam.z)}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.name, p.x*s, (p.y - (this.dim.y/2 + 8) * cam.z )*s);
    ctx.closePath();
    ctx.fill();
  }

}

export default Player;