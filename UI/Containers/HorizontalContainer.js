import Entity from "../../Core/Entity.js";



class HorizontalContainer extends Entity {
  constructor(w, h, center, gap, offset, items) {
    super(0, 0, w, h);
    
    this.items = items
    this.offset = offset
    this.gap = gap
    this.center = center

    var TS = 0
    for(const item of items)
      TS += item.dim.x
    TS += Math.max(items.length - 1, 0) * gap
    this.ts = TS;
  }

  update(upack) {
    var x = (this.center ? Math.floor(this.dim.x/2 - this.ts/2) :0)
    for(const item of this.items) {
      item.loc.x = x
      item.loc.y = this.loc.y
      x += item.dim.x + this.gap
      item.update(upack)
    }
  }

  draw(dpack) {
    for(const item of this.items)
      item.draw(dpack)
  }

}

export default HorizontalContainer;
