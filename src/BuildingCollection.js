import Pixi from './PixiCreate';
import Building from './Building';

export class BuildingCollection {
  constructor() {
    this.collection = [];
    this.texture = new Pixi.engine.Texture.fromImage('./assets/test.png');
  }

  get rightmostBuilding() {
    return this.collection[this.collection.length - 1];
  }

  shouldCreateNewBuilding() {
    // return new Promise((resolve, reject) => {
    if (this.collection.length == 0) {
      //resolve();
      return true;
    }

    // These will have to ingeniously scale up with hero velocity!
    let gapMin = 100,
      gapMax = 300;

    // Doesn't use gap min yet!
    console.log(this.rightmostBuilding.x);
    if (
      // If rightmost building is onscreen
      this.rightmostBuilding.x < Pixi.width &&
      // and leaving a big ol' gap on the right
      Pixi.width - this.rightmostBuilding.x - this.rightmostBuilding.width > gapMax
    ) {
      //resolve();
      return true;
    }

    // reject();
    return false;
    // });
  }

  createNewBuilding() {
    console.log('createNewBuilding');
    let building = new Building({
      texture: this.texture
    });
    this.collection.push(building);
  }

  shouldDeleteBuilding(building) {
    return building.x + building.width < 0;
  }

  deleteBuilding(building, i) {
    building.destroy();
    this.collection.splice(i, 1);
  }

  update(dt, hero) {
    // this.shouldCreateNewBuilding().then(() => {
    //   this.createNewBuilding();
    // });
    if (this.shouldCreateNewBuilding()) {
      this.createNewBuilding();
    }

    this.collection.forEach((building, i) => {
      building.speed = hero.velocity.x;
      building.update(dt);

      // Garbage collection
      if (this.shouldDeleteBuilding(building)) {
        this.deleteBuilding(building, i);
      }
    });

    hero.collisions(this.collection);
  }
}
