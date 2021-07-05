import Entity from "../../Core/Entity.js";
import { roundRect } from "../GUIUtilities.js"


class UIElement extends Entity {

  constructor(_x, _y, _w, _h, _text, _style = null, _func = null, offset = {x: 0, y: 0}) {
    super(_x, _y, _w, _h);
    this.text = _text;
    this.style = _style;
    this.func = _func;
    this.hover = false;
  }

  update(upack) {
    super.update(upack);
    const m = upack.mouse;
    this.hover = super.isInside(m.loc);
    if(m.clicked && this.hover && this.func != null)
      this.func(upack.core);
  }

  draw(dpack) {
    const ctx = dpack.ctx
    const s = dpack.scl

    const rect = this.getRect();
    const mid = rect.getMiddle();
    const fontsize = 15;

    ctx.fillStyle = (this.hover ? "#221D2F":"#393544");
    roundRect(ctx, this.loc.x*s, this.loc.y*s, this.dim.x*s, this.dim.y*s, 5*s, true, false);
    
    ctx.beginPath();
    ctx.fillStyle = `#F5F3F7`;
    ctx.font = `${Math.floor(fontsize * s)}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, mid.x*s, mid.y*s);
    ctx.closePath();
    ctx.fill();
  }

}

export default UIElement;