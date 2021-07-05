
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object 
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}




const resources = {
  images: {
    "bullet": {
      folder: "bullet",
      type: "svg",
      states: ["1","2","3","4"],
      img: null,
      ready: 0,
    }
  }

}

const ResConfigs = {
  address: "./resources",
  images: "./resources/images",
  fonts: "./resources/fonts",
  sounds: "./resources/sounds",
  defaultImageType: "png",
}

function loadResources() {
  const rimg = resources.images
  for(const name in rimg) {
    const item = rimg[name]
    var adrs = ResConfigs.images;
    if(item.folder && item.folder != "")
      adrs += "/" + item.folder;
    adrs += "/" + name;

    const type = item.type || ResConfigs.defaultImageType;

    if(item.states) {
      item.img = []
      var ind = 0
      for(const state of item.states) {
        const ad = adrs + "_" + state + "." + type;
        const img = new Image();
        img.onload = () => {
          item.ready++;
        }
        img.src = ad;
        item.img.push(img);
        ind++;
      }
    } else {
      adrs += "." + type;
      const img = new Image();
      img.onload = () => {
        item.ready = 1;
      }
      img.src = ad;
      item.img = img;
    }
  }
}

const sq3 = Math.sqrt(3);

const UX = {
  x: 2/sq3,
  y: 1/sq3,
}

const UY = {
  x: -2/sq3,
  y: 1/sq3,
}


export { roundRect, loadResources, resources, UX, UY }