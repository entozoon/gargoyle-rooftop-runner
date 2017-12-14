let PIXILIB = require("pixi.js");

class Pixi {
  constructor() {
    this.engine = PIXILIB; // PIXI. - in generic examples
    this.app = new this.engine.Application({
      width: 1600,
      height: 800
    });
    // http://pixijs.download/dev/docs/PIXI.settings.html
    // This AND the CSS styles (srsly) put an end to anti-aliasing
    this.engine.settings.SCALE_MODE = this.engine.SCALE_MODES.NEAREST;
    this.engine.settings.RENDER_OPTIONS.antialias = false;
    // this.engine.settings.RESOLUTION = window.devicePixelRatio;
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
