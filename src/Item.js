import Pixi from "./PixiCreate";

let textures = {}, // abstract this later
  itemAssetsLoaded = false;
Pixi.engine.loader
  .add("star", "./assets/items/star/star.json")
  .add("somethingElse", "./assets/items/star/star.json")
  .load(onItemAssetsLoaded);

function onItemAssetsLoaded(loader, resources) {
  // console.log(resources);
  // console.log(Pixi.engine.utils.TextureCache);
  itemAssetsLoaded = true;
  textures.star = resources.star.textures;
  textures.somethingElse = resources.somethingElse.textures;
}

export default class Item {
  constructor(options) {
    this.hero = options.hero;

    // Typical flat sprite
    // this.texture = textures.star[1];
    // console.log(this.texture);
    // this.sprite = new Pixi.engine.Sprite(this.texture);
    // this.sprite.scale = { x: 1, y: 1 };

    this.x = Math.round(options.x);
    this.y = Math.round(options.y);

    // Animated sprite
    if (itemAssetsLoaded) {
      this.frames = [];
      for (let i in textures.star) {
        this.frames.push(textures.star[i]);
      }

      this.sprite = new Pixi.engine.extras.AnimatedSprite(this.frames);

      this.sprite.x = Math.round(options.x);
      this.sprite.y = Math.round(options.y);
      this.sprite.anchor.set(0.5);
      this.sprite.animationSpeed = 0.1;

      this.sprite.play();
    }

    Pixi.app.stage.addChild(this.sprite);

    // console.log(this.x + ", " + this.y); // **
  }

  // I should really be currying this junk
  set x(value) {
    if (!this.sprite) return false;
    this.sprite.position.x = value;
  }
  set y(value) {
    if (!this.sprite) return false;
    this.sprite.position.y = value;
  }
  get x() {
    if (!this.sprite) return false;
    return this.sprite.position.x;
  }
  get y() {
    if (!this.sprite) return false;
    return this.sprite.position.y;
  }

  update(dt) {
    this.x -= Math.round(this.hero.velocity.x * dt);
  }
}
