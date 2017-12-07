import Pixi from './PixiCreate';

export class Background {
  constructor(options) {
    this.texture = new Pixi.engine.Texture.fromImage('./assets/background.png');
    this.sprite = new Pixi.engine.extras.TilingSprite(this.texture);

    this.sprite.width = Pixi.width;
    this.sprite.height = Pixi.height;
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 0;
    this.position = this.sprite.position = {
      x: 0,
      y: 0
    };
    this.sprite.scale = { x: 1, y: 1 };

    Pixi.app.stage.addChild(this.sprite);
  }

  update(dt, heroVelocity) {
    // Optimisation - remove this effect:
    this.sprite.tilePosition.x -= heroVelocity.x * dt * 0.2; // ~parallax
    this.sprite.tilePosition.y -= heroVelocity.y * dt * 0.075;
  }
}
