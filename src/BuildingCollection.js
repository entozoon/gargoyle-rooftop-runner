import Pixi from './PixiCreate';
import Building from './Building';

export class BuildingCollection {
  constructor() {
    this.collection = [];
    this.texture = new Pixi.engine.Texture.fromImage('./assets/test.png');
  }

  shouldCreateNewBuilding() {
    return new Promise((resolve, reject) => {
      if (Math.random() < 0.01) {
        resolve();
      }
    });
  }

  createNewBuilding() {
    // console.log('createNewBuilding');
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
    this.shouldCreateNewBuilding().then(() => {
      this.createNewBuilding();
    });

    this.collection.forEach((building, i) => {
      building.speed = hero.speed;
      building.update(dt);

      // Garbage collection
      if (this.shouldDeleteBuilding(building)) {
        this.deleteBuilding(building, i);
      }
    });

    hero.collisions(this.collection);
  }
}
