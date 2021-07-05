import { UX, UY } from "../UI/GUIUtilities.js";
import { Point } from "./Entities/Utilities.js";


class Camera {

  static SPEED = 8;
  
  constructor(core, x=0, y=0, w=800, h=450, z=1) {
    this.core = core;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.z = z;
  }

  lookAt(point) {
    this.x = point.x;
    this.y = point.y;
  }

  getEntityLocOnCamera(point) {
    const dx = point.x - this.x, dy = point.y - this.y;
    const x = this.z * ( dx * UX.x + dy * UY.x) + this.w / 2;
    const y = this.z * ( dx * UX.y + dy * UY.y) + this.h / 2;
    return new Point(x, y);
  }

  update(upack) {
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
    console.log(this.x, this.y)
  }
}

export default Camera;