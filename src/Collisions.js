import Pixi from './PixiCreate';

export default class Collisions {
  constructor(options) {
    this.bboxFraction = options.bboxFraction || 1;
    // ^ Do something with this :P
  }

  bboxInset(a) {
    return (a.width - a.width * a.bboxFraction) / 2;
  }

  // Bounding boxy
  isUnderfoot(a, b) {
    // NB: a is always hero, as a lazy way to handle the bbox
    a.bboxFraction = this.bboxFraction;
    a.bboxInset = this.bboxInset(a);
    return (
      // Almost down to floor
      a.y + a.height * 1.1 > b.y && // < careful to avoid floor rounding errors
      // Not sunk into it, as that'll be a sidelong collision
      !(a.y + a.height * 0.25 > b.y) &&
      // Which I think is more stable than:
      // Super near object vertically
      // a.y + a.height * 1.1 > b.y &&
      // a.y + a.height * 0.9 < b.y &&

      // Within left flush wall of b
      // a.x + a.width > b.x &&
      a.x + a.width - a.bboxInset > b.x &&
      // Within right flush wall of b
      a.x + a.bboxInset < b.x + b.width
    );
  }

  // Smashing into the side of a b, ya ded
  smashingIntoObject(a, b) {
    a.bboxFraction = this.bboxFraction;
    a.bboxInset = this.bboxInset(a);
    return (
      // Bottom of a below top of b..ish
      a.y + a.height * 0.1 > b.y &&
      // Right of a inside b
      a.x + a.width - a.bboxInset > b.x &&
      // Hasn't gone past b
      a.x + a.bboxInset < b.x + b.width
    );
  }

  // Fallen all the way down, y'also ded
  fallenThroughFloor(a, b) {
    return a.y > Pixi.height;
  }
}
