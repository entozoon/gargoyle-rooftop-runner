import Pixi from "./PixiCreate";

// MAYBE DON'T USE THIS ACTUALLY
Pixi.engine.loader.add("./assets/items/star/star.json").load(onAssetsLoaded);

function onAssetsLoaded() {
  console.log("WHUH ERGH");
  console.log(Pixi.engine.Texture.fromFrame("star1.png"));
}

export default class Item {
  constructor(options) {
    this.hero = options.hero;

    // console.log(Pixi.engine.Texture.fromFrame("star1.png"));

    if (options.type === "star") {
      for (var i = 0; i < 2; i++) {
        var val = i < 10 ? "0" + i : i;

        // magically works since the spritesheet was loaded with the Pixi loader
        // frames.push(Pixi.engine.Texture.fromFrame("rollSequence00" + val + ".png"));
      }
    }

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
