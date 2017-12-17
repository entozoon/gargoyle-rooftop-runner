import Pixi from "./PixiCreate";

import Movement from "./behaviours/Movement";

let textures = {}, // abstract this later
  itemAssetsLoaded = false;
Pixi.engine.loader
  .add("star", "./assets/items/star/star.json")
  // .add("somethingElse", "./assets/items/something-else/something-else.json")
  .load(onItemAssetsLoaded);

function onItemAssetsLoaded(loader, resources) {
  // console.log(resources);
  // console.log(Pixi.engine.utils.TextureCache);
  itemAssetsLoaded = true;
  textures.star = resources.star.textures;
  // textures.somethingElse = resources.somethingElse.textures;
}

// // Take all the functions in the exported class and jaff them into this
// const extend = (a, b) => {
//   // Loop over the class's functions
//   for (let key of Object.getOwnPropertyNames(Object.getPrototypeOf(b))) {
//     // Because fuck the constructor
//     if (key != "constructor") {
//       // Brap functions from 'b' into 'a'
//       // a[key] = b[key];

//       var fuckME = Object.getPrototypeOf(b);
//       a[key] = fuckME;
//     }
//   }
// };

function extend(a, b) {
  for (var i in b) {
    Object.defineProperties(a, Object.getOwnPropertyDescriptors(b));
  }
}

export default class Item {
  constructor(options) {
    this.hero = options.hero;

    // Typical flat sprite
    // this.texture = textures.star[1];
    // console.log(this.texture);
    // this.sprite = new Pixi.engine.Sprite(this.texture);
    // this.sprite.scale = { x: 1, y: 1 };

    // this.x = Math.round(options.x);
    // this.y = Math.round(options.y);
    // this.setX(Math.round(options.x));
    // this.setY(Math.round(options.y));
    this.width = 50;

    // Animated sprite
    if (itemAssetsLoaded) {
      this.frames = [];
      for (let i in textures.star) {
        this.frames.push(textures.star[i]);
      }

      this.sprite = new Pixi.engine.extras.AnimatedSprite(this.frames);

      this.sprite.anchor.set(0);
      this.sprite.animationSpeed = 0.1;

      this.sprite.play();
    }

    this.movement = new Movement();
    this.movement.setParent(this);

    this.movement.x = Math.round(options.x);
    this.movement.y = Math.round(options.y);

    Pixi.app.stage.addChild(this.sprite);
  }

  destroy() {
    this.sprite.destroy();
  }

  update(dt) {
    this.movement.x -= this.hero.velocity.x * dt;
  }
}
