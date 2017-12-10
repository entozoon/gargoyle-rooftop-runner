import Pixi from "./PixiCreate";

export default class Item {
  constructor(options) {
    this.hero = options.hero;
    this.texture = new Pixi.engine.Texture.fromImage(
      "./assets/items/" + options.type + ".png"
    );
    this.sprite = new Pixi.engine.Sprite(this.texture);
    this.x = Math.round(options.x);
    this.y = Math.round(options.y);

    this.sprite.scale = { x: 1, y: 1 };

    Pixi.app.stage.addChild(this.sprite);

    console.log(this.x + ", " + this.y);
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

  update(dt) {
    this.x -= Math.round(this.hero.velocity.x * dt);
  }
}
