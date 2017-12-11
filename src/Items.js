// import Pixi from "./PixiCreate";
import Item from "./Item";

export default class Items {
  constructor(options) {
    this.items = [];
    this.hero = options.hero;
  }

  create(options) {
    // for..
    // console.log(options.building.x + ", " + options.building.y);

    this.items.push(
      new Item({
        type: "star",
        hero: this.hero,
        x: options.building.x + options.building.width / 2,
        y: options.building.y - 80
      })
    );
  }

  update(dt) {
    this.items.forEach(item => {
      item.update(dt);
    });
  }
}
