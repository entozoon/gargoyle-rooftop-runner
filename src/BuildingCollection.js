import Pixi from './PixiCreate';
import Building from './Building';

export class BuildingCollection {
  constructor() {
    this.collection = [];
    this.texture = new Pixi.engine.Texture.fromImage('./assets/test.png');

    this.createPlatform();
  }

  get rightmostBuilding() {
    return this.collection[this.collection.length - 1];
  }

  createPlatform() {
    let offscreenForCaching = new Building({
      texture: this.texture,
      width: 10,
      height: 10,
      position: {
        x: 0,
        y: Pixi.height * 2
      }
    });
    this.collection.push(offscreenForCaching);

    let platform = new Building({
      texture: this.texture,
      width: Pixi.width,
      position: {
        x: Pixi.width * 0.1,
        y: Pixi.height * 0.75
      }
    });
    this.collection.push(platform);
  }

  shouldCreateNewBuilding() {
    // return new Promise((resolve, reject) => {
    if (this.collection.length === 0) {
      //resolve();
      return true;
    }

    // These will have to ingeniously scale up with hero velocity!
    let gapMin = 100,
      gapMax = 300;

    // Doesn't use gap min yet!
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
    // console.log('createNewBuilding');
    let building = new Building({
      texture: this.texture
    });
    this.collection.push(building);
  }

  shouldDeleteBuilding(building) {
    return building.x + building.width < -Pixi.width * 0.25; // breathing room
  }

  deleteBuilding(building, i) {
    building.destroy();
    this.collection.splice(i, 1);
    console.log(this.collection.length);
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

    hero.collisionHandler(this.collection);
  }
}
