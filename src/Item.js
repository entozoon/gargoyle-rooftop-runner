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

// var obj = {
//   _fuckSake: "init",
//   set fuckSake(value) {
//     this._fuckSake = value;
//   },
//   get fuckSake() {
//     return this._fuckSake + " yasssssss";
//   }
// };
// Object.defineProperties(obj, {
//   set: {}
// });

// var obj = {};

// Object.defineProperty(obj, "fuckSake", {
//   get: function() {
//     return this._fuckSake + " yasssss?";
//   },
//   set: function(value) {
//     this._fuckSake = value;
//   }
// });

// var source = {
//   get prop() {},
//   set prop(v) {}
// };
// console.log(
//   "descriptor on source",
//   Object.getOwnPropertyDescriptor(source, "prop")
// );
// var target = Object.assign({}, source);
// console.log(
//   "descriptor on target",
//   Object.getOwnPropertyDescriptor(target, "prop")
// );

// function Class() {
//   Object.defineProperty(this, "prop", {
//     get() {
//       console.log("call get");
//     },
//     set(v) {
//       console.log("call set");
//     }
//   });
// }
// var c = new Class();
// console.log(c.prop); // => 'call get', undefined
// c.prop = "change"; // => 'call set'
// console.log(c.prop); // => 'call get', undefined

// console.log("---------------");

// // Getter / setter behaviour object
// const behaviour = {
//   _magicString: "init",
//   set magicString(value) {
//     this._magicString = value;
//   },
//   get magicString() {
//     return this._magicString + " yasssss it was!";
//   }
// };

// Take all the functions in the exported class and jaff them into this
const extend = (a, b) => {
  console.log(b);

  // Getting somewhere!
  console.log(Object.getOwnPropertyNames(b.prototype));

  for (var i in b) {
    Object.defineProperties(a, Object.getOwnPropertyDescriptors(b));
  }
};

// class Thing {
//   constructor() {
//     // Give it the getter/setter behaviours
//     extend(this, behaviour);
//   }
// }
// const thing = new Thing();

// console.log(thing.magicString);
// thing.magicString = "this string should be appended..";
// console.log(thing.magicString);

export default class Item {
  constructor(options) {
    // holy SHIT, this was a guess and it totally works:
    // this.mover = new Mover();
    // this.mover.setParent(this);
    // let grah = Object.assign(this, this.mover, obj);
    // this.fuckSake = "aww yeah kinda";
    // console.log(this.fuckSake);
    // grah.fuckSake = "aww yeah kinda";
    // console.log(grah.fuckSake);

    // FINN TOTALLY EXPLAINED IT
    // https://codepen.io/anon/pen/JMYGrq?editors=0012
    // object.assign specifically _doesn't_ copy getters and setters. object.extend eventually will but doesn't exist yet. there's a proto function for it though (maybe could be written better but yeah ^)

    console.log("----------");
    // console.log(Mover);
    // Object.assign(this, Mover);
    extend(this, Mover);
    // console.log(this);
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
