let PIXILIB = require('pixi.js');

class Pixi {
  constructor() {
    this.engine = PIXILIB;
    this.app = new this.engine.Application({
      width: 1200,
      height: 600
    });
  }
  jaff() {
    console.log('jaffffff');
  }
}
// Always give the same the instance when imported!
// e.g.  import Pixi from './PixiCreate';
export default new Pixi();
