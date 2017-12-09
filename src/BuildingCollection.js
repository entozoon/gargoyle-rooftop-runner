import Pixi from "./PixiCreate";
import Building from "./Building";

export class BuildingCollection {
  constructor(hero) {
    this.collection = [];
    this.texture = new Pixi.engine.Texture.fromImage("./assets/test.png");
    this.hero = hero;
    this.useLatestGaps = false;
    this.offsetYLast = 200;
    this.maxOffsetY = 150;
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
      x: 0,
      y: Pixi.height * 2
    });
    this.collection.push(offscreenForCaching);

    let platform = new Building({
      texture: this.texture,
      width: Pixi.width,
      x: Pixi.width * 0.1,
      y: Pixi.height * 0.75
    });
    this.collection.push(platform);
  }

  createGaps() {
    // These ingeniously scale up with hero velocity!
    this.gapMax = this.hero.velocity.x * this.hero.furthestJumpDistance;
    //this.gapMin = this.gapMax * 0.2;
    // Buildings are a little too far apart at speed, let's try a smaller gap but wider buildings at min
    this.gapMin = 30;
    this.gap = this.gapMin + this.gapMax * Math.random() * 0.8;
    //  30 / (40)  / 500
    //  30 / (400) / 500
    this.nearingGapMinFactor =
      (this.gap - this.gapMin) / (this.gapMax - this.gapMin);

    // Test full jump
    // this.gap = this.gapMin = this.gapMax;

    // If it's a huge jump, don't move them much; upward that is.
    this.hugeJumpness = this.gap / this.gapMax;

    // this.offsetY = (1 - this.hugeJumpness) * this.maxOffsetY * 2 - this.maxOffsetY;
    this.offsetY = Math.random() * this.maxOffsetY * 2 - this.maxOffsetY;

    // If trying to offset upward, scale that offset down for large jumps
    if (this.offsetY < 0) {
      this.offsetY *= this.hugeJumpness;
    }
  }

  shouldCreateNewBuilding() {
    if (this.collection.length === 0) {
      return true;
    }

    if (!this.useLatestGaps) {
      this.createGaps();
    }
    this.useLatestGaps = true;

    if (
      // If rightmost building is onscreen
      this.rightmostBuilding.x < Pixi.width &&
      // and leaving a big ol' gap on the right
      Pixi.width - this.rightmostBuilding.x - this.rightmostBuilding.width >
        this.gap
      // this.gapMin + Math.random() * (this.gapMax - this.gapMin)
    ) {
      this.useLatestGaps = false;
      return true;
    }

    return false;
  }

  createNewBuilding(hero) {
    // console.log('createNewBuilding');

    // Scale building size up a little if they're super nearby, but only at speed
    // let width = 100 + Math.random() * Pixi.width;
    let widthMin = hero.velocity.x * 400;
    let widthMax = 500 + hero.velocity.x * 1500;
    let width = widthMin + Math.random() * (widthMax - widthMin);
    // width = widthMax; // test specific width
    width = Math.round(width);

    let building = new Building({
      texture: this.texture,
      width: width,
      offsetY: this.offsetY
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
      this.createNewBuilding(hero);
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
