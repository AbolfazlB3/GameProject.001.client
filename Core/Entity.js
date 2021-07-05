import {isInsideRect, Rect, Point} from "./Entities/Utilities.js"

class Entity {

  constructor(_x, _y, _w, _h) {
    this.loc = {
      x: _x,
      y: _y,
    }
    this.dim = {
      x: _w,
      y: _h,
    }
  }

  getRect() {
    return new Rect(
      this.loc.x,
      this.loc.y,
      this.dim.x,
      this.dim.y
    );
  }

  isInside(p) {
    return isInsideRect(p, this.getRect());
  }

  update(upack) {
    ;
  }

  draw(dpack) {

    const ctx = dpack.ctx
    const s = dpack.scl
    const cam = dpack.camera;

    const rect = this.getRect();

    const ps = rect.getPoints();
    const p = [];
    for(const pi of ps)
      p.push(cam.getEntityLocOnCamera(pi));
    
    ctx.beginPath();
    ctx.fillStyle = "#545064";
    ctx.moveTo(p[0].x * s, p[0].y * s);
    ctx.lineTo(p[1].x * s, p[1].y * s);
    ctx.lineTo(p[2].x * s, p[2].y * s);
    ctx.lineTo(p[3].x * s, p[3].y * s);
    ctx.lineTo(p[0].x * s, p[0].y * s);
    ctx.closePath();
    ctx.fill();
    


  }

}

export default Entity;