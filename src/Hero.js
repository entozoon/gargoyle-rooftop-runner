import Pixi from './PixiCreate';

export class Hero {
  constructor() {
    this.speed = 0.5;
    this.temporaryTicker = 0;

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

    document.addEventListener('keydown', e => {
      this.jamp();
    });
  }

  jamp() {
    this.hero.position.y -= 30;
  }

  update(dt) {
    // Might not be necessary much, as the engine handles all rendering updates, but it does indeed run

    this.speed = Math.sin(++this.temporaryTicker / 100) + 1;
  }
}
