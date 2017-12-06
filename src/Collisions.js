import Pixi from './PixiCreate';

export default class Collisions {
  // Bounding boxy
  isUnderfoot(a, b) {
    return (
      // Super near object vertically
      a.y + a.height * 1.25 > b.y &&
      a.y + a.height * 0.75 < b.y && // ********
      // Above object
      // a.y + a.height * 0.25 < b.y &&
      // Not below object..ish
      // !(a.y + a.height * 0.75 > b.y) &&
      // Within left flush
      a.x + a.width > b.x &&
      // Within right flush
      a.x < b.x + b.width
    );
  }

  // Smashing into the side of a b, ya ded
  smashingIntoObject(a, b) {
    // if (this.isUnderfoot(a, b)) {
    //   return false;
    // }
    return (
      // bottom of a below top of b..ish
      a.y + a.height * 0.25 > b.y &&
      // right of a inside b
      a.x + a.width > b.x &&
      // hasn't gone past b
      a.x < b.x + b.width
    );
  }

  // Fallen all the way down, y'also ded
  fallenThroughFloor(a, b) {
    return a.y > Pixi.height;
  }
}
