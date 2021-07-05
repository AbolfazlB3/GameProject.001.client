import { resources } from "./GUIUtilities.js";


var bx = 0 , by = 0 ;

class Viewport {

  constructor(canvas, canvasScale, core) {
    this.core = core
    this.cnv = canvas;
    //this.tmpcnv = this.cnv.cloneNode(false)
    this.ctx = this.cnv.getContext("2d");
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
    this.scl = 10
    this.canvasScale = canvasScale
    this.resizeCanvas()
  }

  resizeCanvas() {
    this.W = this.cnv.width = window.innerWidth * this.canvasScale;
    this.H = this.cnv.height = window.innerHeight * this.canvasScale;
    this.scl = Math.min(
      this.W/this.core.W,
      this.H/this.core.H
    )
  }
  
  draw() {
    const ctx = this.ctx;
    const s = this.scl
    const {W, H} = this
    //ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, W, H);

    const dpack = {
      core: this.core,
      camera: this.core.camera,
      ctx,
      scl: s
    };
      
    for(const ui of this.core.pages[this.core.position].GameEntities)
      ui.draw(dpack);

    for(const ui of this.core.pages[this.core.position].UI)
      ui.draw(dpack);
  
    
    const m = this.core.mouse.loc
    if(m) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,0,0,1)`;
      ctx.arc(m.x*s, m.y*s, 2*s, 0, 2*Math.PI, 0);
      ctx.fill();
    }

    const blt = resources.images["bullet"]
    
    if(blt.ready >= blt.states.length) {
      const img = blt.img[0];
      ctx.drawImage(img, bx, by, img.width/4, img.height/4);
      const k = 10.0;
      bx -= k * 2;
      by -= k * 1;
      if(bx < 0) bx += W
      if(by < 0) by += H
    }
    /*
    this.drawVerticalLine(this.core.W/2.0 *s , ctx);
    this.drawVerticalLine(this.core.W  *s, ctx);
    this.drawHorizontalLine(this.core.H/2.0 *s , ctx);
    this.drawHorizontalLine(this.core.H *s , ctx);
*/
  }

  drawVerticalLine(x, ctx) {
    ctx.beginPath()
    ctx.moveTo(x,0);
    ctx.lineTo(x,this.H);
    ctx.stroke()
  }

  drawHorizontalLine(y, ctx) {
    ctx.beginPath()
    ctx.moveTo(0, y);
    ctx.lineTo(this.W, y);
    ctx.stroke()
  }

}


export default Viewport







