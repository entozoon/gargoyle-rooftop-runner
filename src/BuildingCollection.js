import Pixi from "./PixiCreate";
import Building from "./Building";
import Items from "./Items";

export class BuildingCollection {
  constructor(options) {
    this.hero = options.hero;

    this.collection = [];
    this.texture = new Pixi.engine.Texture.fromImage("./assets/test.png");
    this.useLatestGaps = false;
    this.originY = Pixi.height * 0.75;
    this.offsetYLast = 200;
    this.maxOffsetY = 200;
    this.itemFrequency = 0.75;
    this.createPlatform();
    this.items = new Items({
      hero: this.hero
    });
    this.ticker = 0;
  }

  get rightmostBuilding() {
    return this.collection[this.collection.length - 1];
  }

  createPlatform() {
    let offscreenForCaching = new Building({
      hero: this.hero,
      texture: this.texture,
      width: 10,
      height: 10,
      x: 0,
      y: Pixi.height * 2
    });
    this.collection.push(offscreenForCaching);

    let platform = new Building({
      hero: this.hero,
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

  createNewBuilding() {
    // console.log('createNewBuilding');

    // Scale building size up a little if they're super nearby, but only at speed
    // let width = 100 + Math.random() * Pixi.width;
    let widthMin = this.hero.velocity.x * 400;
    let widthMax = 500 + this.hero.velocity.x * 1500;
    let width = widthMin + Math.random() * (widthMax - widthMin);
    // width = widthMax; // test specific width
    width = Math.round(width);

    let building = new Building({
      hero: this.hero,
      texture: this.texture,
      width: width,
      y: this.originY + this.offsetY,
      offsetY: this.offsetY
    });
    this.collection.push(building);
    return building;
  }

  shouldDeleteBuilding(building) {
    return building.x + building.width < -100; // breathing room
  }

  deleteBuilding(building, i) {
    building.destroy();
    this.collection.splice(i, 1);
  }

  update(dt) {
    // this.shouldCreateNewBuilding().then(() => {
    //   this.createNewBuilding();
    // });

    if (this.shouldCreateNewBuilding()) {
      let building = this.createNewBuilding(this.hero);

      if (Math.random() < this.itemFrequency) {
        this.items.create({
          hero: this.hero,
          building: building
        });
      }
    }

    this.items.update(dt);

    this.collection.forEach((building, i) => {
      // building.speed = this.hero.velocity.x;
      building.update(dt);
    });

    // Garbage collection
    // This behaviour could no doubt be shared with buildings, items, etc!
    // Optimised - this can afford to run much less frequently, like every 20 frames
    if (
      this.ticker % 20 === 0 &&
      this.collection.length &&
      this.shouldDeleteBuilding(this.collection[0])
    ) {
      this.deleteBuilding(this.collection[0], 0);
      // console.log(this.collection.length);
    }

    this.hero.collisionHandler(this.collection);

    this.ticker = this.ticker > 9999 ? 0 : ++this.ticker; // Rough but good enough for garbage
  }
}
