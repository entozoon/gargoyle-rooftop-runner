import Pixi from "./PixiCreate";
import Building from "./Building";

export class BuildingCollection {
  constructor(hero) {
    this.collection = [];
    this.texture = new Pixi.engine.Texture.fromImage("./assets/test.png");
    this.hero = hero;
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
    if (this.collection.length === 0) {
      return true;
    }

    // These ingeniously scale up with hero velocity!
    let gapMax = this.hero.velocity.x * this.hero.furthestJumpDistance;
    let gapMin = gapMax * (0.1 + Math.random(0.9));
    // gapMin = gapMax; // Test full jump

    // If it's a huge jump, don't move them much; upward that is.
    let gapMinMaxDiff = gapMax - gapMin;

    // ....

    // Doesn't use gap min yet!
    if (
      // If rightmost building is onscreen
      this.rightmostBuilding.x < Pixi.width &&
      // and leaving a big ol' gap on the right
      Pixi.width - this.rightmostBuilding.x - this.rightmostBuilding.width >
        gapMin + Math.random() * (gapMax - gapMin)
    ) {
      return true;
    }

    return false;
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
