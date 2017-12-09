let PIXILIB = require("pixi.js");

class Pixi {
  constructor() {
    this.engine = PIXILIB;
    this.app = new this.engine.Application({
      width: 1600,
      height: 800
    });
  }
  get width() {
    return this.app.renderer.screen.width;
  }
  get height() {
    return this.app.renderer.screen.height;
  }
}
// Always give the same the instance when imported!
// e.g.  import Pixi from './PixiCreate';
export default new Pixi();
