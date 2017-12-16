// class Mover {
//   constructor(name) {
//     this._x;
//   }
//   set x(x) {
//     this._x = x + " awww yeah";
//   }
//   get x() {
//     return this._x + " half working";
//   }
// }
// export default Mover;

export default class Mover {
  constructor() {
    // super();
    this._x = "pre";
  }
  set x(value) {
    this._x = value;
  }

  get x() {
    return this._x + " yasssss it was!";
  }
}

// export default () => {
//   return {
//     get x() {
//       return "hello";
//     }
//   };
// this.parent = "erm";
// return {
//   // I know this isn't right.. but..
//   setParent: parent => {
//     this.parent = parent;
//   },
//   // bark: () => console.log("Woof"),
//   // dwa: () => {
//   //   console.log("dwaaaaaaaaaaaaaa");
//   //   console.log(this);
//   //   console.log(this.WAKEUP);
//   //   console.log(this.parent);
//   //   console.log(this.parent.WAKEUP);
//   // }
//   setX: x => {
//     console.log(2);
//     console.log(this.parent);
//     if (!this.parent.sprite) return false;
//     this.parent.sprite.position.x = x;
//   },
//   getX: () => {
//     if (!this.parent.sprite.position) return false;
//     return this.parent.sprite.position.x;
//   },
//   setY: y => {
//     console.log(2);
//     console.log(this.parent);
//     if (!this.parent.sprite) return false;
//     this.parent.sprite.position.y = y;
//   },
//   getY: () => {
//     if (!this.parent.sprite.position) return false;
//     return this.parent.sprite.position.y;
//   },
//   set x(x) {
//     console.log("set x");
//     console.log(x);
//     if (!this.parent.sprite) return false;
//     this.parent.sprite.position.x = x;
//     console.log(this.parent.sprite.position.x);
//     console.log("/set x");
//   },
//   get x() {
//     console.log(this.parent);
//     return 12;
//     console.log("get x");
//     if (!this.parent.sprite) return false;
//     console.log(this.parent.sprite.position.x);
//     console.log("/get x");
//     return this.parent.sprite.position.x;
//   }
// };
// };
