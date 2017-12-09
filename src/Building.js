import Pixi from "./PixiCreate";

export default class Building {
  constructor(options) {
    // Texture is just the image data, sprite is the object but TilingSprite is ronseal
    // this.sprite = new Pixi.engine.Sprite(this.texture);
    this.sprite = new Pixi.engine.extras.TilingSprite(options.texture);

    this.width = this.sprite.width =
      options.width || 100 + Math.random() * Pixi.width;
    this.height = this.sprite.height = options.height || Pixi.height; // optimisation - y offset based height
    this.sprite.anchor.x = 0;
    this.sprite.anchor.y = 0;
    this.offsetY = options.offsetY || 0;
    this.x = options.x || Pixi.width;
    this.y = options.y || Pixi.height / 2 + this.offsetY;
    this.sprite.scale = { x: 1, y: 1 };

    if (this.y > Pixi.height - 50) this.y = Pixi.height - 50;

    // HIT, probably won't use this.. just.. do it manual styles.
    // this.sprite.hitArea = new Pixi.engine.Rectangle(0, 0, 100, 100);

    Pixi.app.stage.addChild(this.sprite);
  }

  // I should really be currying this junk
  set x(value) {
    this.sprite.position.x = value;
  }
  set y(value) {
    this.sprite.position.y = value;
  }
  get x() {
    return this.sprite.position.x;
  }
  get y() {
    return this.sprite.position.y;
  }
  get width() {
    return this.sprite.width;
  }
  get height() {
    return this.sprite.height;
  }
  set width(value) {
    this.sprite.width = value;
  }
  set height(value) {
    this.sprite.height = value;
  }
  get speed() {
    return this._speed;
  }

  set speed(speed) {
    this._speed = speed;
  }

  destroy() {
    this.sprite.destroy();
    // Pixi.app.stage.removeChild(this.sprite);
  }

  update(dt) {
    this.sprite.position.x -= this.speed * dt;
  }
}
