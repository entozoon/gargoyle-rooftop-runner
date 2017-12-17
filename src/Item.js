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

export default class Item {
  set x(val) {
    this.mover.x = val;
  }

  get x() {
    return this.mover.x;
  }

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

      this.sprite.x = Math.round(options.x);
      this.sprite.y = Math.round(options.y);
      this.sprite.anchor.set(0);
      this.sprite.animationSpeed = 0.1;

      this.sprite.play();
    }

    this.mover = new Mover(this);
    this.mover.init(this);

    // console.log(this.mover.test);

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
    // this.x -= this.hero.velocity.x * dt;
    this.mover.x -= this.hero.velocity.x * dt;
  }
}

// module.exports = {
//   Item
// };

// const Thingness = {
//   set dwa(_) {
//     this._dwa = _ + ".. set";
//   },
//   get dwa() {
//     return this._dwa + " .. get";
//   }
// };

// class Coolness {
//   constructor() {
//     console.log("yo");

//     Object.defineProperty(this, "dwa", {
//       get() {
//         return this._dwa + " .. get";
//       },
//       set(_) {
//         this._dwa = _ + ".. set";
//       }
//     });
//   }
// }

// class Hipness {
//   get x() {
//     return "right";
//     return this._dwa + " .. get";
//   }
//   set x(_) {
//     this._dwa = _ + ".. set";
//   }
// }

// // class Thing {
// class Thing extends [Coolness, Hipness] {
//   constructor() {
//     super();
//     // Object.assign(this, Coolness);
//   }
// }
// let mcfly = new Thing();
// mcfly.dwa = "come on";
// console.log(mcfly.dwa);
// console.log(mcfly.x);
