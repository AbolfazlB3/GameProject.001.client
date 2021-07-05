  import Entity from "../../Core/Entity.js";



class VerticalContainer extends Entity {
  constructor(w, h, center, gap, offset, items) {
    super(0, 0, w, h);
    
    this.items = items
    this.offset = offset
    this.gap = gap
    this.center = center

    var TS = 0
    for(const item of items)
      TS += item.dim.y
    TS += Math.max(items.length - 1, 0) * gap
    this.ts = TS;
  }

  update(upack) {
    var y = (this.center ? Math.floor(this.dim.y/2 - this.ts/2) :0)
    for(const item of this.items) {
      item.loc.y = y
      item.loc.x = this.loc.x
      y += item.dim.y + this.gap
      item.update(upack)
    }
  }

  draw(dpack) {
    for(const item of this.items)
      item.draw(dpack)
  }

}

export default VerticalContainer;
