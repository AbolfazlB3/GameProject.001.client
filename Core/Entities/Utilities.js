

function isInsideRect(p, rect) {
  return (
    p.x >= rect.x && p.x <= rect.x+rect.w &&
    p.y >= rect.y && p.y <= rect.y+rect.h
  );
}


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  rescale(s) {
    this.x *= s;
    this.y *= s;
  }

  normalize() {
    const {x, y} = this;
    const sz = Math.sqrt(x*x + y*y);
    if(sz == 0) {
      this.x = 0;
      this.y = 0;
    } else {
      this.x /= sz;
      this.y /= sz;
    }
  }
}

class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  rescale(s) {
    this.x *= s;
    this.y *= s;
    this.w *= s;
    this.h *= s;
  }
  
  resize(s) {
    this.w *= s;
    this.h *= s;
  }

  getMiddle() {
    return new Point(this.x+this.w/2, this.y+this.h/2);
  }

  getMiddleInt() {
    return new Point(Math.floor(this.x+this.w/2), Math.floor(this.y+this.h/2));
  }

  getPoints() {
    const {x, y, w, h} = this;
    return [
      new Point(x, y),
      new Point(x+w, y),
      new Point(x+w, y+h),
      new Point(x, y+h),
    ];
  }

  copy() {
    new Point(this.x, this.y);
  }

}


export {isInsideRect, Rect, Point}