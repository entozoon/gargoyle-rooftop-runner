import Pixi from "./PixiCreate";
import Item from "./Item";

export default class Items {
  constructor(options) {
    this.collection = [];
    this.spreads = ["vertical", "horizontal", "arc"];
    this.hero = options.hero;
    this.ticker = 0;
  }

  create(options) {
    let spread = this.spreads[Math.floor(Math.random() * this.spreads.length)];
    // let spread = "arc";
    let spreadPositions = this.spreadPositionFunctions(spread)(
      options.building
    );

    spreadPositions.forEach(position => {
      this.collection.push(
        new Item({
          type: "star",
          hero: this.hero,
          x: position.x,
          y: position.y
        })
      );
    });
  }

  // Too hungover to do this betterer
  spreadPositionFunctions(spread) {
    let positions = [],
      spacing = 75,
      maxHeight = Pixi.height / 2; // max jump height or whatever

    // Maybe scrap horizontal entirely? Arc will conjure an approximation of it anyway
    if (spread === "horizontal") {
      return building => {
        // let width = (building.width - spacing * 2) * Math.random();
        // let xStart = building.x + spacing + (building.width - width) * Math.random();
        // Simplifying: simple elegance
        let width = building.width - spacing * 2;
        let xStart = building.x + spacing;

        let y = building.y - 50;

        for (let x = xStart; x < xStart + width; x += spacing) {
          positions.push({
            x: x,
            y: y
          });
        }
        return positions;
      };
    } else if (spread === "vertical") {
      return building => {
        let x =
            building.x +
            spacing +
            (building.width - spacing * 2) * Math.random(),
          yMax = building.y - maxHeight * Math.random();
        for (let y = building.y - spacing; y > yMax; y -= spacing) {
          positions.push({
            x: x,
            y: y
          });
        }
        return positions;
      };
    } else if (spread === "arc") {
      return building => {
        // Start point and width similar to horizontal spready
        // let width = (building.width - spacing * 2) * Math.random();
        // let xStart = building.x + spacing + (building.width - width) * Math.random();
        // Simplify: fill the whole width
        let width = building.width - spacing * 2;
        let xStart = building.x + spacing;

        // Sine wave up and down; simples!
        let yScale = maxHeight * Math.random();

        for (let x = xStart; x < xStart + width; x += spacing) {
          positions.push({
            x: x,
            y:
              building.y -
              50 -
              Math.sin((x - xStart) / width * Math.PI) * yScale
          });
        }
        return positions;
      };
    }
  }

  shouldDeleteItem(item) {
    return item.x + item.width < -100; // breathing room
  }

  deleteItem(item, i) {
    item.destroy();
    this.collection.splice(i, 1);
  }

  update(dt) {
    this.collection.forEach(item => {
      item.update(dt);
    });

    // Garbage collection
    // This behaviour could no doubt be shared with buildings, items, etc!
    // Optimised - this can afford to run much less frequently, like every 20 frames
    if (
      // Set ticker low as possible but that this.collection.length doesn't leak up
      // Optimisation - have the ticker frequency modify itself to keep up with demand
      this.ticker % 21 &&
      this.collection.length &&
      this.shouldDeleteItem(this.collection[0])
    ) {
      this.deleteItem(this.collection[0], 0);
      // console.log(this.collection.length);
    }

    this.ticker = this.ticker > 9999 ? 0 : ++this.ticker; // Rough but good enough for garbage
  }
}
