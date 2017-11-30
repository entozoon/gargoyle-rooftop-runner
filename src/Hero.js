import Pixi from './PixiCreate';

export class Hero {
  constructor() {
    this.hero = new Pixi.engine.Text('G', {
      fontFamily: 'Verdana',
      fontSize: 24,
      fill: 0xaaaaaa,
      align: 'center'
    });
    Pixi.app.stage.addChild(this.hero);

    this.hero.position = {
      x: 300,
      y: 300
    };
  }
}
