import Pixi from "./PixiCreate";
import Sprite from "./Sprite";
import Poses from "./HeroPoses";

export class HeroSpriteTest {
  constructor() {
    this.sprite = new Sprite({
      test: true,
      spriteSheet: "./assets/hero.png",
      poses: Poses
    });
    this.sprite.position = {
      x: Pixi.width - 100,
      y: 100
    };

    // this.x = Pixi.width - 200;
    // this.y = Pixi.height - 200;

    // this.sprite.pose("run"); // < e.g.

    this.posesTicker = 0;
    this.cyclePose();
    setInterval(() => {
      this.cyclePose();
    }, 3000);
  }

  cyclePose() {
    // this.sprite.texture = this.frames["run"];
    // console.log("HeroSpriteTest: " + Poses[this.posesTicker].name);

    this.sprite.pose = Poses[this.posesTicker].name;

    this.posesTicker =
      this.posesTicker >= Poses.length - 1 ? 0 : ++this.posesTicker;
  }
}
