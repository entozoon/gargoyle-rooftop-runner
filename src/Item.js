import Pixi from "./PixiCreate";

import Mover from "./behaviours/Mover";

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

export default class Item extends Mover {
  set x(val) {
    this.mover.x = val;
  }

  get x() {
    return this.mover.x;
  }

  constructor(options) {
    super();

    this.mover = new Mover();
    this.mover = new Mover();
    this.mover = new Mover();
    this.mover = new Mover();

    this.x = 12;
    this.sprite.position.x = 12;
    this.mover.x = 12;

    // FINN TOTALLY EXPLAINED IT
    // https://codepen.io/anon/pen/JMYGrq?editors=0012
    // object.assign specifically _doesn't_ copy getters and setters. object.extend eventually will but doesn't exist yet. there's a proto function for it though (maybe could be written better but yeah ^)
    // extend(this, Mover);
    // this.x = "SWEET BAAAABY SATAN";
    // this.Mover.x = "subset.. ";
    // console.log(this.Mover.x);

    console.log(this.x);

    this.x = "post";

    console.log(this.x);

    this.hero = options.hero;

    // Typical flat sprite
    // this.texture = textures.star[1];
    // console.log(this.texture);
    // this.sprite = new Pixi.engine.Sprite(this.texture);
    // this.sprite.scale = { x: 1, y: 1 };

    // this.x = Math.round(options.x);
    this.y = Math.round(options.y);
    this.setX(Math.round(options.x));
    // this.setY(Math.round(options.y));
    this.width = 50;

    // Animated sprite
    if (itemAssetsLoaded) {
      this.frames = [];
      for (let i in textures.star) {
        this.frames.push(textures.star[i]);
      }

      this.sprite = new Pixi.engine.extras.AnimatedSprite(this.frames);

      this.sprite.x = Math.round(options.x);
      this.sprite.y = Math.round(options.y);
      this.sprite.anchor.set(0);
      this.sprite.animationSpeed = 0.1;

      this.sprite.play();
    }

    Pixi.app.stage.addChild(this.sprite);

    // console.log(this.x + ", " + this.y); // **
  }

  // I should really be currying this junk
  // set x(value) {
  //   if (!this.sprite) return false;
  //   this.sprite.position.x = value;
  // }
  // get x() {
  //   if (!this.sprite) return false;
  //   return this.sprite.position.x;
  // }
  set y(value) {
    if (!this.sprite) return false;
    this.sprite.position.y = value;
  }
  get y() {
    if (!this.sprite) return false;
    return this.sprite.position.y;
  }
  destroy() {
    this.sprite.destroy();
  }

  update(dt) {
    // this.x -= Math.round(this.hero.velocity.x * dt);
    this.x -= this.hero.velocity.x * dt;
  }
}

// module.exports = {
//   Item
// };
