import Pixi from './PixiCreate';
import Building from './Building';

export class BuildingCollection {
  constructor() {
    this.collection = [];
    this.texture = new Pixi.engine.Texture.fromImage('assets/test.png');
  }

  shouldCreateNewBuilding() {
    return new Promise((resolve, reject) => {
      if (Math.random() < 0.01) {
        resolve();
      }
    });
  }

  createNewBuilding() {
    console.log('createNewBuilding');
    let building = new Building({
      texture: this.texture
    });
    this.collection.push(building);
  }

  update(dt, hero) {
    this.shouldCreateNewBuilding().then(() => {
      this.createNewBuilding();
    });
    this.collection.forEach(building => {
      building.speed = hero.speed;
      building.update(dt);
    });
  }
}
